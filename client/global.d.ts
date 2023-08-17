//declare module "*.svg" {
//  const content: any
//  export default content
//}

//*код из гитхаб сторибук
declare module '*.svg' {
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  const content: string

  export { ReactComponent }
  export default content
}
