'use server'

import { revalidatePath } from 'next/cache'

export async function revalidateDataByPath(path: string) {
  revalidatePath(path)
}
