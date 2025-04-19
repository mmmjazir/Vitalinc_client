import type React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

type Props = {
  services: string[]
}

const ServiceSection: React.FC<Props> = ({ services }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="overflow-hidden shadow-lg">
          <CardTitle className="text-xl p-4 font-semibold text-myPrimary font-Arimo flex items-center">
            Services Offered
          </CardTitle>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center bg-purple-50 rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
              >
                <div className="bg-purple-100 rounded-full p-2 mr-3">
                  <Check className="h-4 w-4 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">{service}</span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default ServiceSection

