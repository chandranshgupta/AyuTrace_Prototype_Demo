import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, User, Truck, Package, CheckCircle, ExternalLink } from "lucide-react"

interface TraceabilityResultsProps {
  batchId: string
}

// Mock data for demonstration
const mockData = {
  "AYU-TUL-2024-001": {
    herbName: "Organic Turmeric",
    herbType: "Curcuma longa",
    status: "Delivered",
    farmer: {
      name: "Rajesh Kumar",
      location: "Wayanad, Kerala",
      experience: "15 years",
      certification: "Organic Certified",
    },
    journey: [
      {
        stage: "Harvested",
        date: "2024-01-15",
        location: "Organic Farm, Wayanad",
        details: "Hand-picked at optimal maturity",
        icon: User,
      },
      {
        stage: "Processed",
        date: "2024-01-16",
        location: "Processing Unit, Wayanad",
        details: "Sun-dried and cleaned",
        icon: Package,
      },
      {
        stage: "Quality Tested",
        date: "2024-01-18",
        location: "Lab, Kochi",
        details: "Curcumin content: 6.2%",
        icon: CheckCircle,
      },
      {
        stage: "Shipped",
        date: "2024-01-20",
        location: "Distribution Center",
        details: "Temperature controlled transport",
        icon: Truck,
      },
      {
        stage: "Delivered",
        date: "2024-01-22",
        location: "Your Location",
        details: "Package delivered safely",
        icon: MapPin,
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
  const data = mockData[batchId as keyof typeof mockData]

  if (!data) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">No traceability data found for batch ID: {batchId}</p>
        <p className="text-sm text-muted-foreground mt-2">Please check the batch ID and try again.</p>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-primary">{data.herbName}</h3>
        <p className="text-muted-foreground italic">{data.herbType}</p>
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          {data.status}
        </Badge>
      </div>

      {/* Farmer Info */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 space-y-2">
            <h4 className="font-semibold">Grown by {data.farmer.name}</h4>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {data.farmer.location}
            </div>
            <div className="flex gap-4 text-sm">
              <span className="text-muted-foreground">
                Experience: <span className="text-foreground">{data.farmer.experience}</span>
              </span>
              <Badge variant="outline" className="text-xs">
                {data.farmer.certification}
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Journey Timeline */}
      <Card className="p-6">
        <h4 className="font-semibold mb-4">Journey Timeline</h4>
        <div className="space-y-4">
          {data.journey.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  {index < data.journey.length - 1 && <div className="w-px h-8 bg-border mt-2" />}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <h5 className="font-medium">{step.stage}</h5>
                    <Badge variant="outline" className="text-xs">
                      {step.date}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{step.location}</p>
                  <p className="text-sm">{step.details}</p>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Quality Metrics */}
      <Card className="p-6">
        <h4 className="font-semibold mb-4">Quality Metrics</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Curcumin Content</p>
            <p className="font-semibold text-primary">{data.quality.curcumin}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Moisture Level</p>
            <p className="font-semibold">{data.quality.moisture}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Purity</p>
            <p className="font-semibold text-primary">{data.quality.purity}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Pesticides</p>
            <p className="font-semibold text-secondary">{data.quality.pesticides}</p>
          </div>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Button className="flex-1">
          <ExternalLink className="mr-2 h-4 w-4" />
          View Certificate
        </Button>
        <Button variant="outline" className="flex-1 bg-transparent">
          Contact Farmer
        </Button>
      </div>
    </div>
  )
}
