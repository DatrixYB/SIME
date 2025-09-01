"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, Search } from "lucide-react"
import { getProducts, Product } from "@/services/product-service"

import Link from 'next/link'
import { useUser } from "@/hooks/context/user-context"
export default function ProductsPage() {
 const { user } = useUser();
//  alert(JSON.stringify(user))
  if (!user || user.role !== 'ADMIN') {
      return <div className="p-6">Acceso denegado. Solo administradores pueden ver esta página.
      {user?.role && <p>Tu rol: {user.role}</p>}
      {/* {user?.rol} */}
      </div>
    }
  
    // Estado para productos
const [products, setProducts] = useState<Product[]>([])
 
useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData:Product[] = await getProducts();
        console.log("Fetched products:", productsData);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);



  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    minStock: "",
    supplier: "",
  })

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())|| product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddProduct = () => {
    const product: Product = {
      // id: (products.length + 1).toString(),
      name: newProduct.name,
      category: newProduct.category,
      price: Number.parseFloat(newProduct.price),
      stock: Number.parseInt(newProduct.stock),
      minStock: Number.parseInt(newProduct.minStock),
      supplier: newProduct.supplier,
      // status: "active",
      isActive: true,
    }
    setProducts([...products, product])
    setNewProduct({ name: "", category: "", price: "", stock: "", minStock: "", supplier: "" })
    setIsAddDialogOpen(false)
  }

  const getStockStatus = (stock: number, minStock: number) => {
    if (stock <= minStock) return "low"
    if (stock <= minStock * 1.5) return "medium"
    return "high"
  }

  const getStockBadge = (stock: number, minStock: number) => {
    const status = getStockStatus(stock, minStock)
    if (status === "low") return <Badge variant="destructive">Stock Bajo</Badge>
    if (status === "medium") return <Badge variant="secondary">Stock Medio</Badge>
    return <Badge variant="default">Stock Alto</Badge>
  }
  // if (loading) return <p>Cargando productos...</p>;
  // if (error) return <p>Error al cargar productos: {error}</p>;
  // console.log(Products);
  return (
    <div className="space-y-6 ">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Productos Agregados</h1>
          <p className="text-muted-foreground">Gestiona tu inventario de productos</p>
        </div>


<Link href="./products/new">
  <Button>
    <Plus className="mr-2 h-4 w-4" />
    Agregar Producto
  </Button>
</Link>
      </div>

      <Card className="">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Lista de Productos</CardTitle>
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead className="hidden lg:table-cell">Categoría</TableHead>
                <TableHead className="hidden sm:table-cell">Precio</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="hidden md:table-cell">Estado Stock</TableHead>
                <TableHead className="hidden lg:table-cell">Proveedor</TableHead>
        
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="hidden lg:table-cell">{product.category}</TableCell>
                  <TableCell className="hidden sm:table-cell">${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stock} unidades</TableCell>
                  <TableCell className="hidden md:table-cell">{getStockBadge(product.stock, product.minStock)} {product.stock} {product.minStock}</TableCell>
                  <TableCell className="hidden lg:table-cell">{product.supplier}</TableCell>
                
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
