export const getCookie = (key: string): string => {
  var b = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)')
  return (b ? b.pop() : '') as string
}
