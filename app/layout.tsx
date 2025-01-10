import type { Metadata } from "next"
import "./globals.css"
import { Sidebar } from "@/components/Sidebar"
import { MobileNav } from "@/components/MobileNav"
import styles from './layout.module.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: "Social Media App",
  description: "A modern social media application",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <div className={styles.container}>
          <Providers>
            <Sidebar />
            <main className={styles.main}>
              {children}
            </main>
          </Providers>
        </div>
        <MobileNav />
      </body>
    </html>
  )
}

