'use client' // Si estás en app router

import { useRef } from 'react'
import Image from 'next/image' // Opcional, si previewás la imagen

export default function ImageUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null)

const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (!file) return
    if (file) {
      console.log('Imagen seleccionada:', file.name)
      // Acá podés manejar: preview, validaciones, envío a API o almacenamiento
    }
  const formData = new FormData()
  formData.append('image', file)

  try {
    // const res = await fetch('http://localhost:3000/products/upload-image', {
    //   method: 'POST',
    //   body: formData,
    // })

    // const result = await res.json()
    console.log('Imagen guardada en:')
    // Podés actualizar el estado o mostrar el preview con la URL pública
  } catch (error) {
    console.error('Error al subir imagen:', error)
  }
}
  return (
    <div className="flex justify-end py-3">
      <label htmlFor="file-upload" className="mt-4 cursor-pointer">
        <button
          type="button"
          className="bg-[#e7edf4] text-sm font-bold text-[#0d151c] px-4 py-2 rounded hover:bg-[#d3e0f0] transition"
          onClick={() => fileInputRef.current?.click()}
        >
          Upload Image
        </button>
        <input
          type="file"
          id="file-upload"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageUpload}
        />
      </label>
    </div>
  )
}