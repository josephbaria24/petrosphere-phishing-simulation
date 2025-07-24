"use client"

import type React from "react"
import { useState, type FormEvent, type ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Mail, Lock, Eye, EyeOff } from "lucide-react"

interface FormData {
  email: string
  password: string
  confirmPassword: string
}

interface FormErrors {
  email?: string
  password?: string
  confirmPassword?: string
  general?: string[]
}

const PasswordResetSimulation: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [errors, setErrors] = useState<string[]>([])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = (): string[] => {
    const newErrors: string[] = []

    if (!formData.email) {
      newErrors.push("Email is required")
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.push("Please enter a valid email address")
    }

    if (!formData.password) {
      newErrors.push("Password is required")
    } else if (formData.password.length < 8) {
      newErrors.push("Password must be at least 8 characters")
    }

    if (!formData.confirmPassword) {
      newErrors.push("Please confirm your password")
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.push("Passwords do not match")
    }

    return newErrors
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const validationErrors = validateForm()
    setErrors(validationErrors)

    if (validationErrors.length === 0) {
      // Log the captured data (for simulation purposes)
      console.log("Captured credentials:", {
        email: formData.email,
        password: formData.password,
        timestamp: new Date().toISOString(),
      })
      setIsSubmitted(true)
    }
  }

  const togglePasswordVisibility = (field: "password" | "confirmPassword"): void => {
    if (field === "password") {
      setShowPassword(!showPassword)
    } else {
      setShowConfirmPassword(!showConfirmPassword)
    }
  }

  const resetSimulation = (): void => {
    setFormData({ email: "", password: "", confirmPassword: "" })
    setIsSubmitted(false)
    setErrors([])
    setShowPassword(false)
    setShowConfirmPassword(false)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-red-600" />
            </div>
            <CardTitle className="text-2xl text-red-600">Security Training Alert</CardTitle>
            <CardDescription className="text-gray-600">This was a phishing simulation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">
                <strong>Warning:</strong> You just entered your credentials on a simulated phishing site. In a real
                attack, your information would have been compromised.
              </AlertDescription>
            </Alert>
            <div className="space-y-2 text-sm text-gray-600">
              <h4 className="font-semibold">Red flags you should have noticed:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Suspicious URL or domain name</li>
                <li>Unexpected password reset request</li>
                <li>Urgent or threatening language</li>
                <li>Poor grammar or spelling</li>
                <li>Requests for sensitive information</li>
              </ul>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <h4 className="font-semibold">Best practices to stay safe:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Always verify the sender and URL</li>
                <li>Never click links in suspicious emails</li>
                <li>Use multi-factor authentication</li>
                <li>Report suspicious emails to IT</li>
              </ul>
            </div>
            <Button onClick={resetSimulation} className="w-full bg-transparent" variant="outline">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
        
          <div className="mx-auto mb-4 w-100% h-40 bg-blue-100 rounded-2xl flex items-center justify-center">
          <img src="/petros.png" alt="logo" />
            <Lock className="w-6 h-6 text-blue-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-red-500">Urgent Update! Reset Your Password Immediateley</CardTitle>
          <CardDescription>
            Your password has expired. Please create a new secure password to continue accessing your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.length > 0 && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">
                  {errors.map((error: string, index: number) => (
                    <div key={index}>• {error}</div>
                  ))}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("password")}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="text-xs text-gray-500 space-y-1">
              <p>Password requirements:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>At least 8 characters long</li>
                <li>Contains uppercase and lowercase letters</li>
                <li>Contains at least one number</li>
                <li>Contains at least one special character</li>
              </ul>
            </div>

            <Button type="submit" className="w-full">
              Reset Password
            </Button>

            <div className="text-center text-sm text-gray-500">
              <p>Need help? Contact IT Support at petrossphereIT-xyz@ghotmail.com</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default PasswordResetSimulation
