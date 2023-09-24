declare module '*.svg' {
  import * as React from 'react'

  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>

  export default ReactComponent
}

declare module '*.svg?url' {
  const content: string
  export default content
}

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

declare const __IS_DEV__: boolean

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.webp'
