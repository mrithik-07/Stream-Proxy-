addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const targetUrl = url.searchParams.get('url')
  const referer = url.searchParams.get('referer')

  if (!targetUrl) {
    return new Response('Missing URL', { status: 400 })
  }

  const newHeaders = new Headers(request.headers)
  if (referer) {
    newHeaders.set('Referer', referer)
  }
  newHeaders.set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)')

  const response = await fetch(targetUrl, {
    method: request.method,
    headers: newHeaders,
    body: request.body
  })

  return response
}
