import type { PortableTextBlock } from '@portabletext/types'
import type { ImageAsset, Slug } from '@sanity/types'
import groq from 'groq'
import { type SanityClient } from 'next-sanity'

export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`

export async function getPosts(client: SanityClient): Promise<Post[]> {
  return await client.fetch(postsQuery)
}

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]`
export const profileBySlugQuery = groq`*[_type == "profile" && slug.current == $slug][0]`;
export const jobsQuery = groq`*[_type == "job"] {_id, name, startedAt, body,'company': company->name, 'logo':  company->mainImage } | order(startedAt desc)`;
export const projectsQuery = groq`*[_type == "project"] {_id, name, body, 'job': job->name, 'company': job->company->name,'skills': skill[]->{_id, name}, ...}`;
export const softSkillsQuery = groq`*[_type == "softSkill"] {_id, name, description}`;
export async function getPost(
  client: SanityClient,
  slug: string,
): Promise<Post> {
  return await client.fetch(postBySlugQuery, {
    slug,
  })
}
export async function getProfile(
  client: SanityClient,
  slug: string,
): Promise<Profile> {
  return await client.fetch(profileBySlugQuery, {
    slug,
  })
}
export async function getJobs (
  client: SanityClient,
): Promise<Job[]> {
  return await client.fetch(jobsQuery)
}

export async function getProjects (
  client: SanityClient,
): Promise<Project[]> {
  return await client.fetch(projectsQuery)
}
export async function getSoftSkills (
  client: SanityClient,
): Promise<SoftSkill[]> {
  return await client.fetch(softSkillsQuery)
}
export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`
export interface Company { 
  _type: 'company',
  _id: string,
  name: string,
  mainImage: ImageAsset
}
export interface Skill { 
  _type: 'skill',
  _id: string,
  name: string,
}

export interface SoftSkill { 
  _type: 'softSkill',
  _id: string,
  name: string,
  description: string,
}
export interface Hooby {
  _type: 'hooby',
  _id: string,
  name: string,
  icon: string,
}
export interface Project {
  _type: 'project',
  _id: string,
  name: string,
  job: Job,
  company: Company,
  mainImage: ImageAsset,
  body: PortableTextBlock[],
  skills: Skill[]
}
export interface Profile { 
  _type: 'profile',
  _id: string,
  name: string,
  excerpt: string,
  location: string,
  email: string, 
  phone: string,
  slug: Slug,
  linkedin: string,
  github: string,
  position: string,
  mainImage: ImageAsset
}
export interface Job { 
  _type: 'job',
  _id: string,
  name: string,
  startedAt: string,
  endedAt: string,
  company: string,
  skills: Skill[],
  body: PortableTextBlock[]
  
}

export interface Post {
  _type: 'post'
  _id: string
  _createdAt: string
  title?: string
  slug: Slug
  excerpt?: string
  mainImage?: ImageAsset
  body: PortableTextBlock[]
}

