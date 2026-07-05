import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Play } from "lucide-react"
import { Link } from "react-router-dom"
import { signin, signup } from "@/api/auth.api"
import { useAuthStore } from "@/store/auth.store"
import type { LoginFormData, SignupFormData } from "@/types/auth"
import { authChannel } from "@/utils/auth-channel"

export const AuthPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const loginStore = useAuthStore((state) => state.login)
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const from = (location.state as any)?.from?.pathname || "/"

  // Login Form State
  const [loginForm, setLoginForm] = useState<LoginFormData>({
    email: "",
    password: "",
  })

  // Signup Form State
  const [signupForm, setSignupForm] = useState<SignupFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }))
    setError(null)
  }

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSignupForm((prev) => ({
      ...prev,
      [name]: value,
    }))
    setError(null)
  }

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setIsLoading(true)
    try {
      const response = await signin(loginForm)
      if (response.accessToken && response.user) {
        loginStore(response.accessToken, response.user)
        authChannel.postMessage({ type: "LOGIN" });
      }
      setSuccess("Logged in successfully!")
      navigate(from, { replace: true })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed"
      setError(errorMessage)
      console.error("Login error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (signupForm.password !== signupForm.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)
    try {
      await signup({
        username: signupForm.username,
        email: signupForm.email,
        password: signupForm.password,
      })
      setSuccess("Account created successfully! Please sign in.")
      setIsLogin(true)
      setSignupForm({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Signup failed"
      setError(errorMessage)
      console.error("Signup error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2 w-fit hover:opacity-80 transition-opacity">
            <div className="rounded-lg bg-primary p-2">
              <Play className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">StreamHub</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
          {/* Tabs */}
          <div className="flex border-b border-border">
            <button
              onClick={() => {
                setIsLogin(true)
                setError(null)
              }}
              className={`flex-1 py-4 text-center font-medium transition-colors ${
                isLogin
                  ? "border-b-2 border-primary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setIsLogin(false)
                setError(null)
              }}
              className={`flex-1 py-4 text-center font-medium transition-colors ${
                !isLogin
                  ? "border-b-2 border-primary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form Content */}
          <div className="p-8">
            {error && (
              <div className="mb-4 rounded-lg bg-destructive/10 border border-destructive/20 p-3">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3">
                <p className="text-sm text-emerald-500">{success}</p>
              </div>
            )}

            {isLogin ? (
              // Login Form
              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <div>
                  <label htmlFor="login-email" className="text-sm font-medium text-foreground">
                    Email
                  </label>
                  <Input
                    id="login-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={loginForm.email}
                    onChange={handleLoginChange}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <label htmlFor="login-password" className="text-sm font-medium text-foreground">
                    Password
                  </label>
                  <Input
                    id="login-password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                    required
                    className="mt-2"
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span className="text-muted-foreground">Remember me</span>
                  </label>
                  <a href="#" className="text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  size="lg"
                  className="w-full"
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" disabled={isLoading}>
                    Google
                  </Button>
                  <Button variant="outline" disabled={isLoading}>
                    GitHub
                  </Button>
                </div>
              </form>
            ) : (
              // Signup Form
              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <div>
                  <label htmlFor="signup-username" className="text-sm font-medium text-foreground">
                    Username
                  </label>
                  <Input
                    id="signup-username"
                    name="username"
                    placeholder="johndoe"
                    value={signupForm.username}
                    onChange={handleSignupChange}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <label htmlFor="signup-email" className="text-sm font-medium text-foreground">
                    Email
                  </label>
                  <Input
                    id="signup-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={signupForm.email}
                    onChange={handleSignupChange}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <label htmlFor="signup-password" className="text-sm font-medium text-foreground">
                    Password
                  </label>
                  <Input
                    id="signup-password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={signupForm.password}
                    onChange={handleSignupChange}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="signup-confirm-password"
                    className="text-sm font-medium text-foreground"
                  >
                    Confirm Password
                  </label>
                  <Input
                    id="signup-confirm-password"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={signupForm.confirmPassword}
                    onChange={handleSignupChange}
                    required
                    className="mt-2"
                  />
                </div>

                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded mt-1" required />
                  <span className="text-sm text-muted-foreground">
                    I agree to the{" "}
                    <a href="#" className="text-primary hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                  </span>
                </label>

                <Button
                  type="submit"
                  disabled={isLoading}
                  size="lg"
                  className="w-full"
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-card px-2 text-muted-foreground">Or sign up with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" disabled={isLoading}>
                    Google
                  </Button>
                  <Button variant="outline" disabled={isLoading}>
                    GitHub
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Footer */}
          <div className="px-8 py-4 border-t border-border bg-card/50 text-center text-sm text-muted-foreground">
            {isLogin ? (
              <>
                Don't have an account?{" "}
                <button
                  onClick={() => {
                    setIsLogin(false)
                    setError(null)
                  }}
                  className="text-primary hover:underline font-medium"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => {
                    setIsLogin(true)
                    setError(null)
                  }}
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default AuthPage
