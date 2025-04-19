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

const MedicineSideEffectsForm = ({medicine,setMedicine}:Props) => {

  const [newSideEffect, setNewSideEffect] = useState("")

  const addSideEffect = () => {
    if (newSideEffect.trim() && medicine.sideEffects.length < 10) {
      setMedicine((prev:any)=>({...prev,sideEffects: [...prev.sideEffects, newSideEffect.trim()]}) )
      setNewSideEffect("")
    }
  }

  const removeSideEffect = (index: number) => {
    setMedicine((prev:any)=>({...prev,sideEffects: prev.sideEffects.filter((_, i) => i !== index)}) )
  }

  return (

    <Card className="w-full max-w-2xl">
    <CardHeader>
      <CardTitle className="text-xl sm:text-2xl font-bold">Side Effects of Medicine (optional)</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end space-y-2 sm:space-y-0 sm:space-x-2">
          <div className="flex-grow">
            <Label htmlFor="new-use" className="text-sm font-medium text-gray-700">
              Add a new side effect
            </Label>
            <Input
              id="new-use"
              value={newSideEffect}
              onChange={(e) => setNewSideEffect(e.target.value)}
              placeholder="Enter a use for the medicine"
              className="mt-1"
            />
          </div>
          <Button
            onClick={addSideEffect}
            disabled={!newSideEffect.trim() || medicine.sideEffects.length >= 10}
            className="flex items-center justify-center w-full sm:w-auto text-white bg-navbar hover:bg-gray-600"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Side Effect
          </Button>
        </div>

        {medicine.sideEffects.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Current Side Effects:</h3>
            <ul className="space-y-2">
              {medicine.sideEffects.map((sideEffect: string, index: number) => (
                <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span className="text-gray-800 text-sm sm:text-base">{sideEffect}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSideEffect(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {medicine.sideEffects.length >= 10 && (
          <p className="text-yellow-600 text-sm mt-2">Maximum number of side effects (10) reached.</p>
        )}
      </div>
    </CardContent>
  </Card>
  )
}

export default MedicineSideEffectsForm;