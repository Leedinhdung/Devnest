import { adminRoutes, authRoutes } from '@/constants/routesContant'
import { AdminLayout } from '@/layouts/admin/AdminLayout'
import AuthLayout from '@/layouts/admin/AuthLayout'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {
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

        </Routes>
        <Routes>
          {
            adminRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={
                <AdminLayout>
                  <route.element />
                </AdminLayout>
              } />
            ))
          }

        </Routes>
      </div>
    </BrowserRouter >
  )
}

export default App