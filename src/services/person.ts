import { User } from "../interfaces/user"


export const fetchUserData = async (): Promise<User> => {
  const response = await fetch('https://rimac-front-end-challenge.netlify.app/api/user.json')
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }
  const data: User = await response.json()
  return data
}