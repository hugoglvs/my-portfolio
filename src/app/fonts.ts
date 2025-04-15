import { Inter } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const interDisplay = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter-display',
  weight: ['400', '500', '600', '700', '800'],
}) 