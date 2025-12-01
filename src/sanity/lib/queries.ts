import { defineQuery } from "next-sanity";

export const POSTS_QUERY = defineQuery(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  summary,
  categories
}`);

export const POST_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  body,
  summary,
  categories
}`);

export const LATEST_NEWS_QUERY = defineQuery(`*[_type == "post" && "news" in categories] | order(publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  summary
}`);

export const LINK_CARDS_QUERY = defineQuery(`*[_type == "linkCard"] | order(publishedAt desc) {
  _id,
  title,
  url,
  description,
  thumbnail,
  publishedAt
}`);

export const PEOPLE_QUERY = defineQuery(`*[_type == "person"] | order(name asc) {
  _id,
  name,
  role,
  image,
  bio
}`);
