import type { Game } from '../interfaces/Game'
import GameItem from './GameItem'

interface GameGridProps {
  games: Game[]
  onViewDetails: (game: Game) => void
}

function GameGrid({ games, onViewDetails }: GameGridProps) {
  return (
    <div className="game-grid">
      {games.map((game, index) => (
        <div className="game-grid__item" key={game.id} style={{ animationDelay: `${index * 45}ms` }}>
          <GameItem game={game} onViewDetails={onViewDetails} />
        </div>
      ))}
    </div>
  )
}

export default GameGrid