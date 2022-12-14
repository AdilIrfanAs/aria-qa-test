import { createBrowserRouter } from 'react-router-dom';

import './App.css';

import { HomePage } from './pages/HomePage';
import { SignInPage } from './pages/SignInPage';
import { CreateIssuePage } from './pages/CreateIssuePage';
import { IssuePage } from './pages/IssuePage';
import { AuthenticatedHomePage } from './pages/AuthenticatedHomePage';

export enum RoutePath {
  HOME = '/',
  CREATE_ISSUE = '/issue/new',
  ISSUE = '/issue',
}

export const router = createBrowserRouter([
  {
    path: RoutePath.HOME,
    element: <HomePage />,
  },
  {
    path: RoutePath.CREATE_ISSUE,
    element: <CreateIssuePage />,
  },
  {
    path: RoutePath.ISSUE,
    element: <IssuePage />,
  },
]);
