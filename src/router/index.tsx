import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import ExperiencePage from '../pages/ExperiencePage';
import ContactPage from '../pages/ContactPage';
import ResumePage from '../pages/ResumePage.tsx';
import { ROUTES } from './routes';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTES.ABOUT,
        element: <AboutPage />,
      },
      {
        path: ROUTES.EXPERIENCE,
        element: <ExperiencePage />,
      },
      {
        path: ROUTES.CONTACT,
        element: <ContactPage />,
      },
      {
        path: ROUTES.RESUME,
        element: <ResumePage />,
      },
    ],
  },
]);
