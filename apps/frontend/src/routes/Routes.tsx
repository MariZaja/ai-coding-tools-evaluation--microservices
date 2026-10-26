import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { UserPage } from '../pages/user.page';
import LoginPage from '../pages/login.page';
import SignUpPage from '../pages/signup.page';
import HomePage from '../pages/home.page';
import { GardenPage } from '../pages/garden.page';
import { SpeciesPage } from '../pages/species.page';
import ProtectedRoute from './ProtectedRoute';
import SpeciesDetailsPage from '../pages/species.details.page';
import PlantPage from 'src/pages/plant.page';
import CalendarPage from 'src/pages/calendar.page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignUpPage /> },
      {
        path: 'user',
        element: (
          <ProtectedRoute>
            <UserPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'garden/:id/:name',
        element: (
          <ProtectedRoute>
            <GardenPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'species',
        element: (
          <ProtectedRoute>
            <SpeciesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'species/:id',
        element: (
          <ProtectedRoute>
            <SpeciesDetailsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'garden/:gardenId/plant/:plantId',
        element: (
          <ProtectedRoute>
            <PlantPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'calendar',
        element: (
          <ProtectedRoute>
            <CalendarPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
