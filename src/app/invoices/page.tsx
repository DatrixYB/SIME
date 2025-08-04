"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, DollarSign, Package, Users, Download } from "lucide-react"

export default function InvoicesPage() {
  const salesData = [
    { month: "Enero", sales: 45231.89, orders: 234 },
    { month: "Febrero", sales: 52341.23, orders: 267 },
    { month: "Marzo", sales: 48923.45, orders: 245 },
    { month: "Abril", sales: 61234.56, orders: 298 },
    { month: "Mayo", sales: 58432.1, orders: 276 },
    { month: "Junio", sales: 67891.23, orders: 312 },
  ]

  const topProducts = [
    { name: "Laptop Dell XPS 13", sales: 45, revenue: 58494.55 },
    { name: "Mouse Inalámbrico", sales: 123, revenue: 3688.77 },
    { name: "Teclado Mecánico", sales: 67, revenue: 6029.33 },
    { name: 'Monitor 24"', sales: 34, revenue: 10199.66 },
    { name: "Auriculares Bluetooth", sales: 56, revenue: 8399.44 },
  ]

  const topSuppliers = [
    { name: "Tech Distributor SA", orders: 45, amount: 125430.5 },
    { name: "Office Supplies Co", orders: 23, amount: 45230.75 },
    { name: "Gaming Gear Ltd", orders: 18, amount: 67890.25 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reportes</h1>
          <p className="text-muted-foreground">Análisis detallado del rendimiento de tu negocio</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="month">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Esta Semana</SelectItem>
              <SelectItem value="month">Este Mes</SelectItem>
              <SelectItem value="quarter">Este Trimestre</SelectItem>
              <SelectItem value="year">Este Año</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Exportar PDF
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$334,054.46</div>
            <p className="text-xs text-muted-foreground">+15.2% vs período anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Órdenes Totales</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,632</div>
            <p className="text-xs text-muted-foreground">+8.1% vs período anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Activos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">847</div>
            <p className="text-xs text-muted-foreground">+12.3% vs período anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Promedio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$204.68</div>
            <p className="text-xs text-muted-foreground">+6.7% vs período anterior</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Sales Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Tendencia de Ventas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salesData.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{data.month}</p>
                    <p className="text-sm text-muted-foreground">{data.orders} órdenes</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${data.sales.toLocaleString()}</p>
                    <div className="w-24 bg-secondary rounded-full h-2 mt-1">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${(data.sales / 70000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Productos Más Vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline">#{index + 1}</Badge>
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.sales} unidades</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">${product.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Suppliers */}
      <Card>
        <CardHeader>
          <CardTitle>Proveedores Principales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {topSuppliers.map((supplier, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">#{index + 1}</Badge>
                  <p className="text-sm font-bold">${supplier.amount.toLocaleString()}</p>
                </div>
                <h3 className="font-medium">{supplier.name}</h3>
                <p className="text-sm text-muted-foreground">{supplier.orders} órdenes</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
