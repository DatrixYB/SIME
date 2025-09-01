"use client"

export function Content_three() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="bg-[#cccccc] h-48 sm:h-64 rounded-lg flex items-center justify-center text-gray-700 text-sm">
            Módulo CRM para PyMEs
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-4">
              Fortalece tus relaciones comerciales
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Con nuestro sistema CRM integrado, podés gestionar contactos, hacer seguimiento de oportunidades y mejorar la atención al cliente. Todo desde una interfaz simple y pensada para PyMEs que quieren crecer con foco en sus vínculos.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}