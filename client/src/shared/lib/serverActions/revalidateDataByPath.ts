'use server'

import { revalidatePath } from 'next/cache'

export async function revalidateDataByPath(path: string, delay: number = 2000) {
  revalidatePath(path)
}
