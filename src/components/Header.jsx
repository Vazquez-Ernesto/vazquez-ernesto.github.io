import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './Header.css'

function Header() {
  const SHOW_ACADEMY = false;
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
    const SHOW_MENTORSHIP = true; // Cambia a true para mostrar el botón de Mentorías
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
              {SHOW_MENTORSHIP && (
                <li>
                  <Link
                    to="/mentorship"
                    className={isActive('/mentorship')}
                    onClick={closeMenu}
                  >
                    Mentorías
                  </Link>
                </li>
              )}
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
            
          {/* Mostrar botones de Login/Signup solo si SHOW_AUTH_BUTTONS está en true y no hay usuario */}
          {SHOW_AUTH_BUTTONS && !user && (
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
          )}

          {/* Mostrar Mis Cursos y Salir solo si SHOW_ACADEMY está en true y hay usuario */}
          {SHOW_ACADEMY && user && (
            <>
              <li>
                <Link
                  to="/courses"
                  className={`${isActive('/courses')} btn-header`}
                  onClick={closeMenu}
                >
                  Cursos
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
          )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
