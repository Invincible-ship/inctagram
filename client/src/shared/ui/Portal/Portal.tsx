"use client"

import { FC, ReactNode, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

type PortalProps = {
  children: ReactNode;
  element?: HTMLElement;
}

export const Portal: FC<PortalProps> = (props) => {
  const { 
    children,
    element
  } = props

  const ref = useRef<Element | null>(null)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    ref.current = document.body
    setMounted(true)
  }, [])

  // @ts-ignore
  return (mounted && (element || ref.current))
    ? createPortal(children, element || ref.current)
    : null
}