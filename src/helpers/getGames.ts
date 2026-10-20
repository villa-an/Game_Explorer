import type { Game } from '../interfaces/Game'
import { fetchRawg } from './rawgClient'

interface RawgGame {
  id: number
  name: string
  background_image: string | null
  rating: number
  released: string | null
}

interface RawgGameList {
  results: RawgGame[]
}

const MOCK_PRICES = ['$19.99', '$39.99', '$59.99']

export async function getGames(
  searchTerm = '',
  signal?: AbortSignal,
): Promise<Game[]> {
  const params = new URLSearchParams({ platforms: '4', page_size: '12' })
  const normalizedSearch = searchTerm.trim()

  if (normalizedSearch) {
    params.set('search', normalizedSearch)
  } else {
    params.set('ordering', '-rating')
  }

  const data = await fetchRawg<RawgGameList>(`/games?${params.toString()}`, signal)

  return data.results.map((game) => ({
    id: game.id,
    name: game.name,
    image: game.background_image,
    rating: game.rating,
    released: game.released,
    // A stable mock price keeps the sample catalog consistent between renders.
    price: MOCK_PRICES[game.id % MOCK_PRICES.length],
  }))
}