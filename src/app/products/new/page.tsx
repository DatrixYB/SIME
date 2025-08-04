'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from '@/components/ui/select' // Usa la versión extendida, no la de Radix directamente
import Link from 'next/link'
import { Button, Card, Separator } from '@radix-ui/themes'
import { CreditCard, Delete, Minus, MoveLeft, PackageSearch, Plus } from 'lucide-react'
import { getSuppliers, Supplier } from '@/services/supplier-service'
import { Category, getCategory } from '@/services/category-service'
import { createProduct, createProducts, Product } from '@/services/product-service'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createPurchaseOrder, OrderStatus, PurchaseOrder } from '@/services/purchaseOrder-service'
import { createPurchaseOrderItem, createPurchaseOrderItems } from '@/services/purchaseOrderItem-service'
import { useRouter } from "next/navigation";
import { useUser } from '@/hooks/context/user-context'



interface CartItem extends Product {
  quantity: number
  category:string
  id: number
}
export default function ProductForm() {
  // Autenticación
  const { user } = useUser();
  // Router 
  const router = useRouter();
  // Proveedor
  const [name, setName] = useState('')
  const [contactName, setContactName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  
  const [selectedSupplierId, setSelectedSupplierId] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedProduct, setSelectedProduct] = useState(0)
// Product
  const [nameProduct, setNameProduct] = useState('')
  const [price, setPrice] = useState<number | ''>('')
  const [stock, setStock] = useState<number | ''>('')
  const [minStock, setMinStock] = useState<number>(5)
  const [description, setDescription] = useState('')
  const [isActive, setIsActive] = useState(true)
  const [categoryId, setCategoryId] = useState<number>(0)
  const [supplierId, setSupplierId] = useState<number | ''>('')

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(  () =>{
  
const fetchSuppliers = async () => {
    try {
      const data = await getSuppliers()
      console.log('Proveedores obtenidos:', data)
      setSuppliers(data)
    } catch (error) {
      console.error('Error al obtener proveedores:', error)
    }
  }
  fetchSuppliers()
  const fetchCategory = async () => {
    try {
      const data = await getCategory()
      console.log('Proveedores obtenidos:', data)
      setCategories(data)
    } catch (error) {
      console.error('Error al obtener proveedores:', error)
    }
  }
  fetchCategory()
    if (!imageFile) {
      setImagePreview(null)
      return
    }
    const objectUrl = URL.createObjectURL(imageFile)
    setImagePreview(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [imageFile])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImageFile(null)
      return
    }
    setImageFile(e.target.files[0])
  }

  const submitProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || price === '' || stock === '') {
      alert('Completa los campos obligatorios')
      return
    }

    const productPayload = {
      name: nameProduct,
      price: Number(price),
      stock: Number(stock),
      minStock,
      description,
      image: imageFile ? URL.createObjectURL(imageFile) : null,
      isActive,
      supplierId: Number(supplierId),
      categoryId,
    }

    console.log('Producto creado:', productPayload)
    // alert('Producto creado con éxito\n' + JSON.stringify(productPayload, null, 2));
    // Aquí enviarías a backend
    try {
          console.log('Producto creado con éxito\n' + JSON.stringify(productPayload, null, 2));
      // await createProduct(productPayload )
      
    } catch (error) {
      console.error('Error al crear el producto:', error)
      alert('Error al crear el producto. Revisa la consola para más detalles.')
      return
      
    }
  }
  const [products, setProducts] = useState<Product[]>([])

 const [cart, setCart] = useState<CartItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))

  // const addToCart = () => {
  //   setSelectedProduct(selectedProduct+1)  
  //   const product = {
  //     id:selectedProduct , // 
  //     name: nameProduct,
  //     price: Number(price),
  //     stock: Number(stock),
  //     minStock,
  //     description,
  //     image: imageFile ? URL.createObjectURL(imageFile) : null,
  //     isActive,
  //     supplierId: Number(supplierId),
  //     categoryId,
  //   }
  //   alert('Producto agregado al carrito: ' + JSON.stringify(product, null, 2))
  //   const existingItem = cart.find((item) => item.id === product.id)
  //   if (existingItem) {
  //     // if (existingItem.quantity < product.stock) {
  //       setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
  //     // }
  //   } else {
  //     setCart([...cart, { ...product, quantity: 1}])
  //   }
  // }
  const addToCart = () => {
  const newProduct: CartItem = {
    id: selectedProduct,
    name: nameProduct,
    price: Number(price),
    stock: Number(stock),
    minStock,
    description,
    // image: imageFile ? URL.createObjectURL(imageFile) : null,
    image: imagePreview ? "default": "",
    isActive,
    supplierId: Number(supplierId),
    categoryId,
    quantity: 1,
    category: selectedCategory
  }

  if (!newProduct.name || !newProduct.price || !newProduct.stock) {
    alert('Completa todos los campos del producto antes de agregarlo al carrito')
    return
  }

  // 🛑 Validar que el supplierId sea el mismo que los del carrito
  if (cart.length > 0 && cart[0].supplierId !== newProduct.supplierId) {
    alert('Solo puedes agregar productos del mismo proveedor al carrito')
    return
  }

  const existingItem = cart.find((item) => item.id === newProduct.id)
  if (existingItem) {
    setCart(cart.map((item) =>
      item.id === newProduct.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ))
  } else {
    setCart([...cart, newProduct])
  }

  setSelectedProduct(selectedProduct + 1) // opcional
  alert('Producto agregado al carrito correctamente')
}


  const removeFromCart = (productId: number) => {
    const existingItem = cart.find((item) => item.id === productId)
    if (!existingItem) {
      alert('Producto no encontrado en el carrito')
      return
    }
    setCart(cart.filter((item) => item.id !== productId))
    // if (existingItem && existingItem.quantity > 1) {
    //   setCart(cart.map((item) => (item.name.toString() === productId ? { ...item, quantity: item.quantity - 1 } : item)))
    // } else {
    //   setCart(cart.filter((item) => item.name.toString() !== productId))
    // }
  }

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price * item.stock, 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.stock, 0)
  }

  const handleCheckout = async () => {
    alert(`Venta procesada por $${getTotalAmount().toFixed(2)}\n total items: ${getTotalItems()}`)
    alert(cart)
  console.log('Orden creado con éxito\n' + JSON.stringify(cart, null, 2));
    // Aquí enviarías a backend
    const orderPayload:PurchaseOrder = {
      supplierId: Number(supplierId),
      createdById:Number(user?.id) , // Cambia esto según el usuario actual
      status: OrderStatus.PENDING,
      total: getTotalAmount() * 1.16, // Incluyendo IVA
    }
  function validateProduct(item: any): Product {
  const errors: string[] = [];

  // Validaciones básicas
  // if (!item.name?.trim()) errors.push("Falta el nombre");
  // if (typeof item.price !== "number" || item.price < 0) errors.push("Precio inválido");
  // if (typeof item.stock !== "number") errors.push("Stock inválido");
  // if (typeof item.minStock !== "number") errors.push("minStock inválido");
  // if (!item.description?.trim()) errors.push("Falta la descripción");
  // if (typeof item.isActive !== "boolean") errors.push("isActive debe ser booleano");
  // if (!item.supplierId) errors.push("Falta supplierId");
  // if (!item.categoryId) errors.push("Falta categoryId");

  // Validación de imagen (string URL/base64/etc)
  // if (!item.image || typeof item.image !== "string") {
  //   errors.push("Imagen no válida o ausente");
  // } else if (!/^data:image\/|^https?:\/\//.test(item.image)) {
  //   errors.push("Formato de imagen no reconocido");
  // }

  // if (errors.length > 0) {
  //   throw new Error(`Error en producto "${item.name ?? "sin nombre"}": ${errors.join(", ")}`);
  // }

  // Retorno tipado, limpio
  return {
    name: item.name.trim(),
    price: Math.max(item.price, 0),
    stock: item.stock,
    minStock: item.minStock,
    description: item.description.trim(),
    image: item.image,
    isActive: item.isActive,
    supplierId: item.supplierId,
    categoryId: item.categoryId
  };
}
    try {
      alert("Order")
    console.log('Orden creado con éxito\n' + JSON.stringify(orderPayload, null, 2));

    const orderCreated = await createPurchaseOrder(orderPayload)
      const validProducts = cart.map(item => validateProduct(item));
      alert('Productos validados y listos para enviar al backend:\n' + JSON.stringify(validProducts, null, 2))
      alert('Order:\n' + JSON.stringify(orderCreated, null, 2))
      console.log('Productos validados y listos para enviar al backend:\n' + JSON.stringify(validProducts, null, 2))
// await createProduct(validProducts);
//  const productsPayload = {
//   products: cart.map(p => ({
//     name: p.name,
//     price: p.price,
//     stock: p.stock,
//     minStock: p.minStock,
//     description: p.description || 'Moto',
//     image: p.image || 'default',
//     isActive: p.isActive ?? true,
//     supplierId: p.supplierId,
//     categoryId: p.categoryId,
//   })),
// };
const productsPayload = {
  products: validProducts.map(p => ({
    name: p.name,
    price: Number(p.price),
    stock: Number(p.stock),
    minStock: Number(p.minStock),
    description: p.description ?? 'Moto',
    image: p.image ?? 'default',
    isActive: Boolean(p.isActive ?? true),
    supplierId: Number(p.supplierId),
    categoryId: Number(p.categoryId),
  })),
};

if (validProducts.length === 1) {
 
  const productCreated = await createProduct(productsPayload.products[0]);
    const puchaseorder_item_payload = {
    orderId: orderCreated.id,
    productId:  productCreated,
    quantity: productsPayload.products[0].stock,
    unitPrice: productsPayload.products[0].price,
  }
  await createPurchaseOrderItem(puchaseorder_item_payload)
} else if (validProducts.length > 1) {
  const productsPayloadapi = JSON.stringify(productsPayload); 
  console.log('Payload de productos para crear múltiples:', productsPayloadapi);
  const productsCreated =  await createProducts(productsPayload);
const purchaseorder_item_payload = {
  orderId: orderCreated.id,
  items: validProducts.map((product, idx) => ({
    productId: productsCreated[idx],        // ID recién creado
    quantity: product.stock,                // Stock actual
    unitPrice: product.price                // Precio individual
  }))
};
  alert(JSON.stringify(purchaseorder_item_payload) )
  await createPurchaseOrderItems(purchaseorder_item_payload)
} else {
  console.log('No hay productos válidos para crear');
}

 } catch (error) {
     console.log('Error al crear la orden:', error) 
    }

    setCart([])
    setSelectedProduct(0)
    router.back()
  }

  if (suppliers.length===0){
     return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
      <PackageSearch className="h-16 w-16 text-primary/70" />
      <h2 className="text-2xl font-semibold text-gray-800">
        No hay proveedores registrados
      </h2>
      <p className="text-sm text-muted-foreground max-w-md">
        Para crear productos, primero tenés que registrar al menos un proveedor. Esto asegura la trazabilidad y el vínculo correcto en tu catálogo.
      </p>
      <Link href="/suppliers">
        <Button className="mt-4 bg-primary text-white hover:bg-primary/90">
          Ir a proveedores
        </Button>
      </Link>
    </div>
  );



  }

  return (
    <form className="flex flex-col gap-6 px-6 py-5 lg:flex-row" onSubmit={submitProduct}>

     
     
      {/* Formulario principal */}
      {/* Proveedor */}
      <section className="w-full max-w-md flex flex-col gap-4">
        <Link href="/products">
          <Button>
            <MoveLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
        </Link>
        <h1 className="text-[28px] font-bold text-[#0d151c] tracking-tight">Crear Producto</h1>

        {/* Rol */}
  
        <div>
        <label className="block text-sm font-medium text-[#0d151c] mb-1">Proveedor</label>
 
          <Select
  value={selectedSupplierId ?? ''}
  onValueChange={(value) => {
    setSelectedSupplierId(value)
    setSupplierId(Number(value)) // 
    // alert(value)

    const selectedSupplier = suppliers.find((s) => String(s.id) === value)
    if (selectedSupplier) {
      // Aquí puedes llenar los campos del formulario con los datos del proveedor
      setName(selectedSupplier.name) // ejemplo
      setContactName(selectedSupplier.contactName)
      setEmail(selectedSupplier.email)
      setPhone(selectedSupplier.phone || '')
      setAddress(selectedSupplier.address || '')
      
      // Agrega otros setState según lo que tengas en tu modelo
    }
  }}
>
  <SelectTrigger className="w-full h-12 rounded-xl border border-[#cedce8] bg-slate-50 px-4 py-3 text-[#0d151c] focus:outline-none focus:ring-2 focus:ring-[#0b80ee]">
    <SelectValue placeholder="Seleccionar proveedor" />
  </SelectTrigger>
  <SelectContent className="bg-white rounded-xl shadow-lg border border-[#cedce8]">
    {suppliers.map((supplier) => (
      <SelectItem
        key={supplier.id}
        value={String(supplier.id)}
        className="cursor-pointer px-4 py-2 text-[#0d151c] text-sm hover:bg-slate-100"
      >
        {supplier.name} 
        {/* ({supplier.email}) */}
      </SelectItem>
    ))}
  </SelectContent>
</Select>

        </div>

        {/* Estado */}
        <div className="flex items-center justify-between bg-slate-50 min-h-14 px-4 rounded-xl">
          <span className="text-[#0d151c] text-base">¿Activo?</span>
          <Switch checked={isActive} onCheckedChange={setIsActive} />
        </div>

        {/* Nombre */}
        <div>
          <label className="block mb-1 text-sm font-medium text-[#0d151c]">Empresa</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre de la empresa proveedor"
            required
          />
        </div>

        {/* ContactName */}
        <div>
          <label className="block mb-1 text-sm font-medium text-[#0d151c]">Contacto Ventas</label>
          <Input
            // type="text"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            placeholder="Contacto"
            // min={0}
            // step={0.01}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 text-sm font-medium text-[#0d151c]">Email</label>
          <Input
            // type="number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email proveedor"
            // min={0}
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1 text-sm font-medium text-[#0d151c]">Phone</label>
          <Input
            // type="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            // min={0}
            required
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block mb-1 text-sm font-medium text-[#0d151c]">Dirección</label>
          <Textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Dirección del proveedor"
            rows={3}
          />
        </div>

   
      </section>

      {/* Imagen */}
      {/* Categoria Product */}
      <section className="flex flex-col items-center gap-4 max-w-[960px] w-full">
               <div className='w-full'>
          <label className="block text-sm font-medium text-[#0d151c] mb-1">Categoria</label>
          <Select value={selectedCategory}  onValueChange={(value) => {
            const selectedCategory = categories.find((s) => String(s.name) === value)   
    setCategoryId(selectedCategory?.id || 0)
    setSelectedCategory(value)
  }
    } >
            <SelectTrigger className="w-full h-12 rounded-xl border border-[#cedce8] bg-slate-50 px-4 py-3 text-[#0d151c] focus:outline-none focus:ring-2 focus:ring-[#0b80ee]">
              <SelectValue placeholder="Seleccionar rol" />
            </SelectTrigger>
            <SelectContent className="bg-white rounded-xl shadow-lg border border-[#cedce8]">
              {categories.map((cartegory) => (
                <SelectItem
                  key={cartegory.id}
                  value={cartegory.name}
                  className="cursor-pointer px-4 py-2 text-[#0d151c] text-sm hover:bg-slate-100"
                >
                  {cartegory.name}
                </SelectItem>
                
              ))}
            </SelectContent>            
          </Select>
        </div>

        
        {/* Nombre */}
        <div className='w-full'>
          <label className="block mb-1 text-sm font-medium text-[#0d151c]">Nombre</label>
          <Input
            value={nameProduct}
            onChange={(e) => setNameProduct(e.target.value)}
            placeholder="Nombre del producto"
            required
          />
        </div>

        {/* Precio */}
        <div className='w-full'>
          <label className="block mb-1 text-sm font-medium text-[#0d151c]">Precio</label>
          <Input
            type="number"
            value={typeof price === "number" ? price : ""}
            onChange={(e) => setPrice(e.target.value === "" ? "" : parseFloat(e.target.value))}
            placeholder="Precio"
            min={0}
            step={1000}
            required
          />
          
        </div>

        {/* Stock */}
        <div className='w-full'>
          <label className="block mb-1 text-sm font-medium text-[#0d151c]">Stock</label>
          <Input
            type="number"
            value={stock}
            onChange={(e) => setStock(parseInt(e.target.value))}
            placeholder="Cantidad en stock"
            min={0}
            required
          />
        </div>

        {/* Stock mínimo */}
        <div className='w-full'>
          <label className="block mb-1 text-sm font-medium text-[#0d151c]">Stock mínimo</label>
          <Input
            type="number"
            value={minStock}
            onChange={(e) => setMinStock(parseInt(e.target.value))}
            placeholder="Mínimo en stock"
            min={0}
            required
          />
        </div>

        {/* Descripción */}
        <div className='w-full'>
          <label className="block mb-1 text-sm font-medium text-[#0d151c]">Descripción</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción del producto"
            rows={3}
          />
        </div>
        <div className='gap-3 border-2 border-dashed border-[#cedce8]  rounded-xl p-6 w-full'>
       <h2 className="text-lg font-bold text-center text-[#0d151c]">Imagen del producto</h2>
        <p className="text-sm text-center text-[#0d151c]">Arrastra o haz clic para subir</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="file:border-0 file:px-4 file:py-2 file:rounded-full file:bg-[#e7edf4] file:text-sm file:font-semibold file:text-[#0d151c]"
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Vista previa"
            className="max-w-xs rounded-xl border border-gray-200 shadow"
          />
        )}
        </div>
 

            {/* Botón */}
        <div className="flex justify-end py-3">
      
               <Button onClick={() => addToCart()}   disabled={cart.length > 0 && Number(supplierId) !== cart[0].supplierId}>
              <Plus className="h-4 w-4" />
              Agregar Producto
            </Button>
        </div>
      </section>

           <section>
           {/* Cart Section */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Orden de compra por proveedor</CardTitle>
              
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">El carrito está vacío</p>
              ) : (
                <div className="space-y-4 gap-1">
                    <label htmlFor="">
                                      Administrador: {user?.name || 'No seleccionado'}
                  </label>
                  <br />
                  <label htmlFor="">
                                      Proveedor: {suppliers.find((s) => s.id === supplierId)?.name || 'No seleccionado'}
                  </label>
                  <br />
                   <label htmlFor="">
                                      Contacto: {suppliers.find((s) => s.id === supplierId)?.contactName || 'No seleccionado'}
                  </label>
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} c/u</p>
                        <p className="text-sm text-muted-foreground">categoria:{item.category} </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {/* <Button variant="outline" onClick={() => removeFromCart(item.name.toString())} disabled={item.quantity <= 1}>
                          <Minus className="h-3 w-3" />
                        </Button> */}
                        <span className="w-8 text-center">{item.stock}</span>
                        <Button
                          variant="outline"
                          // onClick={() => addToCart()}
                          onClick={() => removeFromCart(item.id)}
                          disabled={item.quantity >= item.stock}
                        >
                          <span>{item.id}</span>
                          <Delete className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Separator />

                  <div className="space-y-2">
                        <div className="flex justify-between">
                      <span>Total de productos:</span>
                      <span>{getTotalItems()} und</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${getTotalAmount().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>IVA (16%):</span>
                      <span>${(getTotalAmount() * 0.16).toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span>${(getTotalAmount() * 1.16).toFixed(2)}</span>
                    </div>
                  </div>

                  <Button className="w-full"  onClick={handleCheckout}>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Procesar Orden
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
     </section>
    </form>
  )
}


