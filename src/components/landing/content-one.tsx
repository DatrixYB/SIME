"use client"

import { Button } from "@radix-ui/themes"

export function Content_one() {
  return (
    <section className="px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-2">Impulsa tu PyME con herramientas inteligentes</h2>

        <div className="grid md:grid-cols-2 gap-12 mt-12">
          <div>
            <h3 className="font-semibold mb-3">Gestión centralizada</h3>
            <p className="text-gray-600 text-sm mb-4">
              Administra ventas, inventario, clientes y finanzas desde una sola plataforma. Optimiza tus procesos y toma decisiones con datos en tiempo real.
            </p>
            <Button variant="outline" className="text-[#18a0fb] border-[#18a0fb] bg-transparent">
              Ver funcionalidades
            </Button>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Automatización de tareas</h3>
            <p className="text-gray-600 text-sm mb-4">
              Ahorra tiempo automatizando tareas repetitivas como facturación, seguimiento de pagos y reportes contables. Más eficiencia, menos esfuerzo.
            </p>
            <Button variant="outline" className="text-[#18a0fb] border-[#18a0fb] bg-transparent">
              Descubre cómo
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mt-12">
          <div>
            <h3 className="font-semibold mb-3">Colaboración en equipo</h3>
            <p className="text-gray-600 text-sm mb-4">
              Asigna roles, comparte información y mantén a tu equipo alineado. Nuestro software facilita la comunicación y el trabajo conjunto.
            </p>
            <Button variant="outline" className="text-[#18a0fb] border-[#18a0fb] bg-transparent">
              Explorar beneficios
            </Button>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Escalabilidad garantizada</h3>
            <p className="text-gray-600 text-sm mb-4">
              Crece sin límites. Nuestro sistema se adapta a tus necesidades a medida que tu negocio evoluciona, sin perder rendimiento ni control.
            </p>
            <Button variant="outline" className="text-[#18a0fb] border-[#18a0fb] bg-transparent">
              Conoce más
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}