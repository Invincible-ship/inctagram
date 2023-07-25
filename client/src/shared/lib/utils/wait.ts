export const wait = async (ms: number) => (
  await new Promise((res) => setTimeout(res, ms))
)