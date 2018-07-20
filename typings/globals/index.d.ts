declare module '*.svg' {
  const content: any
  export default content
}

declare module 'react-keydown/es' {
  function keydown(a: any): any
  function keydownScoped(key: string | number): PropertyDecorator

  export default keydown
  export { keydownScoped }
}

declare module 'react-dnd-multi-backend' {
  const content: any
  export default content
}

declare module 'react-dnd-multi-backend/lib/HTML5toTouch' {
  const content: any
  export default content
}

// tslint:disable-next-line
interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any
}
