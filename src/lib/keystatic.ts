import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '../../keystatic.config'
import {
  type Post,
  type Person,
  type LinkCard,
  PostSchema,
  PersonSchema,
  LinkCardSchema,
} from '@/types/post'
import * as fs from 'fs/promises'
import * as path from 'path'
import matter from 'gray-matter'

export const reader = createReader(process.cwd(), keystaticConfig)

// Re-export types for convenience
export type { Post, Person, LinkCard }

// Posts 관련 함수들 - 직접 파일 시스템에서 읽기
export async function getAllPosts(): Promise<Post[]> {
  try {
    const postsDir = path.join(process.cwd(), 'content/posts')
    const dirs = await fs.readdir(postsDir)

    const posts: Post[] = []

    for (const dir of dirs) {
      const mdxPath = path.join(postsDir, dir, 'index.mdx')
      try {
        const fileContent = await fs.readFile(mdxPath, 'utf-8')
        const { data: frontmatter } = matter(fileContent)

        const post: Post = {
          slug: dir,
          title: frontmatter.title || '',
          mainImage: frontmatter.mainImage || null,
          categories: Array.isArray(frontmatter.categories)
            ? frontmatter.categories
            : [],
          publishedAt: frontmatter.publishedAt || null,
          summary: frontmatter.summary || null,
          body: '',
        }

        // Zod 검증
        const result = PostSchema.safeParse(post)
        if (result.success) {
          posts.push(result.data)
        } else {
          console.warn(`Invalid post data for slug "${dir}":`, result.error.issues)
        }
      } catch {
        // 파일 읽기 실패시 무시
      }
    }

    // 날짜 기준 정렬
    return posts.sort((a, b) => {
      if (!a.publishedAt || !b.publishedAt) return 0
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    })
  } catch (error) {
    console.error('getAllPosts 에러:', error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const mdxPath = path.join(process.cwd(), 'content/posts', slug, 'index.mdx')
    const fileContent = await fs.readFile(mdxPath, 'utf-8')
    const { data: frontmatter } = matter(fileContent)

    const post: Post = {
      slug,
      title: frontmatter.title || '',
      mainImage: frontmatter.mainImage || null,
      categories: Array.isArray(frontmatter.categories)
        ? frontmatter.categories
        : [],
      publishedAt: frontmatter.publishedAt || null,
      summary: frontmatter.summary || null,
      body: '',
    }

    const result = PostSchema.safeParse(post)
    if (!result.success) {
      console.warn(`Invalid post data for slug "${slug}":`, result.error.issues)
      return null
    }
    return result.data
  } catch {
    return null
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
    .map((person) => {
      const data = {
        slug: person.slug,
        name: person.entry.name,
        role: person.entry.role,
        image: person.entry.image,
        bio: person.entry.bio,
      }
      const result = PersonSchema.safeParse(data)
      if (!result.success) {
        console.warn(`Invalid person data for slug "${person.slug}":`, result.error.issues)
        return null
      }
      return result.data
    })
    .filter((person): person is Person => person !== null)
    .sort((a, b) => a.name.localeCompare(b.name, 'ko'))
}

// LinkCards 관련 함수들
export async function getAllLinkCards(): Promise<LinkCard[]> {
  const cards = await reader.collections.linkCards.all()
  return cards
    .map((card) => {
      const data = {
        slug: card.slug,
        title: card.entry.title,
        url: card.entry.url,
        description: card.entry.description,
        thumbnail: card.entry.thumbnail,
        publishedAt: card.entry.publishedAt,
      }
      const result = LinkCardSchema.safeParse(data)
      if (!result.success) {
        console.warn(`Invalid link card data for slug "${card.slug}":`, result.error.issues)
        return null
      }
      return result.data
    })
    .filter((card): card is LinkCard => card !== null)
    .sort((a, b) => {
      if (!a.publishedAt || !b.publishedAt) return 0
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    })
}
