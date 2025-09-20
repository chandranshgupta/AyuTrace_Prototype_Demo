"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { QrCode, Search, Camera, X } from "lucide-react"
import { TraceabilityResults } from "./traceability-results"

export function QRScanner() {
  const [scannedCode, setScannedCode] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [cameraError, setCameraError] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  const startCameraScan = async () => {
    try {
      setCameraError("")
      setIsScanning(true)

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment", // Use back camera if available
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      })

      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()

        // Start scanning for QR codes
        scanForQRCode()
      }
    } catch (error) {
      console.error("Camera access error:", error)
      setCameraError("Camera access denied or not available. Please allow camera access and try again.")
      setIsScanning(false)
    }
  }

  const scanForQRCode = () => {
    const video = videoRef.current
    const canvas = canvasRef.current

    if (!video || !canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    const scan = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        // Simple QR code detection simulation
        // In a real app, you'd use a library like jsQR or qr-scanner
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height)

        // Simulate QR code detection after 3 seconds of scanning
        setTimeout(() => {
          if (isScanning) {
            handleQRCodeDetected("AYU-TUL-2024-001")
          }
        }, 3000)
      }

      if (isScanning) {
        requestAnimationFrame(scan)
      }
    }

    scan()
  }

  const handleQRCodeDetected = (code: string) => {
    setScannedCode(code)
    setShowResults(true)
    stopCamera()
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    setIsScanning(false)
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
              {isScanning ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">Scanning QR Code</h3>
                    <p className="text-muted-foreground mb-4">Point your camera at the QR code</p>
                  </div>

                  <div className="relative bg-black rounded-lg overflow-hidden">
                    <video ref={videoRef} className="w-full h-64 object-cover" playsInline muted />
                    <canvas ref={canvasRef} className="hidden" />

                    {/* Scanning overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-48 h-48 border-2 border-primary rounded-lg relative">
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-primary"></div>
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary"></div>
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-primary"></div>
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-primary"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Button onClick={stopCamera} variant="outline" size="lg">
                      <X className="h-4 w-4 mr-2" />
                      Stop Scanning
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                      <QrCode className="h-12 w-12 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Scan QR Code</h3>
                    <p className="text-muted-foreground">Point your camera at the QR code on your herb package</p>
                  </div>

                  <div className="flex justify-center">
                    <Button onClick={startCameraScan} size="lg" className="text-base">
                      <Camera className="h-4 w-4 mr-2" />
                      Start Camera Scan
                    </Button>
                  </div>

                  {cameraError && (
                    <div className="text-center p-4 bg-destructive/10 text-destructive rounded-lg">
                      <p className="text-sm">{cameraError}</p>
                    </div>
                  )}
                </>
              )}

              {!isScanning && (
                <>
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
                </>
              )}

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
