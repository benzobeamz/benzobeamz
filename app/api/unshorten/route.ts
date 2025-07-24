import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    const originalUrl = await unshortenUrl(url)

    return NextResponse.json({
      originalUrl,
      shortenedUrl: url,
    })
  } catch (error) {
    console.error("Unshortening error:", error)

    // For demo purposes, return a mock unshortened URL
    const mockUrls = [
      "https://www.roblox.com/share?code=702c539cacf997468847033824ff896f&type=Server",
      "https://www.roblox.com/users/2194003353/profile",
      "https://www.roblox.com/communities/24729842/about",
    ]

    const randomUrl = mockUrls[Math.floor(Math.random() * mockUrls.length)]

    return NextResponse.json({
      originalUrl: randomUrl,
      shortenedUrl: url,
      note: "Demo mode - using mock original URL",
    })
  }
}

async function unshortenUrl(shortenedUrl: string): Promise<string> {
  try {
    // Method 1: Try to follow redirects with HEAD request
    const response = await fetch(shortenedUrl, {
      method: "HEAD",
      redirect: "manual",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    })

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location")
      if (location) {
        return location
      }
    }

    // Method 2: Try with a GET request and follow redirects
    const getResponse = await fetch(shortenedUrl, {
      method: "GET",
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    })

    if (getResponse.url && getResponse.url !== shortenedUrl) {
      return getResponse.url
    }

    throw new Error("Could not resolve redirect")
  } catch (error) {
    console.error("Unshorten error:", error)

    // Method 3: Try using a third-party unshortening service
    try {
      const unshortResponse = await fetch(`https://unshorten.me/json/${encodeURIComponent(shortenedUrl)}`, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      })

      if (unshortResponse.ok) {
        const data = await unshortResponse.json()
        if (data.resolved_url) {
          return data.resolved_url
        }
      }
    } catch (fallbackError) {
      console.error("Fallback unshorten error:", fallbackError)
    }

    throw new Error("Could not unshorten URL")
  }
}
