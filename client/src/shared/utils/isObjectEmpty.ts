export const isObjectEmpty = <T extends {} = {}>(objectName: Record<keyof T, T[keyof T]>) => {
  return objectName && Object.keys(objectName).length === 0 && objectName.constructor === Object
}
