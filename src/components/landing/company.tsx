"use client"

import { Button } from "@radix-ui/themes"

export function Company() {
  return (
    <section className="px-6 py-16 bg-[#f5f5f5] md:flex">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-2">Confían en nosotros cientos de PyMEs</h2>
        <p className="text-gray-600 text-sm mb-12">
          Nuestro software potencia negocios reales. Desde comercios locales hasta empresas en expansión, ayudamos a crecer con tecnología accesible y confiable.
        </p>

        <div className="grid grid-cols-4 gap-8 mb-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-[#cccccc] h-16 rounded flex items-center justify-center text-gray-500 text-xs">
              Logo PyME {i + 1}
            </div>
          ))}
        </div>

        <div className="flex justify-center space-x-4">
          <Button className="bg-[#18a0fb] hover:bg-[#1590eb] text-white px-8">
            Empezar ahora
          </Button>
          <br />
          <Button variant="outline" className="text-[#18a0fb] border-[#18a0fb] bg-transparent">
            Ver casos de éxito
          </Button>
        </div>
      </div>
    </section>
  )
}