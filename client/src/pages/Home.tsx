import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play, Upload, Search, Zap, MoreVertical, LogOut, ShieldAlert } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "@/store/auth.store"
import { logout, logoutAll } from "@/api/auth.api"
import { authChannel } from "@/utils/auth-channel";

export const HomePage = () => {
  const navigate = useNavigate()
  const { isAuthenticated, user, clearAuth } = useAuthStore()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
    } catch (e) {
      // Ignore API failure, ensure client state is cleared
    } finally {
      clearAuth()
      authChannel.postMessage({ type: "LOGOUT" });
      navigate("/auth")
    }
  }

  const handleLogoutAll = async () => {
    try {
      await logoutAll()
    } catch (e) {
      // Ignore API failure, ensure client state is cleared
    } finally {
      clearAuth()
      navigate("/auth")
    }
  }

  const features = [
    {
      icon: Upload,
      title: "Easy Upload",
      description: "Upload videos in seconds with drag and drop support",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized streaming with adaptive bitrate technology",
    },
    {
      icon: Play,
      title: "Beautiful Player",
      description: "Modern video player with full playback controls",
    },
    {
      icon: Search,
      title: "Easy Discovery",
      description: "Find videos with powerful search and filtering",
    },
  ]

  const recentVideos = [
    {
      id: 1,
      title: "Getting Started with React",
      thumbnail: "bg-gradient-to-br from-blue-500 to-blue-600",
      duration: "12:45",
    },
    {
      id: 2,
      title: "Building with TypeScript",
      thumbnail: "bg-gradient-to-br from-purple-500 to-purple-600",
      duration: "18:30",
    },
    {
      id: 3,
      title: "Mastering Tailwind CSS",
      thumbnail: "bg-gradient-to-br from-cyan-500 to-cyan-600",
      duration: "15:20",
    },
    {
      id: 4,
      title: "Web Performance Tips",
      thumbnail: "bg-gradient-to-br from-green-500 to-green-600",
      duration: "21:10",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header / Navigation */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary p-2">
                <Play className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">StreamHub</span>
            </div>

            <nav className="hidden gap-8 md:flex">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Browse
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Trending
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Docs
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <Link to="/upload">
                <Button variant="outline" size="sm">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload
                </Button>
              </Link>
              {isAuthenticated ? (
                <div className="relative flex items-center gap-3" ref={dropdownRef}>
                  <span className="text-sm font-medium text-muted-foreground">
                    Hi, {user?.username}
                  </span>
                  <Button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-full hover:bg-muted"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                  {dropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 rounded-md border border-border bg-popover p-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                      <button
                        onClick={() => {
                          setDropdownOpen(false)
                          handleLogout()
                        }}
                        className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        <LogOut className="h-4 w-4 text-muted-foreground" />
                        <span>Sign Out</span>
                      </button>
                      <button
                        onClick={() => {
                          setDropdownOpen(false)
                          handleLogoutAll()
                        }}
                        className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm text-destructive hover:bg-destructive/10 hover:text-destructive transition-colors"
                      >
                        <ShieldAlert className="h-4 w-4" />
                        <span>Log out of all devices</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/auth">
                  <Button size="sm">Sign In</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
            {/* Hero Content */}
            <div className="flex flex-col justify-center gap-6">
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  Stream Your Content Worldwide
                </h1>
                <p className="mt-6 text-lg text-muted-foreground">
                  Upload, stream, and share videos with the world. Built for creators,
                  optimized for performance.
                </p>
              </div>

              <div className="flex gap-4">
                <Link to="/upload">
                  <Button size="lg" className="gap-2">
                    <Upload className="h-5 w-5" />
                    Upload Your First Video
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>

              <div className="flex gap-8">
                <div>
                  <p className="text-2xl font-bold text-foreground">1M+</p>
                  <p className="text-sm text-muted-foreground">Videos Streamed</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">500K+</p>
                  <p className="text-sm text-muted-foreground">Active Creators</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">99.9%</p>
                  <p className="text-sm text-muted-foreground">Uptime</p>
                </div>
              </div>
            </div>

            {/* Hero Image Placeholder */}
            <div className="flex items-center justify-center">
              <div className="relative w-full aspect-video rounded-lg border border-border overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
                <img
                  src="https://plus.unsplash.com/premium_photo-1721910821652-e2c08be65879?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Video streaming platform"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center hover:bg-black/30 transition-all cursor-pointer group">
                  <div className="rounded-full bg-primary/90 p-4 group-hover:bg-primary transition-colors">
                    <Play className="h-8 w-8 text-white fill-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground">Why Choose StreamHub?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to succeed as a content creator
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="p-6">
                <div className="mb-4 rounded-lg bg-primary/10 p-3 w-fit">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Recent Videos Section */}
      <section className="border-t border-border bg-card/50">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Featured Videos</h2>
              <p className="mt-2 text-muted-foreground">Check out what's trending now</p>
            </div>
            <Button variant="outline">View All</Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recentVideos.map((video) => (
              <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className={`${video.thumbnail} aspect-video flex items-center justify-center relative group`}>
                  <Play className="h-12 w-12 text-white/40 group-hover:text-white/60 transition-colors" />
                  <span className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
                    {video.duration}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">Featured</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <div className="rounded-lg border border-border bg-card p-12">
          <h2 className="text-3xl font-bold text-foreground">Ready to Start Streaming?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of creators sharing their content with the world
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Link to="/upload">
              <Button size="lg" className="gap-2">
                <Upload className="h-5 w-5" />
                Upload Now
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Browse Videos
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="rounded-lg bg-primary p-2">
                  <Play className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-foreground">StreamHub</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The modern video streaming platform for creators
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Features</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Pricing</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Security</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">About</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Blog</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-border pt-8">
            <p className="text-center text-sm text-muted-foreground">
              © 2026 StreamHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
