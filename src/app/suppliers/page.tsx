"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2, Search, Phone, Mail } from "lucide-react"
import { delSupplierById, getSuppliers , Supplier, updateSupplier} from "@/services/supplier-service"
import Link from "next/link"
import AddSupplierDialog from "@/components/supplier/AddSupplierDialog"

export default function SuppliersPage() {
  // const [suppliers, setSuppliers] = useState<Supplier[]>([
  //   {
  //     id: "1",
  //     name: "Tech Distributor SA",
  //     contact: "Juan Pérez",
  //     email: "juan@techdist.com",
  //     phone: "+52 55 1234-5678",
  //     address: "Av. Tecnología 123, CDMX",
  //     category: "Electrónicos",
  //     status: "active",
  //     productsCount: 45,
  //   },
  //   {
  //     id: "2",
  //     name: "Office Supplies Co",
  //     contact: "María González",
  //     email: "maria@officesupplies.com",
  //     phone: "+52 55 8765-4321",
  //     address: "Calle Oficina 456, Guadalajara",
  //     category: "Oficina",
  //     status: "active",
  //     productsCount: 23,
  //   },
  //   {
  //     id: "3",
  //     name: "Gaming Gear Ltd",
  //     contact: "Carlos Rodríguez",
  //     email: "carlos@gaminggear.com",
  //     phone: "+52 81 9876-5432",
  //     address: "Blvd. Gaming 789, Monterrey",
  //     category: "Gaming",
  //     status: "active",
  //     productsCount: 18,
  //   },
  // ])
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
   
  useEffect(() => {
      const fetchProducts = async () => {
        try {
          const suppliersData:Supplier[] = await getSuppliers();
          console.log("Fetched suppliers:", suppliersData);
          setSuppliers(suppliersData);
        } catch (error) {
          console.error("Error fetching suppliers:", error);
        }
      }
      fetchProducts();
    }, []);

  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    contact: "",
    email: "",
    phone: "",
    address: "",
    category: "",
  })

  const filteredSuppliers = suppliers.filter((s) =>
  s.name.toLowerCase().includes(searchTerm.toLowerCase())
)

 
   const handleUpdateSupplier = async (supplier: Partial<Supplier>) => {
    // Aquí va tu lógica para agregar el proveedor, ej. POST a tu API
    console.log("Nuevo proveedor:", supplier);
    alert(supplier.name + " agregado correctamente");
          try {
    
      await updateSupplier(supplier.id, supplier);
       const suppliersData:Supplier[] = await getSuppliers();
      console.log("Fetched suppliers:", suppliersData);
      setSuppliers(suppliersData);
    
    } catch (error) {
      console.error("Error deleting supplier:", error)
      
    }
  };
  const handleDeleteSupplier =  async (id: number) => {
    try {
      console.log(`Delete supplier ${id}`)
      console.log(typeof id)
      await delSupplierById(id)
      const suppliersData:Supplier[] = await getSuppliers();
      console.log("Fetched suppliers:", suppliersData);
      setSuppliers(suppliersData);      

    } catch (error) {
      console.error("Error deleting supplier:", error)
      
    }
  }


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Proveedores</h1>
          <p className="text-muted-foreground">Gestiona tus proveedores y contactos comerciales</p>
        </div>
        <Link href="/suppliers/new">
  <Button>
    <Plus className="mr-2 h-4 w-4" />
    Agregar Proveedor
  </Button>
</Link>
  
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Proveedores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{suppliers.length}</div>
            <p className="text-xs text-muted-foreground">Proveedores activos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productos Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {suppliers.reduce((total, supplier) => total + supplier.totalProducts, 0)}
            </div>
            <p className="text-xs text-muted-foreground">En catálogo</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Lista de Proveedores</CardTitle>
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar proveedores..."
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
                <TableHead>Empresa</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Productos</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSuppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{supplier.name}</div>
                      <div className="text-sm text-muted-foreground">{supplier.address}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{supplier.contactName||""}</div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        <span>{supplier.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        <span>{supplier.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  {/* <TableCell>
                    <Badge variant="outline">{supplier.phone}</Badge>
                  </TableCell> */}
                  <TableCell>{supplier.totalProducts}</TableCell>
            
                  <TableCell>
                    <div className="flex space-x-2">
                      {/* <Button variant="outline" size="sm"> */}
                         <AddSupplierDialog onAddSupplier={handleUpdateSupplier}  data ={supplier}/>
                      {/* </Button> */}
                      <Button variant="outline" size="sm" onClick={() => handleDeleteSupplier(supplier.id)}>
                        <Trash2 className="h-4 w-4" />
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
