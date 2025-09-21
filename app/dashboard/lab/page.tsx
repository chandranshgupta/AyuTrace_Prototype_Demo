"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Header } from "@/components/header"
import { Search, QrCode, Upload, FileText, CheckCircle } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

interface BatchData {
  id: string
  herbName: string
  farmerName: string
  collectionDate: string
  weight: string
  status: string
}

export default function LabAnalystDashboard() {
  const { user, isLoggedIn } = useAuth()
  const router = useRouter()
  const [batchId, setBatchId] = useState("")
  const [foundBatch, setFoundBatch] = useState<BatchData | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [meetsPremiumStandards, setMeetsPremiumStandards] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [submittedBatchId, setSubmittedBatchId] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isLoggedIn || user?.role !== "lab") {
      router.push("/login")
    }
  }, [isLoggedIn, user, router])

  if (!isLoggedIn || user?.role !== "lab") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // Mock batch data
  const mockBatches: Record<string, BatchData> = {
    AT001: {
      id: "AT001",
      herbName: "Neem Leaves",
      farmerName: "Prakash Kumar",
      collectionDate: "2024-01-15",
      weight: "25 kg",
      status: "Awaiting Analysis",
    },
    AT002: {
      id: "AT002",
      herbName: "Turmeric Root",
      farmerName: "Ravi Sharma",
      collectionDate: "2024-01-12",
      weight: "40 kg",
      status: "Awaiting Analysis",
    },
    AT003: {
      id: "AT003",
      herbName: "Ashwagandha",
      farmerName: "Sunita Devi",
      collectionDate: "2024-01-10",
      weight: "15 kg",
      status: "Awaiting Analysis",
    },
  }

  const handleScanQR = () => {
    // Mock QR scanning - in real implementation, this would open camera
    const mockScannedId = "AT001"
    setBatchId(mockScannedId)
    handleFindBatch(mockScannedId)
  }

  const handleFindBatch = async (searchId?: string) => {
    const idToSearch = searchId || batchId
    if (!idToSearch.trim()) return

    setIsSearching(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const batch = mockBatches[idToSearch.toUpperCase()]
    if (batch) {
      setFoundBatch(batch)
    } else {
      setFoundBatch(null)
      alert("Batch not found. Please check the ID and try again.")
    }

    setIsSearching(false)
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setUploadedFile(file)
    } else {
      alert("Please upload a PDF file only.")
    }
  }

  const handleSubmitAnalysis = async () => {
    if (!foundBatch || !uploadedFile) {
      alert("Please ensure batch is found and certificate is uploaded.")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setSubmittedBatchId(foundBatch.id)
    setShowSuccess(true)
    setIsSubmitting(false)

    // Reset form after showing success
    setTimeout(() => {
      resetForm()
    }, 3000)
  }

  const resetForm = () => {
    setBatchId("")
    setFoundBatch(null)
    setUploadedFile(null)
    setMeetsPremiumStandards(false)
    setShowSuccess(false)
    setSubmittedBatchId("")
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="p-8">
              <div className="space-y-6">
                <div className="text-green-600 text-6xl">
                  <CheckCircle className="h-16 w-16 mx-auto" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Analysis for Batch {submittedBatchId} has been successfully submitted.
                </h1>
                <p className="text-gray-600">The system will automatically reset for your next analysis.</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">AyuTrace Lab Analysis Portal</h1>
            <p className="text-gray-600">Logged in as: {user?.name}</p>
          </div>

          {/* Find Batch Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Find Batch
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="batchId">Enter Batch ID</Label>
                  <Input
                    id="batchId"
                    placeholder="e.g., AT001"
                    value={batchId}
                    onChange={(e) => setBatchId(e.target.value.toUpperCase())}
                    onKeyPress={(e) => e.key === "Enter" && handleFindBatch()}
                  />
                </div>
                <div className="flex items-end gap-2">
                  <Button variant="outline" onClick={handleScanQR}>
                    <QrCode className="h-4 w-4 mr-2" />
                    Scan QR Code
                  </Button>
                  <Button onClick={() => handleFindBatch()} disabled={isSearching || !batchId.trim()}>
                    {isSearching ? "Searching..." : "Find Batch"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analysis Results Section */}
          {foundBatch && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Analysis Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Batch Confirmation */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-3">Batch Confirmation</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-blue-800">Herb Name:</span>
                      <p className="text-blue-700">{foundBatch.herbName}</p>
                    </div>
                    <div>
                      <span className="font-medium text-blue-800">Farmer Name:</span>
                      <p className="text-blue-700">{foundBatch.farmerName}</p>
                    </div>
                    <div>
                      <span className="font-medium text-blue-800">Collection Date:</span>
                      <p className="text-blue-700">{new Date(foundBatch.collectionDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="font-medium text-blue-800">Weight:</span>
                      <p className="text-blue-700">{foundBatch.weight}</p>
                    </div>
                  </div>
                </div>

                {/* Analysis Form */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="certificate">Certificate of Analysis (PDF)</Label>
                    <div className="mt-2">
                      <Button variant="outline" onClick={handleFileUpload} className="w-full h-12 bg-transparent">
                        <Upload className="h-5 w-5 mr-2" />
                        {uploadedFile ? `Uploaded: ${uploadedFile.name}` : "Upload Certificate of Analysis (PDF)"}
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="premium"
                      checked={meetsPremiumStandards}
                      onCheckedChange={(checked) => setMeetsPremiumStandards(checked as boolean)}
                    />
                    <Label
                      htmlFor="premium"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Meets Premium Quality Standards
                    </Label>
                  </div>

                  <Button
                    onClick={handleSubmitAnalysis}
                    disabled={isSubmitting || !uploadedFile}
                    className="w-full h-12 text-lg font-semibold"
                  >
                    {isSubmitting ? "Submitting Analysis..." : "Submit Analysis"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                <li>Enter the Batch ID or scan the QR code from the physical sample</li>
                <li>Verify the batch details match your physical sample</li>
                <li>Upload the Certificate of Analysis (PDF format only)</li>
                <li>Check "Meets Premium Quality Standards" if applicable</li>
                <li>Submit the analysis to update the batch record</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
