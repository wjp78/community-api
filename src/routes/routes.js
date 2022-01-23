import combineRoutes from 'koa-combine-routers'

import publicRouter from './publicRouter'
import loginRouter from './loginRouter'

const routers = combineRoutes(
  publicRouter,
  loginRouter
)

export default routers
