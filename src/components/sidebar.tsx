"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BarChart3, Home, Package, ShoppingCart, Users, FileText, Settings, Store } from "lucide-react"
// import AccessibilityPanel from "./utils/accesibility"
import SIME from "./../../public/LogoSIME.svg";
import Image from "next/image"
import { useEffect, useState } from "react"
import { useUser } from "@/hooks/context/user-context"
import { getNavigationByRole } from "@/components/utils/roleNavigation"


// const navigation = [
//   { name: "Dashboard", href: "/dashboard", icon: Home },
//   { name: "Ventas", href: "/dashboard/sales", icon: ShoppingCart },
//   { name: "Proveedores", href: "/dashboard/suppliers", icon: Users },
//   { name: "Inventario", href: "/dashboard/products", icon: Package },
//   { name: "Punto de Venta", href: "/dashboard/pos", icon: Store },
//   { name: "Usuarios", href: "/dashboard/profile", icon: Settings },
//   { name: "Reportes", href: "/dashboard/reports", icon: BarChart3 },
//   // { name: "Facturas", href: "/invoices", icon: FileText },
// ]

export function Sidebar() {
  const user = useUser();
  const pathname = usePathname()
  const [imgFailed, setImgFailed] = useState(false);

  const navigation = getNavigationByRole(user?.user?.role)

  
  return (
    <div className="flex flex-col w-64 bg-white shadow-lg">
      <div className="flex items-center justify-center h-16 px-4 bg-primary">
                 {/* {SIME && typeof SIME === 'string' ? (
  <Image src={SIME} alt="Logo SIME" className="h-20 rounded-2xl" width={400} height={400} />
) : (
  <h1 className="text-xl font-bold text-primary-foreground">SIME</h1>
)} */}

{!imgFailed && SIME ? (
  <Link href="/">
  <Image
    src={SIME}
    alt="Logo SIME"
    className="h-20 rounded-2xl"
    width={400}
    height={400}
    onError={() => setImgFailed(true)}
  />
  </Link>
) : (
  <h1 className="text-xl font-bold text-primary-foreground">SIME</h1>
)}

        {/* <img src={SIME.src} alt="Logo SIME" className="h-10 ml-2" /> */}
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => (
          <Button
            key={item.name}
            asChild
            variant={pathname === item.href ? "default" : "ghost"}
            className={cn("w-full justify-start", pathname === item.href && "bg-primary text-primary-foreground")}
          >
            <Link href={item.href}>
              <item.icon className="mr-3 h-4 w-4" />
              {item.name}
            </Link>

          </Button>
        ))}

      </nav>
    </div>
  )
}
