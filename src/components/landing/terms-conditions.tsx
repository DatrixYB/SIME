// components/TermsAndConditions.tsx
import React from "react";

const TermsAndConditions = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">📄 Términos y Condiciones de Uso – SIME</h1>
      <p className="text-sm text-gray-500 mb-8">Última actualización: 3 de septiembre de 2025</p>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. 🧾 Aceptación de los términos</h2>
          <p>Al registrarte, acceder o utilizar SIME, estás aceptando estos Términos y Condiciones, así como nuestra Política de Privacidad. Si no estás de acuerdo, no debés utilizar el sistema.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. 🛠️ Uso del servicio</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>SIME está destinado exclusivamente a la gestión administrativa de microempresas.</li>
            <li>El usuario es responsable de la veracidad de los datos ingresados.</li>
            <li>No se permite el uso del sistema para actividades ilícitas, fraudulentas o que infrinjan derechos de terceros.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. 🔐 Privacidad y protección de datos</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>La información ingresada será tratada de forma confidencial.</li>
            <li>No compartimos datos con terceros sin consentimiento explícito.</li>
            <li>El usuario puede solicitar la eliminación de sus datos en cualquier momento.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. 💳 Planes y pagos</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>El uso de SIME puede estar sujeto a planes gratuitos o pagos.</li>
            <li>Los pagos se gestionan a través de plataformas seguras y externas.</li>
            <li>No se realizan reembolsos por períodos ya facturados, salvo excepciones legales.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">5. 📉 Limitación de responsabilidad</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>SIME se ofrece “tal como está”, sin garantías explícitas o implícitas.</li>
            <li>No nos responsabilizamos por pérdidas económicas derivadas del uso del sistema.</li>
            <li>El usuario acepta que SIME puede contener errores o interrupciones temporales.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">6. 🔄 Modificaciones</h2>
          <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán comunicados a través del sistema o por correo electrónico. El uso continuado implica aceptación de los nuevos términos.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">7. 📬 Contacto</h2>
          <p>Para consultas, sugerencias o reclamos:</p>
          <ul className="list-none pl-0 space-y-1">
            <li><strong>Email:</strong> soporte@sime.com</li>
            <li><strong>Teléfono:</strong> +57 321 XXX XXXX</li>
            <li><strong>Horario:</strong> Lunes a viernes, de 9:00 a 17:00 (ART)</li>
          </ul>
        </section>
      </div>
    </section>
  );
};

export default TermsAndConditions;