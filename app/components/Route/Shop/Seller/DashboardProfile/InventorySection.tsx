
// "use client"

// import { Card } from "@/components/ui/card"
// import { Progress } from "@/components/ui/progress"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import type React from "react"
// import { useState } from "react"

// type Props = {
//   inventoryInfo: {
//     total: number
//     available: number
//     unavailable: number
//     regularMedicines: {
//       total: number
//       available: number
//       unavailable: number
//     }
//     variantMedicines: {
//       total: number
//       available: number
//       unavailable: number
//     }
//     packSizes: {
//       total: number
//       available: number
//       unavailable: number
//     }
//     categories: Array<{
//       name: string
//       total: number
//       available: number
//       unavailable: number
//     }>
//   }
// }

// const InventorySection = ({ inventoryInfo }: Props) => {
//   // State for tracking hover on pie chart segments
//   const [hoveredSegment, setHoveredSegment] = useState<{ index: number; x: number; y: number } | null>(null)

//   // Calculate percentages for progress bars
//   const availablePercentage =
//     inventoryInfo.total > 0 ? Math.round((inventoryInfo.available / inventoryInfo.total) * 100) : 0

//   const unavailablePercentage =
//     inventoryInfo.total > 0 ? Math.round((inventoryInfo.unavailable / inventoryInfo.total) * 100) : 0

//   // Colors for the donut chart
//   const categoryColors = ["#3b82f6", "#8b5cf6", "#6366f1", "#ec4899", "#f43f5e"]

//   // Process categories for the pie chart - take top 5 and group the rest as "Others"
//   const MAX_CATEGORIES = 5
//   const processedCategories = [...inventoryInfo.categories].sort((a, b) => b.total - a.total)

//   let displayCategories = []
//   let othersTotal = 0

//   if (processedCategories.length <= MAX_CATEGORIES) {
//     displayCategories = processedCategories
//   } else {
//     displayCategories = processedCategories.slice(0, MAX_CATEGORIES)
//     othersTotal = processedCategories.slice(MAX_CATEGORIES).reduce((sum, cat) => sum + cat.total, 0)

//     if (othersTotal > 0) {
//       displayCategories.push({
//         name: "Others",
//         total: othersTotal,
//         available: 0, // These values aren't used in the chart
//         unavailable: 0,
//       })
//     }
//   }

//   // Calculate total for percentage calculations
//   const categoriesTotal = displayCategories.reduce((sum, cat) => sum + cat.total, 0)

//   // Handle mouse enter for pie segments
//   const handleMouseEnter = (index: number, event: React.MouseEvent<SVGPathElement>) => {
//     // Get the position of the mouse relative to the SVG
//     const svgElement = event.currentTarget.ownerSVGElement
//     if (!svgElement) return

//     const rect = svgElement.getBoundingClientRect()
//     const mouseX = event.clientX - rect.left
//     const mouseY = event.clientY - rect.top

//     setHoveredSegment({ index, x: mouseX, y: mouseY })
//   }

//   return (
//     <Card className="p-6 bg-white shadow-lg rounded-xl">
//       <h2 className="text-2xl font-semibold">Medicine Inventory</h2>

//       <Tabs defaultValue="overview" className="w-full">
//         <TabsList className="mb-4 w-full justify-start">
//           <TabsTrigger value="overview">Overview</TabsTrigger>
//           <TabsTrigger value="categories">Categories</TabsTrigger>
//         </TabsList>

//         <TabsContent value="overview">
//           <div className="text-2xl font-bold">Total Medicines: {inventoryInfo.total}</div>

//           <div className="mt-4 space-y-4">
//             <div>
//               <div className="flex justify-between mb-2">
//                 <span>Available</span>
//                 <span>
//                   {inventoryInfo.available} ({availablePercentage}%)
//                 </span>
//               </div>
//               <Progress className="h-[10px]" value={availablePercentage} indicatorColor="bg-myPrimary" />
//             </div>

//             <div>
//               <div className="flex justify-between mb-2">
//                 <span>Out of Stock</span>
//                 <span>
//                   {inventoryInfo.unavailable} ({unavailablePercentage}%)
//                 </span>
//               </div>
//               <Progress className="h-[10px]" value={unavailablePercentage} indicatorColor="bg-red-600" />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
//               <div className="border rounded-lg p-4">
//                 <h3 className="font-medium mb-2">Regular Medicines</h3>
//                 <div className="text-xl font-semibold">{inventoryInfo.regularMedicines.total}</div>
//                 <div className="text-sm text-muted-foreground">
//                   {inventoryInfo.regularMedicines.available} available / {inventoryInfo.regularMedicines.unavailable}{" "}
//                   out of stock
//                 </div>
//               </div>

//               <div className="border flex justify-between rounded-lg p-4">
//                <div>
//                    <h3 className="font-medium mb-2">Variant Medicines</h3>
//                 <div className="text-xl font-semibold">{inventoryInfo.variantMedicines.total}</div>
//                 <div className="text-sm text-muted-foreground">
//                   {inventoryInfo.variantMedicines.available} available / {inventoryInfo.variantMedicines.unavailable}{" "}
//                   out of stock
//                 </div>
//                </div>
             

//                 {/* Pack Sizes as subsection of Variant Medicines */}
//                 <div className="mt-3 border-l pl-4">
//                   <h4 className="font-medium text-sm mb-1">Pack Sizes</h4>
//                   <div className="text-base font-semibold">{inventoryInfo.packSizes.total}</div>
//                   <div className="text-xs text-muted-foreground">
//                     {inventoryInfo.packSizes.available} available / {inventoryInfo.packSizes.unavailable} out of stock
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </TabsContent>

//         <TabsContent value="categories">
//           <div className="h-96 w-full">
//             <div className="grid grid-cols-1 md:grid-cols-3 h-full gap-4">
//               {/* Pie chart takes 2/3 of the space */}
//               <div className="relative flex items-center justify-center md:col-span-2">
//                 {/* Tooltip that appears on hover */}
//                 {hoveredSegment !== null && (
//                   <div
//                     className="absolute bg-black text-white px-3 py-1 rounded text-sm z-10 pointer-events-none"
//                     style={{
//                       left: `${hoveredSegment.x}px`,
//                       top: `${hoveredSegment.y - 40}px`,
//                     }}
//                   >
//                     <div className="font-medium">{displayCategories[hoveredSegment.index].name}</div>
//                     <div>{displayCategories[hoveredSegment.index].total} items</div>
//                   </div>
//                 )}

//                 <svg viewBox="0 0 100 100" className="w-full max-w-[300px] h-auto">
//                   {displayCategories.map((category, index) => {
//                     const startAngle =
//                       index === 0
//                         ? 0
//                         : displayCategories
//                             .slice(0, index)
//                             .reduce((sum, cat) => sum + (cat.total / categoriesTotal) * 360, 0)

//                     const angle = (category.total / categoriesTotal) * 360
//                     const endAngle = startAngle + angle

//                     const startRad = ((startAngle - 90) * Math.PI) / 180
//                     const endRad = ((endAngle - 90) * Math.PI) / 180

//                     const x1 = 50 + 40 * Math.cos(startRad)
//                     const y1 = 50 + 40 * Math.sin(startRad)
//                     const x2 = 50 + 40 * Math.cos(endRad)
//                     const y2 = 50 + 40 * Math.sin(endRad)

//                     const largeArcFlag = angle > 180 ? 1 : 0

//                     const pathData = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`

//                     // Determine color - use black for "Others" category
//                     const fillColor =
//                       category.name === "Others" ? "#000000" : categoryColors[index % categoryColors.length]

//                     return (
//                       <path
//                         key={category.name}
//                         d={pathData}
//                         fill={fillColor}
//                         stroke="white"
//                         strokeWidth="1"
//                         onMouseEnter={(e) => handleMouseEnter(index, e)}
//                         onMouseLeave={() => setHoveredSegment(null)}
//                         style={{ cursor: "pointer" }}
//                       />
//                     )
//                   })}
//                   <circle cx="50" cy="50" r="25" fill="white" />
//                 </svg>
//                 <div className="absolute text-center">
//                   <div className="text-2xl font-bold">{inventoryInfo.total}</div>
//                   <div className="text-sm text-muted-foreground">Total Items</div>
//                 </div>
//               </div>

//               {/* Legend takes 1/3 of the space */}
//               <div className="flex flex-col justify-center">
//                 <h3 className="font-medium mb-3">Categories</h3>
//                 <div className="space-y-3">
//                   {displayCategories.map((category, index) => {
//                     // Determine color - use black for "Others" category
//                     const color = category.name === "Others" ? "#000000" : categoryColors[index % categoryColors.length]

//                     // Calculate percentage
//                     const percentage = Math.round((category.total / categoriesTotal) * 100)

//                     return (
//                       <div key={category.name} className="flex items-center gap-2">
//                         <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: color }}></div>
//                         <div className="flex-1 min-w-0">
//                           <div className="flex justify-between items-center">
//                             <span className="font-medium truncate">{category.name}</span>
//                             <span className="text-muted-foreground text-sm">{percentage}%</span>
//                           </div>
//                           <div className="text-sm text-muted-foreground">{category.total} items</div>
//                         </div>
//                       </div>
//                     )
//                   })}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </TabsContent>
//       </Tabs>
//     </Card>
//   )
// }

// export default InventorySection

"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type React from "react"
import { useState } from "react"

type Props = {
  inventoryInfo: {
    total: number
    available: number
    unavailable: number
    regularMedicines: {
      total: number
      available: number
      unavailable: number
    }
    variantMedicines: {
      total: number
      available: number
      unavailable: number
    }
    packSizes: {
      total: number
      available: number
      unavailable: number
    }
    categories: Array<{
      name: string
      total: number
      percentage: number
    }>
  }
}

const InventorySection = ({ inventoryInfo }: Props) => {
  // State for tracking hover on pie chart segments
  const [hoveredSegment, setHoveredSegment] = useState<{ index: number; x: number; y: number } | null>(null)

  // Calculate percentages for progress bars
  const availablePercentage =
    inventoryInfo.total > 0 ? Math.round((inventoryInfo.available / inventoryInfo.total) * 100) : 0

  const unavailablePercentage =
    inventoryInfo.total > 0 ? Math.round((inventoryInfo.unavailable / inventoryInfo.total) * 100) : 0

  // Colors for the donut chart
  const categoryColors = ["#3b82f6", "#8b5cf6", "#6366f1", "#ec4899", "#f43f5e", "#10b981", "#f59e0b", "#6b7280"]

  const displayCategories = inventoryInfo.categories

  // Handle mouse enter for pie segments
  const handleMouseEnter = (index: number, event: React.MouseEvent<SVGPathElement>) => {
    // Get the position of the mouse relative to the SVG
    const svgElement = event.currentTarget.ownerSVGElement
    if (!svgElement) return

    const rect = svgElement.getBoundingClientRect()
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top

    setHoveredSegment({ index, x: mouseX, y: mouseY })
  }

  return (
    <Card className="p-6 bg-white  shadow-lg rounded-xl overflow-hidden">
      <h2 className="text-2xl font-semibold mb-4">Medicine Inventory</h2>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6 w-full justify-start">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger disabled={displayCategories.length <= 0} value="categories">Categories</TabsTrigger>
        </TabsList>
        
        <div className="max-h-[30rem] overflow-y-auto ">

       
        <TabsContent value="overview">
          <div className="text-2xl font-bold mb-4">Total Medicines: {inventoryInfo.total}</div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span>Available</span>
                <span>
                  {inventoryInfo.available} ({availablePercentage}%)
                </span>
              </div>
              <Progress className="h-[10px]" value={availablePercentage} indicatorColor="bg-myPrimary" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span>Out of Stock</span>
                <span>
                  {inventoryInfo.unavailable} ({unavailablePercentage}%)
                </span>
              </div>
              <Progress className="h-[10px]" value={unavailablePercentage} indicatorColor="bg-red-600" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Regular Medicines</h3>
                <div className="text-xl font-semibold">{inventoryInfo.regularMedicines.total}</div>
                <div className="text-sm text-muted-foreground">
                  {inventoryInfo.regularMedicines.available} available / {inventoryInfo.regularMedicines.unavailable}{" "}
                  out of stock
                </div>
              </div>

              <div className="border flex justify-between rounded-lg p-4">
                <div>
                  <h3 className="font-medium mb-2">Variant Medicines</h3>
                  <div className="text-xl font-semibold">{inventoryInfo.variantMedicines.total}</div>
                  <div className="text-sm text-muted-foreground">
                    {inventoryInfo.variantMedicines.available} available / {inventoryInfo.variantMedicines.unavailable}{" "}
                    out of stock
                  </div>
                </div>

                {/* Pack Sizes as subsection of Variant Medicines */}
                <div className="mt-3 border-l pl-4">
                  <h4 className="font-medium text-sm mb-1">Pack Sizes</h4>
                  <div className="text-base font-semibold">{inventoryInfo.packSizes.total}</div>
                  <div className="text-xs text-muted-foreground">
                    {inventoryInfo.packSizes.available} available / {inventoryInfo.packSizes.unavailable} out of stock
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="categories">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Pie chart column */}
            <div className="flex-shrink-0 w-full md:w-1/3 flex items-center justify-center">
              <div className="relative">
                {/* Tooltip that appears on hover */}
                {hoveredSegment !== null && (
                  <div
                    className="absolute bg-black text-white px-3 py-1 rounded text-sm z-10 pointer-events-none"
                    style={{
                      left: `${hoveredSegment.x}px`,
                      top: `${hoveredSegment.y - 40}px`,
                    }}
                  >
                    <div className="font-medium">{displayCategories[hoveredSegment.index].name}</div>
                    <div>{displayCategories[hoveredSegment.index].total} items</div>
                  </div>
                )}

                <svg viewBox="0 0 100 100" className="w-full max-w-[300px] h-auto">
                  {displayCategories.map((category, index) => {
                    const startAngle =
                      index === 0
                        ? 0
                        : displayCategories.slice(0, index).reduce((sum, cat) => sum + (cat.percentage / 100) * 360, 0)

                    const angle = (category.percentage / 100) * 360
                    const endAngle = startAngle + angle

                    const startRad = ((startAngle - 90) * Math.PI) / 180
                    const endRad = ((endAngle - 90) * Math.PI) / 180

                    const x1 = 50 + 40 * Math.cos(startRad)
                    const y1 = 50 + 40 * Math.sin(startRad)
                    const x2 = 50 + 40 * Math.cos(endRad)
                    const y2 = 50 + 40 * Math.sin(endRad)

                    const largeArcFlag = angle > 180 ? 1 : 0

                    const pathData = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`

                    // Determine color - use black for "Others" category
                    const fillColor =
                      category.name === "Others" ? "#000000" : categoryColors[index % categoryColors.length]

                    return (
                      <path
                        key={category.name}
                        d={pathData}
                        fill={fillColor}
                        stroke="white"
                        strokeWidth="1"
                        onMouseEnter={(e) => handleMouseEnter(index, e)}
                        onMouseLeave={() => setHoveredSegment(null)}
                        style={{ cursor: "pointer" }}
                      />
                    )
                  })}
                  <circle cx="50" cy="50" r="25" fill="white" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{inventoryInfo.total}</div>
                    <div className="text-sm text-muted-foreground">Total Items</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Categories list column */}
            <div className="flex-grow">
              <h3 className="font-medium mb-4 text-lg">Categories</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {displayCategories.map((category, index) => {
                  // Determine color - use black for "Others" category
                  const color = category.name === "Others" ? "#000000" : categoryColors[index % categoryColors.length]

                  // Use percentage from backend
                  const percentage = category.percentage

                  return (
                    <div key={category.name} className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: color }}></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <span className="font-medium truncate">{category.name}</span>
                          <span className="text-muted-foreground text-sm">{percentage}%</span>
                        </div>
                        <div className="text-sm text-muted-foreground">{category.total} items</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </TabsContent>
         </div>
      </Tabs>
    </Card>
  )
}

export default InventorySection



