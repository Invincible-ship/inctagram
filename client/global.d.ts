declare module '*.svg' {
  const content: any
  export default content
}

declare module '*.svg?url' {
  const content: string
  export default content
}

declare const __IS_DEV__: boolean
