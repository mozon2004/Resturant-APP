
const routes = (app)=>{
  app.use('/auth',require('./auth'))
  app.use('/user',require('./user'))
  app.use('/restaurant',require('./restaurant'))
  app.use('/category',require('./category'))
  app.use('/food',require('./food')) 
}

module.exports = routes
