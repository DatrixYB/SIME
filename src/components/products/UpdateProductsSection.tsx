import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from '@/components/ui/select'
import { getProducts, Product } from '@/services/product-service'
import { Button } from '@radix-ui/themes'
import { Plus } from 'lucide-react'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
type Props = {
  onSubmitUpdate: (product: CartItem) => void;
};

// Define CartItem type based on usage in addToCart
type CartItem = {
  id: number;
  name: string;
  price: number;
  stock: number;
  minStock: number;
  description?: string;
  image?: string;
  isActive: boolean;
  supplierId: number;
  categoryId: number;
  quantity: number;
  category?: string;
};


function UpdateProductsSection({ onSubmitUpdate }: Props) {

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

  // Categoria
  // const [newCategoryName, setNewCategoryName] = useState("");
  // Selección de proveedor y categoría
  // const [selectedSupplierId, setSelectedSupplierId] = useState<string | null>(null)
  // const [selectedCategory, setSelectedCategory] = useState("")
  // Define the Product type if not already imported
  type Product = {
    id: number
    name: string
    price: number
    stock: number
    minStock: number
    description?: string
    categoryId: number
    supplierId: number
    categoryName?: string
    imageUrl?: string
    // Add other fields as needed
  }

  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState(0)


  useEffect(() => {


    const fetchProducts = async () => {
      try {
        const data: Product[] = await getProducts()
        console.log('Proveedores obtenidos:', data)
        setProducts(data)
      } catch (error) {
        console.error('Error al obtener proveedores:', error)
      }
    }
    fetchProducts()
    if (!imageFile) {
      setImagePreview(null)
      return
    }
    const objectUrl = URL.createObjectURL(imageFile)
    setImagePreview(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [imageFile])
  function addToCart(): void {
    const newProduct: CartItem = {
      id: selectedProduct,
      name: nameProduct,
      price: Number(price),
      stock: Number(stock),
      minStock,
      description,
      // image: imageFile ? URL.createObjectURL(imageFile) : null,
      image: imagePreview ? "default" : "",
      isActive,
      supplierId: Number(supplierId),
      categoryId: categoryId,
      quantity: 1,
    }
    // alert(JSON.stringify(newProduct))
    onSubmitUpdate(newProduct)
  }

  return (
    <div>UpdateProductsSection

      <section className="flex flex-col items-center gap-4 max-w-[960px] w-full">
        <div className="w-full">
          <label className="block text-sm font-medium text-[#0d151c] mb-1">Seleccionar Producto</label>
          <Select value={selectedProduct?.name || ''} onValueChange={(value) => {
            const product = products.find((p) => p.name === value);
            alert(JSON.stringify(product))
            if (product) {
              setSelectedProduct(product.id);
              setNameProduct(product.name);
              setPrice(product.price);
              setStock(product.stock);
              setMinStock(product.minStock);
              setSupplierId(product.supplierId);
              setCategoryId(product.categoryId);
              // setSelectedCategory(product.categoryName);
              setImagePreview(product.imageUrl || '');
            }
          }}>
            <SelectTrigger className="w-full h-12 rounded-xl border border-[#cedce8] bg-slate-50 px-4 py-3 text-[#0d151c] focus:outline-none focus:ring-2 focus:ring-[#0b80ee]">
              <SelectValue placeholder="Seleccionar producto" />
            </SelectTrigger>
            <SelectContent className="bg-white rounded-xl shadow-lg border border-[#cedce8]">
              {products.map((product) => (
                <SelectItem
                  key={product.id}
                  value={product.name}
                  className="cursor-pointer px-4 py-2 text-[#0d151c] text-sm hover:bg-slate-100"
                >
                  {product.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>

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
          {/* <div className='gap-3 border-2 border-dashed border-[#cedce8]  rounded-xl p-6 w-full'>
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
          </div> */}


          {/* Botón */}
          <div className="flex justify-end py-3">

            {/* <Button onClick={() => addToCart()}   disabled={cart.length > 0 && Number(supplierId) !== cart[0].supplierId}> */}
            <Button onClick={() => addToCart()}   >
              <Plus className="h-4 w-4" />
              Agregar Producto
            </Button>
          </div>
        </div>

      </section>
    </div>
  )
}

export default UpdateProductsSection