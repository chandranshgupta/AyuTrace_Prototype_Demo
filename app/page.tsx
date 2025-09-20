import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { QRScanner } from "@/components/qr-scanner"
import { FeaturesSection } from "@/components/features-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <QRScanner />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  )
}
