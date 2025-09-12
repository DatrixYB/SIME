'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
// import { Switch } from '@/components/ui/switch'
import Link from 'next/link'
import { Button } from '@radix-ui/themes'
import { MoveLeft } from 'lucide-react'
import { createSupplier } from '@/services/supplier-service'
import { useRouter } from "next/navigation";




export default function SupplierForm() {
    // Router 
  const router = useRouter();
  // Provider
  const [name, setName] = useState('')
  const [nameContact, setNameContact] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState<string | ''>('')
  // const [isActive, setIsActive] = useState(true)


  useEffect(() => {


  }, [])

  const submitProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || email === '' || phone === '') {
      alert('Completa los campos obligatorios')
      return
    }

    const productPayload = {
      name,
      contactName: nameContact,
      address,
      email,
      phone,
      // isActive,
      // totalProducts: 0, // Asumiendo que este campo se maneja en el backend
    }

    console.log('Supplier creado:', productPayload)
    alert('Proveedor creado exitosamente'+ productPayload.address) 
    // Aquí enviarías a backend
      try {
    await createSupplier(productPayload);
    router.push("./");

  } catch (err) {
    console.error(err);
  }

  }

  return (
    <form className="flex flex-col gap-6 px-6 py-5 lg:flex-row" onSubmit={submitProduct}>
      {/* Formulario principal */}
      <section className="w-full max-w-md flex flex-col gap-4">
            <Link href="./">
          <Button>
            <MoveLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
        </Link>
        <h1 className="text-[28px] font-bold text-[#0d151c] tracking-tight">Crear Proveedor</h1>


        {/* Estado */}
        {/* <div className="flex items-center justify-between bg-slate-50 min-h-14 px-4 rounded-xl">
          <span className="text-[#0d151c] text-base">¿Activo?</span>
          <Switch checked={isActive} onCheckedChange={setIsActive} />
        </div> */}

        {/* Nombre */}
        <div>
          <label className="block mb-1 text-sm font-medium text-[#0d151c]">Nombre</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre del producto"
            required
          />
        </div>
        {/* E-mail */}
               <div>
          <label className="block mb-1 text-sm font-medium text-[#0d151c]">E-mail</label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail del proveedor"
            required
          />
        </div>
               <div>
          <label className="block mb-1 text-sm font-medium text-[#0d151c]">Nombre de contacto</label>
          <Input
            value={nameContact}
            onChange={(e) => setNameContact(e.target.value)}
            placeholder="Nombre del contacto o asesor"
            required
          />
        </div>


        {/* Phone */}
        <div>
          <label className="block mb-1 text-sm font-medium text-[#0d151c]">Telefono</label>
          <Input
            type="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            min={0}
            required
          />
        </div>

  

        {/* Descripción */}
        <div>
          <label className="block mb-1 text-sm font-medium text-[#0d151c]">Descripción</label>
          <Textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Dirección del proveedor"
            rows={3}
          />
        </div>

        {/* Botón */}
        <div className="flex justify-end py-3">
          <button
            type="submit"
            className="h-10 rounded-full px-4 bg-[#0b80ee] text-sm font-bold text-white hover:bg-[#0a6fd1]"
          >
            Crear Proveedor
          </button>
        </div>
      </section>
    </form>
  )
}
