import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
const githubRepository = process.env.GITHUB_REPOSITORY
// Expected format: owner/repo
const repoMatch = githubRepository?.match(/^[^/]+\/([^/]+)$/)
const repoName = repoMatch?.[1]
const githubPagesBase = repoName ? `/${repoName}/` : '/'

export default defineConfig({
  base: process.env.GITHUB_PAGES ? githubPagesBase : '/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.js'],
    globals: true,
    pool: 'forks'
  }
})
