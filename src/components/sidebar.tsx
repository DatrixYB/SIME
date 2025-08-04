"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BarChart3, Home, Package, ShoppingCart, Users, FileText, Settings, Store } from "lucide-react"
import AccessibilityPanel from "./utils/accesibility"
import SIME from "./../../public/LogoSIME.svg";
import Image from "next/image"
import { useState } from "react"


const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Ventas", href: "/sales", icon: ShoppingCart },
  { name: "Proveedores", href: "/suppliers", icon: Users },
  { name: "Inventario", href: "/products", icon: Package },
  { name: "Punto de Venta", href: "/pos", icon: Store },
  { name: "Usuarios", href: "/profile", icon: Settings },
  { name: "Reportes", href: "/reports", icon: BarChart3 },
  // { name: "Facturas", href: "/invoices", icon: FileText },
]

export function Sidebar() {
  const pathname = usePathname()
  const [imgFailed, setImgFailed] = useState(false);


  return (
    <div className="flex flex-col w-64 bg-white shadow-lg">
      <div className="flex items-center justify-center h-16 px-4 bg-primary">
                 {/* {SIME && typeof SIME === 'string' ? (
  <Image src={SIME} alt="Logo SIME" className="h-20 rounded-2xl" width={400} height={400} />
) : (
  <h1 className="text-xl font-bold text-primary-foreground">SIME</h1>
)} */}

{!imgFailed && SIME ? (
  <Image
    src={SIME}
    alt="Logo SIME"
    className="h-20 rounded-2xl"
    width={400}
    height={400}
    onError={() => setImgFailed(true)}
  />
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
                        <AccessibilityPanel/>

      </nav>
    </div>
  )
}
