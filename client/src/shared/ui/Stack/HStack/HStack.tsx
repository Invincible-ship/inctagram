import { Flex, FlexProps } from '../Flex/Flex'
import { FC, forwardRef } from 'react'

type HStackProps = Omit<FlexProps, 'direction' | 'ref'>

export const HStack = forwardRef<HTMLDivElement, HStackProps>(
  ({ align = 'start', ...rest }, ref) => {
    return <Flex ref={ref} direction="row" align={align} {...rest} />
  },
)

HStack.displayName = 'HStack'
