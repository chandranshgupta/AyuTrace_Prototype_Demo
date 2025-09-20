import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Shield, MapPin, Users } from "lucide-react"

export function HeroSection() {
  return (
    <section id="home" className="py-12 sm:py-16 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-balance">
                Track Your <span className="text-primary">Ayurvedic Herbs</span> From Farm to You
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground text-pretty max-w-2xl">
                Experience complete transparency in your Ayurvedic herb journey. From the farmer's field to your
                doorstep, every step is verified and traceable with blockchain technology.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button size="lg" className="text-base w-full sm:w-auto">
                Scan QR Code
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-base bg-transparent w-full sm:w-auto">
                Learn More
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-primary">500+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Verified Farmers</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-primary">10K+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Herbs Tracked</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-primary">99.9%</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Authenticity</div>
              </div>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6 order-first lg:order-last">
            <Card className="p-4 sm:p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm sm:text-base">Blockchain Verified</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Every herb batch is recorded on an immutable blockchain ledger
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-6 bg-gradient-to-br from-secondary/5 to-accent/5 border-secondary/20">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-secondary/10">
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-secondary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm sm:text-base">GPS Tracked</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Real-time location tracking from harvest to delivery
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-6 bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-accent/10">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm sm:text-base">Farmer Stories</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Connect with the farmers who grow your herbs
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
