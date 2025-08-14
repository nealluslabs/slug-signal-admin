import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';

import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import HomePage from './pages/HomePage';

import RegisterPage from './pages/RegisterPage';

import LoginPageAthlete from './pages/LoginPageAthlete';

import LogoutPage from './pages/LogoutPage';

import DepositsPage from './pages/DepositsPage';
import MyNetworkPage from './pages/MyNetworkPage';
import MyAccountPage from './pages/MyAccountPage';
import DashboardPage from './pages/DashboardPage';
import DashboardClonePage from './pages/DashboardClonePage';
import MessagePage from './pages/MessagePage';
import StrategyCallPage from './pages/StrategyCallPage';
import MusicCatalogPage from './pages/MusicCatalogPage';
import TryAudioVybezPage from './pages/TryAudiovybezPage';
import MusicalBioPage from './pages/MusicalBioPage';
import EditPublicPage from './pages/EditPublicPage';
import PlaylistViewPage from './pages/PlaylistViewPage';
import UsersPage from './pages/usersPage';
import UserDetailPage from './pages/userDetailsPage';
import TrendDetailsPage from './pages/TrendDetailsPage';
import MySignalsPage from './pages/MySignalsPage';
import CreateSignalsPage from './pages/CreateSignalsPage';
import UpdateSignalsPage from './pages/UpdateSignalsPage';
import SlugDash from './pages/SlugDash';
import CampaignAnalysisPage from './pages/CampaignAnalysisPage';

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/" />, index: true },
        { path: 'home', element: <HomePage /> },

       
        
      ],
    },
    {
      path: 'login',
      index: true, 
      element: <LoginPage />,
    },
   
    {
      path: 'home',
      index: true, 
      element: <DashboardPage />,
    },
    {
      path: 'all-signals',
      index: true, 
      element: <DashboardClonePage />,
    },
     {
      path: 'campaign-analysis',
      index: true, 
      element: <CampaignAnalysisPage />,
    },
    {
      path: 'logout',
      element: <LogoutPage />,
    },
    {
      path: 'login-athlete',
      element: <LoginPageAthlete />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
    {
      path: '/',
      
      element: <DashboardPage />,
    },

    {
      path: '/my-signals',
      
      element: <MySignalsPage />,
    },
    
    {
      path: '/users',
      
      element: <UsersPage />,
    },
    {
      path: '/create-signal',
      
      element: <CreateSignalsPage />,
    },
    {
      path: '/update-signal',
      
      element: <UpdateSignalsPage />,
    },

    
    {
      path: '/users/details',
      
      element: <UserDetailPage />,
    },
    {
      path: '/home/details',
      
      element: <TrendDetailsPage />,
    },
    {
      path: '/home/details/:type',
      
      element: <TrendDetailsPage />,
    },
    {
      path: '/dash',
      
      element: <SlugDash />,
    },
    {
      path: '/playlistview',
      
      element: <PlaylistViewPage />,
      children: [
        {path: ':playlistId',  element: <PlaylistViewPage /> }
      ]
    },
    {
      path: '/network',
      index: true, 
      element: <MyNetworkPage />,
    },
    {
      path: '/message',
      index: true, 
      element: <MessagePage />,
    },
    {
      path: '/strategy',
      index: true, 
      element: <StrategyCallPage />,
    },
    {
      path: '/music-catalog',
      index: true, 
      element: <MusicCatalogPage />,
    },
    {
      path: '/my-account',
      index: true, 
      element: <MyAccountPage />,
    },
    {
      path: '/try-audiovybez',
      index: true, 
      element: <TryAudioVybezPage />,
    },
    {
      path: '/musical-bio',
      index: true, 
      element: <MusicalBioPage />,
    },
    {
      path: '/edit-public',
      index: true, 
      element: <EditPublicPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />,element: <LoginPage />,index:true  },
        { element: <Navigate to="/home" />,element: <DashboardPage />},
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
