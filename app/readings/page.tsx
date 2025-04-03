"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { 
  Download, 
  Plus,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

import DashboardLayout from "@/components/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/components/auth-provider"
import { Badge } from "@/components/ui/badge"
import { GlucoseReading, ReadingsResponse } from "../types/glucose"

export default function ReadingsPage() {
  const router = useRouter()
  const { user, authenticated, loading } = useAuth()
  const [readings, setReadings] = useState<GlucoseReading[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    if (!loading && !authenticated) {
      router.push("/login")
    }
  }, [loading, authenticated, router])

  useEffect(() => {
    if (!loading && authenticated) {
      fetchReadings()
    }
  }, [loading, authenticated, currentPage])

  const fetchReadings = async () => {
    if (isLoading) return;
    
    try {
      setIsLoading(true)
      const response = await fetch(`/api/readings?page=${currentPage}&limit=10`)
      const data = await response.json() as ReadingsResponse
      
      if (data && Array.isArray(data.readings)) {
        setReadings(data.readings)
        setTotalPages(data.totalPages || 1)
      }
    } catch (error) {
      console.error("Error fetching readings:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  interface StatusDisplay {
    label: string;
    color: string;
  }

  const getStatusDisplay = (status: GlucoseReading['status']): StatusDisplay => {
    switch (status) {
      case "very-low":
        return { label: "Very Low", color: "bg-red-100 text-red-800" }
      case "low":
        return { label: "Low", color: "bg-amber-100 text-amber-800" }
      case "normal":
        return { label: "Normal", color: "bg-green-100 text-green-800" }
      case "high":
        return { label: "High", color: "bg-amber-100 text-amber-800" }
      case "very-high":
        return { label: "Very High", color: "bg-red-100 text-red-800" }
      default:
        return { label: "Unknown", color: "bg-gray-100 text-gray-800" }
    }
  }

  const exportReadings = () => {
    console.log("Export functionality would go here")
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold">Loading...</h2>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="flex min-h-screen flex-col">
        <main className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold">Glucose Readings</h1>
                <p className="text-muted-foreground">
                  Track and analyze your glucose readings over time
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={exportReadings}>
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button asChild>
                  <Link href="/readings/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Log Reading
                  </Link>
                </Button>
              </div>
            </div>

            <div className="rounded-md border mb-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Glucose Value</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Label</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        Loading data...
                      </TableCell>
                    </TableRow>
                  ) : readings.length > 0 ? (
                    readings.map((reading) => (
                      <TableRow key={reading.id}>
                        <TableCell>{formatDate(reading.timestamp)}</TableCell>
                        <TableCell>
                          <div className="font-medium">{reading.value} {reading.unit}</div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusDisplay(reading.status).color}>
                            {getStatusDisplay(reading.status).label}
                          </Badge>
                        </TableCell>
                        <TableCell>{reading.label || "-"}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <span className="sr-only">Open menu</span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-4 w-4"
                                >
                                  <circle cx="12" cy="12" r="1" />
                                  <circle cx="12" cy="5" r="1" />
                                  <circle cx="12" cy="19" r="1" />
                                </svg>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/readings/${reading.id}`}>View Details</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/readings/${reading.id}/edit`}>Edit</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        No readings found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous Page</span>
                  </Button>
                  <div className="flex items-center text-sm font-medium">
                    Page {currentPage} of {totalPages}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next Page</span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </DashboardLayout>
  )
}