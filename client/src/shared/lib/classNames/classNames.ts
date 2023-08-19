export const classNames = (
  cls: string = '',
  mods: Record<string, boolean | undefined> = {},
  additional: (string | undefined)[] = [],
): string => {
  return [
    cls,
    ...additional.filter(Boolean),
    ...Object.keys(mods).filter(key => Boolean(mods[key])),
  ].join(' ')
}
