import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { homePage } from './pages/home'
import { treatmentsPage, treatmentDetailPage } from './pages/treatments'
import { doctorPage } from './pages/doctor'
import { missionPage } from './pages/mission'
import { contentPage, beforeAfterPage } from './pages/content'
import { infoPage } from './pages/info'
import { privacyPage } from './pages/privacy'
import { myPage } from './pages/mypage'
import { adminPage } from './pages/admin'
import { pricingPage } from './pages/pricing'

type Bindings = {
  SOLAPI_API_KEY: string
  SOLAPI_API_SECRET: string
  SOLAPI_SENDER: string
  SMS_RECEIVER: string
  KAKAO_REST_API_KEY: string
  NAVER_CLIENT_ID: string
  NAVER_CLIENT_SECRET: string
  AUTH_SECRET: string
  ADMIN_PASSWORD: string
  MEMBERS: KVNamespace
  IMAGES: KVNamespace
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('/api/*', cors())

// ===== SOLAPI SMS HELPER =====
async function sendSMS(
  env: Bindings,
  to: string,
  text: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const apiKey = env.SOLAPI_API_KEY
    const apiSecret = env.SOLAPI_API_SECRET
    const sender = env.SOLAPI_SENDER

    if (!apiKey || !apiSecret || !sender) {
      console.error('SMS config missing:', { apiKey: !!apiKey, apiSecret: !!apiSecret, sender: !!sender })
      return { success: false, error: 'SMS configuration missing' }
    }

    // Generate HMAC-SHA256 signature using Web Crypto API
    const date = new Date().toISOString()
    const salt = crypto.randomUUID().replace(/-/g, '')
    const data = date + salt

    const encoder = new TextEncoder()
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(apiSecret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    )
    const signatureBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(data))
    const signature = Array.from(new Uint8Array(signatureBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')

    const authHeader = `HMAC-SHA256 apiKey=${apiKey}, date=${date}, salt=${salt}, signature=${signature}`

    const response = await fetch('https://api.solapi.com/messages/v4/send', {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: {
          to,
          from: sender,
          text
        }
      })
    })

    const result = await response.json() as Record<string, unknown>
    console.log('Solapi response:', JSON.stringify(result))

    if (!response.ok) {
      return { success: false, error: `Solapi error: ${response.status} ${JSON.stringify(result)}` }
    }

    return { success: true }
  } catch (err) {
    console.error('SMS send error:', err)
    return { success: false, error: String(err) }
  }
}

// ===== API ROUTES =====
app.post('/api/consultation', async (c) => {
  try {
    const body = await c.req.json()
    const { name, phone, treatment, symptoms } = body
    
    if (!name || !phone) {
      return c.json({ success: false, message: 'Name and phone are required' }, 400)
    }

    const treatmentMap: Record<string, string> = {
      implant: '임플란트', cosmetic: '심미보철', cavity: '충치치료',
      pediatric: '소아치과', gum: '잇몸치료', other: '기타'
    }
    const treatmentName = treatmentMap[treatment] || treatment || '미선택'
    const time = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })

    console.log('=== New Consultation ===')
    console.log('Name:', name)
    console.log('Phone:', phone)
    console.log('Treatment:', treatmentName)
    console.log('Symptoms:', symptoms || 'N/A')
    console.log('Time:', time)
    console.log('========================')

    // Send SMS notification to director
    const smsText = `[태평가이드치과 상담접수]\n이름: ${name}\n연락처: ${phone}\n관심진료: ${treatmentName}\n증상: ${symptoms || '없음'}\n접수시간: ${time}`

    const receiver = c.env.SMS_RECEIVER
    if (receiver) {
      const smsResult = await sendSMS(c.env, receiver, smsText)
      console.log('SMS result:', smsResult.success ? 'sent' : smsResult.error)
    } else {
      console.log('SMS_RECEIVER not configured, skipping SMS')
    }

    return c.json({ 
      success: true, 
      message: 'Consultation request received successfully',
      data: { name, phone, treatment, symptoms }
    })
  } catch (error) {
    console.error('Consultation error:', error)
    return c.json({ success: false, message: 'Server error' }, 500)
  }
})

// ===== KAKAO LOGIN =====
function getOrigin(url: string): string {
  const u = new URL(url)
  // Force https for production/proxy environments
  if (u.hostname !== 'localhost' && u.hostname !== '127.0.0.1') {
    u.protocol = 'https:'
  }
  return u.origin
}

app.get('/api/auth/kakao', (c) => {
  const kakaoKey = c.env.KAKAO_REST_API_KEY
  const origin = getOrigin(c.req.url)
  const redirectUri = `${origin}/api/auth/kakao/callback`
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoKey}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code`
  return c.redirect(kakaoAuthUrl)
})

app.get('/api/auth/kakao/callback', async (c) => {
  try {
    const code = c.req.query('code')
    if (!code) return c.text('Authorization code missing', 400)

    const kakaoKey = c.env.KAKAO_REST_API_KEY
    const origin = getOrigin(c.req.url)
    const redirectUri = `${origin}/api/auth/kakao/callback`

    // Exchange code for token
    const tokenRes = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: kakaoKey,
        redirect_uri: redirectUri,
        code,
      })
    })
    const tokenData = await tokenRes.json() as Record<string, unknown>
    if (!tokenData.access_token) {
      console.error('Kakao token error:', JSON.stringify(tokenData))
      return c.text('Failed to get token', 400)
    }

    // Get user info
    const userRes = await fetch('https://kapi.kakao.com/v2/user/me', {
      headers: { 'Authorization': `Bearer ${tokenData.access_token}` }
    })
    const userData = await userRes.json() as Record<string, unknown>
    const profile = (userData.kakao_account as Record<string, unknown>)?.profile as Record<string, unknown> || {}
    const nickname = (profile.nickname as string) || '회원'
    const profileImage = (profile.profile_image_url as string) || ''

    console.log('Kakao login:', nickname, userData.id)

    // Auto-register member in KV
    try {
      const memberKey = `kakao:${userData.id}`
      const existing = await c.env.MEMBERS.get(memberKey)
      if (!existing) {
        await c.env.MEMBERS.put(memberKey, JSON.stringify({
          provider: 'kakao', id: userData.id, nickname, profileImage,
          joinDate: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
        }))
      }
    } catch (e) { console.error('Member save error:', e) }

    // Set auth cookie (simple base64 encoded user info)
    const userInfo = JSON.stringify({ provider: 'kakao', id: userData.id, nickname, profileImage })
    const encoded = btoa(unescape(encodeURIComponent(userInfo)))

    return c.html(`
      <html><head><script>
        document.cookie = 'auth=${encoded}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax';
        var returnTo = document.cookie.match(/auth_return=([^;]+)/);
        document.cookie = 'auth_return=; path=/; max-age=0';
        window.location.href = returnTo ? decodeURIComponent(returnTo[1]) : '/';
      </script></head><body>로그인 중...</body></html>
    `)
  } catch (err) {
    console.error('Kakao callback error:', err)
    return c.text('Login failed', 500)
  }
})

// ===== NAVER LOGIN =====
app.get('/api/auth/naver', (c) => {
  const clientId = c.env.NAVER_CLIENT_ID
  const origin = getOrigin(c.req.url)
  const redirectUri = `${origin}/api/auth/naver/callback`
  const state = crypto.randomUUID().replace(/-/g, '')
  const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}`
  return c.redirect(naverAuthUrl)
})

app.get('/api/auth/naver/callback', async (c) => {
  try {
    const code = c.req.query('code')
    const state = c.req.query('state')
    if (!code) return c.text('Authorization code missing', 400)

    const clientId = c.env.NAVER_CLIENT_ID
    const clientSecret = c.env.NAVER_CLIENT_SECRET
    const origin = getOrigin(c.req.url)
    const redirectUri = `${origin}/api/auth/naver/callback`

    // Exchange code for token
    const tokenRes = await fetch(`https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${encodeURIComponent(redirectUri)}&code=${code}&state=${state}`)
    const tokenData = await tokenRes.json() as Record<string, unknown>
    if (!tokenData.access_token) {
      console.error('Naver token error:', JSON.stringify(tokenData))
      return c.text('Failed to get token', 400)
    }

    // Get user info
    const userRes = await fetch('https://openapi.naver.com/v1/nid/me', {
      headers: { 'Authorization': `Bearer ${tokenData.access_token}` }
    })
    const userData = await userRes.json() as Record<string, unknown>
    const response = userData.response as Record<string, unknown> || {}
    const nickname = (response.name as string) || (response.nickname as string) || '회원'
    const profileImage = (response.profile_image as string) || ''
    const naverId = (response.id as string) || ''

    console.log('Naver login:', nickname, naverId)

    // Auto-register member in KV
    try {
      const memberKey = `naver:${naverId}`
      const existing = await c.env.MEMBERS.get(memberKey)
      if (!existing) {
        await c.env.MEMBERS.put(memberKey, JSON.stringify({
          provider: 'naver', id: naverId, nickname, profileImage,
          joinDate: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
        }))
      }
    } catch (e) { console.error('Member save error:', e) }

    // Set auth cookie
    const userInfo = JSON.stringify({ provider: 'naver', id: naverId, nickname, profileImage })
    const encoded = btoa(unescape(encodeURIComponent(userInfo)))

    return c.html(`
      <html><head><script>
        document.cookie = 'auth=${encoded}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax';
        var returnTo = document.cookie.match(/auth_return=([^;]+)/);
        document.cookie = 'auth_return=; path=/; max-age=0';
        window.location.href = returnTo ? decodeURIComponent(returnTo[1]) : '/';
      </script></head><body>로그인 중...</body></html>
    `)
  } catch (err) {
    console.error('Naver callback error:', err)
    return c.text('Login failed', 500)
  }
})

app.get('/api/auth/logout', (c) => {
  return c.html(`
    <html><head><script>
      document.cookie = 'auth=; path=/; max-age=0';
      window.location.href = document.referrer || '/';
    </script></head><body>로그아웃 중...</body></html>
  `)
})

app.get('/api/auth/me', (c) => {
  const cookie = c.req.header('Cookie') || ''
  const match = cookie.match(/auth=([^;]+)/)
  if (!match) return c.json({ loggedIn: false })
  try {
    const userInfo = JSON.parse(decodeURIComponent(escape(atob(match[1]))))
    return c.json({ loggedIn: true, user: userInfo })
  } catch {
    return c.json({ loggedIn: false })
  }
})

// ===== MEMBER API =====
function getAuthUser(c: any): { provider: string; id: string; nickname: string; profileImage: string } | null {
  const cookie = c.req.header('Cookie') || ''
  const match = cookie.match(/auth=([^;]+)/)
  if (!match) return null
  try {
    return JSON.parse(decodeURIComponent(escape(atob(match[1]))))
  } catch { return null }
}

app.get('/api/member/me', async (c) => {
  const user = getAuthUser(c)
  if (!user) return c.json({ loggedIn: false })
  
  try {
    const key = `${user.provider}:${user.id}`
    const data = await c.env.MEMBERS.get(key)
    if (data) {
      return c.json({ loggedIn: true, member: JSON.parse(data) })
    }
    return c.json({ loggedIn: true, member: null })
  } catch {
    return c.json({ loggedIn: true, member: null })
  }
})

app.post('/api/member/update', async (c) => {
  const user = getAuthUser(c)
  if (!user) return c.json({ success: false, error: 'Not logged in' }, 401)
  
  try {
    const body = await c.req.json()
    const { phone, smsConsent } = body
    const key = `${user.provider}:${user.id}`
    
    // Get existing data or create new
    const existing = await c.env.MEMBERS.get(key)
    const member = existing ? JSON.parse(existing) : {
      provider: user.provider,
      id: user.id,
      nickname: user.nickname,
      profileImage: user.profileImage,
      joinDate: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    }
    
    // Update fields
    if (phone !== undefined) member.phone = phone
    if (smsConsent !== undefined) {
      member.smsConsent = smsConsent
      member.smsConsentDate = smsConsent ? new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }) : null
    }
    member.updatedAt = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
    
    await c.env.MEMBERS.put(key, JSON.stringify(member))
    
    console.log('Member updated:', user.nickname, phone, 'smsConsent:', smsConsent)
    
    return c.json({ success: true, member })
  } catch (err) {
    console.error('Member update error:', err)
    return c.json({ success: false, error: 'Server error' }, 500)
  }
})

// ===== ADMIN API =====

// Admin login - returns a simple token
app.post('/api/admin/login', async (c) => {
  try {
    const { password } = await c.req.json()
    const adminPw = c.env.ADMIN_PASSWORD
    if (!adminPw || password !== adminPw) {
      return c.json({ success: false, error: 'Invalid password' }, 401)
    }
    // Simple token: base64 of password + timestamp (not production-grade but sufficient)
    const token = btoa(`admin:${Date.now()}:${adminPw}`)
    return c.json({ success: true, token })
  } catch (err) {
    console.error('Admin login error:', err)
    return c.json({ success: false, error: 'Server error' }, 500)
  }
})

// Admin middleware - verify token
function verifyAdmin(c: any): boolean {
  const token = c.req.header('X-Admin-Token')
  if (!token) return false
  try {
    const decoded = atob(token)
    const parts = decoded.split(':')
    return parts[0] === 'admin' && parts[2] === c.env.ADMIN_PASSWORD
  } catch { return false }
}

// Upload before/after images
app.post('/api/admin/ba/upload', async (c) => {
  if (!verifyAdmin(c)) return c.json({ success: false, error: 'Unauthorized' }, 401)

  try {
    const { title, category, description, beforeImage, afterImage } = await c.req.json()

    if (!title || !beforeImage || !afterImage) {
      return c.json({ success: false, error: 'Missing required fields' }, 400)
    }

    // Generate unique ID
    const id = `ba_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`
    const now = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })

    // Store images in IMAGES KV (base64 data URLs)
    await c.env.IMAGES.put(`img:${id}:before`, beforeImage)
    await c.env.IMAGES.put(`img:${id}:after`, afterImage)

    // Store metadata in IMAGES KV
    const meta = { id, title, category, description, createdAt: now }
    await c.env.IMAGES.put(`meta:${id}`, JSON.stringify(meta))

    // Update index list
    const indexData = await c.env.IMAGES.get('ba_index')
    const index: string[] = indexData ? JSON.parse(indexData) : []
    index.unshift(id)  // newest first
    await c.env.IMAGES.put('ba_index', JSON.stringify(index))

    console.log('BA uploaded:', id, title, category)

    return c.json({ success: true, id })
  } catch (err) {
    console.error('BA upload error:', err)
    return c.json({ success: false, error: 'Upload failed' }, 500)
  }
})

// List before/after items (admin)
app.get('/api/admin/ba/list', async (c) => {
  if (!verifyAdmin(c)) return c.json({ success: false, error: 'Unauthorized' }, 401)

  try {
    const indexData = await c.env.IMAGES.get('ba_index')
    const index: string[] = indexData ? JSON.parse(indexData) : []

    const items = []
    for (const id of index) {
      const metaStr = await c.env.IMAGES.get(`meta:${id}`)
      if (!metaStr) continue
      const meta = JSON.parse(metaStr)
      items.push({
        ...meta,
        beforeThumb: `/api/ba/image/${id}/before`,
        afterThumb: `/api/ba/image/${id}/after`,
      })
    }

    return c.json({ items })
  } catch (err) {
    console.error('BA list error:', err)
    return c.json({ items: [] })
  }
})

// Delete before/after item
app.post('/api/admin/ba/delete', async (c) => {
  if (!verifyAdmin(c)) return c.json({ success: false, error: 'Unauthorized' }, 401)

  try {
    const { id } = await c.req.json()
    if (!id) return c.json({ success: false, error: 'Missing id' }, 400)

    // Delete images and metadata
    await c.env.IMAGES.delete(`img:${id}:before`)
    await c.env.IMAGES.delete(`img:${id}:after`)
    await c.env.IMAGES.delete(`meta:${id}`)

    // Update index
    const indexData = await c.env.IMAGES.get('ba_index')
    const index: string[] = indexData ? JSON.parse(indexData) : []
    const newIndex = index.filter(i => i !== id)
    await c.env.IMAGES.put('ba_index', JSON.stringify(newIndex))

    console.log('BA deleted:', id)

    return c.json({ success: true })
  } catch (err) {
    console.error('BA delete error:', err)
    return c.json({ success: false, error: 'Delete failed' }, 500)
  }
})

// Serve before/after images (public - for logged-in users)
app.get('/api/ba/image/:id/:type', async (c) => {
  try {
    const id = c.req.param('id')
    const type = c.req.param('type')
    if (type !== 'before' && type !== 'after') return c.notFound()

    const dataUrl = await c.env.IMAGES.get(`img:${id}:${type}`)
    if (!dataUrl) return c.notFound()

    // Parse data URL: data:image/jpeg;base64,/9j/...
    const match = (dataUrl as string).match(/^data:([^;]+);base64,(.+)$/)
    if (!match) return c.notFound()

    const contentType = match[1]
    const base64Data = match[2]

    // Decode base64 to binary
    const binaryStr = atob(base64Data)
    const bytes = new Uint8Array(binaryStr.length)
    for (let i = 0; i < binaryStr.length; i++) {
      bytes[i] = binaryStr.charCodeAt(i)
    }

    return new Response(bytes, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
      }
    })
  } catch (err) {
    console.error('Image serve error:', err)
    return c.notFound()
  }
})

// Public API to list before/after items (for logged-in users)
app.get('/api/ba/list', async (c) => {
  try {
    const indexData = await c.env.IMAGES.get('ba_index')
    const index: string[] = indexData ? JSON.parse(indexData) : []

    const categoryMap: Record<string, string> = {
      implant: '임플란트', cosmetic: '심미보철', cavity: '충치치료',
      gum: '잇몸치료', other: '기타'
    }

    const items = []
    for (const id of index) {
      const metaStr = await c.env.IMAGES.get(`meta:${id}`)
      if (!metaStr) continue
      const meta = JSON.parse(metaStr)
      items.push({
        id: meta.id,
        title: meta.title,
        category: meta.category,
        categoryName: categoryMap[meta.category] || meta.category,
        description: meta.description,
        createdAt: meta.createdAt,
        beforeUrl: `/api/ba/image/${id}/before`,
        afterUrl: `/api/ba/image/${id}/after`,
      })
    }

    return c.json({ items })
  } catch (err) {
    console.error('Public BA list error:', err)
    return c.json({ items: [] })
  }
})

// ===== SEO =====

app.get('/robots.txt', (c) => {
  return c.text(`User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin
Disallow: /mypage

Sitemap: https://tpguide.com/sitemap.xml`)
})

app.get('/sitemap.xml', (c) => {
  const pages = [
    { loc: '/', priority: '1.0', changefreq: 'weekly' },
    { loc: '/treatments', priority: '0.9', changefreq: 'monthly' },
    { loc: '/treatments/implant', priority: '0.8', changefreq: 'monthly' },
    { loc: '/treatments/cosmetic', priority: '0.8', changefreq: 'monthly' },
    { loc: '/treatments/cavity', priority: '0.8', changefreq: 'monthly' },
    { loc: '/treatments/pediatric', priority: '0.8', changefreq: 'monthly' },
    { loc: '/treatments/gum', priority: '0.8', changefreq: 'monthly' },
    { loc: '/pricing', priority: '0.8', changefreq: 'monthly' },
    { loc: '/doctor', priority: '0.8', changefreq: 'monthly' },
    { loc: '/mission', priority: '0.7', changefreq: 'monthly' },
    { loc: '/content', priority: '0.6', changefreq: 'weekly' },
    { loc: '/info', priority: '0.9', changefreq: 'monthly' },
    { loc: '/privacy', priority: '0.3', changefreq: 'yearly' },
  ]
  const today = new Date().toISOString().split('T')[0]
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>https://tpguide.com${p.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`
  return c.newResponse(xml, 200, { 'Content-Type': 'application/xml' })
})

// ===== PAGE ROUTES =====

// Home
app.get('/', (c) => c.html(homePage()))

// Treatments
app.get('/treatments', (c) => c.html(treatmentsPage()))
app.get('/treatments/:id', (c) => {
  const id = c.req.param('id')
  const page = treatmentDetailPage(id)
  if (!page) return c.notFound()
  return c.html(page)
})

// Pricing
app.get('/pricing', (c) => c.html(pricingPage()))

// Doctor
app.get('/doctor', (c) => c.html(doctorPage()))

// Mission
app.get('/mission', (c) => c.html(missionPage()))

// Content
app.get('/content', (c) => c.html(contentPage()))
app.get('/content/before-after', (c) => c.html(beforeAfterPage()))

// Info
app.get('/info', (c) => c.html(infoPage()))

// My Page
app.get('/mypage', (c) => c.html(myPage()))

// Admin
app.get('/admin', (c) => c.html(adminPage()))

// Privacy Policy
app.get('/privacy', (c) => c.html(privacyPage()))

export default app
