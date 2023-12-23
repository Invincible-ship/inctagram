import { getMaxStep } from './getMaxStep'
import { getCurrentStep } from './getCurrentStep'
import { createSelector } from '@reduxjs/toolkit'

export const getAllSteps = createSelector(
  [getCurrentStep, getMaxStep],
  (
    currentStep,
    maxStep,
  ): { currentStep: number; maxStep: number; previousStep?: number; nextStep?: number } => {
    const previousStep = currentStep > 1 ? currentStep - 1 : undefined
    const nextStep = currentStep < maxStep ? currentStep + 1 : undefined

    return { currentStep, maxStep, previousStep, nextStep }
  },
)
