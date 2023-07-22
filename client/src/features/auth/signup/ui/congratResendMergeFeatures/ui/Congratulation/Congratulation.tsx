'use client'

import { FC, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CongratulationModal } from "./CongratulationModal/CongratulationModal"
import { CongratulationUI } from "./ui/CongratulationUI"
import { congratResendMergePropsType } from "../../model/types/congratResendMergeTypes"

const emailIsConfirmed = 'success'
const emailWasUsed = 'confirm'

export const Congratulation: FC<congratResendMergePropsType> = ({ lng }) => {

  const router = useRouter();
  const search = useSearchParams()
  const [status, setStatus] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (search) {
      const queryStatus = search.get('status')
      {
        queryStatus === emailWasUsed
          ? setIsOpen(true)
          : null
      }
      { queryStatus && setStatus(queryStatus) }
    }
  }, [search])

  const goToLogin = () => {
    router.push('/login')
  }
  const onClose = () => {
    setIsOpen(!isOpen)
  }

  if (status === emailIsConfirmed) {
    return <CongratulationUI buttonAction={goToLogin} lng={lng} />
  }
  else if (status === emailWasUsed) {
    return <>
      <CongratulationUI buttonAction={goToLogin} lng={lng} />
      <CongratulationModal lng={lng} onClose={onClose} isOpen={isOpen} />
    </>
  }
}