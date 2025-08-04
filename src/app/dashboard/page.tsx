"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, DollarSign, Package, ShoppingCart, Users, AlertTriangle, Calendar } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const stats = [
    {
      title: "Ventas del Mes",
      value: "$45,231.89",
      change: "+20.1%",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Productos",
      value: "2,350",
      change: "+180 nuevos",
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Proveedores",
      value: "45",
      change: "+3 este mes",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Órdenes Pendientes",
      value: "12",
      change: "-5 desde ayer",
      icon: ShoppingCart,
      color: "text-orange-600",
    },
  ]

  const recentSales = [
    { id: "001", customer: "María González", amount: "$250.00", status: "Completada", date: "2024-01-15" },
    { id: "002", customer: "Carlos Rodríguez", amount: "$150.00", status: "Pendiente", date: "2024-01-15" },
    { id: "003", customer: "Ana Martínez", amount: "$350.00", status: "Completada", date: "2024-01-14" },
    { id: "004", customer: "Luis Fernández", amount: "$450.00", status: "Completada", date: "2024-01-14" },
  ]

  const lowStockProducts = [
    { name: "Laptop Dell XPS", stock: 3, minStock: 10 },
    { name: "Mouse Inalámbrico", stock: 5, minStock: 20 },
    { name: "Teclado Mecánico", stock: 2, minStock: 15 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Resumen general de tu negocio</p>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4" />
          <span className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Sales */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Ventas Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSales.map((sale) => (
                <div key={sale.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{sale.customer}</p>
                    <p className="text-sm text-muted-foreground">
                      Orden #{sale.id} - {sale.date}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={sale.status === "Completada" ? "default" : "secondary"}>{sale.status}</Badge>
                    <div className="font-medium">{sale.amount}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/sales">Ver Todas las Ventas</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-4 w-4 text-orange-500 mr-2" />
              Stock Bajo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockProducts.map((product, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{product.name}</p>
                    <Badge variant="destructive">{product.stock} unidades</Badge>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: `${(product.stock / product.minStock) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/products">Gestionar Inventario</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button asChild className="h-20 flex-col">
              <Link href="/pos">
                <ShoppingCart className="h-6 w-6 mb-2" />
                Punto de Venta
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col bg-transparent">
              <Link href="/products">
                <Package className="h-6 w-6 mb-2" />
                Agregar Producto
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col bg-transparent">
              <Link href="/suppliers">
                <Users className="h-6 w-6 mb-2" />
                Nuevo Proveedor
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col bg-transparent">
              <Link href="/reports">
                <BarChart3 className="h-6 w-6 mb-2" />
                Ver Reportes
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
