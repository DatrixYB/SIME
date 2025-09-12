"use client"

import { useEffect, useState } from "react"
// import { Button } from "@/components/ui/button"
import { Button } from '@radix-ui/themes'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Search, Plus, Minus, ShoppingCart, Landmark } from "lucide-react"
import { getProducts } from "@/services/product-service"
import { Product } from "@/services/product-service"
import { buildSafeImageUrl } from "@/lib/utils"
import Image from "next/image"
import { createPayment, PaymentType, PaymentStatus, Payment } from "@/services/payment-service"
import { PaymentTypeSelector } from "@/components/paymentType"
import { createSale, SaleStatus, Sale } from "@/services/sale-service"
import { createSaleItem, createSaleOrderItems, SaleItem, SaleOrderItems } from "@/services/saleItem-service"
// import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation';
import { useUser } from "@/hooks/context/user-context"
import ClientCard from "@/components/dashboard/clientCard"
import { Client, getLastClient } from "@/services/client-service"



interface CartItem extends Product {
  quantity: number
}

// import useSWR, { mutate } from 'swr';

// const { data: inventory } = useSWR('/api/inventory', fetcher);

// // Después de actualizar el inventario
// // await fetch('/api/update-inventory', { method: 'POST', body: JSON.stringify(dto) });
// mutate('/api/inventory'); // Refresca los datos en pantalla
export default function POSPage() {
  // Autenticación
  const { user } = useUser();
  // Router
  const router = useRouter();
  const fecha = new Date();
  const _fecha = fecha.getDate() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getFullYear();
  const [products, setProducts] = useState<Product[]>([])
  // const [products,setProducts] = useSWR('pos', getProducts )
  const [payment, setPayment] = useState<PaymentType>(PaymentType.CASH);
  // const [sales, setSale] = useState<Sale[]>([])
  const [order, setOrder] = useState(1)
  const [client, setClient] = useState("")
  const [clientId, setClientId] = useState<number>()
  const [selected, setSelected] = useState<'ninguno'|'default' | 'custom'>('ninguno');
  



  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
        console.log("Products fetched:", productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    const fetchClient = async () => {
      try {
        const clientResult = await getLastClient();
        const clientArray: Client[] = Array.isArray(clientResult) ? clientResult : [];
        const clientData = clientArray[0];
        setClient(clientData?.name || "Default Client");
        setClientId(clientData?.id);
        console.log("Client fetched:", clientData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
    fetchClient();
  }, []);
  const [cart, setCart] = useState<CartItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.id === product.id)
    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
      }
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId: string) => {
    const existingItem = cart.find((item) => item.id.toString() === productId)
    if (existingItem && existingItem.quantity > 1) {
      setCart(cart.map((item) => (item.id.toString() === productId ? { ...item, quantity: item.quantity - 1 } : item)))
    } else {
      setCart(cart.filter((item) => item.id.toString() !== productId))
    }
  }

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const handleCheckout = async () => {

    const total = parseFloat((getTotalAmount() * 1.16).toFixed(2))
    const payloadPayment: Payment = {
      method: payment,
      status: PaymentStatus.PENDING,
      amount: total,
      reference: `venta-${order}-${_fecha}}`
      // reference: `Venta-${new Date().getTime()}`
    }

    try {
      // alert(JSON.stringify(payloadPayment))
      const selectMethod = await createPayment(payloadPayment)
      console.log("selectMethod", selectMethod.id)
      // alert("selectMethod" + JSON.stringify(selectMethod.id))
      if (!selectMethod.id) {
        console.error("Error creating payment method");
        return;
      }
      const payloadSale: Sale = {
        // id:1,
        orden: order,
        total: total,
        status: SaleStatus.PENDING,
        clientId: clientId ?? 1,
        paymentId: selectMethod.id ?? 0,
        userId: Number(user?.sub)
      }
      //  const payloadSale={
      //       // id:1,
      //       orden: order,
      //       total: total,
      //       status: SaleStatus.PENDING,
      //       clientId: clientId ?? 1,
      //       paymentId: selectMethod.id ?? 0,
      //       userId:Number(user?.sub)
      //  }

      setOrder(order + 1)
      // alert("PAYLOADSALE")
      // alert(JSON.stringify(payloadSale))
      const saleOrderCreated = await createSale(payloadSale)
      // alert(saleOrderCreated)
      const productsPayload = {
        products: cart.map(p => ({
          id: p.id,
          price: Number(p.price),
          quantity: Number(getTotalItems()),
        })),
      };
      if (cart.length === 1) {

        // const productCreated = await createSaleItem(productsPayload.products[0]);
        const saleorder_item_payload: SaleItem = {
          saleId: saleOrderCreated.id ?? 0,
          productId: productsPayload.products[0].id,
          quantity: productsPayload.products[0].quantity,
          price: productsPayload.products[0].price,
        }
        // alert(JSON.stringify(saleorder_item_payload))
        await createSaleItem(saleorder_item_payload)
      } else if (cart.length > 1) {
        const saleorder_item_payload: SaleOrderItems = {
          saleId: saleOrderCreated.id,
          items: cart.map((product) => ({
            productId: product.id,        // ID recién creado
            quantity: product.quantity,                // Stock actual
            price: product.price + product.price * 1.16               // Precio individual
          }))
        };
        // alert(JSON.stringify(saleorder_item_payload))
        await createSaleOrderItems(saleorder_item_payload)
      } else {
        console.log('No hay productos válidos para crear');
      }
    } catch (error) {
      console.log(`Error create sale ${error}`)
    }

    setCart([])
    setClient("")

    router.push('/dashboard/sales');


  }
  const [cashReceived, setCashReceived] = useState<number | null>(null);

  const change = cashReceived !== null ? cashReceived - parseFloat((getTotalAmount() * 1.16).toFixed(2)) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Punto de Venta</h1>
          <p className="text-muted-foreground">Procesa ventas de manera rápida y eficiente</p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          <ShoppingCart className="mr-2 h-4 w-4" />
          {getTotalItems()} artículos
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Products Section */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Productos</CardTitle>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        {/* Imagen del producto */}
                        {product.image ? (

                          <div className="w-20 h-20 bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground">
                            {/* Sin imagen */}

                            <Image
                              src={buildSafeImageUrl(product.image)}
                              // src ={'/images/products/'+product.image}
                              alt={product.name}
                              width={500}
                              height={500}
                              className="w-full  object-cover group-hover:scale-105 transition-transform "
                            />
                          </div>

                        ) : (
                          <div className="w-20 h-20 bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground">
                            Sin imagen

                          </div>
                        )}

                        {/* Info y acción */}
                        <div className="flex-1">
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground">Stock: {product.stock}</p>
                        </div>

                        <Button onClick={() => addToCart(product)} disabled={product.stock === 0} >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cart Section */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Carrito de Compras</CardTitle>
              <div className="flex justify-between">
                <label htmlFor="">
                  Seller: {user?.role}
                  Nombre: {user?.name}
                </label>
                <span className="font-bold mb-2">Fecha: {_fecha}</span>
              </div>



            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">El carrito está vacío</p>
              ) : (

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="font-bold mb-2">Orden: {1}</span>

                    <span className="font-bold mb-2">Cliente: {client || "Default"}</span>
                  </div>
                  <div className="p-6">
                    <ClientCard onClientCreated={(name, id, selectedValue) => {
                      setClient(name);
                      setClientId(id)
                      setSelected(selectedValue as 'ninguno' | 'default' | 'custom')
                    }} />
                    {/* Aquí iría el resto del carrito */}
                  </div>
                  <Separator />
                  {/* <div className="h-px bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200 my-6" /> */}

                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} c/u</p>
                        <p className="text-sm text-muted-foreground">${item.price} c/u</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {/* <Button variant="outline" size="sm" onClick={() => removeFromCart(item.id.toString())} disabled={item.quantity <= 1}> */}
                        <Button variant="outline" onClick={() => removeFromCart(item.id.toString())} disabled={item.quantity <= 1}>
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          // size="sm"
                          onClick={() => addToCart(item)}
                          disabled={item.quantity >= item.stock}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Separator />

                  <div className="space-y-2">
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
                  <div className="flex justify-center">
                    <PaymentTypeSelector
                      value={payment}
                      onChange={setPayment}
                      className="mt-4"
                    />
                  </div>
                  <div>
                    <Separator />
                    {payment === PaymentType.CASH ? (
                      <p className="text-center text-muted-foreground py-8">Devuelto</p>
                    ) : (
                      <p>esperando</p>
                    )}
                  </div>
                  <div className="space-y-4">
                    <Separator />
                    {payment === PaymentType.CASH ? (
                      <div className="space-y-2">
                        <label className="text-sm text-muted-foreground">¿Con cuánto paga?</label>
                        <Input
                          type="number"
                          placeholder="Monto recibido"
                          value={cashReceived ?? ""}
                          onChange={(e) => setCashReceived(Number(e.target.value))}
                          className="max-w-sm"
                        />
                        {cashReceived !== null && (
                          <p className="text-center text-muted-foreground py-2">
                            Devuelto: <span className="font-semibold">${change !== null ? (change < 0 ? 0 : change.toFixed(2)) : "0.00"}</span>
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground py-8">Esperando método de pago</p>
                    )}
                  </div>

                  <div className="flex justify-center">
                    {/* <Button className="w-full" size="lg" onClick={handleCheckout}> */}
                    <Button className="w-full" onClick={handleCheckout} disabled={selected==="ninguno" }>
                      <Landmark className="mr-2 h-4 w-4" />
                      Procesar Venta
                    </Button>
                  </div>
 
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
