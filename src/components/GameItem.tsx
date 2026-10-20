import type { Game } from '../interfaces/Game'

interface GameItemProps {
  game: Game
  onViewDetails: (game: Game) => void
}

function formatReleaseDate(date: string | null) {
  if (!date) return 'Por anunciar'

  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`))
}

function GameItem({ game, onViewDetails }: GameItemProps) {
  return (
    <article className="game-card">
      <div className="game-card__image-wrap">
        {game.image ? (
          <img alt={game.name} className="game-card__image" loading="lazy" src={game.image} />
        ) : (
          <div aria-label="Imagen no disponible" className="game-card__image-fallback" role="img">
            <span>GAME<br />EXPLORER</span>
          </div>
        )}
        <span className="game-card__price">{game.price}</span>
        <span className="game-card__platform">PC</span>
      </div>

      <div className="game-card__body">
        <div className="game-card__meta">
          <span className="game-card__rating"><span aria-hidden="true">★</span> {game.rating.toFixed(1)}</span>
          <span className="game-card__release">{formatReleaseDate(game.released)}</span>
        </div>
        <h2 className="game-card__title" title={game.name}>{game.name}</h2>
        <button className="details-button" onClick={() => onViewDetails(game)} type="button">
          Ver detalles <span aria-hidden="true">↗</span>
        </button>
      </div>
    </article>
  )
}

export default GameItem