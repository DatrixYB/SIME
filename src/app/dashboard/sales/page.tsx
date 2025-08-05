"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, TrendingUp, DollarSign, ShoppingCart } from "lucide-react"
import { getSales, Sale, SaleStatus } from "@/services/sale-service"

import ViewSaleDialog from "@/components/supplier/ViewSaleDialog"
export default function SalesPage() {

const [sales, setSale] = useState<Sale[]>([])

useEffect(() => {
    const fetchSales = async () => {
      try {
        const saleData = await getSales();
        console.log(saleData)
        setSale(
          saleData
        );
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchSales();
  }, []);

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredSales = sales.filter((sale) => {
    // const matchesSearch = sale.client.toLowerCase().includes(searchTerm.toLowerCase()) || sale.id.includes(searchTerm)
    const matchesSearch = (sale.client && sale.client.name && sale.client.name.toLowerCase().includes(searchTerm.toLowerCase())) || (sale.id !== undefined && sale.id.toString().includes(searchTerm))
    const matchesStatus = statusFilter === "all" || sale.statusSale === statusFilter
    return matchesSearch && matchesStatus
    return matchesStatus
  })

  const getStatusBadge = (status: SaleStatus) => {
    switch (status) {
      // case "PAID":
        // return <Badge variant="default">Completada</Badge>
      // case "PENDING":
        // return <Badge variant="secondary">Pendiente</Badge>
      // case "CANCELLED":
        // return <Badge variant="destructive">Cancelada</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTotalSales = () => {
    return sales.filter((sale) => sale.statusSale === SaleStatus.PAID).reduce((total, sale) => total + sale.total, 0)
  }

  const getCompletedSalesCount = () => {
    // console.log(sales.filter((sale) => sale.statusSale === SaleStatus.PAID))
    // console.log(sales.map((sale) => sale.status ))
    // alert(JSON.stringify(sales.map((sale) => sale.status)))
    // alert(JSON.stringify(sales.filter((sale) => sale.status === SaleStatus.PAID)))
    return sales.filter((sale) => sale.statusSale === SaleStatus.PAID).length
  }

  const getPendingSalesCount = () => {
    return sales.filter((sale) => sale.statusSale === SaleStatus.PENDING).length
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ventas</h1>
          <p className="text-muted-foreground">Gestiona y monitorea todas tus ventas</p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Exportar Reporte
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas Totales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${getTotalSales().toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+20.1% desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas Completadas</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getCompletedSalesCount()}</div>
            <p className="text-xs text-muted-foreground">+12% desde la semana pasada</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas Pendientes</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getPendingSalesCount()}</div>
            <p className="text-xs text-muted-foreground">Requieren atención</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Promedio por Venta</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${getCompletedSalesCount() > 0 ? (getTotalSales() / getCompletedSalesCount()).toFixed(2) : "0.00"}
            </div>
            <p className="text-xs text-muted-foreground">Por transacción</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Historial de Ventas</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative w-72">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por cliente o ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  // autoComplete="off"
                  // name="search_email"
                  // id="search_sales"
                  // autoFocus={false} 
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent className="w-40 bg-white">
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value={SaleStatus.PAID}>Pagadas</SelectItem>
                  <SelectItem value={SaleStatus.PENDING}>Pendientes</SelectItem>
                  <SelectItem value={SaleStatus.CANCELLED}>Canceladas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Venta</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Artículos</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Método de Pago</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSales.map((sale) => (
                // alert(JSON.stringify(sale)),
                <TableRow key={sale.id}>
                  <TableCell className="font-medium">#{sale.id}</TableCell>
                  <TableCell>{sale.client ? sale.client.name : "Sin cliente"}</TableCell>
                  <TableCell>
                    {sale.date ? new Date(sale.date).toLocaleDateString("es-ES") : "Sin fecha"}
                  </TableCell>
                  <TableCell>{sale.totalItems} artículos</TableCell>
                  <TableCell className="font-medium">${sale.total.toFixed(2)}</TableCell>
                  <TableCell>{sale.paymentMethod}</TableCell>
                  <TableCell>{getStatusBadge(sale.statusSale ?? SaleStatus.PENDING)}</TableCell>
                  <TableCell>
                  
                <ViewSaleDialog data={sale}/>
                


                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
