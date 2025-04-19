

'use client'

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { Check, ChevronsUpDown, Loader2 } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandInput, CommandItem, CommandList, CommandEmpty } from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useLazyGetProductCategoriesQuery } from "@/redux/features/productsuggestions/productSuggestionsApi"
import { debounce } from "lodash"

interface CategorySelectorProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onBlur?: () => void;
  error?: string;
  touched?: boolean;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onCategoryChange,
  onBlur,
  error,
  touched
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [categories, setCategories] = useState<{ name: string }[]>([])
  const [hasMore, setHasMore] = useState(true)
  const listRef = useRef<HTMLDivElement>(null)
  const initialLoadDone = useRef(false)

  const [trigger, { data, isFetching }] = useLazyGetProductCategoriesQuery()

  // Debounced search handler
  const debouncedSearch = useMemo(
    () =>
    debounce((query: string) => {
      setSearchQuery(query)
      setCurrentPage(1)
    }, 300),
    []
  )

  // Handle popover open/close
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      initialLoadDone.current = false
      setInputValue("")
      setSearchQuery("")
      setCurrentPage(1)
      onBlur?.()
    }
  }

  // Fetch data when parameters change
  useEffect(() => {
    if (isOpen) {
      trigger({ query: searchQuery, page: currentPage })
        .then(({ data }) => {
          if (data) {
            setCategories(prev => {
              const newCategories = data.categories || []
              return currentPage === 1 ? newCategories : [...prev, ...newCategories]
            })
            setHasMore(data.pagination?.hasMore || false)
          }
        })
    }
  }, [isOpen, searchQuery, currentPage, trigger])

  // Initial load when opening
  useEffect(() => {
    if (isOpen && !initialLoadDone.current) {
      initialLoadDone.current = true
      trigger({ query: "", page: 1 })
    }
  }, [isOpen, trigger])

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

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-700">
        Category
      </Label>

      <Popover open={isOpen} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            className="w-full justify-between"
          >
            {selectedCategory || "Select category..."}
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
                placeholder="Search categories..."
                className="border-0 focus-visible:ring-0 bg-transparent h-11"
              />
              {isFetching && <Loader2 className="ml-2 h-4 w-4 animate-spin text-muted-foreground" />}
            </div>

            <CommandList 
              ref={listRef} 
              className="max-h-[200px] custom-scrollbar overflow-y-auto"
            >
              {categories.map(category => (
                <CommandItem
                  key={category.name}
                  value={category.name}
                  onSelect={() => {
                    onCategoryChange(category.name)
                    setIsOpen(false)
                  }}
                  className="cursor-pointer hover:bg-gray-50 px-4 py-2 text-sm"
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${
                      selectedCategory === category.name ? "opacity-100 text-primary" : "opacity-0"
                    }`}
                  />
                  {category.name}
                </CommandItem>
              ))}

              {!isFetching && categories.length === 0 && (
                <CommandEmpty className="py-3 text-center text-sm text-muted-foreground">
                  No categories found
                </CommandEmpty>
              )}

              {hasMore && isFetching && (
                <div className="flex justify-center p-2">
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

export default CategorySelector