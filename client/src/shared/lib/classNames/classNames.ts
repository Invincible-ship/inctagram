export const classNames = (
  cls: string,
  mods: Record<string, boolean> = {},
  additional: string[] = []
): string => {
  return [
    cls,
    ...additional.filter(Boolean),
    ...Object.keys(mods).filter(key => Boolean(mods[key]))
  ].join(' ')
}