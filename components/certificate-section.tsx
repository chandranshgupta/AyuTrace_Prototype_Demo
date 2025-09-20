import { Shield, Award, CheckCircle, FileText } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function CertificateSection() {
  const certifications = [
    {
      icon: Shield,
      title: "Organic Certified",
      description: "USDA Organic and India Organic certified herbs",
      badge: "CERTIFIED",
    },
    {
      icon: Award,
      title: "Quality Assured",
      description: "ISO 22000 food safety management standards",
      badge: "VERIFIED",
    },
    {
      icon: CheckCircle,
      title: "Lab Tested",
      description: "Third-party laboratory testing for purity",
      badge: "TESTED",
    },
    {
      icon: FileText,
      title: "Blockchain Verified",
      description: "Immutable records on distributed ledger",
      badge: "SECURED",
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-emerald-50/50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Certificates & Verification</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Every herb in our system comes with comprehensive certifications and verification processes to ensure
            authenticity and quality.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {certifications.map((cert, index) => {
            const IconComponent = cert.icon
            return (
              <Card key={index} className="border-emerald-200 hover:border-emerald-300 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-1 rounded-full mb-3">
                    {cert.badge}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{cert.title}</h3>
                  <p className="text-sm text-gray-600">{cert.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="bg-white rounded-xl border border-emerald-200 p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Verification Process</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-emerald-600 text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Farm Registration</h4>
                    <p className="text-gray-600 text-sm">
                      Farmers register with verified credentials and location data
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-emerald-600 text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Harvest Documentation</h4>
                    <p className="text-gray-600 text-sm">Real-time logging with GPS coordinates and timestamps</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-emerald-600 text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Quality Testing</h4>
                    <p className="text-gray-600 text-sm">Laboratory analysis for purity and potency verification</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-emerald-600 text-sm font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Blockchain Recording</h4>
                    <p className="text-gray-600 text-sm">Immutable storage of all verification data</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-10 h-10 text-emerald-600" />
                </div>
                <h4 className="font-bold text-emerald-900 mb-2">100% Verified</h4>
                <p className="text-emerald-700 text-sm mb-4">
                  Every herb batch goes through our comprehensive verification process
                </p>
                <div className="bg-white rounded-lg p-3">
                  <div className="text-2xl font-bold text-emerald-600">99.8%</div>
                  <div className="text-xs text-gray-600">Authenticity Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
