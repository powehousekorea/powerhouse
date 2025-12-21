import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '../../keystatic.config'
import type { Post, Person, LinkCard } from '@/types/post'

export const reader = createReader(process.cwd(), keystaticConfig)

// Re-export types for convenience
export type { Post, Person, LinkCard }

// Posts 관련 함수들
export async function getAllPosts(): Promise<Post[]> {
  const posts = await reader.collections.posts.all()
  return posts
    .map((post) => ({
      slug: post.slug,
      title: post.entry.title,
      mainImage: post.entry.mainImage,
      categories: post.entry.categories,
      publishedAt: post.entry.publishedAt,
      summary: post.entry.summary,
      body: '', // MDX는 별도로 처리
    }))
    .sort((a, b) => {
      if (!a.publishedAt || !b.publishedAt) return 0
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    })
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = await reader.collections.posts.read(slug)
  if (!post) return null

  return {
    slug,
    title: post.title,
    mainImage: post.mainImage,
    categories: post.categories,
    publishedAt: post.publishedAt,
    summary: post.summary,
    body: '', // MDX 콘텐츠는 페이지에서 직접 import하여 처리
  }
}

export async function getNewsPosts(): Promise<Post[]> {
  const posts = await getAllPosts()
  return posts.filter((post) => post.categories.includes('news'))
}

export async function getActivityPosts(): Promise<Post[]> {
  const posts = await getAllPosts()
  return posts.filter((post) => post.categories.includes('activity'))
}

export async function getLatestNews(limit: number = 3): Promise<Post[]> {
  const news = await getNewsPosts()
  return news.slice(0, limit)
}

// People 관련 함수들
export async function getAllPeople(): Promise<Person[]> {
  const people = await reader.collections.people.all()
  return people
    .map((person) => ({
      slug: person.slug,
      name: person.entry.name,
      role: person.entry.role,
      image: person.entry.image,
      bio: person.entry.bio,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, 'ko'))
}

// LinkCards 관련 함수들
export async function getAllLinkCards(): Promise<LinkCard[]> {
  const cards = await reader.collections.linkCards.all()
  return cards
    .map((card) => ({
      slug: card.slug,
      title: card.entry.title,
      url: card.entry.url,
      description: card.entry.description,
      thumbnail: card.entry.thumbnail,
      publishedAt: card.entry.publishedAt,
    }))
    .sort((a, b) => {
      if (!a.publishedAt || !b.publishedAt) return 0
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    })
}
