import { ChangeEvent } from 'react'

export const handleDownloadedImage = (
  execute: (file: File) => void,
  sizeErrorCb: () => void,
): ((e: ChangeEvent<HTMLInputElement>) => void) => {
  return e => {
    const file = e?.target?.files?.[0]

    if (!file) return

    // More than 1,5 Mb: 1 Mb equal 1048576 bytes
    if (file.size > 1048576 * 1.5) {
      sizeErrorCb()
      return
    }

    execute(file)
  }
}
