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
import { ListItem, ListItemText } from 'material-ui/es/List'

interface IProps {
  readonly user: string
  readonly active: boolean
  readonly index: number
  moveUser(dragIndex: number, hoverIndex: number): void
}

const target: DropTargetSpec<IProps> = {
  hover(props, monitor, component) {
    if (!monitor || !component) return

    const dragIndex = (monitor.getItem() as any).index
    const hoverIndex = props.index

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

    // Get height of element
    const elementHeight = hoverBoundingRect.bottom - hoverBoundingRect.top

    // Get offset requried to move
    const offsetNeeded = elementHeight / 8

    // Determine mouse position
    const clientOffset = monitor.getClientOffset()

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
    ;(monitor.getItem() as any).index = hoverIndex
  },
}

const source: DragSourceSpec<IProps> = {
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
export class DraggableUser extends React.PureComponent<IProps> {
  public render() {
    const { connectDropTarget, connectDragSource } = this.props as any

    return connectDragSource(
      connectDropTarget(
        <span>
          <ListItem key={this.props.user}>
            <ListItemText
              primary={this.props.user}
              disableTypography
              style={{
                textAlign: 'center',
                minWidth: 125,
                padding: 0,
                opacity: (this.props as any).isDragging ? 0 : 1,
                fontWeight: this.props.active ? 500 : 'inherit',
              }}
            />
          </ListItem>
        </span>
      )
    )
  }
}
