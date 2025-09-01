// pages/auth/error.tsx
import { useRouter } from 'next/router';

const messages: Record<string, string> = {
  OAuthCallback: 'Provider callback failed.',
  OAuthAccountNotLinked: 'Email already used with another provider.',
  CredentialsSignin: 'Invalid credentials.',
  default: 'Authentication failed. Please try again.',
};

export default function AuthErrorPage() {
  const { query } = useRouter();
  const code = typeof query.error === 'string' ? query.error : '';
  const msg = messages[code] ?? messages.default;

  return (
    <main>
      <h1>Sign-in error</h1>
      <p>{msg}</p>
      <a href="/auth/signin">Back to sign in</a>
    </main>
  );
}
