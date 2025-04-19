'use client'

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { Check, ChevronsUpDown, Loader2 } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandInput, CommandItem, CommandList, CommandEmpty } from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useGetProductFormsQuery } from "@/redux/features/productsuggestions/productSuggestionsApi"
import { debounce } from "lodash"

interface ProductFormSelectorProps {
  selectedProductForm: string;
  onProductFormChange: (productForm: string) => void;
  onBlur?: () => void;
  error?: string;
  touched?: boolean;
}

const ProductFormSelector: React.FC<ProductFormSelectorProps> = ({
  selectedProductForm,
  onProductFormChange,
  onBlur,
  error,
  touched
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [productForms, setProductForms] = useState<{name: string}[]>([])
  const [hasMore, setHasMore] = useState(true)
  const listRef = useRef<HTMLDivElement>(null)
  const initialLoadDone = useRef(false)

  const { data, isLoading, isFetching, refetch } = useGetProductFormsQuery(
    { query: searchQuery, page: currentPage },
    { skip: !isOpen }
  )

  // Reset scroll and trigger initial load
  useEffect(() => {
    if (isOpen && !initialLoadDone.current) {
      refetch()
      initialLoadDone.current = true
    }
  }, [isOpen, refetch])

  // Handle search changes
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = 0
    }
  }, [searchQuery])

  // Manage popover state
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      initialLoadDone.current = false
      onBlur?.()
    } else {
      setInputValue("")
      setSearchQuery("")
      setCurrentPage(1)
    }
  }

  // Debounced search handler
  const debouncedSearch = useMemo(
    () =>
    debounce((query: string) => {
      setSearchQuery(query)
      setCurrentPage(1)
    }, 300),
    []
  )

  // Infinite scroll handler
  useEffect(() => {
    const listElement = listRef.current
    if (!listElement || !hasMore || isFetching) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = listElement
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        setCurrentPage(prev => prev + 1)
      }
    }

    listElement.addEventListener('scroll', handleScroll)
    return () => listElement.removeEventListener('scroll', handleScroll)
  }, [hasMore, isFetching])

  // Update productForms
  useEffect(() => {
    if (data) {
        setProductForms(prev => {
        const newProductForms = data.productForms || []
        if (currentPage === 1) return newProductForms
        
        const existingNames = new Set(prev.map(c => c.name))
        const filtered = newProductForms.filter(c => !existingNames.has(c.name))
        return [...prev, ...filtered]
      })

      setHasMore(data.pagination?.hasMore || false)
    }
  }, [data, currentPage])

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-700">
      Product Form
      </Label>
      
      <Popover open={isOpen} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            className="w-full justify-between"
          >
            {selectedProductForm || "Select product form..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent 
          className="w-[var(--radix-popover-trigger-width)] p-0 bg-white shadow-lg"
          align="start"
        >
          <Command shouldFilter={false}>
            <div className="flex items-center px-3 border-b bg-gray-50">
              <CommandInput
                value={inputValue}
                onValueChange={value => {
                  setInputValue(value)
                  debouncedSearch(value)
                }}
                placeholder="Search product forms..."
                className="border-0 focus-visible:ring-0 bg-transparent h-11"
              />
              {(isLoading || isFetching) && <Loader2 className="ml-2 h-4 w-4 animate-spin text-muted-foreground" />}
            </div>

            <CommandList 
              ref={listRef} 
              className="max-h-[200px] custom-scrollbar overflow-y-auto bg-white"
            >
              {productForms.length > 0 ? (
                productForms.map(productForm => (
                  <CommandItem
                    key={productForm.name}
                    value={productForm.name}
                    onSelect={() => {
                      onProductFormChange(productForm.name)
                      setIsOpen(false)
                    }}
                    className="cursor-pointer hover:bg-gray-50 px-4 py-2 text-sm"
                  >
                    <Check
                      className={`mr-2 h-4 w-4 ${
                        selectedProductForm === productForm.name ? "opacity-100 text-primary" : "opacity-0"
                      }`}
                    />
                    {productForm.name}
                  </CommandItem>
                ))
              ) : (
                <CommandEmpty className="py-3 text-center text-sm text-muted-foreground bg-white">
                  {isFetching ? "Searching..." : "No product forms found"}
                </CommandEmpty>
              )}

              {hasMore && (
                <div className="flex justify-center p-2 bg-white border-t">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {error && touched && (
        <span className="block text-sm text-red-500 mt-1">{error}</span>
      )}
    </div>
  )
}

export default ProductFormSelector