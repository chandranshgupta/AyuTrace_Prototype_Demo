"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  User,
  Truck,
  Package,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Beaker,
  FileText,
  Phone,
  Mail,
} from "lucide-react"
import { useState } from "react"
import { CertificateModal } from "./certificate-modal"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface TraceabilityResultsProps {
  batchId: string
}

const certificateData = {
  "Farmer Harvest": {
    id: "CERT-HARV-8A3B-2025015",
    type: "Certificate of Farmer Harvest",
    issueDate: "2025-01-15",
    productName: "Organic Turmeric",
    botanicalName: "Curcuma longa",
    batchId: "AYU-TUL-2025-001",
    result: "APPROVED",
    details: {
      "Farmer Name": "Rajesh Kumar (15 years experience)",
      "Farm Location": "Wayanad Organics, Kerala, India",
      Coordinates: "11.6854, 76.1320",
      "Certification Body": "IND-ORG-2501-118",
      "Harvest Method": "Hand-picked at optimal maturity during early morning hours",
      "Quality Indicators": "Size, color, and maturity indicators verified",
      "Data Logging": "Real-time logging for data integrity",
    },
    verification: {
      blockchainVerified: true,
      qrCode: "AYU-ORG-2501-2001",
    },
    authorization: {
      name: "Dr. Anjali Verma",
      title: "Head of Quality Assurance, AyuTrace",
      signature: "AV",
    },
  },
  "Supply to Lab": {
    id: "CERT-HARV-943B-2025-202416",
    type: "Certificate of Transport",
    issueDate: "2025-01-16",
    productName: "Organic Turmeric",
    botanicalName: "Curcuma longa",
    batchId: "AYU-TUL-2025-001",
    result: "COMPLETED",
    details: {
      Transporter: "Kerala AgriLogistics (Vehicle ID KL-86-BQ-5541)",
      Route: "Wayanad Organics, Kerala to Ayurvedic Quality Lab, Kochi, Kerala",
      "Dispatched On": "2025-01-16 08:00:00 UTC",
      "Expected Delivery": "2025-01-16 14:00:00 UTC",
      "Transport Method": "Temperature-controlled transport maintaining 18-22°C",
      "GPS Tracking": "Enabled throughout the journey",
      "Container Security": "Sealed containers to prevent contamination",
    },
    verification: {
      blockchainVerified: true,
      qrCode: "AYU-ORG-2501-2001",
    },
    authorization: {
      name: "Dr. Anjali Verma",
      title: "Head of Quality Assurance, AyuTrace",
      signature: "AV",
    },
  },
  "Lab Research & Testing": {
    id: "CERT-HARV-8A3B-20250319",
    type: "Certificate of Lab Analysis",
    issueDate: "2025-01-18",
    productName: "Organic Turmeric",
    botanicalName: "Curcuma longa",
    batchId: "AYU-TUL-2025-001",
    result: "PASS",
    details: {
      "Testing Lab": "Kerala Ayurvedic Quality Lab",
      "Curcumin Content (HPLC)": "6.5%",
      "Moisture Level": "8.5%",
      "Heavy Metals (ICP-MS)": "Within limits",
      "Pesticide Residue (GC-MS)": "Not Detected",
      Aflatoxins: "<4.01 ppm",
      Purity: "99.8%",
      "FSSAI Compliance": "As per FSSAI limits",
    },
    verification: {
      blockchainVerified: true,
      qrCode: "AYU-ORG-2501-2001",
    },
    authorization: {
      name: "Dr. Anjali Verma",
      title: "Head of Quality Assurance, AyuTrace",
      signature: "AV",
    },
  },
  "Results & Quality Approval": {
    id: "CERT-HARV-444S-2025-202419",
    type: "Certificate of Quality Approval",
    issueDate: "2025-01-19",
    productName: "Organic Turmeric",
    botanicalName: "Curcuma longa",
    batchId: "AYU-TUL-2025-001",
    result: "APPROVED",
    details: {
      "Quality Grade": "Premium A+",
      "Ayurvedic Standards": "Compliant with API standards",
      "Quality Parameters": "All parameters meet Ayurvedic standards",
      "Distribution Approval": "Approved for consumer packaging",
      "Shelf Life": "24 months",
      "Storage Conditions": "Store in cool, dry place",
      "Final Inspection": "Passed all quality stages",
    },
    verification: {
      blockchainVerified: true,
      qrCode: "AYU-ORG-2501-2001",
    },
    authorization: {
      name: "Dr. Anjali Verma",
      title: "Head of Quality Assurance, AyuTrace",
      signature: "AV",
    },
  },
  "Soil Analysis": {
    id: "CERT-SOIL-F6G7-2024805",
    type: "Certificate of Soil Analysis",
    issueDate: "2024-08-05",
    productName: "Farm Soil Analysis",
    botanicalName: "Curcuma longa cultivation",
    batchId: "AYU-TUL-2025-001",
    result: "OPTIMAL",
    details: {
      "Farm Name": "Wayanad Organics Collective",
      "Plot ID": "WYD-ORG-PLOT-04B",
      "Lab Name": "Kerala Agri-Soil Diagnostics Lab",
      "pH Level": "6.8 (6.0-7.5 optimal range)",
      "Organic Carbon": ">10% (High)",
      "Nitrogen (N)": "250 kg/ha",
      "Phosphorus (P)": ">20-30 kg/ha",
      "Heavy Metals": "Below Permissible Limits",
      "Pesticide Residue": "Not Detected",
      "Overall Assessment": "Soil composition is ideal for organic cultivation",
    },
    verification: {
      blockchainVerified: true,
      qrCode: "AYU-ORG-2501-2001",
    },
    authorization: {
      name: "Dr. Anjali Verma",
      title: "Head of Quality Assurance, AyuTrace",
      signature: "AV",
    },
  },
}

// Mock data for demonstration
const mockData = {
  "AYU-TUL-2025-001": {
    herbName: "Organic Turmeric",
    herbType: "Curcuma longa",
    status: "In Transit to Consumer",
    completionPercentage: 67, // 2/3 completed
    farmer: {
      name: "Rajesh Kumar",
      location: "Wayanad, Kerala",
      experience: "15 years",
      certification: "Organic Certified",
    },
    journey: [
      {
        stage: "Farmer Harvest",
        date: "2025-01-15",
        location: "Organic Farm, Wayanad",
        status: "completed",
        details:
          "Hand-picked at optimal maturity during early morning hours. Turmeric rhizomes were carefully selected based on size, color, and maturity indicators.",
        icon: User,
        certificate: "Harvest Certificate",
        additionalInfo: {
          "Harvest Method": "Hand-picked",
          "Weather Conditions": "Sunny, 28°C",
          "Soil pH": "6.2",
          "Organic Certification": "Valid until Dec 2025",
        },
      },
      {
        stage: "Supply to Lab",
        date: "2025-01-16",
        location: "Transport to Quality Lab, Kochi",
        status: "completed",
        details: "Temperature-controlled transport maintaining 18-22°C. GPS tracking enabled throughout the journey.",
        icon: Truck,
        certificate: "Transport Certificate",
        additionalInfo: {
          "Transport Duration": "4 hours",
          "Temperature Range": "18-22°C",
          "Vehicle ID": "KL-07-AB-1234",
          Driver: "Suresh Nair",
        },
      },
      {
        stage: "Lab Research & Testing",
        date: "2025-01-18",
        location: "Ayurvedic Quality Lab, Kochi",
        status: "completed",
        details:
          "Comprehensive analysis including curcumin content, moisture levels, heavy metals, and pesticide residue testing.",
        icon: Beaker,
        certificate: "Lab Analysis Report",
        additionalInfo: {
          "Curcumin Content": "6.2%",
          "Moisture Level": "8.5%",
          "Heavy Metals": "Within limits",
          "Pesticide Residue": "Not detected",
        },
      },
      {
        stage: "Results & Quality Approval",
        date: "2025-01-19",
        location: "Quality Assurance Department",
        status: "completed",
        details: "All quality parameters meet Ayurvedic standards. Product approved for consumer distribution.",
        icon: CheckCircle,
        certificate: "Quality Approval Certificate",
        additionalInfo: {
          "Quality Grade": "Premium A+",
          "Ayurvedic Standards": "Compliant",
          "Shelf Life": "24 months",
          "Approved By": "Dr. Priya Menon",
        },
      },
      {
        stage: "Supply to Consumer",
        date: "2025-01-20",
        location: "Distribution Center, Bangalore",
        status: "in-progress",
        details: "Package prepared and dispatched. Currently in transit via express delivery service.",
        icon: Package,
        certificate: null,
        additionalInfo: {
          "Tracking ID": "AYU123456789",
          "Expected Delivery": "2025-01-22",
          "Delivery Partner": "Express Herbs Delivery",
          "Current Location": "Bangalore Hub",
        },
      },
      {
        stage: "Consumer Received",
        date: "Expected: 2025-01-22",
        location: "Your Location",
        status: "pending",
        details: "Awaiting delivery confirmation from consumer.",
        icon: MapPin,
        certificate: null,
        additionalInfo: {},
      },
    ],
    quality: {
      curcumin: "6.2%",
      moisture: "8.5%",
      purity: "99.8%",
      pesticides: "Not Detected",
    },
  },
}

export function TraceabilityResults({ batchId }: TraceabilityResultsProps) {
  const [expandedStages, setExpandedStages] = useState<number[]>([])
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null)
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  const data = mockData[batchId as keyof typeof mockData]

  const toggleStageExpansion = (index: number) => {
    setExpandedStages((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const viewCertificate = (stageName: string) => {
    const certificate = certificateData[stageName as keyof typeof certificateData]
    if (certificate) {
      setSelectedCertificate(certificate)
      setIsCertificateModalOpen(true)
    }
  }

  const viewSoilCertificate = () => {
    const soilCertificate = certificateData["Soil Analysis"]
    setSelectedCertificate(soilCertificate)
    setIsCertificateModalOpen(true)
  }

  const openContactModal = () => {
    setIsContactModalOpen(true)
  }

  if (!data) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">No traceability data found for batch ID: {batchId}</p>
        <p className="text-sm text-muted-foreground mt-2">Please check the batch ID and try again.</p>
      </Card>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header with Progress */}
      <div className="text-center space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-primary">{data.herbName}</h3>
        <p className="text-muted-foreground italic text-sm sm:text-base">{data.herbType}</p>
        <Badge variant="secondary" className="bg-primary/10 text-primary text-xs sm:text-sm">
          {data.status}
        </Badge>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-muted-foreground">Journey Progress</span>
            <span className="font-semibold">{data.completionPercentage}% Complete</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${data.completionPercentage}%` }}
            />
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">4 of 6 stages completed</p>
        </div>
      </div>

      {/* Farmer Info */}
      <Card className="p-4 sm:p-6">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary/10">
            <User className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <div className="flex-1 space-y-2">
            <h4 className="font-semibold text-sm sm:text-base">Grown by {data.farmer.name}</h4>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
              {data.farmer.location}
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-xs sm:text-sm">
              <span className="text-muted-foreground">
                Experience: <span className="text-foreground">{data.farmer.experience}</span>
              </span>
              <Badge variant="outline" className="text-xs w-fit">
                {data.farmer.certification}
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4 sm:p-6">
        <h4 className="font-semibold mb-4 text-sm sm:text-base">Detailed Journey Timeline</h4>
        <div className="space-y-3 sm:space-y-4">
          {data.journey.map((step, index) => {
            const Icon = step.icon
            const isExpanded = expandedStages.includes(index)
            const statusColor =
              step.status === "completed"
                ? "text-green-600"
                : step.status === "in-progress"
                  ? "text-blue-600"
                  : "text-muted-foreground"
            const bgColor =
              step.status === "completed"
                ? "bg-green-100"
                : step.status === "in-progress"
                  ? "bg-blue-100"
                  : "bg-muted/50"

            return (
              <div key={index} className="border rounded-lg p-3 sm:p-4">
                <div className="flex gap-3 sm:gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full ${bgColor}`}>
                      <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${statusColor}`} />
                    </div>
                    {index < data.journey.length - 1 && <div className="w-px h-6 sm:h-8 bg-border mt-2" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2 gap-2">
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 min-w-0">
                        <h5 className="font-medium text-sm sm:text-base truncate">{step.stage}</h5>
                        <Badge
                          variant={
                            step.status === "completed"
                              ? "default"
                              : step.status === "in-progress"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {step.status === "completed"
                            ? "Completed"
                            : step.status === "in-progress"
                              ? "In Progress"
                              : "Pending"}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {step.date}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleStageExpansion(index)}
                        className="h-6 w-6 sm:h-8 sm:w-8 p-0 flex-shrink-0"
                      >
                        {isExpanded ? (
                          <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4" />
                        ) : (
                          <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-1">{step.location}</p>
                    <p className="text-xs sm:text-sm">{step.details}</p>

                    {step.certificate && step.status === "completed" && (
                      <div className="mt-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => viewCertificate(step.stage)}
                          className="text-xs w-full sm:w-auto"
                        >
                          <FileText className="h-3 w-3 mr-1" />
                          View {step.certificate}
                        </Button>
                      </div>
                    )}

                    {/* Expanded Details */}
                    {isExpanded && Object.keys(step.additionalInfo).length > 0 && (
                      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                        <h6 className="text-xs sm:text-sm font-medium mb-2">Additional Details:</h6>
                        <div className="grid grid-cols-1 gap-2 text-xs sm:text-sm">
                          {Object.entries(step.additionalInfo).map(([key, value]) => (
                            <div key={key} className="flex flex-col sm:flex-row sm:justify-between gap-1">
                              <span className="text-muted-foreground font-medium">{key}:</span>
                              <span className="font-medium">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Quality Metrics */}
      <Card className="p-4 sm:p-6">
        <h4 className="font-semibold mb-4 text-sm sm:text-base">Quality Metrics</h4>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-1">
            <p className="text-xs sm:text-sm text-muted-foreground">Curcumin Content</p>
            <p className="font-semibold text-primary text-sm sm:text-base">{data.quality.curcumin}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs sm:text-sm text-muted-foreground">Moisture Level</p>
            <p className="font-semibold text-sm sm:text-base">{data.quality.moisture}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs sm:text-sm text-muted-foreground">Purity</p>
            <p className="font-semibold text-primary text-sm sm:text-base">{data.quality.purity}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs sm:text-sm text-muted-foreground">Pesticides</p>
            <p className="font-semibold text-secondary text-sm sm:text-base">{data.quality.pesticides}</p>
          </div>
        </div>
      </Card>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button className="flex-1" onClick={viewSoilCertificate}>
          <FileText className="mr-2 h-4 w-4" />
          View Soil Certificate
        </Button>
        <Button variant="outline" className="flex-1 bg-transparent" onClick={openContactModal}>
          <User className="mr-2 h-4 w-4" />
          Contact Farmer
        </Button>
      </div>

      {/* Contact Farmer Modal */}
      <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
        <DialogContent className="sm:max-w-md mx-4">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
              <User className="h-5 w-5 text-primary" />
              Contact Farmer
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-muted/50 rounded-lg">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary/10">
                <User className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-sm sm:text-base">Rajesh Kumar</h4>
                <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  Wayanad, Kerala
                </div>
                <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                  <Phone className="h-3 w-3" />
                  +91 9XXX5X1XX3
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs sm:text-sm text-muted-foreground">
                <strong>Experience:</strong> 15 years in organic farming
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                <strong>Certification:</strong> Organic Certified
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                <strong>Farm:</strong> Wayanad Organics Collective
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button className="flex-1" size="sm">
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent" size="sm">
                <Mail className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <CertificateModal
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
        certificate={selectedCertificate}
      />
    </div>
  )
}
