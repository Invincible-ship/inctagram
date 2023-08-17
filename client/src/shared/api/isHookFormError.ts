import { FieldPath, FieldValues } from 'react-hook-form'

type HookFormFields<TFieldValues extends FieldValues> =
  | `root.${string}`
  | 'root'
  | FieldPath<TFieldValues>

export type HookFormError<TFieldValues> = {
  data: {
    errors: {
      // @ts-ignore
      field: HookFormFields<TFieldValues>
      message: string
    }[]
  }
}

export function isHookFormError<TFieldValues>(err: unknown): err is HookFormError<TFieldValues> {
  return typeof err == 'object' && err != null && 'data' in err
}
