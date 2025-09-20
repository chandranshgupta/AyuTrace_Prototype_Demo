"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { QrCode, Search } from "lucide-react"
import { TraceabilityResults } from "./traceability-results"

export function QRScanner() {
  const [scannedCode, setScannedCode] = useState("")
  const [showResults, setShowResults] = useState(false)

  const handleScan = () => {
    // Simulate QR code scan with demo data
    setScannedCode("AYU-TUL-2024-001")
    setShowResults(true)
  }

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (scannedCode.trim()) {
      setShowResults(true)
    }
  }

  return (
    <section id="scan" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance">Scan & Trace Your Herbs</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Simply scan the QR code on your herb package or enter the batch ID to see its complete journey from farm to
            your hands.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="p-8">
            <div className="space-y-6">
              <div className="text-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                  <QrCode className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Scan QR Code</h3>
                <p className="text-muted-foreground">Point your camera at the QR code on your herb package</p>
              </div>

              <div className="flex justify-center">
                <Button onClick={handleScan} size="lg" className="text-base">
                  Start Camera Scan
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              <form onSubmit={handleManualSearch} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="batch-id" className="text-sm font-medium">
                    Enter Batch ID Manually
                  </label>
                  <div className="flex gap-2">
                    <Input
                      id="batch-id"
                      placeholder="e.g., AYU-TUL-2024-001"
                      value={scannedCode}
                      onChange={(e) => setScannedCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" size="icon">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </form>

              {showResults && (
                <div className="pt-6 border-t border-border">
                  <TraceabilityResults batchId={scannedCode} />
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
