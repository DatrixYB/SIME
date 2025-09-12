"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Eye } from "lucide-react";
import { getSaleById, Sale } from "@/services/sale-service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SaleTable from "@/components/utils/saleTable";

interface Props {
  data: Sale;
}

export default function ViewSaleDialog({ data }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [saleId, setSaleId] = useState<{
    id: number;
    product: { name: string; quantity: number; price: number }[];
    total: number;
    statusSale: 'PENDING' | 'COMPLETED' | 'FAILED';
  } | null>(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        if (typeof data.id === "number") {
          const saleData = await getSaleById(data.id);
          // Transform saleData to match the expected SaleTable shape
          setSaleId({
            id: saleData.id ?? 0,
            product: saleData.product || [], // use the correct property name from Sale type
            total: saleData.total,
            statusSale: saleData.statusSale === "PENDING" || saleData.statusSale === "COMPLETED" || saleData.statusSale === "FAILED"
              ? saleData.statusSale
              : "PENDING",
          });
        } else {
          console.error("Invalid sale id:", data.id);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchSales();
  }, [data.id]);

  const handleSubmit = async () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-primary text-black hover:bg-primary/90"
        >
            <Eye className="h-4 w-4"  />
        </Button>
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-4xl max-h-[80vh] overflow-y-auto rounded-xl border bg-white shadow-xl px-6 py-4"
      >
        <DialogHeader className="mb-4">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            🧾 Venta
          </DialogTitle>
        </DialogHeader>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Historial de Ventas</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            {saleId && <SaleTable sale={saleId} />}
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-end space-x-3">
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Confirmar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
