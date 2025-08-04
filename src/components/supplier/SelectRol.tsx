"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export enum UserRole {
  ADMIN = "ADMIN",
  SELLER = "SELLER",
  MANAGER = "MANAGER",
}

interface Props {
  selectedRole: UserRole | null;
  setSelectedRole: (role: UserRole) => void;
}

export default function UserRoleSelector({
  selectedRole,
  setSelectedRole,
}: Props) {
  return (
    <div>
      <Label className="block text-sm font-medium text-[#0d151c] mb-1">
        Rol de usuario
      </Label>

      <Select
        value={selectedRole ?? ""}
        onValueChange={(value) => setSelectedRole(value as UserRole)}
      >
        <SelectTrigger className="w-full h-12 rounded-xl border border-[#cedce8] bg-slate-50 px-4 py-3 text-[#0d151c] focus:outline-none focus:ring-2 focus:ring-[#0b80ee]">
          <SelectValue placeholder="Seleccionar rol" />
        </SelectTrigger>

        <SelectContent className="bg-white rounded-xl shadow-lg border border-[#cedce8]">
          {Object.values(UserRole).map((role) => (
            <SelectItem
              key={role}
              value={role}
              className="cursor-pointer px-4 py-2 text-[#0d151c] text-sm hover:bg-slate-100"
            >
              {role.charAt(0) + role.slice(1).toLowerCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}