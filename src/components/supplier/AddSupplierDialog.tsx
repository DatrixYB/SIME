"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";
// import { cn } from "@/lib/utils";

interface Supplier {
  id: number;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  // category: string;
}

interface Props {
  onAddSupplier: (supplier: Supplier) => void;
  data: Supplier;
}

export default function AddSupplierDialog({ onAddSupplier ,data }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [newSupplier, setNewSupplier] = useState<Supplier>({
    id:data.id,
    name: data.name,
    contactName: data.contactName,
    email: data.email,
    phone: data.phone || "",
    address: data.address || "",
    // category: "",
  });

  const handleChange = (field: keyof Supplier, value: string) => {
    setNewSupplier((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onAddSupplier(newSupplier);
    setIsOpen(false);
    setNewSupplier({
      id: data.id, 
      name: "",
      contactName: "",
      email: "",
      phone: "",
      address: "",
      // category: "",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button  variant="outline" size="sm" className="bg-primary text-black hover:bg-primary/90">
          {/* <Plus className="mr-2 h-4 w-4" /> */}
          <Edit className="h-4 w-4" />

        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-xl border bg-white shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-900">
            🧾 Nuevo proveedor
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <label htmlFor="">
           Proveedor: {data.id}
          </label>
          {[
            { id: "name", label: "Nombre de la empresa" },
            { id: "contactName", label: "Persona de contacto" },
            { id: "email", label: "Email", type: "email" },
            { id: "phone", label: "Teléfono" },
            { id: "address", label: "Dirección" },
            // { id: "category", label: "Categoría" },
          ].map(({ id, label, type = "text" }) => (
            <div key={id} className="grid gap-1">
              <Label htmlFor={id} className="text-sm font-medium text-gray-700">
                {label}
              </Label>
              <Input
                id={id}
                type={type}
                value={newSupplier[id as keyof Supplier]}
                onChange={(e) => handleChange(id as keyof Supplier, e.target.value)}
                className="text-sm focus-visible:ring-primary"
                placeholder={`Ingresá ${label.toLowerCase()}`}
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white">
            Confirmar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}