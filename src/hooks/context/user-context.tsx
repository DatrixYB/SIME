// context/UserContext.tsx
'use client';
import { getUserById, UserRole } from '@/services/user-service';
import { createContext, useContext, useState, useEffect } from 'react';

type User = { id: string; name: string; email: string ;role:UserRole}; // adaptalo a tu modelo
type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // context/UserContext.tsx (fragmento dentro del useEffect)
useEffect(() => {
  const fetchUser = async () => {
    try {
    //   const res = await fetch('/api/me'); // debe devolver el usuario basado en el token
      const res =  await getUserById(118)
    //   alert(JSON.stringify(res))
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    if (res) {
        const userData = res;
        setUser(userData);
      } else {
        setUser(null); // token inválido o expirado
      }
    } catch (err) {
      console.error('Error al obtener usuario:', err);
      setUser(null);
    }
  };

  fetchUser();
}, []);



  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser debe usarse dentro de <UserProvider>');
  return context;
};