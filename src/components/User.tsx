import { hot } from 'react-hot-loader'
import * as React from 'react'
import { findDOMNode } from 'react-dom'
import {
  DragSource,
  DragSourceSpec,
  DragSourceMonitor,
  DragSourceConnector,
  DropTargetConnector,
  DropTargetMonitor,
  DropTargetSpec,
  DropTarget,
} from 'react-dnd'
import { ListItemControl } from 'react-md/lib/Lists'
import { SelectionControl } from 'react-md/lib/SelectionControls'
import { Button } from 'react-md/lib/Buttons'

const buttonMargin: React.CSSProperties = {
  marginLeft: 10,
}

interface IProps {
  readonly user: string
  readonly active: boolean
  readonly index: number
  readonly moveUser: (dragIndex: number, hoverIndex: number) => void
  readonly removeUser: (index: number) => void
  readonly setActive: (index: number) => void
}

const target: DropTargetSpec<IProps> = {
  hover(props, monitor, component) {
    if (!monitor || !component) return

    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return
    }

    // Determine rectangle on screen
    const hoverBoundingRect = (findDOMNode(
      component
    ) as Element).getBoundingClientRect()

    // Get height of element
    const elementHeight = hoverBoundingRect.bottom - hoverBoundingRect.top

    // Get offset requried to move
    const offsetNeeded = elementHeight / 8

    // Determine mouse position
    const clientOffset = monitor.getClientOffset() || { x: 0, y: 0 }

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < offsetNeeded) {
      return
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > elementHeight - offsetNeeded) {
      return
    }

    // Time to actually perform the action
    props.moveUser(dragIndex, hoverIndex)
    monitor.getItem().index = hoverIndex
  },
}

const source: DragSourceSpec<IProps, Partial<IProps>> = {
  beginDrag(props) {
    return { index: props.index, user: props.user }
  },
}

const targetCollect = (
  connect: DropTargetConnector,
  monitor: DropTargetMonitor
) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
})

const sourceCollect = (
  connect: DragSourceConnector,
  monitor: DragSourceMonitor
) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
})

@DropTarget('user', target, targetCollect)
@DragSource('user', source, sourceCollect)
class DraggableUserComponent extends React.PureComponent<IProps> {
  public render() {
    const { connectDropTarget, connectDragSource, index } = this.props as any

    return connectDragSource(
      connectDropTarget(
        <span>
          {/* Should replace this with styled component eventually */}
          <ListItemControl
            style={{
              minWidth: 150,
              paddingLeft: 16,
              opacity: (this.props as any).isDragging ? 0 : 1,
              fontWeight: this.props.active ? 500 : 'inherit',
              textDecoration: this.props.active ? 'underline' : 'inherit',
              textShadow: this.props.active
                ? '0 0 4px rgba(0,0,0,0.45)'
                : 'none',
              textAlign: 'center',
              fontSize: '1.15em',
              cursor: 'grab',
            }}
            primaryText="What is primary text"
            primaryAction={
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                {/* tslint:disable:jsx-no-lambda */}
                {/* We have to keep these stupid lambda functions because the types for */}
                {/* DropTarget and DragSource scream bloody murder if you add a property to the class */}
                <SelectionControl
                  id={`current-active-user-radio-${index}`}
                  name={`current-active-user-radio`}
                  type="radio"
                  label={this.props.user}
                  checked={this.props.active}
                  onChange={() => this.props.setActive(index)}
                />

                <Button
                  icon
                  style={buttonMargin}
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this user?')) {
                      this.props.removeUser(index)
                    }
                  }}
                >
                  close
                </Button>
              </span>
            }
          />
        </span>
      )
    )
  }
}

export const DraggableUser = hot(module)(DraggableUserComponent)
