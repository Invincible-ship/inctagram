import Close from '@/shared/assets/icons/close.svg'
import Image from 'next/image'

export const CloseIcon = () => {
	return (
		<div data-testid='test'>
			{/*<Close />*/}
			<span> <Image src={'https://www.svgrepo.com/show/513953/alt-battery-0.svg'} alt="picture" width={50} height={50} /> </span>
			{/*<img src="./../../../../../../public/svg/close.svg" alt="close" />*/}
			{/*<Close />*/}
		</div>
	)
}