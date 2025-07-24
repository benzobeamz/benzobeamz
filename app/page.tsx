"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Cookie,
  Play,
  Chrome,
  LinkIcon,
  AlertTriangle,
  Monitor,
  Smartphone,
  Zap,
  Shield,
  Rocket,
  Star,
  Globe,
  Users,
} from "lucide-react"

export default function HomePage() {
  const [tutorialsOpen, setTutorialsOpen] = useState(false)
  const [whyChooseOpen, setWhyChooseOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showLogo, setShowLogo] = useState(false)
  const [showTitle, setShowTitle] = useState(false)
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [showStats, setShowStats] = useState(false)

  // Smooth entrance animation sequence
  useEffect(() => {
    const sequence = async () => {
      await new Promise((resolve) => setTimeout(resolve, 100))
      setShowLogo(true)

      await new Promise((resolve) => setTimeout(resolve, 150))
      setShowTitle(true)

      await new Promise((resolve) => setTimeout(resolve, 100))
      setShowSubtitle(true)

      await new Promise((resolve) => setTimeout(resolve, 150))
      setShowContent(true)

      await new Promise((resolve) => setTimeout(resolve, 100))
      setShowStats(true)

      await new Promise((resolve) => setTimeout(resolve, 50))
      setIsLoaded(true)
    }

    sequence()
  }, [])

  // Optimized keyboard controls
  useEffect(() => {
    let timeout: NodeJS.Timeout
    const handleKeyPress = (event: KeyboardEvent) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        if (event.code === "Space") {
          event.preventDefault()
          setTutorialsOpen((prev) => !prev)
        } else if (event.key.toLowerCase() === "t") {
          event.preventDefault()
          setWhyChooseOpen((prev) => !prev)
        }
      }, 50)
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => {
      window.removeEventListener("keydown", handleKeyPress)
      clearTimeout(timeout)
    }
  }, [])

  // Epic but optimized background elements
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

        {/* Balanced glowing orbs */}
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

      {/* Main content with compact layout - FIXED HEIGHT */}
      <div className="relative z-10 h-screen flex flex-col justify-center p-4">
        <div className="w-full max-w-7xl mx-auto">
          {/* Compact but epic header */}
          <div className="text-center mb-5">
            <div
              className={`transition-all duration-500 ease-out transform will-change-transform ${
                showLogo ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-4"
              }`}
            >
              <div className="relative inline-block mb-3">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-cyan-400 rounded-full blur-xl opacity-60 animate-pulse" />
                <div className="relative bg-black/80 backdrop-blur-sm border-2 border-cyan-400/80 rounded-full p-3 shadow-xl">
                  <Rocket className="w-9 h-9 text-cyan-400 animate-bounce" />
                </div>
              </div>
            </div>

            <div
              className={`transition-all duration-500 ease-out transform will-change-transform delay-100 ${
                showTitle ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-4"
              }`}
            >
              <h1
                className="text-5xl font-black bg-gradient-to-r from-orange-400 via-yellow-400 to-cyan-400 bg-clip-text text-transparent mb-2 tracking-wider"
                style={{
                  filter: "drop-shadow(0 0 20px rgba(34, 211, 238, 0.6))",
                }}
              >
                BENZOBEAMZ
              </h1>
            </div>

            <div
              className={`transition-all duration-500 ease-out transform will-change-transform delay-200 ${
                showSubtitle ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-4"
              }`}
            >
              <p
                className="text-yellow-300 text-lg font-bold flex items-center justify-center gap-2 mb-4"
                style={{
                  textShadow: "0 0 20px rgba(253, 224, 71, 0.8)",
                }}
              >
                <Zap className="w-5 h-5 animate-pulse" />
                ULTIMATE BEAMING PLATFORM
                <Zap className="w-5 h-5 animate-pulse" />
              </p>

              <a href="https://discord.gg/znGHDaqSXj" target="_blank" rel="noopener noreferrer">
                <Button
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-full text-base font-bold transition-all duration-200 hover:scale-105 shadow-xl border-2 border-indigo-400/50"
                  style={{
                    boxShadow: "0 0 30px rgba(99, 102, 241, 0.5), inset 0 0 15px rgba(99, 102, 241, 0.1)",
                  }}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                  JOIN DISCORD
                </Button>
              </a>
            </div>
          </div>

          {/* Compact stats section */}
          <div
            className={`transition-all duration-500 ease-out transform will-change-transform delay-300 ${
              showStats ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-4"
            }`}
          >
            <div className="grid grid-cols-3 gap-4 mb-5">
              {[
                { icon: Users, label: "Users", value: "50K+", color: "cyan" },
                { icon: Shield, label: "Success", value: "99.9%", color: "green" },
                { icon: Globe, label: "Links", value: "1M+", color: "purple" },
              ].map((stat, index) => (
                <Card
                  key={index}
                  className="bg-black/70 backdrop-blur-md border-2 border-gray-600/50 rounded-xl p-3 text-center hover:border-cyan-400/80 transition-all duration-200 hover:scale-102 will-change-transform"
                  style={{
                    boxShadow: `0 0 20px rgba(${
                      stat.color === "cyan" ? "34,211,238" : stat.color === "green" ? "34,197,94" : "168,85,247"
                    }, 0.3)`,
                  }}
                >
                  <stat.icon
                    className={`w-7 h-7 mx-auto mb-2 ${
                      stat.color === "cyan"
                        ? "text-cyan-400"
                        : stat.color === "green"
                          ? "text-green-400"
                          : "text-purple-400"
                    }`}
                  />
                  <h3 className="text-xl font-bold text-white mb-1">{stat.value}</h3>
                  <p className="text-gray-300 text-sm">{stat.label}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Compact main dashboard */}
          <div
            className={`transition-all duration-500 ease-out transform will-change-transform delay-400 ${
              showContent ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-4"
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-4">
              {/* Main Generator Section - Compact */}
              <Card
                className="bg-black/70 backdrop-blur-md border-2 border-orange-400/80 rounded-2xl p-4 shadow-xl hover:scale-102 transition-all duration-200 will-change-transform"
                style={{
                  boxShadow: "0 0 30px rgba(251, 146, 60, 0.4), inset 0 0 15px rgba(251, 146, 60, 0.05)",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h2
                    className="text-white font-bold text-lg flex items-center gap-2"
                    style={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.4)" }}
                  >
                    <Rocket className="w-6 h-6 text-orange-400 animate-pulse" />
                    MAIN GENERATOR
                  </h2>
                  <ChevronDown className="w-5 h-5 text-white animate-bounce" />
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-green-600/20 text-white text-xs py-2 px-3 rounded-lg flex items-center justify-center border border-green-400/30 backdrop-blur-sm">
                    <Play className="w-3 h-3 mr-1" />
                    TikTok Supported
                  </div>
                  <div className="bg-orange-500/20 text-white text-xs py-2 px-3 rounded-lg flex items-center justify-center border border-orange-400/30 backdrop-blur-sm">
                    <Chrome className="w-3 h-3 mr-1" />
                    Chrome Supported
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <a href="https://logged.tg/auth/benzobeamz" target="_blank" rel="noopener noreferrer">
                    <Button
                      className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-3 px-3 rounded-lg transition-all duration-200 hover:scale-102 border border-yellow-400/50 text-sm will-change-transform"
                      style={{ boxShadow: "0 0 15px rgba(234, 179, 8, 0.4)" }}
                    >
                      <Zap className="w-4 h-4 mr-1" />
                      Link Generator
                    </Button>
                  </a>
                  <Link href="/shortener">
                    <Button
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 px-3 rounded-lg transition-all duration-200 hover:scale-102 border border-cyan-400/50 text-sm will-change-transform"
                      style={{ boxShadow: "0 0 15px rgba(34, 211, 238, 0.4)" }}
                    >
                      <LinkIcon className="w-4 h-4 mr-1" />
                      Hyperlink
                    </Button>
                  </Link>
                </div>

                <div className="bg-black/60 rounded-lg p-3 flex items-center text-yellow-300 text-xs border border-yellow-400/30">
                  <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0 animate-pulse" />
                  If sites are down, we're working on fixes ASAP
                </div>
              </Card>

              {/* Refresher Section - Compact */}
              <Card
                className="bg-black/70 backdrop-blur-md border-2 border-teal-400/80 rounded-2xl p-4 shadow-xl hover:scale-102 transition-all duration-200 will-change-transform"
                style={{
                  boxShadow: "0 0 30px rgba(20, 184, 166, 0.4), inset 0 0 15px rgba(20, 184, 166, 0.05)",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h2
                    className="text-white font-bold text-lg flex items-center gap-2"
                    style={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.4)" }}
                  >
                    <RefreshCw className="w-6 h-6 text-teal-400 animate-spin" />
                    REFRESHER
                  </h2>
                </div>

                <a href="https://www.logged.tg/tools/refresher" target="_blank" rel="noopener noreferrer">
                  <Button
                    className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 hover:scale-102 border border-green-400/50 text-base mb-3 will-change-transform"
                    style={{ boxShadow: "0 0 20px rgba(34, 197, 94, 0.4)" }}
                  >
                    <Cookie className="w-5 h-5 mr-2" />
                    Cookie Refresher
                  </Button>
                </a>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-900/30 rounded-lg p-3 text-center border border-green-400/30">
                    <Shield className="w-6 h-6 text-green-400 mx-auto mb-1" />
                    <p className="text-green-300 text-xs font-semibold">Secure</p>
                  </div>
                  <div className="bg-blue-900/30 rounded-lg p-3 text-center border border-blue-400/30">
                    <Zap className="w-6 h-6 text-blue-400 mx-auto mb-1" />
                    <p className="text-blue-300 text-xs font-semibold">Fast</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Compact expandable sections */}
            <div className="space-y-3">
              {/* Beaming Tutorials - Compact */}
              <Card
                className="bg-black/70 backdrop-blur-md border-2 border-purple-400/60 rounded-xl shadow-xl overflow-hidden transition-all duration-200 hover:scale-[1.01] will-change-transform"
                style={{
                  boxShadow: tutorialsOpen ? "0 0 30px rgba(168, 85, 247, 0.5)" : "0 0 20px rgba(168, 85, 247, 0.3)",
                }}
              >
                <div
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-purple-900/20 transition-colors duration-200"
                  onClick={() => setTutorialsOpen(!tutorialsOpen)}
                >
                  <span
                    className="text-white text-lg font-bold flex items-center gap-3"
                    style={{ textShadow: "0 0 8px rgba(255, 255, 255, 0.4)" }}
                  >
                    <Play className="w-5 h-5 text-purple-400" />
                    Beaming Tutorials
                    <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
                  </span>
                  {tutorialsOpen ? (
                    <ChevronUp className="w-5 h-5 text-white transition-transform duration-200" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white transition-transform duration-200" />
                  )}
                </div>

                {tutorialsOpen && (
                  <div className="px-4 pb-4 space-y-3 animate-in slide-in-from-top duration-200">
                    <div className="grid grid-cols-2 gap-3">
                      <a href="https://streamable.com/do56oi" target="_blank" rel="noopener noreferrer">
                        <Button
                          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 hover:scale-102 border border-purple-400/50 text-sm will-change-transform"
                          style={{ boxShadow: "0 0 15px rgba(147, 51, 234, 0.4)" }}
                        >
                          <Monitor className="w-4 h-4 mr-2" />
                          PC Tutorial
                        </Button>
                      </a>
                      <a href="https://www.youtube.com/watch?v=DH7bbc6X19o" target="_blank" rel="noopener noreferrer">
                        <Button
                          className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 hover:scale-102 border border-red-400/50 text-sm will-change-transform"
                          style={{ boxShadow: "0 0 15px rgba(220, 38, 38, 0.4)" }}
                        >
                          <Smartphone className="w-4 h-4 mr-2" />
                          Mobile Tutorial
                        </Button>
                      </a>
                    </div>
                  </div>
                )}
              </Card>

              {/* Why Choose BENZOBEAMZ - Compact */}
              <Card
                className="bg-black/70 backdrop-blur-md border-2 border-cyan-400/60 rounded-xl shadow-xl overflow-hidden transition-all duration-200 hover:scale-[1.01] will-change-transform"
                style={{
                  boxShadow: whyChooseOpen ? "0 0 30px rgba(34, 211, 238, 0.5)" : "0 0 20px rgba(34, 211, 238, 0.3)",
                }}
              >
                <div
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-cyan-900/20 transition-colors duration-200"
                  onClick={() => setWhyChooseOpen(!whyChooseOpen)}
                >
                  <span
                    className="text-white text-lg font-bold flex items-center gap-3"
                    style={{ textShadow: "0 0 8px rgba(255, 255, 255, 0.4)" }}
                  >
                    <div className="w-5 h-5 rounded-full border-2 border-cyan-400 flex items-center justify-center text-cyan-400 font-bold text-sm">
                      ?
                    </div>
                    Why Choose BENZOBEAMZ?
                    <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
                  </span>
                  {whyChooseOpen ? (
                    <ChevronUp className="w-5 h-5 text-white transition-transform duration-200" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white transition-transform duration-200" />
                  )}
                </div>

                {whyChooseOpen && (
                  <div className="px-4 pb-4 animate-in slide-in-from-top duration-200">
                    <p
                      className="text-gray-300 text-sm leading-relaxed mb-3"
                      style={{ textShadow: "0 0 6px rgba(209, 213, 219, 0.3)" }}
                    >
                      BENZOBEAMZ offers the ultimate beaming experience with cutting-edge technology and reliable
                      generators.
                    </p>

                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { icon: Shield, label: "Secure", desc: "Military-grade" },
                        { icon: Zap, label: "Fast", desc: "Lightning speed" },
                        { icon: Users, label: "Trusted", desc: "50K+ users" },
                      ].map((feature, index) => (
                        <div
                          key={index}
                          className="bg-gray-800/50 rounded-lg p-3 text-center border border-gray-600/50"
                        >
                          <feature.icon className="w-6 h-6 text-cyan-400 mx-auto mb-1" />
                          <h4 className="text-white font-bold text-xs mb-1">{feature.label}</h4>
                          <p className="text-gray-400 text-xs">{feature.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            </div>

            {/* Compact footer */}
            <div className="text-center text-gray-400 text-sm mt-4">
              <p
                className="font-bold text-lg bg-gradient-to-r from-orange-400 to-cyan-400 bg-clip-text text-transparent"
                style={{ textShadow: "0 0 10px rgba(156, 163, 175, 0.6)" }}
              >
                #1 Roblox Beaming Website
              </p>
              <p style={{ textShadow: "0 0 6px rgba(156, 163, 175, 0.4)" }}>
                Press <kbd className="bg-gray-800 px-1 py-0.5 rounded text-cyan-400 text-xs">Space</kbd> for tutorials •
                Press <kbd className="bg-gray-800 px-1 py-0.5 rounded text-cyan-400 text-xs">T</kbd> for info
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
