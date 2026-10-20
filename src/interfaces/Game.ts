export interface Game {
  id: number
  name: string
  image: string | null
  rating: number
  released: string | null
  price: string
  description?: string
  genres?: string[]
  platforms?: string[]
}