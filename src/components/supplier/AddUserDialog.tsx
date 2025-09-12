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
import { updateUser, User } from "@/services/user-service";
import UserRoleSelector from "./SelectRol";
import { AlertTitle } from "../ui/alert";

interface Props {
  onAddUser?: (supplier: User) => User;
  data: User;
}

export default function AddUserDialog({ onAddUser, data }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [newSupplier, setNewSupplier] = useState<User>({ 
    email:data.email,
    name:data.name,
    image:data.image ?? "DAR",
    role:data.role,
    password:data.password,

   });

  const handleChange = (field: keyof User, value: string) => {
    setNewSupplier((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (typeof onAddUser === "function") {
      onAddUser(newSupplier);
      // alert(newSupplier+"dialog")
    }
    // alert(JSON.stringify( newSupplier)+"not")
    if (typeof data.id === "number") {
      await updateUser(data.id, newSupplier);
    } else {
      alert("El ID del usuario no está definido.");
    }
    setIsOpen(false);
    setNewSupplier({ ...data }); // restaurar estado base
    
  };

  const fields: { id: keyof User; label: string; type?: string }[] = [
    { id: "name", label: "Nombre" },
    { id: "email", label: "Email", type: "email" },
    { id: "password", label: "Password" ,type:"password"},
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-primary text-black hover:bg-primary/90"
        >
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-xl border bg-white shadow-xl"
>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-900">
            🧾 Editar usuario
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <Label className="text-sm text-gray-600">ID: {data.id}</Label>
          
<UserRoleSelector
  selectedRole={newSupplier.role}
  setSelectedRole={(role) => handleChange("role", role)}
/>
<div className="grid gap-1">
  <Label htmlFor="avatar" className="text-sm font-medium text-gray-700">
    Avatar
  </Label>

  <Input
    id="avatar"
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          handleChange("image", "Default" ); // guarda base64
        };
        reader.readAsDataURL(file);
      }
    }}
    className="text-sm file:text-sm file:font-medium file:bg-primary file:text-white file:border-none"
  />

  {newSupplier.image && (
    <img
      src={newSupplier.image}
      alt="Preview"
      className="mt-2 h-20 w-20 rounded-full object-cover border"
    />
  )}
</div>
          {fields.map(({ id, label, type = "text" }) => (
            <div key={id} className="grid gap-1">
              <Label htmlFor={id} className="text-sm font-medium text-gray-700"  
  autoFocus={false}
>
                {label}
              </Label>
              <Input
                id={id}
                type={type}
                value={newSupplier[id] ?? ""}
                onChange={(e) => handleChange(id, e.target.value)}
                className="text-sm focus-visible:ring-primary"
                placeholder={`Ingresá ${label.toLowerCase()}`}
                 autoComplete="off"
              />
            </div>
          ))}
        </div>

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
