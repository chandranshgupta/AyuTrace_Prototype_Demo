"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, ExternalLink } from "lucide-react"

interface CertificateData {
  id: string
  type: string
  issueDate: string
  productName: string
  botanicalName: string
  batchId: string
  result: string
  details: Record<string, string>
  verification: {
    blockchainVerified: boolean
    qrCode: string
  }
  authorization: {
    name: string
    title: string
    signature: string
  }
}

interface CertificateModalProps {
  isOpen: boolean
  onClose: () => void
  certificate: CertificateData | null
}

const certificateDownloadLinks: Record<string, string> = {
  "Certificate of Farmer Harvest": "https://drive.google.com/uc?export=download&id=1OrKAFOjY_G-tHxRjSfhQfyGPFFH64g_j",
  "Certificate of Transport": "https://drive.google.com/uc?export=download&id=1n7pEVJw2OVDSXv7uXwVR_NZ5kEwqg8TI",
  "Certificate of Lab Analysis": "https://drive.google.com/uc?export=download&id=1JU5p83FhcTwgNBcK0WmlwB8J6TXZkXBb",
  "Certificate of Quality Approval": "https://drive.google.com/uc?export=download&id=1A1UJel5xyWBBBJGYpHS4gb8PdFFJtjzf",
  "Certificate of Soil Analysis": "https://drive.google.com/uc?export=download&id=1kPWDwRsuY0cE93XBF0ZgAbuqxj34CiO4",
}

export function CertificateModal({ isOpen, onClose, certificate }: CertificateModalProps) {
  if (!certificate) return null

  const downloadCertificate = () => {
    const downloadUrl = certificateDownloadLinks[certificate.type]
    if (downloadUrl) {
      // Create a temporary link element and trigger download
      const link = document.createElement("a")
      link.href = downloadUrl
      link.target = "_blank"
      link.rel = "noopener noreferrer"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      // Fallback for certificates without Google Drive links
      alert(`Downloading ${certificate.type} certificate`)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto mx-4 sm:mx-auto">
        <DialogHeader>
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-primary">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm">A</span>
              </div>
              <span className="text-lg sm:text-xl font-bold">AyuTrace</span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">Immutable Purity & Provenance</p>
            <DialogTitle className="text-base sm:text-lg font-semibold text-primary">{certificate.type}</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 border rounded-lg bg-gradient-to-br from-green-50 to-emerald-50">
          {/* Certificate Header */}
          <div className="text-center space-y-2">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 text-xs sm:text-sm">
              <span>
                CERTIFICATE ID: <strong className="break-all">{certificate.id}</strong>
              </span>
              <span>
                ISSUE DATE: <strong>{certificate.issueDate}</strong>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              This document certifies that the batch detailed below was processed in accordance with AyuTrace's quality
              and traceability standards.
            </p>
          </div>

          {/* Product Details */}
          <div className="space-y-3">
            <h4 className="font-semibold text-primary text-sm sm:text-base">PRODUCT DETAILS</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
              <div>
                <span className="text-muted-foreground">Product Name:</span>
                <p className="font-medium">{certificate.productName}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Botanical Name:</span>
                <p className="font-medium italic">{certificate.botanicalName}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Batch ID:</span>
                <p className="font-medium">{certificate.batchId}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Result:</span>
                <Badge
                  variant={certificate.result === "PASS" || certificate.result === "APPROVED" ? "default" : "secondary"}
                  className={`text-xs ${certificate.result === "PASS" || certificate.result === "APPROVED" ? "bg-green-600" : ""}`}
                >
                  {certificate.result}
                </Badge>
              </div>
            </div>
          </div>

          {/* Certificate Specific Details */}
          <div className="space-y-3">
            <h4 className="font-semibold text-primary text-sm sm:text-base">DETAILS & PARAMETERS</h4>
            <div className="grid grid-cols-1 gap-2 text-xs sm:text-sm">
              {Object.entries(certificate.details).map(([key, value]) => (
                <div
                  key={key}
                  className="flex flex-col sm:flex-row sm:justify-between gap-1 py-1 border-b border-muted"
                >
                  <span className="text-muted-foreground font-medium">{key}:</span>
                  <span className="font-medium break-words">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Verification */}
          <div className="space-y-3">
            <h4 className="font-semibold text-primary text-sm sm:text-base">VERIFICATION</h4>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                ✓ Blockchain Verified
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              This certificate and its associated data are cryptographically secured on AyuTrace ledger. The information
              cannot be altered.
            </p>
            <div className="flex items-start gap-2 text-xs">
              <ExternalLink className="h-3 w-3 mt-0.5 flex-shrink-0" />
              <span>Scan QR code to view complete journey of batch {certificate.batchId}</span>
            </div>
          </div>

          {/* Authorization */}
          <div className="space-y-2">
            <h4 className="font-semibold text-primary text-sm sm:text-base">AUTHORIZATION</h4>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-6 sm:w-12 sm:h-8 bg-muted rounded flex items-center justify-center text-xs font-bold flex-shrink-0">
                {certificate.authorization.signature}
              </div>
              <div className="min-w-0">
                <p className="font-medium text-xs sm:text-sm">{certificate.authorization.name}</p>
                <p className="text-xs text-muted-foreground break-words">{certificate.authorization.title}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button onClick={downloadCertificate} className="flex-1">
            <Download className="mr-2 h-4 w-4" />
            Download Certificate
          </Button>
          <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
