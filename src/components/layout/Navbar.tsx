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
    <>
      <nav
        className="fixed inset-x-0 top-0 z-50 bg-black border-b border-neutral-800 shadow-sm"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
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
            <ul className="hidden md:flex items-center gap-2">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all border border-white/20 ${
                      isActive(to)
                        ? 'bg-blue-600 text-white'
                        : 'text-neutral-400 hover:text-white hover:border-blue-600 hover:shadow-[0_0_12px_rgba(37,99,235,0.4)]'
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
      </nav>

      {/* Mobile menu — outside <nav> so shadow + rounded corners aren't clipped */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-x-3 z-40 bg-neutral-900 border border-neutral-700 rounded-b-2xl shadow-[0_12px_32px_0_rgb(0,0,0/0.7)]"
          style={{ top: 'calc(env(safe-area-inset-top) + 4rem)' }}
        >
          <ul className="py-2 pb-4 px-2">
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
        </div>
      )}
    </>
  );
};

export default Navbar;
