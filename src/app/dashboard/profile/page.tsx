"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Search, Trash2, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { deleteUser, getUsers, User } from "@/services/user-service"
import Link from "next/link"
import AddUserDialog from "@/components/supplier/AddUserDialog"
import Image from "next/image"
function isValidImageUrl(url?: string): boolean {
  try {
    if (!url || url.trim() === '') return false;
    new URL(url); // lanza error si no es válida
    return true;
  } catch {
    return false;
  }
}
export default function ProfilePage() {

  const [isActive, setIsActive] = useState(false)

  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    getUsers() // Reemplazá con tu endpoint real
      .then((res) => setUsers(res))
      .catch((err) => console.error("Error al obtener usuarios", err))
  }, [])

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )
   const handleUpdateSupplier = async (user) => {
    // Aquí va tu lógica para agregar el proveedor, ej. POST a tu API
    alert(user + " agregado correctamente");
          try {
    
       const suppliersData:User[] = await getUsers();
      console.log("Fetched suppliers:", suppliersData);
      setUsers(suppliersData);
    
    } catch (error) {
      console.error("Error deleting supplier:", error)
      
    }
  };
  const handleDeleteUser =  async (id: number) => {
    try {
      console.log(`Delete supplier ${id}`)
      console.log(typeof id)
      await deleteUser(id)
      const suppliersData:User[] = await getUsers();
      console.log("Fetched suppliers:", suppliersData);
      setUsers(suppliersData);      

    } catch (error) {
      console.error("Error deleting supplier:", error)
      
    }
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Usuarios Registrados</h1>
          <p className="text-muted-foreground">Listado de todos los usuarios del sistema</p>
        </div>
        <div>
    <Link href="./profile/new">
  <Button>
    <Plus className="mr-2 h-4 w-4" />
    Agregar Usuario
  </Button>
</Link>
        </div>
   
      </div>

      <Card>
        <CardHeader>
         <div className="flex items-center justify-between">
            <CardTitle>Lista de Usuarios</CardTitle>
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar usuarios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Avatar</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Registro</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
    
                    {isValidImageUrl(user.image) ? (
  <Image
    src={user.image}
    width={40}
    height={40}
    className="h-8 w-8 rounded-full object-cover"
    alt="Imagen de usuario"
  />
) : (
  <span className="text-muted-foreground text-xs">Sin imagen</span>
)}
                  </TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="font-medium">{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {/* <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button> */}
                    {/* <AddUserDialog onAddSupplier={handleUpdateSupplier}  data ={user}/> */}
                    <AddUserDialog onAddSupplier={handleUpdateSupplier}  data ={user} />
     
                      <Button variant="outline" size="sm" onClick={() => handleDeleteUser(user.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                          <Button
            type="button"
            variant={isActive ? 'default' : 'outline'}
            className={`w-32 transition-colors ${isActive
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            onClick={() => setIsActive(!isActive)}
            aria-pressed={isActive}
          >
            {isActive ? 'Activo' : 'Inactivo'}
          </Button>
                    </div>
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