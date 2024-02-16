'use server'

import { revalidatePath } from 'next/cache'

export default async function revalidateDataByPath(path: string) {
  revalidatePath(path)
}
