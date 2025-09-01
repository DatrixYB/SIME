// pages/auth/error.tsx
import { useRouter } from 'next/router';

export default function AuthErrorPage() {
  const { query } = useRouter();
  const messages = {
    OAuthCallback: 'Provider callback failed.',
    OAuthAccountNotLinked: 'Email already used with another provider.',
    CredentialsSignin: 'Invalid credentials.',
    default: 'Authentication failed. Please try again.',
  };
  const code = typeof query.error === 'string' ? query.error : '';
  return (
    <main>
      <h1>Sign‑in error</h1>
      <p>{messages[code] ?? messages.default}</p>
    </main>
  );
}
