"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Header } from "@/components/header"
import { QrCode, CheckCircle, Package } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { redirect } from "next/navigation"

interface BatchData {
  id: string
  herbName: string
  currentHolder: string
  weight: string
  status: string
}

export default function LogisticsPartnerDashboard() {
  const { user, isLoggedIn } = useAuth()
  const [batchId, setBatchId] = useState("")
  const [foundBatch, setFoundBatch] = useState<BatchData | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [confirmedBatchId, setConfirmedBatchId] = useState("")

  if (!isLoggedIn || user?.role !== "logistics") {
    redirect("/login")
  }

  // Mock batch data
  const mockBatches: Record<string, BatchData> = {
    AT001: {
      id: "AT001",
      herbName: "Neem Leaves",
      currentHolder: "Prakash Farms",
      weight: "25 kg",
      status: "Ready for Pickup",
    },
    AT002: {
      id: "AT002",
      herbName: "Turmeric Root",
      currentHolder: "Green Valley Cooperative",
      weight: "40 kg",
      status: "Ready for Pickup",
    },
    AT003: {
      id: "AT003",
      herbName: "Ashwagandha",
      currentHolder: "Organic Herbs Ltd",
      weight: "15 kg",
      status: "Ready for Pickup",
    },
  }

  const handleScanQR = async () => {
    setIsScanning(true)

    // Simulate QR scanning process
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock scanned batch ID
    const scannedId = "AT001"
    setBatchId(scannedId)

    // Fetch batch details
    const batch = mockBatches[scannedId]
    if (batch) {
      setFoundBatch(batch)
    } else {
      alert("Batch not found. Please try again.")
      setFoundBatch(null)
    }

    setIsScanning(false)
  }

  const handleManualEntry = async () => {
    if (!batchId.trim()) return

    const batch = mockBatches[batchId.toUpperCase()]
    if (batch) {
      setFoundBatch(batch)
    } else {
      alert("Batch not found. Please check the ID and try again.")
      setFoundBatch(null)
    }
  }

  const handleConfirmPickup = async () => {
    if (!foundBatch) return

    setIsConfirming(true)

    // Simulate API call to update custody
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setConfirmedBatchId(foundBatch.id)
    setShowSuccess(true)
    setIsConfirming(false)

    // Auto-reset after 3 seconds
    setTimeout(() => {
      resetForm()
    }, 3000)
  }

  const resetForm = () => {
    setBatchId("")
    setFoundBatch(null)
    setShowSuccess(false)
    setConfirmedBatchId("")
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto text-center">
            <Card className="p-8">
              <div className="space-y-6">
                <div className="text-green-600">
                  <CheckCircle className="h-20 w-20 mx-auto" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Custody Confirmed for Batch {confirmedBatchId}</h1>
                <p className="text-gray-600">Automatically returning to scan screen...</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (foundBatch) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Logistics & Custody Transfer</h1>
              <p className="text-gray-600">Logged in as: {user?.name}</p>
            </div>

            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Confirm Transfer Details</h2>

                <div className="space-y-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <span className="font-medium text-blue-800">Herb:</span>
                        <p className="text-blue-700 text-lg">{foundBatch.herbName}</p>
                      </div>
                      <div>
                        <span className="font-medium text-blue-800">Current Holder:</span>
                        <p className="text-blue-700 text-lg">{foundBatch.currentHolder}</p>
                      </div>
                      <div>
                        <span className="font-medium text-blue-800">Weight:</span>
                        <p className="text-blue-700 text-lg">{foundBatch.weight}</p>
                      </div>
                      <div>
                        <span className="font-medium text-blue-800">Batch ID:</span>
                        <p className="text-blue-700 text-lg font-mono">{foundBatch.id}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={handleConfirmPickup}
                    disabled={isConfirming}
                    className="w-full h-14 text-lg font-semibold bg-green-600 hover:bg-green-700"
                  >
                    <Package className="h-5 w-5 mr-2" />
                    {isConfirming ? "Confirming Pickup..." : "Confirm Pickup & Take Custody"}
                  </Button>

                  <Button variant="outline" onClick={resetForm} className="w-full bg-transparent">
                    Cancel
                  </Button>
                </div>
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
        <div className="max-w-md mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Logistics & Custody Transfer</h1>
            <p className="text-gray-600">Logged in as: {user?.name}</p>
          </div>

          {/* Primary Scan Action */}
          <Card className="mb-6">
            <CardContent className="p-8 text-center">
              <Button
                onClick={handleScanQR}
                disabled={isScanning}
                className="w-full h-20 text-xl font-semibold bg-orange-600 hover:bg-orange-700"
                size="lg"
              >
                <QrCode className="h-8 w-8 mr-3" />
                {isScanning ? "Scanning..." : "Scan Batch QR Code"}
              </Button>
            </CardContent>
          </Card>

          {/* Manual Entry Fallback */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="manualBatchId" className="text-sm text-gray-600">
                    Or enter Batch ID manually:
                  </Label>
                  <Input
                    id="manualBatchId"
                    placeholder="e.g., AT001"
                    value={batchId}
                    onChange={(e) => setBatchId(e.target.value.toUpperCase())}
                    onKeyPress={(e) => e.key === "Enter" && handleManualEntry()}
                    className="mt-2"
                  />
                </div>
                <Button
                  onClick={handleManualEntry}
                  disabled={!batchId.trim()}
                  variant="outline"
                  className="w-full bg-transparent"
                >
                  Find Batch
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Scan the QR code on the batch packaging or enter the Batch ID manually to begin custody transfer.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
