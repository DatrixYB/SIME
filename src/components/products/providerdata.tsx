import React from 'react'

interface Supplier {
  name: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  // category: string;
}
export default function providerdata({ data }: { data: Supplier }) {
    const {name,contactName, email,phone, address } = data
  return (
    <div>

            {/* Nombre */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-[#0d151c]">Empresa</label>
                  <label>
                    {data.name}
                  </label>
                  <label htmlFor="">
                    {name}
                  </label>
                  {/* // value={name} */}
                  {/* // onChange={(e) => setName(e.target.value)} */}
                  {/* // placeholder="Nombre de la empresa proveedor" */}
                  {/* // required */}
                  {/* /> */}
        
                </div>
        
                {/* ContactName */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-[#0d151c]">Contacto Ventas</label>
                  {/* <Input
                    // type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Contacto"
                    // min={0}
                    // step={0.01}
                    required
                  /> */}
                  <label>
                    {contactName}
                  </label>
                </div>
        
                {/* Email */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-[#0d151c]">Email</label>
                  {/* <Input
                    // type="number"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email proveedor"
                    // min={0}
                    required
                  /> */}
                  <label>
                    {email}
                  </label>
                </div>
        
                {/* Phone */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-[#0d151c]">Phone</label>
                  {/* <Input
                    // type="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone"
                    // min={0}
                    required
                  /> */}
                  <label>
                    {phone}
                  </label>
                </div>
        
                {/* Descripción */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-[#0d151c]">Dirección</label>
                  {/* <Textarea
                    value={address}
                    // onChange={(e) => setAddress(e.target.value)}
                    placeholder="Dirección del proveedor"
                    rows={3}
                  /> */}
                  <label>
                    {address}
                  </label>
                </div>
    </div>
  )
}
