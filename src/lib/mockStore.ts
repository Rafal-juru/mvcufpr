import type { BlogPost, BlogPostInput, AuthSession } from '../types'
import { SEED_POSTS } from '../data/blogData'

/*
  Backend simulado em localStorage. Mantém o frontend 100% funcional
  (inclusive o CRUD do admin) enquanto a API PHP/MySQL do Plesk não está
  conectada. Toda a lógica aqui é descartável: quando VITE_USE_MOCK=false,
  o api.ts ignora este arquivo e fala com /api de verdade.
*/

const POSTS_KEY = 'cesmvc.blog.posts'
const SESSION_KEY = 'cesmvc.blog.session'

/* Credencial de demonstração do painel admin (apenas no modo mock). */
const DEMO_EMAIL = 'admin@cesmvc.ufpr.br'
const DEMO_PASSWORD = 'cesmvc2025'

function read(): BlogPost[] {
  const raw = localStorage.getItem(POSTS_KEY)
  if (!raw) {
    localStorage.setItem(POSTS_KEY, JSON.stringify(SEED_POSTS))
    return [...SEED_POSTS]
  }
  try {
    return JSON.parse(raw) as BlogPost[]
  } catch {
    return [...SEED_POSTS]
  }
}

function write(posts: BlogPost[]): void {
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts))
}

function estimateReadingMinutes(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

/* ── Pequeno atraso para simular latência de rede ── */
function delay<T>(value: T, ms = 250): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

export const mockStore = {
  listPublished(): Promise<BlogPost[]> {
    const posts = read()
      .filter((p) => p.status === 'published')
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    return delay(posts)
  },

  getBySlug(slug: string): Promise<BlogPost | null> {
    const post = read().find((p) => p.slug === slug && p.status === 'published')
    return delay(post ?? null)
  },

  listAll(): Promise<BlogPost[]> {
    const posts = read().sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    return delay(posts)
  },

  getById(id: number): Promise<BlogPost | null> {
    const post = read().find((p) => p.id === id)
    return delay(post ?? null)
  },

  create(input: BlogPostInput): Promise<BlogPost> {
    const posts = read()
    const nextId = posts.reduce((max, p) => Math.max(max, p.id), 0) + 1
    const post: BlogPost = {
      ...input,
      id: nextId,
      readingMinutes: estimateReadingMinutes(input.content),
    }
    write([post, ...posts])
    return delay(post)
  },

  update(id: number, input: BlogPostInput): Promise<BlogPost> {
    const posts = read()
    const idx = posts.findIndex((p) => p.id === id)
    if (idx === -1) return Promise.reject(new Error('Post não encontrado'))
    const updated: BlogPost = {
      ...input,
      id,
      readingMinutes: estimateReadingMinutes(input.content),
    }
    posts[idx] = updated
    write(posts)
    return delay(updated)
  },

  remove(id: number): Promise<void> {
    write(read().filter((p) => p.id !== id))
    return delay(undefined)
  },

  login(email: string, password: string): Promise<AuthSession> {
    if (email.trim().toLowerCase() !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      return Promise.reject(new Error('E-mail ou senha inválidos'))
    }
    const session: AuthSession = {
      token: 'mock-token-' + Date.now().toString(36),
      user: { id: 1, name: 'Administrador CESMVC', email: DEMO_EMAIL },
    }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    return delay(session)
  },

  getSession(): AuthSession | null {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    try {
      return JSON.parse(raw) as AuthSession
    } catch {
      return null
    }
  },

  logout(): void {
    localStorage.removeItem(SESSION_KEY)
  },
}
