import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import './src/index.css'

afterEach(() => {
  cleanup()
})