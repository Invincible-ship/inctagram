import { ReactNode } from 'react'
import { render } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18nForTests from '@/shared/config/i18n/i18nForTests'
import { StateSchema, StoreProvider } from '@/providers/StoreProvider'

export interface componentRenderOptions {
  initialState?: DeepPartial<StateSchema>
}

interface TestProviderProps {
  children: ReactNode
  options?: componentRenderOptions
}

export const TestProvider = (props: TestProviderProps) => {
  const { children, options = {} } = props
  const { initialState } = options

  return (
    <StoreProvider initialState={initialState}>
      <I18nextProvider i18n={i18nForTests}>
        <div className="app">{children}</div>
      </I18nextProvider>
    </StoreProvider>
  )
}

export function componentRender(component: ReactNode, options: componentRenderOptions = {}) {
  return render(<TestProvider options={options}>{component}</TestProvider>)
}
