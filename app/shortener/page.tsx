"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Search,
  ChevronRight,
  Star,
  Copy,
  Check,
  ExternalLink,
  Loader2,
  Zap,
  Shield,
  Globe,
  Rocket,
  Target,
  Link2,
} from "lucide-react"

const shorteners = [
  { name: "is.gd", recommended: true, description: "Lightning fast & reliable", icon: Zap },
  { name: "TinyURL", recommended: true, description: "Classic & trusted", icon: Shield },
  { name: "Bit.ly", recommended: false, description: "Professional features", icon: Target },
  { name: "Rebrand.ly", recommended: false, description: "Custom branding", icon: Globe },
  { name: "Cutt.ly", recommended: false, description: "Analytics included", icon: Target },
  { name: "click.ly", recommended: false, description: "Simple & clean", icon: Link2 },
  { name: "tiny.cc", recommended: false, description: "Lightweight option", icon: Zap },
  { name: "shorter.me", recommended: false, description: "Modern interface", icon: Globe },
  { name: "shorter.gg", recommended: false, description: "Gaming focused", icon: Target },
  { name: "spoo.me", recommended: false, description: "Privacy focused", icon: Shield },
]

interface ShortenResult {
  shortenedUrl: string
  originalUrl: string
  service: string
  linkType: string
  concealedLink: string
  isDemo?: boolean
}

export default function ShortenerPage() {
  const [selectedShortener, setSelectedShortener] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"shorten" | "unshorten">("shorten")
  const [linkType, setLinkType] = useState("")
  const [inputUrl, setInputUrl] = useState("")
  const [shortenResult, setShortenResult] = useState<ShortenResult | null>(null)
  const [unshortenUrl, setUnshortenUrl] = useState("")
  const [unshortenResult, setUnshortenResult] = useState("")
  const [copied, setCopied] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [isShortening, setIsShortening] = useState(false)
  const [isUnshortening, setIsUnshortening] = useState(false)
  const [error, setError] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)

  // Smooth entrance animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const filteredShorteners = useMemo(
    () => shorteners.filter((shortener) => shortener.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [searchTerm],
  )

  // Epic but balanced background elements
  const backgroundStars = useMemo(
    () =>
      [...Array(100)].map((_, i) => ({
        id: i,
        size: Math.random() * 2.5 + 1,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 0.4,
        duration: 0.4 + Math.random() * 0.6,
        glow: Math.random() * 10 + 6,
      })),
    [],
  )

  const backgroundOrbs = useMemo(
    () =>
      [...Array(10)].map((_, i) => ({
        id: i,
        size: 40 + Math.random() * 80,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 2.5 + Math.random() * 2,
        color: i % 4,
      })),
    [],
  )

  const handleShortenerSelect = (shortener: string) => {
    setSelectedShortener(shortener)
    setError("")
    setShortenResult(null)
    setUnshortenResult("")
  }

  const generateShortLink = async () => {
    if (!inputUrl || !linkType || !selectedShortener) return

    setIsShortening(true)
    setError("")
    setShortenResult(null)

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: inputUrl,
          service: selectedShortener,
          linkType: linkType,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to shorten URL")
      }

      // Create concealed hyperlink based on link type AFTER getting the shortened URL
      let concealedLink = ""
      const processedOriginalUrl = inputUrl.replace(/:/g, "_:_")

      switch (linkType) {
        case "server":
          const serverCode = Math.random().toString(36).substring(2, 34)
          concealedLink = `[https_:_//www.roblox.com/share?code=${serverCode}&type=Server](${data.shortenedUrl})`
          break
        case "profile":
          const userId = Math.floor(Math.random() * 9999999)
          concealedLink = `[https_:_//www.roblox.com/users/${userId}/profile](${data.shortenedUrl})`
          break
        case "group":
          const groupId = Math.floor(Math.random() * 99999999)
          concealedLink = `[www.roblox.com/communities/${groupId}/about](${data.shortenedUrl})`
          break
        default:
          concealedLink = `[${processedOriginalUrl}](${data.shortenedUrl})`
      }

      setShortenResult({
        ...data,
        concealedLink: concealedLink,
      })
    } catch (error) {
      console.error("Shortening error:", error)
      setError(error instanceof Error ? error.message : "Failed to shorten URL")
    } finally {
      setIsShortening(false)
    }
  }

  const unshortenLink = async () => {
    if (!unshortenUrl) return

    setIsUnshortening(true)
    setError("")
    setUnshortenResult("")

    try {
      const response = await fetch("/api/unshorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: unshortenUrl,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to unshorten URL")
      }

      setUnshortenResult(data.originalUrl)
    } catch (error) {
      console.error("Unshortening error:", error)
      setError(error instanceof Error ? error.message : "Failed to unshorten URL")
    } finally {
      setIsUnshortening(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    if (text) {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const validateUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  if (!selectedShortener) {
    return (
      <div className="h-screen relative overflow-hidden bg-black">
        {/* Epic but balanced animated space background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-blue-900/60 to-indigo-900/80">
          {/* Balanced stars */}
          <div className="absolute inset-0 will-change-transform">
            {backgroundStars.map((star) => (
              <div
                key={star.id}
                className="absolute bg-white rounded-full animate-pulse"
                style={{
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  left: `${star.left}%`,
                  top: `${star.top}%`,
                  animationDelay: `${star.delay}s`,
                  animationDuration: `${star.duration}s`,
                  boxShadow: `0 0 ${star.glow}px rgba(255, 255, 255, 0.8)`,
                  transform: "translateZ(0)",
                }}
              />
            ))}
          </div>

          {/* Balanced orbs */}
          <div className="absolute inset-0 will-change-transform">
            {backgroundOrbs.map((orb) => (
              <div
                key={orb.id}
                className={`absolute rounded-full blur-md animate-pulse ${
                  orb.color === 0
                    ? "bg-cyan-400/60 shadow-[0_0_80px_rgba(34,211,238,0.7)]"
                    : orb.color === 1
                      ? "bg-orange-400/60 shadow-[0_0_80px_rgba(251,146,60,0.7)]"
                      : orb.color === 2
                        ? "bg-purple-400/60 shadow-[0_0_80px_rgba(168,85,247,0.7)]"
                        : "bg-green-400/60 shadow-[0_0_80px_rgba(34,197,94,0.7)]"
                }`}
                style={{
                  width: `${orb.size}px`,
                  height: `${orb.size}px`,
                  left: `${orb.left}%`,
                  top: `${orb.top}%`,
                  animationDelay: `${orb.delay}s`,
                  animationDuration: `${orb.duration}s`,
                  transform: "translateZ(0)",
                }}
              />
            ))}
          </div>

          {/* Balanced nebula effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-transparent to-cyan-500/30 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-500/10 to-transparent animate-pulse" />
        </div>

        {/* Main content - FIXED HEIGHT */}
        <div className="relative z-10 h-screen flex items-center justify-center p-4">
          <Card
            className={`w-full max-w-5xl bg-black/70 backdrop-blur-md border-2 border-cyan-400/80 rounded-2xl p-6 shadow-xl transition-all duration-600 ease-out transform will-change-transform ${
              isLoaded ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
            }`}
            style={{
              boxShadow: "0 0 40px rgba(34, 211, 238, 0.4), inset 0 0 20px rgba(34, 211, 238, 0.05)",
            }}
          >
            {/* Compact header */}
            <div className="text-center mb-6">
              <div className="relative inline-block mb-3">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-cyan-400 rounded-full blur-xl opacity-60 animate-pulse" />
                <div className="relative bg-black/80 backdrop-blur-sm border-2 border-cyan-400/80 rounded-full p-3">
                  <Rocket className="w-8 h-8 text-cyan-400 animate-bounce" />
                </div>
              </div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-orange-400 via-yellow-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                BENZOBEAMZ
              </h1>
              <h2 className="text-white text-xl font-bold mb-1">Select URL Shortener</h2>
              <p className="text-gray-300 text-sm">Choose your preferred shortening service</p>
            </div>

            {/* Compact search bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search shorteners..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-black/50 border-2 border-gray-600/50 text-white placeholder-gray-400 focus:border-cyan-400 h-12 text-base rounded-xl transition-colors duration-200"
              />
            </div>

            {/* Compact shortener grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-h-80 overflow-y-auto mb-6">
              {filteredShorteners.map((shortener) => (
                <Button
                  key={shortener.name}
                  onClick={() => handleShortenerSelect(shortener.name)}
                  className="h-24 bg-gradient-to-br from-gray-800/80 to-gray-700/80 hover:from-gray-700/80 hover:to-gray-600/80 border-2 border-gray-600/50 rounded-xl flex flex-col items-center justify-center p-3 text-white transition-all duration-200 hover:scale-102 hover:border-cyan-400/80 group will-change-transform"
                  style={{
                    boxShadow: "0 0 15px rgba(75, 85, 99, 0.3)",
                  }}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <shortener.icon className="w-5 h-5 text-cyan-400 group-hover:animate-pulse" />
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                  <span className="font-bold text-sm mb-1">{shortener.name}</span>
                  {shortener.recommended && (
                    <div className="flex items-center gap-1 text-blue-400">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-xs font-semibold">REC</span>
                    </div>
                  )}
                  <span className="text-xs text-gray-400 text-center leading-tight">{shortener.description}</span>
                </Button>
              ))}
            </div>

            {/* Back button */}
            <div className="text-center">
              <Link href="/">
                <Button
                  variant="outline"
                  className="border-2 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 bg-transparent transition-all duration-200 hover:scale-102 px-6 py-3 text-base font-bold rounded-xl will-change-transform"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen relative overflow-hidden bg-black">
      {/* Epic but balanced animated space background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-blue-900/60 to-indigo-900/80">
        {/* Balanced stars */}
        <div className="absolute inset-0 will-change-transform">
          {backgroundStars.map((star) => (
            <div
              key={star.id}
              className="absolute bg-white rounded-full animate-pulse"
              style={{
                width: `${star.size}px`,
                height: `${star.size}px`,
                left: `${star.left}%`,
                top: `${star.top}%`,
                animationDelay: `${star.delay}s`,
                animationDuration: `${star.duration}s`,
                boxShadow: `0 0 ${star.glow}px rgba(255, 255, 255, 0.8)`,
                transform: "translateZ(0)",
              }}
            />
          ))}
        </div>

        {/* Balanced orbs */}
        <div className="absolute inset-0 will-change-transform">
          {backgroundOrbs.map((orb) => (
            <div
              key={orb.id}
              className={`absolute rounded-full blur-md animate-pulse ${
                orb.color === 0
                  ? "bg-cyan-400/60 shadow-[0_0_80px_rgba(34,211,238,0.7)]"
                  : orb.color === 1
                    ? "bg-orange-400/60 shadow-[0_0_80px_rgba(251,146,60,0.7)]"
                    : orb.color === 2
                      ? "bg-purple-400/60 shadow-[0_0_80px_rgba(168,85,247,0.7)]"
                      : "bg-green-400/60 shadow-[0_0_80px_rgba(34,197,94,0.7)]"
              }`}
              style={{
                width: `${orb.size}px`,
                height: `${orb.size}px`,
                left: `${orb.left}%`,
                top: `${orb.top}%`,
                animationDelay: `${orb.delay}s`,
                animationDuration: `${orb.duration}s`,
                transform: "translateZ(0)",
              }}
            />
          ))}
        </div>

        {/* Balanced nebula effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-transparent to-cyan-500/30 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-500/10 to-transparent animate-pulse" />
      </div>

      {/* Main content - FIXED HEIGHT */}
      <div className="relative z-10 h-screen flex items-center justify-center p-4">
        <Card
          className="w-full max-w-xl bg-black/70 backdrop-blur-md border-2 border-cyan-400/80 rounded-2xl p-6 shadow-xl"
          style={{
            boxShadow: "0 0 40px rgba(34, 211, 238, 0.4), inset 0 0 20px rgba(34, 211, 238, 0.05)",
          }}
        >
          {/* Compact header */}
          <div className="flex items-center justify-between mb-6">
            <Button
              onClick={() => setSelectedShortener(null)}
              variant="ghost"
              className="text-gray-400 hover:text-white p-0 transition-colors duration-200 hover:scale-102 will-change-transform"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="font-bold">Back</span>
            </Button>
            <div className="text-center">
              <h1 className="text-2xl font-black bg-gradient-to-r from-orange-400 via-yellow-400 to-cyan-400 bg-clip-text text-transparent">
                {selectedShortener?.toUpperCase()}
              </h1>
              <p className="text-gray-300 text-xs">URL Shortener</p>
            </div>
            <div></div>
          </div>

          {/* Compact tabs */}
          <div className="flex mb-6 bg-gray-800/50 rounded-xl p-1 border border-gray-600/50">
            <Button
              onClick={() => {
                setActiveTab("shorten")
                setError("")
              }}
              className={`flex-1 text-base py-3 rounded-lg transition-all duration-200 font-bold will-change-transform ${
                activeTab === "shorten"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)] border border-purple-400/50"
                  : "bg-transparent text-gray-400 hover:text-white"
              }`}
            >
              Shorten URL
            </Button>
            <Button
              onClick={() => {
                setActiveTab("unshorten")
                setError("")
              }}
              className={`flex-1 text-base py-3 rounded-lg transition-all duration-200 font-bold will-change-transform ${
                activeTab === "unshorten"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)] border border-purple-400/50"
                  : "bg-transparent text-gray-400 hover:text-white"
              }`}
            >
              Unshorten URL
            </Button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 rounded-lg">
              <p className="text-red-400 font-semibold text-sm">{error}</p>
            </div>
          )}

          {/* Shorten URL Form */}
          {activeTab === "shorten" && (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-base font-bold mb-2">Select Option</label>
                <Select value={linkType} onValueChange={setLinkType}>
                  <SelectTrigger className="bg-black/50 border border-gray-600/50 text-white focus:border-cyan-400 h-12 text-base rounded-lg transition-colors duration-200">
                    <SelectValue placeholder="Choose link type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="profile" className="text-white hover:bg-gray-700 text-base py-2">
                      Profile
                    </SelectItem>
                    <SelectItem value="server" className="text-white hover:bg-gray-700 text-base py-2">
                      Private Server
                    </SelectItem>
                    <SelectItem value="group" className="text-white hover:bg-gray-700 text-base py-2">
                      Group
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-gray-300 text-base font-bold mb-2">Enter Your Link</label>
                <Input
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="https://www.roblox.com/users/123456/profile"
                  className="bg-black/50 border border-gray-600/50 text-white placeholder-gray-400 focus:border-cyan-400 h-12 text-base rounded-lg transition-colors duration-200"
                />
                {inputUrl && !validateUrl(inputUrl) && (
                  <p className="text-red-400 text-xs mt-1">Please enter a valid URL</p>
                )}
              </div>

              <Button
                onClick={generateShortLink}
                disabled={!inputUrl || !linkType || !validateUrl(inputUrl) || isShortening}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 rounded-lg text-lg transition-all duration-200 hover:scale-102 disabled:opacity-50 disabled:cursor-not-allowed border border-purple-400/50 will-change-transform"
                style={{ boxShadow: "0 0 20px rgba(147, 51, 234, 0.4)" }}
              >
                {isShortening ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Shortening...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-2" />
                    Generate Link
                  </>
                )}
              </Button>

              {/* Compact result */}
              {shortenResult && (
                <div className="mt-4 p-4 bg-green-900/30 border border-green-500/50 rounded-lg">
                  <label className="block text-green-400 text-base font-bold mb-2">Your Concealed Link:</label>
                  <div className="flex items-center gap-2">
                    <Input
                      value={shortenResult.concealedLink}
                      readOnly
                      className="bg-black/50 border border-gray-600/50 text-white flex-1 text-xs rounded-lg"
                    />
                    <Button
                      onClick={() => copyToClipboard(shortenResult.concealedLink)}
                      className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 transition-all duration-200 px-4 py-2 rounded-lg border border-green-400/50 hover:scale-102 will-change-transform"
                      style={{ boxShadow: "0 0 15px rgba(34, 197, 94, 0.4)" }}
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>

                  <div className="mt-3 p-3 bg-black/40 rounded-lg text-xs border border-gray-600/30">
                    <p className="text-gray-300 mb-1 font-semibold">Preview:</p>
                    <p className="text-cyan-400 font-mono text-xs">
                      {shortenResult.linkType === "server" && `https_:_//www.roblox.com/share?code=...&type=Server`}
                      {shortenResult.linkType === "profile" && `https_:_//www.roblox.com/users/.../profile`}
                      {shortenResult.linkType === "group" && `www.roblox.com/communities/.../about`}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">↳ Redirects to: {shortenResult.shortenedUrl}</p>
                  </div>

                  <p className="text-xs text-gray-400 mt-2">
                    Type: {shortenResult.linkType.charAt(0).toUpperCase() + shortenResult.linkType.slice(1)} | Service:{" "}
                    {shortenResult.service}
                    {shortenResult.isDemo && " (Demo)"}
                  </p>

                  <div className="mt-3 p-2 bg-yellow-900/30 rounded-lg border border-yellow-400/30">
                    <p className="text-yellow-300 text-xs font-semibold flex items-center gap-1">
                      <Zap className="w-3 h-3" />💡 Paste in Discord - shows Roblox URL but redirects to your link!
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Unshorten URL Form */}
          {activeTab === "unshorten" && (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-base font-bold mb-2">Enter Shortened URL</label>
                <Input
                  value={unshortenUrl}
                  onChange={(e) => setUnshortenUrl(e.target.value)}
                  placeholder="https://is.gd/abc123"
                  className="bg-black/50 border border-gray-600/50 text-white placeholder-gray-400 focus:border-cyan-400 h-12 text-base rounded-lg transition-colors duration-200"
                />
              </div>

              <Button
                onClick={unshortenLink}
                disabled={!unshortenUrl || !validateUrl(unshortenUrl) || isUnshortening}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold py-4 rounded-lg text-lg transition-all duration-200 hover:scale-102 disabled:opacity-50 disabled:cursor-not-allowed border border-cyan-400/50 will-change-transform"
                style={{ boxShadow: "0 0 20px rgba(34, 211, 238, 0.4)" }}
              >
                {isUnshortening ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Unshortening...
                  </>
                ) : (
                  <>
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Unshorten Link
                  </>
                )}
              </Button>

              {/* Compact unshorten result */}
              {unshortenResult && (
                <div className="mt-4 p-4 bg-blue-900/30 border border-blue-500/50 rounded-lg">
                  <label className="block text-blue-400 text-base font-bold mb-2">Original URL:</label>
                  <div className="flex items-center gap-2">
                    <Input
                      value={unshortenResult}
                      readOnly
                      className="bg-black/50 border border-gray-600/50 text-white flex-1 rounded-lg text-sm"
                    />
                    <Button
                      onClick={() => copyToClipboard(unshortenResult)}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 px-4 py-2 rounded-lg border border-blue-400/50 hover:scale-102 will-change-transform"
                      style={{ boxShadow: "0 0 15px rgba(59, 130, 246, 0.4)" }}
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Successfully unshortened using {selectedShortener}</p>
                  <div className="mt-2">
                    <a
                      href={unshortenResult}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 transition-colors duration-200 text-sm"
                    >
                      Visit original link <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
