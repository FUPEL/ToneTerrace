import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Index from "./pages/Index"
import Music from "./pages/Music"
import MainAppLayout from "./layouts/MainAppLayout"
import Playlist from "./pages/Playlist"
import LoginPage from "./pages/LoginPage"
import SocialPage from "./pages/SocialPage"
import ProfilePage from "./pages/ProfilePage"
import SettingPage from "./pages/SettingPage"
import RegisterPage from "./pages/RegisterPage"
import MyProfilePage from "./pages/MyProfilePage"
import NowPlaying from "./pages/NowPlaying"
import ChatPage from "./pages/ChatPage"

const router = createBrowserRouter([
  {
    path: 'login',
    element: <LoginPage />
  },
  {
    path: 'register',
    element: <RegisterPage />
  },
  {
    path: 'chat',
    element: <ChatPage />
  },
  {
    path: '',
    element: <MainAppLayout />,
    children: [
      {
        path: '',
        element: <Index />,
      },
      {
        path: 'playlist/:id/:index',
        element: <Music />
      },
      {
        path:'playlist/:id',
        element: <Playlist />
      },
      {
        path: 'social',
        element: <SocialPage />
      },
      {
        path: 'profile/:id',
        element: <ProfilePage />
      },
      {
        path: 'my-profile',
        element: <MyProfilePage />
      },
      {
        path: 'setting',
        element: <SettingPage />
      },
      {
        path: 'current-playing',
        element: <NowPlaying />
      }
    ]
  },
])

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
