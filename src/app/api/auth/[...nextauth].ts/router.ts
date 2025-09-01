
// // import {  } from '@/libs/auth';
// // import { AuthOptions } from 'next-auth';
// import { authOptions } from '@/lib/auth';
// import NextAuth from 'next-auth';

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST }

import NextAuth from "next-auth"
// import GoogleProvider from "next-auth/providers/google"
// import CredentialsProvider from "next-auth/providers/credentials"
import { authOptions } from "@/lib/auth" // Aquí puedes poner tu config si ya la tienes separada

// Si no quieres usar archivo aparte, puedes definir los providers directo aquí
export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
