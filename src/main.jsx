import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AddPost, AllPosts, EditPost, Home, Login, Post, Signup } from "./pages"
import { AuthLayout } from './components/index.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/login',
        element: (<AuthLayout authenticated={false}> <Login/> </AuthLayout>)
      },
      {
        path: "/signup",
        element: (<AuthLayout authenticated={false}> <Signup/> </AuthLayout>)
      },
      {
        path: "/all-posts",
        element: (<AuthLayout authenticated={true}> <AllPosts/> </AuthLayout>)
      },
      {
        path: "/add-post",
        element: (<AuthLayout authenticated={true}> <AddPost/> </AuthLayout>)
      },
      {
        path: "/edit-post/:slug",
        element: (<AuthLayout authenticated={true}> <EditPost/> </AuthLayout>)
      },
      {
        path: "/post/:slug",
        element: (<AuthLayout authenticated={true}> <Post/> </AuthLayout>)
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>,
)
