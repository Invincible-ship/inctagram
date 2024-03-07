'use server'

import { revalidateTag } from 'next/cache'

export async function revalidateDataByTag(tag: string, delay: number = 2000) {
  revalidateTag(tag)
}
