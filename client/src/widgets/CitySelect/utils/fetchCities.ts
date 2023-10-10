import axios from 'axios'

export const fetchCities = async (cityValue: string): Promise<string[] | [] | undefined> => {
  try {
    const citiesParams = new URLSearchParams({
      input: cityValue,
      types: '(cities)',
      key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    })

    const citiesResponse = await axios.get(
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_AUTOCOMPLETE_URL as string,
      {
        params: citiesParams,
      },
    )

    return citiesResponse?.data?.predictions
      ? citiesResponse.data.predictions.map((citiesInfo: any) => citiesInfo?.description)
      : []
  } catch (err) {
    if (err instanceof Error) {
      console.warn(err)
    }
  }
}
