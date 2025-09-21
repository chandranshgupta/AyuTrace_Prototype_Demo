"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/header"
import { Plus, Camera, Mic, MapPin, QrCode, Share, RotateCcw } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { redirect } from "next/navigation"
import QRCode from "react-qr-code"

interface HarvestData {
  herbName: string
  season: string
  weight: string
  photo: File | null
  gpsCoordinates: string
  voiceNotes: string
}

interface Batch {
  id: string
  herbName: string
  weight: string
  date: string
  status: string
}

export default function FarmerDashboard() {
  const { user, isLoggedIn } = useAuth()
  const [showHarvestForm, setShowHarvestForm] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [generatedBatchId, setGeneratedBatchId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [harvestData, setHarvestData] = useState<HarvestData>({
    herbName: "",
    season: "",
    weight: "",
    photo: null,
    gpsCoordinates: "Auto-Filled",
    voiceNotes: "",
  })

  // Mock recent batches data
  const recentBatches: Batch[] = [
    { id: "AT001", herbName: "Neem Leaves", weight: "25 kg", date: "2 days ago", status: "Logged" },
    { id: "AT002", herbName: "Turmeric Root", weight: "40 kg", date: "5 days ago", status: "In Transit" },
    { id: "AT003", herbName: "Ashwagandha", weight: "15 kg", date: "1 week ago", status: "Delivered" },
  ]

  if (!isLoggedIn || user?.role !== "farmer") {
    redirect("/login")
  }

  // Mock GPS coordinates fetch
  const fetchGPSCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`
          setHarvestData((prev) => ({ ...prev, gpsCoordinates: coords }))
        },
        () => {
          setHarvestData((prev) => ({ ...prev, gpsCoordinates: "Location access denied" }))
        },
      )
    }
  }

  // Mock voice input
  const startVoiceInput = () => {
    setIsListening(true)

    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      const recognition = new SpeechRecognition()

      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = "en-US"

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setHarvestData((prev) => ({ ...prev, voiceNotes: transcript }))

        // Try to extract weight from voice input
        const weightMatch = transcript.match(/(\d+)\s*(kg|kilogram)/i)
        if (weightMatch) {
          setHarvestData((prev) => ({ ...prev, weight: weightMatch[1] }))
        }
      }

      recognition.onerror = () => {
        setHarvestData((prev) => ({ ...prev, voiceNotes: "Voice input failed" }))
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.start()
    } else {
      setHarvestData((prev) => ({ ...prev, voiceNotes: "Voice input not supported" }))
      setIsListening(false)
    }
  }

  const handlePhotoCapture = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setHarvestData((prev) => ({ ...prev, photo: file }))
    }
  }

  const handleSubmitHarvest = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate mock batch ID
    const batchId = `AT${String(Date.now()).slice(-6)}`
    setGeneratedBatchId(batchId)

    setIsSubmitting(false)
    setShowHarvestForm(false)
    setShowConfirmation(true)
  }

  const resetForm = () => {
    setHarvestData({
      herbName: "",
      season: "",
      weight: "",
      photo: null,
      gpsCoordinates: "Auto-Filled",
      voiceNotes: "",
    })
    setShowHarvestForm(false)
    setShowConfirmation(false)
    setGeneratedBatchId(null)
  }

  const logAnotherHarvest = () => {
    resetForm()
    setShowHarvestForm(true)
  }

  // Auto-fetch GPS on form open
  if (showHarvestForm && harvestData.gpsCoordinates === "Auto-Filled") {
    fetchGPSCoordinates()
  }

  if (showConfirmation && generatedBatchId) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <div className="text-green-600 text-6xl">✓</div>
              <h1 className="text-3xl font-bold text-gray-900">Success! Batch Logged.</h1>
            </div>

            <Card className="p-8">
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <QRCode value={`https://ayur-tracedemo.vercel.app/batch/${generatedBatchId}`} size={200} />
                  </div>
                </div>

                <div className="space-y-2 text-left">
                  <h3 className="font-semibold text-lg">Batch Summary:</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Herb:</span> {harvestData.herbName}
                    </div>
                    <div>
                      <span className="font-medium">Weight:</span> {harvestData.weight} kg
                    </div>
                    <div className="col-span-2">
                      <span className="font-medium">Batch ID:</span> {generatedBatchId}
                    </div>
                    <div className="col-span-2">
                      <span className="font-medium">Timestamp:</span> {new Date().toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button className="flex-1 bg-transparent" variant="outline">
                    <Share className="h-4 w-4 mr-2" />
                    Share QR Code
                  </Button>
                  <Button className="flex-1" onClick={logAnotherHarvest}>
                    <Plus className="h-4 w-4 mr-2" />
                    Log Another Harvest
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (showHarvestForm) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">New Harvest Log</h1>
              <Button variant="outline" onClick={() => setShowHarvestForm(false)}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>

            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="herbName">Herb Name</Label>
                    <Select
                      value={harvestData.herbName}
                      onValueChange={(value) => setHarvestData((prev) => ({ ...prev, herbName: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select herb" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="neem">Neem Leaves</SelectItem>
                        <SelectItem value="turmeric">Turmeric Root</SelectItem>
                        <SelectItem value="ashwagandha">Ashwagandha</SelectItem>
                        <SelectItem value="brahmi">Brahmi</SelectItem>
                        <SelectItem value="tulsi">Tulsi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="season">Season</Label>
                    <Select
                      value={harvestData.season}
                      onValueChange={(value) => setHarvestData((prev) => ({ ...prev, season: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select season" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="spring">Spring</SelectItem>
                        <SelectItem value="summer">Summer</SelectItem>
                        <SelectItem value="monsoon">Monsoon</SelectItem>
                        <SelectItem value="winter">Winter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="Enter weight in kg"
                    value={harvestData.weight}
                    onChange={(e) => setHarvestData((prev) => ({ ...prev, weight: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Harvest Photo</Label>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-16 bg-transparent"
                    onClick={handlePhotoCapture}
                  >
                    <Camera className="h-6 w-6 mr-2" />
                    {harvestData.photo ? `Photo Selected: ${harvestData.photo.name}` : "Take Photo of Harvest"}
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gps">GPS Coordinates</Label>
                  <div className="flex items-center gap-2">
                    <Input id="gps" value={harvestData.gpsCoordinates} readOnly className="bg-gray-50" />
                    <Button variant="outline" size="sm" onClick={fetchGPSCoordinates}>
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Voice Notes</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      value={harvestData.voiceNotes}
                      onChange={(e) => setHarvestData((prev) => ({ ...prev, voiceNotes: e.target.value }))}
                      placeholder="Voice notes will appear here..."
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={startVoiceInput}
                      disabled={isListening}
                      className={isListening ? "animate-pulse bg-red-50" : ""}
                    >
                      <Mic className={`h-4 w-4 ${isListening ? "text-red-500" : ""}`} />
                    </Button>
                  </div>
                  {isListening && <p className="text-sm text-red-600">Listening... Speak now</p>}
                </div>

                <Button
                  onClick={handleSubmitHarvest}
                  disabled={isSubmitting || !harvestData.herbName || !harvestData.weight}
                  className="w-full h-12 text-lg font-semibold"
                >
                  {isSubmitting ? (
                    "Generating QR Code..."
                  ) : (
                    <>
                      <QrCode className="h-5 w-5 mr-2" />
                      Submit & Generate QR
                    </>
                  )}
                </Button>
              </CardContent>
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome, {user?.name}</h1>
            <p className="text-gray-600">Manage your harvest logs and track your batches</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Action */}
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <CardContent className="p-8 text-center">
                  <Button
                    onClick={() => setShowHarvestForm(true)}
                    size="lg"
                    className="h-16 px-8 text-lg font-semibold"
                  >
                    <Plus className="h-6 w-6 mr-3" />
                    Log New Harvest
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Batches */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Batches</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBatches.map((batch) => (
                      <div key={batch.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <QrCode className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{batch.herbName}</h3>
                            <p className="text-sm text-gray-500">
                              ID: {batch.id} • {batch.weight}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">{batch.date}</div>
                          <div
                            className={`text-xs px-2 py-1 rounded-full ${
                              batch.status === "Logged"
                                ? "bg-blue-100 text-blue-800"
                                : batch.status === "In Transit"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                            }`}
                          >
                            {batch.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Batches</span>
                    <span className="font-semibold">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">This Month</span>
                    <span className="font-semibold">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Premium Quality</span>
                    <span className="font-semibold text-green-600">18</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Use voice input for faster logging</li>
                    <li>• Take clear photos of your harvest</li>
                    <li>• Ensure GPS is enabled for location tracking</li>
                    <li>• Log harvests immediately after collection</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
