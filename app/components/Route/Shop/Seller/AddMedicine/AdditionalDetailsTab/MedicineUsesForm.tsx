'use client'

import React, { useState } from "react"
import { PlusCircle, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Props={
  medicine:any;
  setMedicine:any
  }

const MedicineUsesForm = ({medicine,setMedicine}:Props) => {

  // const [uses, setUses] = useState<string[]>([])
  const [newUse, setNewUse] = useState("")

  const addUse = () => {
    if (newUse.trim() && medicine.uses.length < 10) {
      setMedicine((prev:any)=>({...prev,uses: [...prev.uses, newUse.trim()]}) )
      setNewUse("")
    }
  }

  const removeUse = (index: number) => {
    setMedicine((prev:any)=>({...prev,uses: prev.uses.filter((_, i) => i !== index)}) )
  }

  return (
    // <Card className="w-full max-w-2xl ">
    //   <CardHeader>
    //     <CardTitle className="text-2xl font-bold">Uses of Medicine (optional)</CardTitle>
    //   </CardHeader>
    //   <CardContent>
    //     <div className="space-y-4">
    //       <div className="flex items-end space-x-2">
    //         <div className="flex-grow">
    //           <Label htmlFor="new-use" className="text-sm font-medium text-gray-700">
    //             Add a new use
    //           </Label>
    //           <Input
    //             id="new-use"
    //             value={newUse}
    //             onChange={(e) => setNewUse(e.target.value)}
    //             placeholder="Enter a use for the medicine"
    //             className="mt-1"
    //           />
    //         </div>
    //         <Button
    //           onClick={addUse}
    //           disabled={!newUse.trim() || medicine.uses.length >= 10}
    //           className="flex items-center text-white bg-navbar hover:bg-gray-600"
    //         >
    //           <PlusCircle className="w-4 h-4 mr-2" />
    //           Add Use
    //         </Button>
    //       </div>

    //       {medicine.uses.length > 0 && (
    //         <div className="mt-6">
    //           <h3 className="text-lg font-semibold mb-2">Current Uses:</h3>
    //           <ul className="space-y-2">
    //             {medicine.uses.map((use, index) => (
    //               <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
    //                 <span className="text-gray-800">{use}</span>
    //                 <Button
    //                   variant="ghost"
    //                   size="sm"
    //                   onClick={() => removeUse(index)}
    //                   className="text-red-500 hover:text-red-700"
    //                 >
    //                   <X className="w-4 h-4" />
    //                 </Button>
    //               </li>
    //             ))}
    //           </ul>
    //         </div>
    //       )}

    //       {medicine.uses.length >= 10 && (
    //         <p className="text-yellow-600 text-sm mt-2">
    //           Maximum number of uses (10) reached.
    //         </p>
    //       )}
    //     </div>
    //   </CardContent>
    // </Card>

    <Card className="w-full max-w-2xl">
    <CardHeader>
      <CardTitle className="text-xl sm:text-2xl font-bold">Uses of Medicine (optional)</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end space-y-2 sm:space-y-0 sm:space-x-2">
          <div className="flex-grow">
            <Label htmlFor="new-use" className="text-sm font-medium text-gray-700">
              Add a new use
            </Label>
            <Input
              id="new-use"
              value={newUse}
              onChange={(e) => setNewUse(e.target.value)}
              placeholder="Enter a use for the medicine"
              className="mt-1"
            />
          </div>
          <Button
            onClick={addUse}
            disabled={!newUse.trim() || medicine.uses.length >= 10}
            className="flex items-center justify-center w-full sm:w-auto text-white bg-navbar hover:bg-gray-600"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Use
          </Button>
        </div>

        {medicine.uses.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Current Uses:</h3>
            <ul className="space-y-2">
              {medicine.uses.map((use: string, index: number) => (
                <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span className="text-gray-800 text-sm sm:text-base">{use}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeUse(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {medicine.uses.length >= 10 && (
          <p className="text-yellow-600 text-sm mt-2">Maximum number of uses (10) reached.</p>
        )}
      </div>
    </CardContent>
  </Card>
  )
}

export default MedicineUsesForm