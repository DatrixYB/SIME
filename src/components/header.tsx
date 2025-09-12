"use client"

import { Button } from "@/components/ui/button"
import {  User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AccessibilityPanel from "./utils/accesibility"
import { logOut } from "@/services/auth-service"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/hooks/context/user-context"
import NotificationBell from "./utils/bell"

export function Header() {
   const { user } = useUser();
  // useRouter
  const router =  useRouter()
  useEffect(() => {

  }, [])
  const handleLogout = async () => {

    await logOut();
    router.push('/');
  }
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          {/* <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input type="search" placeholder="Buscar productos, clientes..." className="pl-10 w-80" />
          </div> */}
        </div>

        <div className="flex items-center space-x-4">
                                  <AccessibilityPanel/>



<NotificationBell>
  
</NotificationBell>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white ">
              {/* <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel> */}
              <DropdownMenuSeparator />
              {/* <DropdownMenuItem>Perfil</DropdownMenuItem> */}
              <DropdownMenuItem>Usuario
                <span className="ml-2 font-medium">{user?.name || "Invitado"}</span>
              </DropdownMenuItem>
              {/* <DropdownMenuItem>Configuración</DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => { handleLogout()}}>Cerrar Sesión</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
