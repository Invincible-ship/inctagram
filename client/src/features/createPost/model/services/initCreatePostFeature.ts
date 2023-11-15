import { setNextStep, setPreviousStep } from '../slice/createPostSlice'
import { getAllSteps } from '../selectors/getAllSteps'
import { ThunkConfig } from '@/providers/StoreProvider'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const initCreatePostFeature = createAsyncThunk<void, void, ThunkConfig<string>>(
  'createPost/initCreatePostFeature',
  (_, { getState, dispatch }) => {
    const { previousStep, nextStep } = getAllSteps(getState())
    dispatch(setPreviousStep(previousStep))
    dispatch(setNextStep(nextStep))
  },
)
