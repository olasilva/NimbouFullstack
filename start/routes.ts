// start/routes.ts
import Route from '@ioc:Adonis/Core/Route'

Route.post('/chat', 'ChatController.handleMessage')

Route.group(() => {
  Route.get('/content', 'ContentController.index')
  Route.post('/content', 'ContentController.store')
  Route.put('/content/:id', 'ContentController.update')
  Route.delete('/content/:id', 'ContentController.destroy')
}).prefix('/api')