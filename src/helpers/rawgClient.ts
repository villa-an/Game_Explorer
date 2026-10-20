const RAWG_API_BASE = 'https://api.rawg.io/api'

export async function fetchRawg<T>(
  endpoint: string,
  signal?: AbortSignal,
): Promise<T> {
  const apiKey = import.meta.env.VITE_RAWG_API_KEY

  if (!apiKey) {
    throw new Error(
      'Falta la API key de RAWG. Crea un archivo .env con VITE_RAWG_API_KEY y reinicia Vite.',
    )
  }

  const url = new URL(`${RAWG_API_BASE}${endpoint}`)
  url.searchParams.set('key', apiKey)

  const response = await fetch(url, { signal })

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error('RAWG rechazó la API key. Comprueba que sea válida.')
    }

    if (response.status === 429) {
      throw new Error('Se alcanzó el límite de consultas de RAWG. Inténtalo más tarde.')
    }

    throw new Error(`No se pudieron cargar los juegos (error ${response.status}).`)
  }

  return (await response.json()) as T
}