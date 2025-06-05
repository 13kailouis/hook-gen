import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FiLogIn } from "react-icons/fi";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login() {
  const { user, loading, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      const next = (router.query.next as string) || "/builder";
      router.replace(next);
    }
  }, [loading, user, router]);

  return (
    <>
      <Head>
        <title>Login | HookFreak</title>
        <meta
          name="description"
          content="Masuk dan temukan hook viral Anda dengan HookFreak."
        />
      </Head>

      {/* Full‑screen gradient backdrop */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {/* Brand */}
          <div>
            <Image
              priority
              src="/logo.svg"
              alt="HookFreak logo"
              width={64}
              height={64}
              className="mx-auto"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
              Masuk ke HookFreak
            </h2>
            <p className="mt-2 text-center text-sm text-gray-400">
              Jadikan 1 detik pertama kontenmu mustahil di‑skip
            </p>
          </div>

          {/* Google Login button */}
          <button
            onClick={login}
            disabled={loading}
            className="group relative flex w-full justify-center items-center rounded-lg border border-transparent bg-emerald-500 py-3 px-4 text-sm font-medium text-white hover:bg-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 transition disabled:opacity-60"
          >
            <FiLogIn className="absolute left-4 h-5 w-5" aria-hidden="true" />
            {loading ? "Sebentar …" : "Login dengan Google"}
          </button>

          {/* Legal links */}
          <p className="text-xs text-center text-gray-500">
            Dengan login Anda menyetujui{" "}
            <Link href="/terms" className="underline hover:text-gray-300">
              Syarat & Ketentuan
            </Link>{" "}
            serta{" "}
            <Link href="/privacy" className="underline hover:text-gray-300">
              Kebijakan Privasi
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
}
