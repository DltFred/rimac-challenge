export interface RootObject {
  list: List[]
}
export interface List {
  name: string
  price: number
  description: string[]
  age: number
}

export const fetchPlansData = async (): Promise<RootObject> => {
  const response = await fetch('https://rimac-front-end-challenge.netlify.app/api/plans.json')
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }
  const data: RootObject = await response.json()
  return data
}