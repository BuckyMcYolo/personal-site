import type { Metadata } from "next"
import { Rubik } from "next/font/google"
import "../globals.css"
import { ThemeProvider } from "@/components/providers/theme-provider"

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Jacob Owens personal site - Blog",
  description: "Jacob Owens personal blog",
}

export default function RootBlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={` ${rubik.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
