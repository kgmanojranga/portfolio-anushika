import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../router/routes';
import Container from '../common/Container';

const navLinks = [
  { to: ROUTES.HOME, label: 'Home' },
  { to: ROUTES.ABOUT, label: 'About' },
  { to: ROUTES.EXPERIENCE, label: 'Experience' },
  { to: ROUTES.CONTACT, label: 'Contact' },
  { to: ROUTES.RESUME, label: 'Resume' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-black border-b border-neutral-800 shadow-sm">
      <Container className="h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo / Avatar */}
          <Link
            to={ROUTES.HOME}
            onClick={closeMenu}
            className="flex items-center gap-3 group"
            aria-label="Go to home"
          >
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-semibold tracking-wide select-none">
                AN
              </span>
            </div>
            <span className="hidden sm:block text-sm font-semibold text-white tracking-tight group-hover:opacity-70 transition-opacity">
              Anushika Nayomi
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(to)
                      ? 'bg-blue-600 text-white'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-neutral-800 bg-black">
          <Container>
            <ul className="py-2">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    onClick={closeMenu}
                    className={`flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                      isActive(to)
                        ? 'bg-blue-600 text-white'
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
