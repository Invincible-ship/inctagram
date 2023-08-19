import { fileURLToPath } from 'url'
import { dirname } from 'path'

export const fileDirName = (meta: { url: string }) => {
  const __filename = fileURLToPath(meta.url)

  const __dirname = dirname(__filename)

  return { __dirname, __filename }
}
