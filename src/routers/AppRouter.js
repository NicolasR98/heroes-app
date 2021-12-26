import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Hero } from '../components/heroes/HeroScreen'
import { LoginScreen } from '../components/login/LoginScreen'
import { DashboardRoutes } from './DashboardRoutes'

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<LoginScreen />} />
                <Route path='/hero' element={<Hero />} />
                <Route path='*' element={<DashboardRoutes />} />
            </Routes>
        </BrowserRouter>
    )
}
