import { Home, ShoppingCart, Users, Package, Settings, BarChart3, Store } from "lucide-react"
import { UserRole } from "@/services/user-service"

export function getNavigationByRole(role?: UserRole) {
  switch (role) {
    case UserRole.ADMIN:
      return [
        { name: "Dashboard", href: "/dashboard", icon: Home },
        { name: "Proveedores", href: "/dashboard/suppliers", icon: Users },
        { name: "Inventario", href: "/dashboard/products", icon: Package },
        { name: "Ventas", href: "/dashboard/sales", icon: ShoppingCart },

        { name: "Usuarios", href: "/dashboard/profile", icon: Settings },
        { name: "Reportes", href: "/dashboard/reports", icon: BarChart3 },
      ]
    case UserRole.SELLER:
      return [
        // { name: "Dashboard", href: "/dashboard", icon: Home },
        { name: "Ventas", href: "/dashboard/sales", icon: ShoppingCart },
        { name: "Punto de Venta", href: "/dashboard/pos", icon: Store },

      ]
    default:
      return [
        { name: "not", href: "/", icon: Home },
      ]
  }
}