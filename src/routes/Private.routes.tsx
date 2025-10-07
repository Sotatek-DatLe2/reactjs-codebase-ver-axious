import React, { Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { Flex } from 'antd'
import styled from 'styled-components'
import { Routes_URL } from 'src/routes/constants.routes'
import Loading from 'src/components/loading'
import Home from 'src/pages/home'

const RoutesContainerStyled = styled(Flex)`
  overflow: hidden;
  height: 100vh;
`

const RoutesStyled = styled(Flex)`
  padding: 24px 16px 24px 0;
`

export default function PrivateRoutes() {
  const routes = [
    {
      path: Routes_URL.customerPage,
      component: <Home />,
    },
  ]

  return (
    <RoutesContainerStyled vertical={false}>
      <Suspense fallback={<Loading />}>
        <RoutesStyled>
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={route.component} />
            ))}
          </Routes>
        </RoutesStyled>
      </Suspense>
    </RoutesContainerStyled>
  )
}
