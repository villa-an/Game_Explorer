import { useEffect, useRef, useState } from 'react'
import AddGame from './components/AddGame'
import GameGrid from './components/GameGrid'
import GameModal from './components/GameModal'
import { getGameDetails } from './helpers/getGameDetails'
import { getGames } from './helpers/getGames'
import type { Game } from './interfaces/Game'

function GameSearchApp() {
  const [searchInput, setSearchInput] = useState('')
  const [activeQuery, setActiveQuery] = useState('')
  const [games, setGames] = useState<Game[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)
  const [isLoadingDetails, setIsLoadingDetails] = useState(false)
  const [detailsError, setDetailsError] = useState<string | null>(null)
  const detailsController = useRef<AbortController | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadGames() {
      setIsLoading(true)
      setError(null)

      try {
        const results = await getGames(activeQuery, controller.signal)
        setGames(results)
      } catch (caughtError) {
        if (caughtError instanceof Error && caughtError.name === 'AbortError') return
        setGames([])
        setError(caughtError instanceof Error ? caughtError.message : 'Ocurrió un error inesperado.')
      } finally {
        if (!controller.signal.aborted) setIsLoading(false)
      }
    }

    void loadGames()
    return () => controller.abort()
  }, [activeQuery])

  useEffect(() => () => detailsController.current?.abort(), [])

  function handleSearch(query: string) {
    setActiveQuery(query.trim())
  }

  async function handleViewDetails(game: Game) {
    detailsController.current?.abort()
    const controller = new AbortController()
    detailsController.current = controller
    setSelectedGame(game)
    setIsLoadingDetails(true)
    setDetailsError(null)

    try {
      const details = await getGameDetails(game, controller.signal)
      if (!controller.signal.aborted) setSelectedGame(details)
    } catch (caughtError) {
      if (caughtError instanceof Error && caughtError.name === 'AbortError') return
      setDetailsError(caughtError instanceof Error ? caughtError.message : 'No se pudieron cargar los detalles.')
    } finally {
      if (!controller.signal.aborted) setIsLoadingDetails(false)
    }
  }

  function handleCloseDetails() {
    detailsController.current?.abort()
    detailsController.current = null
    setSelectedGame(null)
  }

  return (
    <main className="app-shell">
      <div className="ambient ambient--one" aria-hidden="true" />
      <div className="ambient ambient--two" aria-hidden="true" />

      <header className="site-header">
        <a aria-label="Game Explorer, inicio" className="wordmark" href="#top">
          <span className="wordmark__icon">G<span>+</span></span>
          <span>GAME<span className="wordmark__light">EXPLORER</span></span>
        </a>
        <span className="header-note"><i /> CATÁLOGO PARA PC</span>
      </header>

      <section className="hero" id="top">
        <div className="hero__copy">
          <p className="eyebrow"><span>01</span> DESCUBRIMIENTO DE JUEGOS</p>
          <h1>🎮 Game <span>Explorer</span></h1>
          <p className="hero__description">Encuentra mundos nuevos. Busca tu próxima aventura entre miles de juegos para PC.</p>
        </div>
        <div aria-hidden="true" className="hero-stamp">
          <span>PRESS</span><strong>START</strong><i>↘</i>
        </div>
        <AddGame disabled={isLoading} onChange={setSearchInput} onSearch={handleSearch} value={searchInput} />
        <div className="hero__hint"><span>↳</span> Una búsqueda. Miles de mundos.</div>
      </section>

      <section aria-live="polite" className="catalog">
        <div className="catalog__heading">
          <div>
            <p className="eyebrow">{activeQuery ? 'RESULTADOS DE BÚSQUEDA' : 'SELECCIÓN DEL CATÁLOGO'}</p>
            <h2>{activeQuery ? <>Resultados para <span>“{activeQuery}”</span></> : <>Juegos para <span>descubrir</span></>}</h2>
          </div>
          {!isLoading && !error && games.length > 0 && <span className="result-count">{games.length} JUEGOS</span>}
        </div>

        {isLoading ? (
          <div className="loading-state" role="status">
            <span className="loader" />
            <p>Buscando nuevas aventuras<span className="loading-dots">...</span></p>
          </div>
        ) : error ? (
          <div className="message-state message-state--error" role="alert">
            <span className="message-state__symbol">!</span>
            <div><h3>No pudimos conectar con RAWG</h3><p>{error}</p></div>
          </div>
        ) : games.length === 0 ? (
          <div className="message-state" role="status">
            <span className="message-state__symbol">⌕</span>
            <div><h3>No encontramos resultados</h3><p>Prueba con otro nombre y explora nuevas posibilidades.</p></div>
          </div>
        ) : (
          <GameGrid games={games} onViewDetails={handleViewDetails} />
        )}
      </section>

      <footer className="site-footer">
        <span>GAME EXPLORER <i>·</i> POWERED BY RAWG</span>
        <span>PRECIOS ESTIMADOS CON FINES ILUSTRATIVOS</span>
      </footer>

      {selectedGame && (
        <GameModal
          error={detailsError}
          game={selectedGame}
          loading={isLoadingDetails}
          onClose={handleCloseDetails}
        />
      )}
    </main>
  )
}

export default GameSearchApp