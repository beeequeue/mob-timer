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
