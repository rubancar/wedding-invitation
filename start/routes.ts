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

router.get('/:id', async ({ view, params, request }) => {
  console.log(params)
  const userAgent = request.header('user-agent')
  let foundUserAgent = 'default'
  if (userAgent?.includes('iPhone') || userAgent?.includes('iPad')) {
    foundUserAgent = 'ios'
  } else if (userAgent?.includes('Android')) {
    foundUserAgent = 'android'
  } else if (userAgent?.includes('Windows') || userAgent?.includes('Linux')) {
    foundUserAgent = 'desktop'
  }
  console.log(foundUserAgent)
  const invite = await Invitados.find(params.id)
  console.log(invite?.nombre)
  return view.render('main', { id: params.id, invite: invite, selected_os: foundUserAgent })
})

router.post('/confirm', async ({ request }) => {
  const data = request.body() // Access JSON payload
  const { id } = data
  console.log(`actualizando inviter ${id}`)
  const invite = await Invitados.find(id)
  if (!invite) {
    return 'notfound'
  }
  invite.confirmado = 1
  await invite.save()
  return 'ok'
})
