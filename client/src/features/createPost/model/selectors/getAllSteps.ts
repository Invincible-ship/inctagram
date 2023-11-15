import { getMaxStep } from './getMaxStep'
import { getCurrentStep } from './getCurrentStep'
import { StateSchema } from '@/providers/StoreProvider'

export const getAllSteps = (
  state: StateSchema,
): { currentStep: number; maxStep: number; previousStep?: number; nextStep?: number } => {
  const currentStep = getCurrentStep(state)
  const maxStep = getMaxStep(state)
  const previousStep = currentStep > 1 ? currentStep - 1 : undefined
  const nextStep = currentStep < maxStep ? currentStep + 1 : undefined

  return { currentStep, maxStep, previousStep, nextStep }
}
