'use client'

import React, { useState } from "react"
import { PlusCircle, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ChemicalComponent {
  name: string
  dosage: string
}

type Props={
medicine:any;
setMedicine:any
}

const MedicineContainsForm = ({medicine,setMedicine}:Props) => {
  const [newComponent, setNewComponent] = useState<ChemicalComponent>({ name: "", dosage: "" })

  const addComponent = () => {
    if (newComponent.name.trim() && newComponent.dosage.trim()) {
      setMedicine((prev:any)=>({...prev,contains: [...prev.contains, newComponent]}) );
      setNewComponent({ name: "", dosage: "" })
    }
  }

  const removeComponent = (index: number) => {
    setMedicine((prev:any)=>({...prev,contains: prev.contains.filter((_, i) => i !== index)}) )
  }

  return (
    // <Card className="w-full max-w-2xl">
    //   <CardHeader>
    //     <CardTitle className="text-2xl font-bold">Contains (optional)</CardTitle>
    //   </CardHeader>
    //   <CardContent>
    //     <div className="space-y-4">
    //       <div className="flex items-end space-x-2">
    //         <div className="flex-grow space-y-2">
    //           <div>
    //             <Label htmlFor="chemical-name" className="text-sm font-medium text-gray-700">
    //               Chemical Name
    //             </Label>
    //             <Input
    //               id="chemical-name"
    //               value={newComponent.name}
    //               onChange={(e) => setNewComponent({ ...newComponent, name: e.target.value })}
    //               placeholder="e.g., Domperidone"
    //               className="mt-1"
    //             />
    //           </div>
    //           <div>
    //             <Label htmlFor="chemical-dosage" className="text-sm font-medium text-gray-700">
    //              Dosage
    //             </Label>
    //             <Input
    //               id="chemical-dosage"
    //               value={newComponent.dosage}
    //               onChange={(e) => setNewComponent({ ...newComponent, dosage: e.target.value })}
    //               placeholder="e.g., 30mg"
    //               className="mt-1"
    //             />
    //           </div>
    //         </div>
    //         <Button
    //           onClick={addComponent}
    //           disabled={!newComponent.name.trim() || !newComponent.dosage.trim()}
    //           className="flex items-center text-white bg-navbar hover:bg-gray-600"
    //         >
    //           <PlusCircle className="w-4 h-4 mr-2" />
    //           Add Component
    //         </Button>
    //       </div>

    //       {medicine.contains.length > 0 && (
    //         <div className="mt-6">
    //           <h3 className="text-lg font-semibold mb-2">Current Composition:</h3>
    //           <ul className="space-y-2">
    //             {medicine.contains.map((contain, index) => (
    //               <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
    //                 <span className="text-gray-800">
    //                   {contain.name} ({contain.dosage})
    //                 </span>
    //                 <Button
    //                   variant="ghost"
    //                   size="sm"
    //                   onClick={() => removeComponent(index)}
    //                   className="text-red-500 hover:text-red-700"
    //                 >
    //                   <X className="w-4 h-4" />
    //                 </Button>
    //               </li>
    //             ))}
    //           </ul>
    //         </div>
    //       )}
    //     </div>
    //   </CardContent>
    // </Card>

    <Card className="w-full max-w-2xl">
    <CardHeader>
      <CardTitle className="text-xl sm:text-2xl font-bold">Contains (optional)</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end space-y-2 sm:space-y-0 sm:space-x-2">
          <div className="flex-grow space-y-2">
            <div>
              <Label htmlFor="chemical-name" className="text-sm font-medium text-gray-700">
                Chemical Name
              </Label>
              <Input
                id="chemical-name"
                value={newComponent.name}
                onChange={(e) => setNewComponent({ ...newComponent, name: e.target.value })}
                placeholder="e.g., Domperidone"
                className="mt-1 w-full"
              />
            </div>
            <div>
              <Label htmlFor="chemical-dosage" className="text-sm font-medium text-gray-700">
                Dosage
              </Label>
              <Input
                id="chemical-dosage"
                value={newComponent.dosage}
                onChange={(e) => setNewComponent({ ...newComponent, dosage: e.target.value })}
                placeholder="e.g., 30mg"
                className="mt-1 w-full"
              />
            </div>
          </div>
          <Button
            onClick={addComponent}
            disabled={!newComponent.name.trim() || !newComponent.dosage.trim()}
            className="flex items-center text-white bg-navbar hover:bg-gray-600 w-full sm:w-auto"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Component
          </Button>
        </div>

        {medicine.contains.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Current Composition:</h3>
            <ul className="space-y-2">
              {medicine.contains.map((contain, index) => (
                <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span className="text-gray-800 text-sm sm:text-base">
                    {contain.name} ({contain.dosage})
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeComponent(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </CardContent>
  </Card>

  )
}

export default MedicineContainsForm