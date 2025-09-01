'use client'
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Delete, Eye } from "lucide-react";
import { deleteCategory, getCategory } from "@/services/category-service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export default function DeleteCategoryDialog({catego}) {
  const [isOpen, setIsOpen] = useState(false);
  // const [categories, setCategories] = useState<string[]>([]);
  const [selectedToDelete, setSelectedToDelete] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false); // Evita hydration mismatch

  useEffect(() => {
    setMounted(true);

  }, []);

  const handleToggle = (category: string) => {
    setSelectedToDelete((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSubmit = async () => {
    await Promise.all(
      selectedToDelete.map(async (category) => {
        alert(category)
        await deleteCategory(category);
      })
    );
    setSelectedToDelete([]);
    setIsOpen(false);
    // Opcional: volver a cargar categorías
    // const updated = await getCategory();
    // setCategories(updated);

  };

  if (!mounted) return null; // Evita render antes de montar

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-primary text-black hover:bg-primary/90"
        >
          <Delete className="h-4 w-4" />
          Eliminar categoria
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto rounded-xl border bg-white shadow-xl px-6 py-4">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            🧾 Categorías
          </DialogTitle>
        </DialogHeader>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Selecciona categorías a eliminar</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
     {catego.map((category) => (
  <div key={category.id}>
    <Checkbox
      checked={selectedToDelete.includes(category.id)}
      onCheckedChange={() => handleToggle(category.id)}
    />
    <label htmlFor={category.id} className="text-sm font-medium text-gray-700 p-2">
      {category.name}
    </label>
    <label htmlFor="">{category.id}</label>
  </div>
))}
          </CardContent>
       
        </Card>

        <div className="mt-6 flex justify-end space-x-3">
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Confirmar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}