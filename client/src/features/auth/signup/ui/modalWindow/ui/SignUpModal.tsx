"use client"
import React, { FC, useState } from 'react'
import '@/shared/styles/reset.scss'
import '@/shared/styles/variables/common/_buttons.scss'
import { Modal } from '@/shared/ui/Modal/Modal'
import { ModalWindow, ModalWindowProps } from '@/shared/ui/Modal/children/ui/ModalWindow'

export const SignUpModal: FC<ModalWindowProps> = ({ lng }) => {
	const [isOpen, setIsOpen] = useState(true);

	const onClose = () => {
		setIsOpen(!isOpen)
	}

	return <>
		<Modal onClose={onClose} isOpen={isOpen}  >
			<ModalWindow lng={lng} onClose={onClose} />
		</Modal>
	</>
}
