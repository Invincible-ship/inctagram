import stringify from 'fast-json-stable-stringify'

export const encodeSearchParams = (params: any): any => {
  const json = stringify(params)
  return encodeURI(json)
}
