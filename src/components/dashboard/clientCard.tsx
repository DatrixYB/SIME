// components/ClientCard.tsx
'use client';

import { createClient } from '@/services/client-service';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { useId, useState } from 'react';

interface ClientCardProps {
  onClientCreated?: (name: string, id: number) => void;
}


export default function ClientCard({ onClientCreated }: ClientCardProps) {
    const [selected, setSelected] = useState<'ninguno'|'default' | 'custom'>('ninguno');
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
    const [id, setId] = useState<number>();
    let createdName = formData.name || 'Cliente por defecto';

    const handleSelection = async (e: React.FormEvent) => {
        e.preventDefault();
        let cli;
  if (selected === 'default') {
    console.log('Seleccionaste cliente por defecto');
    alert('Cliente por defecto seleccionado');
    setFormData({ name: 'Cliente por defecto', email: 'defaul@gmail.com', phone: '12312412' });
            createdName = formData.name;
            
alert(JSON.stringify(formData))
           cli = await createClient(formData);
            setId(cli.id);
    // Ejecutá tu lógica acá: cargar cliente, actualizar estado, etc.
  }
    if (onClientCreated && cli && typeof cli.id === 'number') {
            onClientCreated(createdName, cli.id); // 🔥 Retornás el nombre al padre
        }
       // Resetear el formulario
        // setFormData({ name: '', email: '', phone: '' });
        setSelected('ninguno');
};

    const handleClientCreation = async (e: React.FormEvent) => {
        e.preventDefault();
        let cli;
        // Aquí podrías agregar la lógica para crear el cliente
        if (selected === 'default') {
            // setFormData({ name: 'Cliente por defecto' });
            createdName = formData.name;

            // cli = await createClient(formData);
            // setId(cli.id);
         
        } else if(selected === 'custom'){
            console.log('Cliente data:', formData);

            cli = await createClient(formData);
            setId(cli.id);
        }
   
        if (onClientCreated && cli && typeof cli.id === 'number') {
            onClientCreated(createdName, cli.id); // 🔥 Retornás el nombre al padre
        }
             // Resetear el formulario
        setFormData({ name: '', email: '', phone: '' });
        setSelected('ninguno');
    }

    return (
        <div className="border rounded-lg p-4 shadow-md w-full max-w-md bg-white">
            <h2 className="text-lg font-semibold mb-4">Seleccionar Cliente</h2>

            <RadioGroup.Root
                className="flex gap-4 mb-4"
                value={selected}
                onValueChange={(value) =>  setSelected(value as 'ninguno' | 'default'|'custom' )}
            >
                     <div className="flex items-center gap-2">
                    <RadioGroup.Item
                        value="ninguno"
                        id="r2"
                        className="w-4 h-4 rounded-full border border-gray-400 data-[state=checked]:bg-blue-600"
                    />
                    <label htmlFor="r2" className="text-sm">Ninguno</label>
                </div>
                <div className="flex items-center gap-2">
                    <RadioGroup.Item
                        value="default"
                        id="r1"
                        className="w-4 h-4 rounded-full border border-gray-400 data-[state=checked]:bg-blue-600"
                    />
                    <label htmlFor="r1" className="text-sm">Cliente por defecto</label>
                </div>

                <div className="flex items-center gap-2">
                    <RadioGroup.Item
                        value="custom"
                        id="r2"
                        className="w-4 h-4 rounded-full border border-gray-400 data-[state=checked]:bg-blue-600"
                    />
                    <label htmlFor="r2" className="text-sm">Agregar cliente</label>
                </div>
            </RadioGroup.Root>
 {selected === 'default' && (
                <form className="space-y-3"  >
            
                    <button
                        // type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                    
                    onClick={handleSelection}>
                        Crear Cliente por defecto
                    </button>


                </form>
            )}
            {selected === 'custom' && (
                <form className="space-y-3"  >
                    <div>
                        <label className="block text-sm font-medium">Nombre</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full border rounded px-3 py-2 mt-1"
                            placeholder="Juan Pérez"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full border rounded px-3 py-2 mt-1"
                            placeholder="juan@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Teléfono</label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full border rounded px-3 py-2 mt-1"
                            placeholder="+54 9 11 1234-5678"
                        />
                    </div>
                    <button
                        // type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                    
                    onClick={handleClientCreation}>
                        Crear Cliente
                    </button>


                </form>
            )}
        </div>
    );
}