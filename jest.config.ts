import { compilerOptions } from './tsconfig.json'

import { pathsToModuleNameMapper } from 'ts-jest'

import type { Config } from '@jest/types'

const jestConfig: Config.InitialOptions = {
  bail: true,
  clearMocks: true,
  preset: 'ts-jest',
  collectCoverage: true,
  coverageProvider: 'v8',
  testMatch: ['**/*.spec.ts'],
  setupFiles: ['dotenv/config'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text-summary', 'lcov'],
  testPathIgnorePatterns: ['node_modules'],
  coveragePathIgnorePatterns: ['node_modules', '.types.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/config/jest.setup.ts'],
  collectCoverageFrom: ['<rootDir>/src/modules/**/useCases/**/*.ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src/'
  })
}

export default jestConfig
