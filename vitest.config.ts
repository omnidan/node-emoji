import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    clearMocks: true,
    coverage: {
      all: true,
      branches: 100,
      exclude: ['lib', 'src/*.d.ts', 'src/e2e.cjs', 'src/index.ts'],
      functions: 100,
      include: ['src'],
      lines: 100,
      reporter: ['html', 'lcov'],
      statements: 100,
    },
    exclude: ['lib', 'node_modules'],
    setupFiles: ['console-fail-test/setup'],
  },
})
