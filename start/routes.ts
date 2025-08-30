/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import Invitados from '#models/invite'

router.on('/').render('main')

router.get('/:id', async ({ view, params }) => {
  console.log(params)
  const invite = await Invitados.find(params.id);
  return view.render('main', { id: params.id, invite: invite });
})


router.post('/confirm', async ({ request }) => {
  const data = request.body() // Access JSON payload
  const { id } = data
  console.log(`actualizando inviter ${id}`)
  const invite = await Invitados.find(id);
  if (!invite) {
    return 'notfound'
  }
  invite.confirmado = 1;
  await invite.save();
  return 'ok';
})
