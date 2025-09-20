import { Card } from "@/components/ui/card"
import { Shield, MapPin, Users, Smartphone, Award, Leaf } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Blockchain Security",
    description: "Immutable records ensure complete authenticity and prevent tampering of herb data.",
    color: "text-primary",
  },
  {
    icon: MapPin,
    title: "GPS Tracking",
    description: "Real-time location tracking from farm to your doorstep with precise coordinates.",
    color: "text-secondary",
  },
  {
    icon: Users,
    title: "Farmer Profiles",
    description: "Meet the farmers behind your herbs and learn about their sustainable practices.",
    color: "text-accent",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Easy-to-use mobile interface for both farmers and consumers to access information.",
    color: "text-primary",
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description: "Comprehensive testing and certification at every stage of the supply chain.",
    color: "text-secondary",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "Promoting organic farming practices and environmental responsibility.",
    color: "text-accent",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance">Why Choose AyuTrace?</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Our comprehensive traceability system ensures you get the highest quality Ayurvedic herbs with complete
            transparency and authenticity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-muted ${feature.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground text-pretty">{feature.description}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
