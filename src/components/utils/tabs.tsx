'use client';
import * as Tabs from '@radix-ui/react-tabs';
import UpdateProductsSection from '../products/UpdateProductsSection';
import { Product } from '@/services/product-service';

type ProductTabsProps = {
  children: React.ReactNode;
  onProductUpdate: (product: Product
  ) => void;
  supplierId?:number;
  products?: number;
};

export default function ProductTabs({
  children,onProductUpdate,supplierId, products = 0
}: ProductTabsProps) {
  return (
    <Tabs.Root defaultValue="create" className="w-full max-w-4xl mx-auto">
      <Tabs.List className="flex border-b border-gray-300">
        <Tabs.Trigger
          value="create"
          className="px-4 py-2 text-sm font-medium text-[#0d151c] data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
        >
          Crear Producto
        </Tabs.Trigger>
          {products > 0 && (
    <Tabs.Trigger
      value="update"
      className="px-4 py-2 text-sm font-medium text-[#0d151c] data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
    >
      Actualizar Producto 
    </Tabs.Trigger>
  )}

      </Tabs.List>

      <Tabs.Content value="create" className="pt-6">
        {/* Aquí va tu sección de creación */}
        {/* <CreateProductSection /> */}
{children}
      </Tabs.Content>

      <Tabs.Content value="update" className="pt-3">
        {/* Aquí va tu sección de actualización */}
        <div className='w-full'>

        <UpdateProductsSection onSubmitUpdate={onProductUpdate} subplierID={supplierId}  />
        </div>
        
      </Tabs.Content>
    </Tabs.Root>
  );
}