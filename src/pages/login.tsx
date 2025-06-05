import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Login() {
  const { user, loading, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      const next = (router.query.next as string) || '/builder';
      router.replace(next);
    }
  }, [loading, user, router]);

  return (
    <main style={{padding:'4rem 1rem',textAlign:'center'}}>
      <h1 style={{marginBottom:'2rem'}}>Masuk ke HookFreak</h1>
      <button onClick={login} className="btn primary">Login dengan Google</button>
    </main>
  );
}
