declare module '*.svg' {
  import * as React from 'react'

  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>

  export default ReactComponent
}

declare module '*.svg?url' {
  const content: any
  export default content
}

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

interface AppCustomEvent<E = Event, T = Element> extends Omit<E, 'target'> {
  target: Pick<E, 'target'> & T
}

type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T
}

declare const __IS_DEV__: boolean

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.webp'
