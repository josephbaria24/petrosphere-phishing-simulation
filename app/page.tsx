"use client"

import type React from "react"
import { useState, type FormEvent, type ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { useEffect } from "react"





interface FormData {
  email: string
  password: string
  confirmPassword: string
}



interface CompromisedData {
  personalInfo: {
    email: string
    password: string
    employeeId: string
    department: string
    accessLevel: string
  }
  companyData: {
    contacts: number
    documents: number
    systemAccess: string[]
    financialRecords: string
  }
  networkInfo: {
    ipAddress: string
    location: string
    connectedDevices: number
  }
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
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [progressStep, setProgressStep] = useState<number>(0)
  const [compromisedData, setCompromisedData] = useState<CompromisedData | null>(null)

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const validationErrors = validateForm()
    setErrors(validationErrors)

    if (validationErrors.length === 0) {
      setIsLoading(true)
      setProgressStep(0)

      // Simulate data acquisition process
      const steps = [
        { step: 1, message: "Validating credentials...", delay: 800 },
        { step: 2, message: "Accessing company database...", delay: 1000 },
        { step: 3, message: "Extracting employee information...", delay: 900 },
        { step: 4, message: "Harvesting contact lists...", delay: 700 },
        { step: 5, message: "Compromising system access...", delay: 600 },
      ]

      // Simulate the malicious data extraction process
      for (const { step, message, delay } of steps) {
        setProgressStep(step)
        await new Promise((resolve) => setTimeout(resolve, delay))
      }

      // Simulate gathering compromised data
      const mockCompromisedData = {
        personalInfo: {
          email: formData.email,
          password: formData.password,
          employeeId: "EMP" + Math.floor(Math.random() * 10000),
          department: "Operation",
          accessLevel: "Administrator",
        },
        companyData: {
          contacts: Math.floor(Math.random() * 500) + 100,
          documents: Math.floor(Math.random() * 1000) + 200,
          systemAccess: ["Email Server", "File Server", "Database", "Client informations"],
          financialRecords: "Accessible",
        },
        networkInfo: {
          ipAddress: "192.168.1." + Math.floor(Math.random() * 255),
          location: "Office Network",
          connectedDevices: Math.floor(Math.random() * 20) + 5,
        },
      }

      setCompromisedData(mockCompromisedData)

      // Log the captured data (for simulation purposes)
      console.log("Captured credentials:", {
        email: formData.email,
        password: formData.password,
        timestamp: new Date().toISOString(),
        compromisedData: mockCompromisedData,
      })

      setIsLoading(false)
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

  
  useEffect(() => {
    // Collect IP and timestamp, and optionally, logged email if available
    const trackVisitor = async () => {
      try {
        await fetch("/api/log-visit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            event: "page_visited",
            email: formData.email || null,
            timestamp: new Date().toISOString(),
          }),
        })
      } catch (err) {
        console.error("Tracking failed", err)
      }
    }
  
    trackVisitor()
  }, [])

  if (isLoading) {
    const progressMessages = [
      "Validating credentials...",
      "Accessing company database...",
      "Extracting employee information...",
      "Harvesting contact lists...",
      "Compromising system access...",
    ]





    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Lock className="w-6 h-6 text-orange-600 animate-pulse" />
            </div>
            <CardTitle className="text-2xl">Processing Reset...</CardTitle>
            <CardDescription>Please wait while we verify your information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(progressStep / 5) * 100}%` }}
                ></div>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 animate-pulse">
                  {progressMessages[progressStep - 1] || "Initializing..."}
                </p>
              </div>
            </div>

            {progressStep >= 2 && (
              <div className="space-y-2 text-xs text-gray-500 animate-fade-in">
                <div className="flex justify-between">
                  <span>Employee Records:</span>
                  <span className="text-red-600">Accessed ✓</span>
                </div>
              </div>
            )}

            {progressStep >= 3 && (
              <div className="space-y-2 text-xs text-gray-500 animate-fade-in">
                <div className="flex justify-between">
                  <span>Contact Database:</span>
                  <span className="text-red-600">Compromised ✓</span>
                </div>
              </div>
            )}

            {progressStep >= 4 && (
              <div className="space-y-2 text-xs text-gray-500 animate-fade-in">
                <div className="flex justify-between">
                  <span>System Access:</span>
                  <span className="text-red-600">Breached ✓</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-red-600" />
            </div>
            <CardTitle className="text-2xl text-red-600">SECURITY BREACH DETECTED</CardTitle>
            <CardDescription className="text-gray-600">
              This was a phishing simulation - Your data would be compromised!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">
                <strong>CRITICAL WARNING:</strong> In a real attack, the following information would now be in the hands
                of cybercriminals.
              </AlertDescription>
            </Alert>

            {compromisedData && (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-red-700">Personal Information Stolen:</h4>
                  <div className="bg-red-50 p-3 rounded-lg text-sm space-y-1">
                    <div>
                      <strong>Email:</strong> {compromisedData.personalInfo.email}
                    </div>
                    <div>
                      <strong>Password:</strong> {"*".repeat(compromisedData.personalInfo.password.length)}
                    </div>
                    <div>
                      <strong>Employee ID:</strong> {compromisedData.personalInfo.employeeId}
                    </div>
                    <div>
                      <strong>Department:</strong> {compromisedData.personalInfo.department}
                    </div>
                    <div>
                      <strong>Access Level:</strong> {compromisedData.personalInfo.accessLevel}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-red-700">Company Data Accessed:</h4>
                  <div className="bg-red-50 p-3 rounded-lg text-sm space-y-1">
                    <div>
                      <strong>Employee Contacts:</strong> {compromisedData.companyData.contacts}
                    </div>
                    <div>
                      <strong>Documents:</strong> {compromisedData.companyData.documents}
                    </div>
                    <div>
                      <strong>Financial Records:</strong> {compromisedData.companyData.financialRecords}
                    </div>
                    <div>
                      <strong>Systems Breached:</strong>
                    </div>
                    <ul className="list-disc list-inside ml-2">
                      {compromisedData.companyData.systemAccess.map((system: string, index: number) => (
                        <li key={index}>{system}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">Red flags you should have noticed:</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                <ul className="list-disc list-inside space-y-1">
                  <li>Unexpected password reset request</li>
                  <li>Urgent or threatening language</li>
                  <li>Suspicious URL or domain name</li>
                  <li>Requests for sensitive information</li>
                </ul>
                <ul className="list-disc list-inside space-y-1">
                  <li>No verification of identity</li>
                  <li>Generic company references</li>
                  <li>Pressure to act immediately</li>
                  <li>Poor grammar or spelling</li>
                </ul>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <h4 className="font-semibold text-green-700">How to stay protected:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Always verify the sender through official channels</li>
                <li>Never click links in suspicious emails</li>
                <li>Use multi-factor authentication on all accounts</li>
                <li>Report suspicious emails to IT immediately</li>
                <li>When in doubt, contact IT support directly</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button onClick={resetSimulation} className="flex-1 bg-transparent" variant="outline">
                Try Again
              </Button>
              <Button
                onClick={() =>
                  window.open("mailto:is@petrosphere.com.ph?subject=Phishing Simulation Completed", "_blank")
                }
                className="flex-1"
              >
                Report to Security Team
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-100% h-45 bg-blue-gray rounded-2xl flex items-center justify-center">
          <img src="/petros.png" alt="logo" />
          </div>
          <CardTitle className="text-3xl text-red-500">Urgent Update! Reset Your Password Immediately</CardTitle>
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
              <p>Need help? Contact IT Support at is@petrossphere-xyz0@hotmail.com</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default PasswordResetSimulation
