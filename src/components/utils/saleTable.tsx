'use client';
import * as ScrollArea from '@radix-ui/react-scroll-area';

type Sale = {
  id: number;
  product: { name: string; quantity: number; price: number }[];
  total: number;
  statusSale: 'PENDING' | 'COMPLETED' | 'FAILED';
};

// const sale: Sale = {
//   id: 189,
//   product: [{ name: 'Cerveza Poker Negra', quantity: 6, price: 2000 },
//     { name: 'Cerveza Poker Negra', quantity: 6, price: 2000 }
//   ],
//   total: 13920,
//   statusSale: 'PENDING',
// };

export default function SaleTable( SaleTableProps: { sale: Sale } ) {
    const { sale } = SaleTableProps;
  return (
    <ScrollArea.Root className="w-full h-auto overflow-hidden rounded border border-gray-300">
      <ScrollArea.Viewport className="w-full">
        <table className="min-w-full text-sm text-left bg-white">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Producto</th>
              <th className="px-4 py-2 border">Cantidad</th>
              <th className="px-4 py-2 border">Precio Unitario</th>
              <th className="px-4 py-2 border">Total</th>
              {/* <th className="px-4 py-2 border">Estado</th> */}
            </tr>
          </thead>
          <tbody>
            {sale.product.map((prod, idx) => (
              <tr key={idx} className="border-t">
                <td className="px-4 py-2 border">{sale.id}</td>
                <td className="px-4 py-2 border">{prod.name}</td>
                <td className="px-4 py-2 border">{prod.quantity}</td>
                <td className="px-4 py-2 border">${prod.price}</td>
                <td className="px-4 py-2 border">${prod.price*prod.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='flex justify-between px-4 py-2 bg-gray-50 border-t'>

   
            <label htmlFor="" className="text-sm font-medium text-gray-700">
                Estado: 
                <span className={
                sale.statusSale === 'COMPLETED' ? 'text-green-600 font-semibold' :
                sale.statusSale === 'FAILED' ? 'text-red-600 font-semibold' :
                'text-yellow-500 font-semibold'
                }>
                {sale.statusSale}
                </span>
            </label>
                     <label htmlFor="" className="text-sm font-medium text-gray-700">
                Total: ${sale.total.toFixed(2)}
            </label>
        </div>
        {/* <div>
            <label htmlFor="">Total:  {sale.total} </label>
        <label htmlFor="">
                   <span className={
                    sale.statusSale === 'COMPLETED' ? 'text-green-600 font-semibold' :
                    sale.statusSale === 'FAILED' ? 'text-red-600 font-semibold' :
                    'text-yellow-500 font-semibold'
                  }>
                    {sale.statusSale}
                  </span>
        </label>
        </div> */}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical" className="w-2 bg-gray-200">
        <ScrollArea.Thumb className="bg-gray-500 rounded-full" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}