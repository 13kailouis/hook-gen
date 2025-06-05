import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4">
      <div className="w-full max-w-md space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Masuk ke <span className="text-green-400">HookFreak</span>
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Satu klik untuk mulai membangun hook viral
          </p>
        </header>

        <button
          onClick={login}
          disabled={loading}
          className="group relative flex w-full justify-center rounded-lg border border-gray-700 bg-gray-900 py-3 px-4 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-green-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
          ) : (
            <>
              <FcGoogle className="h-5 w-5 mr-3" />
              <span>Login dengan Google</span>
            </>
          )}
        </button>

        <p className="text-center text-xs text-gray-500">
          Dengan login Anda menyetujui{' '}
          <a href="/terms" className="underline hover:text-gray-400">
            Syarat & Ketentuan
          </a>
          .
        </p>
      </div>
    </div>
  );
}
