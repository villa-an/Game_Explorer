import { useEffect } from 'react'
import type { Game } from '../interfaces/Game'

interface GameModalProps {
  game: Game
  loading: boolean
  error: string | null
  onClose: () => void
}

function formatReleaseDate(date: string | null) {
  if (!date) return 'Por anunciar'

  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`))
}

function GameModal({ game, loading, error, onClose }: GameModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.classList.add('modal-open')

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('modal-open')
    }
  }, [onClose])

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <section
        aria-labelledby="game-modal-title"
        aria-modal="true"
        className="game-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <button aria-label="Cerrar detalles" className="modal-close" onClick={onClose} type="button">×</button>
        <div className="game-modal__visual">
          {game.image && <img alt="" className="game-modal__image" src={game.image} />}
          <div className="game-modal__image-shade" />
          <span className="game-modal__eyebrow">FICHA DEL JUEGO</span>
          <h2 id="game-modal-title">{game.name}</h2>
        </div>

        <div className="game-modal__content">
          <div className="game-modal__stats">
            <div><span>VALORACIÓN</span><strong><i aria-hidden="true">★</i> {game.rating.toFixed(1)}</strong></div>
            <div><span>LANZAMIENTO</span><strong>{formatReleaseDate(game.released)}</strong></div>
            <div><span>PRECIO ESTIMADO</span><strong>{game.price}</strong></div>
          </div>

          {loading ? (
            <p className="modal-status"><span className="mini-spinner" /> Cargando ficha completa...</p>
          ) : error ? (
            <p className="modal-error" role="alert">{error}</p>
          ) : (
            <>
              <div className="game-modal__section">
                <h3>Acerca del juego</h3>
                <p>{game.description || 'Cargando descripción...'}</p>
              </div>
              <div className="game-modal__columns">
                <div className="game-modal__section">
                  <h3>Géneros</h3>
                  <div className="tag-list">
                    {game.genres?.length ? game.genres.map((genre) => <span key={genre}>{genre}</span>) : <span>Sin datos</span>}
                  </div>
                </div>
                <div className="game-modal__section">
                  <h3>Plataformas</h3>
                  <div className="tag-list tag-list--platforms">
                    {game.platforms?.length ? game.platforms.map((platform) => <span key={platform}>{platform}</span>) : <span>Sin datos</span>}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default GameModal