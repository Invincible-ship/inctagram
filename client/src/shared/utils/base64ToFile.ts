export const base64ToFile = (base64String: string, filename: string): File => {
  const base64Data = base64String.split(';base64,').pop() as string
  const contentType = base64String.split(';')[0].split(':')[1]

  const byteCharacters = atob(base64Data)
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  const blob = new Blob(byteArrays, { type: contentType })
  const file = new File([blob], filename)

  return file
}
