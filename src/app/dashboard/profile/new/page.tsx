'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import { createUser, UserRole } from '@/services/user-service'
import { useRouter } from 'next/navigation'

const roleLabels = UserRole

export default function UserForm() {
  // Router 
  const router = useRouter();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [verify, setVerify] = useState('')
  const [isActive, setIsActive] = useState(false)
  const [selectedRole, setSelectedRole] = useState<UserRole>('ADMIN' as UserRole)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | string>("")

  useEffect(() => {
    if (!imageFile) {
      setImagePreview("")
      return
    }

    const objectUrl = URL.createObjectURL(imageFile)
    setImagePreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [imageFile])

  const submitUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !password) {
      alert('Por favor, complete todos los campos obligatorios.')
      return
    }
    if (password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres.')
      return
    }

    const userPayload = {
      name,
      email,
      password,
      // verify,
      // isActive,
      role: selectedRole,
      image: imagePreview,
    }

    console.log('Usuario creado:', userPayload)
    alert('Proveedor creado exitosamente' + userPayload.email)
    // Aquí enviarías a backend
    try {
      await createUser(userPayload);
      router.push('./')
    } catch (err) {
      console.error(err);
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImageFile(null)
      return
    }
    setImageFile(e.target.files[0])
  }

  return (
    <form
      onSubmit={submitUser}
      className="flex flex-col gap-8 px-6 py-8 lg:flex-row max-w-7xl mx-auto"
    >
      {/* Formulario */}
      <section className="w-full max-w-md flex flex-col gap-6">
        <Link href="./">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
        </Link>

        <h1 className="text-3xl font-bold text-[#0d151c] tracking-tight">
          Crear Usuario
        </h1>

        {/* Selector de rol */}
        <div>
          <label className="block text-sm font-medium text-[#0d151c] mb-1">
            Rol
          </label>
          <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)}>
            <SelectTrigger className="w-full h-12 rounded-xl border border-[#cedce8] bg-slate-50 px-4 py-3 text-[#0d151c] focus:outline-none focus:ring-2 focus:ring-[#0b80ee]">
              <SelectValue placeholder="Seleccionar rol" />
            </SelectTrigger>
            <SelectContent className="bg-white rounded-xl shadow-lg border border-[#cedce8]">
              {Object.entries(roleLabels).map(([value, label]) => (
                <SelectItem
                  key={value}
                  value={value}
                  className="cursor-pointer px-4 py-2 text-[#0d151c] text-sm hover:bg-slate-100"
                >
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>


          {/* Mostrar el rol seleccionado */}
          <p className="mt-2 text-sm text-gray-700">
            Rol seleccionado: <span className="font-semibold">{roleLabels[selectedRole]}</span>
          </p>
        </div>

        {/* Nombre */}
        <div>
          <label htmlFor="name-input" className="block mb-1 text-sm font-medium text-[#0d151c]">
            Nombre
          </label>
          <Input
            id="name-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            placeholder="Nombre completo"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email-input" className="block mb-1 text-sm font-medium text-[#0d151c]">
            Email
          </label>
          <Input
            type="email"
            id="email-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="Correo electrónico"
            required
          />
        </div>

        {/* Contraseña */}
        <div>
          <label htmlFor="password-input" className="block mb-1 text-sm font-medium text-[#0d151c]">
            Contraseña
          </label>
          <Input
            type="password"
            id="password-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder="Contraseña"
            required
            minLength={6}
          />
        </div>

        {/* Observación interna */}
        <div>
          <label htmlFor="verify-textarea" className="block mb-1 text-sm font-medium text-[#0d151c]">
            Verificación (opcional)
          </label>
          <Textarea
            id="verify-textarea"
            value={verify}
            onChange={(e) => setVerify(e.target.value)}
            name="verify"
            placeholder="Observación interna"
            rows={3}
          />
        </div>

        {/* Estado del usuario */}
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-[#0d151c]">Estado del Usuario</h2>
          <Button
            type="button"
            variant={isActive ? 'default' : 'outline'}
            className={`w-32 transition-colors ${isActive
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            onClick={() => setIsActive(!isActive)}
            aria-pressed={isActive}
          >
            {isActive ? 'Activo' : 'Inactivo'}
          </Button>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="mt-6 bg-[#0b80ee] text-white font-semibold hover:bg-[#0963c4]"
          >
            Crear Usuario
          </Button>
        </div>
      </section>

      {/* Imagen y preview */}
      <section className="flex flex-col items-center gap-6 border-2 border-dashed border-[#cedce8] rounded-xl p-6 max-w-[480px] w-full mx-auto lg:mx-0">
        <h2 className="text-lg font-bold text-center text-[#0d151c]">
          Imagen de Perfil
        </h2>
        <p className="text-sm text-center text-[#0d151c]">
          Haz clic para subir
        </p>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="cursor-pointer rounded border border-[#cedce8] bg-white px-3 py-2"
        />

        {imagePreview && (
          <Image
            src={imagePreview}
            width={200}
            height={200}
            alt="Preview de la imagen"
            className="mt-4 max-h-48 w-auto rounded-lg object-contain shadow-md"
          />
        )}
      </section>
    </form>
  )
}
