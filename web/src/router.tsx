import { createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import { DashboardPage } from './pages/DashboardPage';
import { ScanDetailPage } from './pages/ScanDetailPage';
import { SettingsPage } from './pages/SettingsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'scans/:id', element: <ScanDetailPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
]);
