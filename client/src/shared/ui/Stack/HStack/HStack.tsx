import { Flex, FlexProps } from '../Flex/Flex'
import { FC } from 'react'

type HStackProps = Omit<FlexProps, 'direction'>

export const HStack: FC<HStackProps> = ({ align = 'start', ...rest }) => {
  return <Flex direction="row" align={align} {...rest} />
}
