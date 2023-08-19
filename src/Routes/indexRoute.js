import express from 'express'
import authRoutes from './authRoute.js';

const routes = express.Router()

routes.use('/api/auth', authRoutes)

export default routes