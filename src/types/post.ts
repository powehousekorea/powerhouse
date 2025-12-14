// Keystatic용 Post 타입 정의
export interface Post {
  slug: string
  title: string
  mainImage: string | null
  categories: readonly ('news' | 'activity')[]
  publishedAt: string | null
  summary: string | null
  body?: string // MDX content
}

export interface Person {
  slug: string
  name: string
  role: string | null
  image: string | null
  bio: string | null
}

export interface LinkCard {
  slug: string
  title: string
  url: string
  description: string | null
  thumbnail: string | null
  publishedAt: string | null
}
