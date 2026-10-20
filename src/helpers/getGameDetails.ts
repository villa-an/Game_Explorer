import type { Game } from '../interfaces/Game'
import { fetchRawg } from './rawgClient'

interface RawgGameDetails {
  id: number
  name: string
  background_image: string | null
  rating: number
  released: string | null
  description_raw?: string
  description?: string
  genres?: Array<{ name: string }>
  platforms?: Array<{ platform: { name: string } }>
}

export async function getGameDetails(
  game: Game,
  signal?: AbortSignal,
): Promise<Game> {
  const details = await fetchRawg<RawgGameDetails>(`/games/${game.id}`, signal)

  return {
    ...game,
    name: details.name,
    image: details.background_image ?? game.image,
    rating: details.rating,
    released: details.released,
    description: details.description_raw || details.description || 'RAWG no proporcionó una descripción para este juego.',
    genres: details.genres?.map((genre) => genre.name) ?? [],
    platforms: details.platforms?.map(({ platform }) => platform.name) ?? [],
  }
}