import React from 'react'

function CreateProductSection() {
  return (
<section className="flex flex-col items-center gap-4 max-w-[960px] w-full">
  <div className="w-full">
    <label className="block text-sm font-medium text-[#0d151c] mb-1">Seleccionar Producto</label>
    <Select value={selectedProduct?.name || ''} onValueChange={(value) => {
      const product = products.find((p) => p.name === value);
      if (product) {
        setSelectedProduct(product);
        setNameProduct(product.name);
        setPrice(product.price);
        setStock(product.stock);
        setMinStock(product.minStock);
        setDescription(product.description);
        setCategoryId(product.categoryId);
        setSelectedCategory(product.categoryName);
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

  
</section>
  )
}

export default CreateProductSection

