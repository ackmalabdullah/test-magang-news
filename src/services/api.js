const BASE_URL =
  'https://berita-indo-api-next.vercel.app/api'

export async function getNews(category = 'beranda') {
  try {
    let endpoint = ''

    // KHUSUS Beranda & Terbaru (keduanya same endpoint)
    if (category === 'beranda' || category === 'terbaru') {
      endpoint = `${BASE_URL}/cnn-news`
    }

    // KATEGORI LAIN
    else {
      endpoint = `${BASE_URL}/cnn-news/${category}`
    }

    const response = await fetch(endpoint)

    if (!response.ok) {
      throw new Error('Gagal mengambil data')
    }

    const result = await response.json()

    return result.data || []
  } catch (error) {
    console.error(error)

    return []
  }
}