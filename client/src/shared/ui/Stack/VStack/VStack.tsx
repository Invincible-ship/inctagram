import { Flex, FlexProps } from '../Flex/Flex'
import { FC } from 'react'

type VStackProps = Omit<FlexProps, 'direction'>

export const VStack: FC<VStackProps> = ({ align = 'start', ...rest }) => {
  return <Flex direction="column" align={align} {...rest} />
}
