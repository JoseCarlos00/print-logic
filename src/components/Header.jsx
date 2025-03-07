import { Link } from "react-router-dom"

function Header() {
  return (
      <header className="d-print-none">
        <nav>
          <ul>
            <li>
              <Link to="/" >Home</Link>
            </li>

            <li>
              <Link to="/trabajosActivos">Trabajos Activos</Link>
            </li>
          </ul>
        </nav>
      </header>
  )
}

export default Header
