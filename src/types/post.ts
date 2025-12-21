import { z } from 'zod';

// Zod 스키마 정의 - 런타임 검증용
export const PostSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  mainImage: z.string().nullable(),
  categories: z.array(z.enum(['news', 'activity'])),
  publishedAt: z.string().nullable(),
  summary: z.string().nullable(),
  body: z.string().optional(),
});

export const PersonSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  role: z.string().nullable(),
  image: z.string().nullable(),
  bio: z.string().nullable(),
});

export const LinkCardSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  url: z.string().url(),
  description: z.string().nullable(),
  thumbnail: z.string().nullable(),
  publishedAt: z.string().nullable(),
});

// TypeScript 타입 추론
export type Post = z.infer<typeof PostSchema>;
export type Person = z.infer<typeof PersonSchema>;
export type LinkCard = z.infer<typeof LinkCardSchema>;

// 안전한 파싱 함수들
export function parsePost(data: unknown): Post {
  return PostSchema.parse(data);
}

export function parsePerson(data: unknown): Person {
  return PersonSchema.parse(data);
}

export function parseLinkCard(data: unknown): LinkCard {
  return LinkCardSchema.parse(data);
}

// 안전한 파싱 (실패 시 null 반환)
export function safeParsePost(data: unknown): Post | null {
  const result = PostSchema.safeParse(data);
  return result.success ? result.data : null;
}

export function safeParsePerson(data: unknown): Person | null {
  const result = PersonSchema.safeParse(data);
  return result.success ? result.data : null;
}

export function safeParseLinkCard(data: unknown): LinkCard | null {
  const result = LinkCardSchema.safeParse(data);
  return result.success ? result.data : null;
}
