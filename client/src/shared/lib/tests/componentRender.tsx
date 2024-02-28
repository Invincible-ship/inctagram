import { ReactNode } from 'react'
import { RenderOptions, render } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18nForTests from '@/shared/config/i18n/i18nForTests'
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider'
import { createReduxStore } from '@/app/providers/StoreProvider/config/store'
import { LanguageProvider } from '@/app/providers/LanguageProvider/LanguageProvider'
import { LanguageIds } from '@/shared/config/i18n/types'

type ProviderOptions = {
  initialState?: DeepPartial<StateSchema>
  initialStore?: ReturnType<typeof createReduxStore>
}

export type RenderComponentOptions = ProviderOptions & {
  renderOptions?: RenderOptions
}

type TestProviderProps = {
  options: ProviderOptions
  children: ReactNode
}

export const TestProvider = (props: TestProviderProps) => {
  const { children, options = {} } = props
  const { initialState, initialStore } = options

  return (
    <StoreProvider initialStore={initialStore} initialState={initialState}>
      <I18nextProvider i18n={i18nForTests}>
        <LanguageProvider lngId={LanguageIds.EN}>
          <div className="app">{children}</div>
        </LanguageProvider>
      </I18nextProvider>
    </StoreProvider>
  )
}

export function componentRender(component: ReactNode, options: RenderComponentOptions = {}) {
  const { renderOptions = {}, ...rest } = options

  return render(<TestProvider options={rest}>{component}</TestProvider>, renderOptions)
}
