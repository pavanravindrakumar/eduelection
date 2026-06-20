import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
const githubRepository = process.env.GITHUB_REPOSITORY
const repoName = githubRepository && githubRepository.includes('/')
  ? githubRepository.split('/')[1]
  : undefined
const githubPagesBase = repoName ? `/${repoName}/` : '/'

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? githubPagesBase : '/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.js'],
    globals: true,
    pool: 'forks'
  }
})
