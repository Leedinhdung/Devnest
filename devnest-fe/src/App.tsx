import { adminRoutes, authRoutes, clientRoutes } from '@/constants/routesContant'
import { useAuth } from '@/context/AuthContext'
import { AdminLayout } from '@/layouts/admin/AdminLayout'
import AuthLayout from '@/layouts/admin/AuthLayout'
import ClientLayout from '@/layouts/client/ClientLayout'
import routes from '@/routes/routes'

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

const App = () => {
  const { user } = useAuth()
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          {
            authRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={
                <AuthLayout>
                  <route.element />
                </AuthLayout>
              } />
            ))
          }
          {clientRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <ClientLayout>
                  <route.element />
                </ClientLayout>
              }
            />
          ))}

          {
            adminRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={
                user?.role == 'admin' ?
                  (
                    <AdminLayout>
                      <route.element />
                    </AdminLayout>
                  ) : (
                    <Navigate to={routes.home} />
                  )
              } />
            ))
          }

        </Routes>
      </div>
    </BrowserRouter >
  )
}

export default App