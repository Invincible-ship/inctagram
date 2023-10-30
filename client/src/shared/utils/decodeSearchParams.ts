export const decodeSearchParams = (path: any) => {
  return JSON.parse(decodeURI(path))
}
