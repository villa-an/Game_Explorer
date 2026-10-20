import type { FormEvent } from 'react'

interface AddGameProps {
  value: string
  onChange: (value: string) => void
  onSearch: (query: string) => void
  disabled?: boolean
}

function AddGame({ value, onChange, onSearch, disabled = false }: AddGameProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSearch(value)
  }

  return (
    <form className="search-form" onSubmit={handleSubmit} role="search">
      <label className="sr-only" htmlFor="game-search">
        Buscar videojuegos para PC
      </label>
      <span aria-hidden="true" className="search-icon">⌕</span>
      <input
        autoComplete="off"
        disabled={disabled}
        id="game-search"
        onChange={(event) => onChange(event.target.value)}
        placeholder="Busca tu videojuego favorito..."
        type="search"
        value={value}
      />
      <button className="search-button" disabled={disabled} type="submit">
        Explorar <span aria-hidden="true">↗</span>
      </button>
    </form>
  )
}

export default AddGame