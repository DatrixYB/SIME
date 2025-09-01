"use client"

export function Content_two() {
  return (
    <section className="px-6 py-16 bg-[#f5f5f5]">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Aquí podrías insertar una imagen del dashboard o una ilustración del software */}
        
          <div>
            <h3 className="text-xl font-semibold mb-4">Control total desde un solo lugar</h3>
            <p className="text-gray-600 text-sm">
              Nuestro software para PyMEs te permite visualizar métricas clave, gestionar operaciones diarias y tomar decisiones informadas desde un panel intuitivo. Simplifica la administración y enfócate en hacer crecer tu negocio.
            </p>
          </div>
            <div className="bg-[#cccccc] h-64 rounded-lg flex items-center justify-center text-gray-700 text-sm">
            Vista del panel de control del sistema PyME
          </div>
        </div>
      </div>
    </section>
  )
}