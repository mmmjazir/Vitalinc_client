"use client"

import React, { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const getVisiblePages = () => {
    const maxVisiblePages = windowWidth < 640 ? 3 : windowWidth < 1024 ? 5 : 7
    const halfVisible = Math.floor(maxVisiblePages / 2)
    let startPage = Math.max(1, currentPage - halfVisible)
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    const pages = []
    if (startPage > 1) {
      pages.push(1)
      if (startPage > 2) pages.push("...")
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push("...")
      pages.push(totalPages)
    }
    return pages
  }

  return (
    <div className="flex items-center justify-center space-x-1 sm:space-x-2">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 sm:h-10 sm:w-10"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </Button>
      {getVisiblePages().map((page, index) =>
        React.createElement(
          page === "..." ? "span" : Button,
          {
            key: index,
            ...(page !== "..." && {
              variant: currentPage === page ? "default" : "outline",
              onClick: () => onPageChange(page as number),
              "aria-current": currentPage === page ? "page" : undefined,
            }),
            className: page === "..." ? "px-2" : `h-8 w-8 sm:h-10 sm:w-10 ${currentPage === page && 'bg-gray-600 text-white hover:bg-gray-700'} p-0`,
          },
          page,
        ),
      )}
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 sm:h-10 sm:w-10"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Button>
    </div>
  )
}

