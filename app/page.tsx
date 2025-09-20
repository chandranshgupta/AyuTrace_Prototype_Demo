import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { QRScanner } from "@/components/qr-scanner"
import { CertificateSection } from "@/components/certificate-section"
import { FeaturesSection } from "@/components/features-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <QRScanner />
        <CertificateSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  )
}
