import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './Header.css'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
    const SHOW_AUTH_BUTTONS = false; // Cambia a true cuando quieras mostrar
  const { user, logout } = useAuth()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleLogout = async () => {
    try {
      await logout()
      closeMenu()
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <Link to="/" className="logo" onClick={closeMenu}>
            <span className="logo-text">Portfolio</span>
          </Link>

          <button
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li>
              <Link
                to="/"
                className={isActive('/')}
                onClick={closeMenu}
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={isActive('/about')}
                onClick={closeMenu}
              >
                Sobre Mí
              </Link>
            </li>
            <li>
              <Link
                to="/projects"
                className={isActive('/projects')}
                onClick={closeMenu}
              >
                Proyectos
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className={isActive('/blog')}
                onClick={closeMenu}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/games"
                className={isActive('/games')}
                onClick={closeMenu}
              >
                 Juegos
              </Link>
            </li>
            
            {/* Auth buttons */}
              {SHOW_AUTH_BUTTONS && (
                user ? (
                  <>
                    <li>
                      <Link
                        to="/my-courses"
                        className={`${isActive('/my-courses')} btn-header`}
                        onClick={closeMenu}
                      >
                        Mis Cursos
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="btn-header btn-logout"
                      >
                        Salir
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        to="/login"
                        className="btn-header btn-login"
                        onClick={closeMenu}
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/signup"
                        className="btn-header btn-signup"
                        onClick={closeMenu}
                      >
                        Signup
                      </Link>
                    </li>
                  </>
                )
              )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
