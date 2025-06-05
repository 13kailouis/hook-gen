// src/pages/index.tsx
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

const SITE_NAME = "HookFreak";
const [MAIN_NAME, SECOND_NAME] = SITE_NAME.split(" ");

const features = [
  {
    icon: "🚀",
    title: "3 Alternatif Sekali Klik",
    desc: "Generate tiga skrip berbeda langsung siap pakai",
    color: "from-green-400 to-teal-500"
  },
  {
    icon: "🎬",
    title: "Ide Visual & Frame",
    desc: "Saran visual hook dan alur frame lengkap",
    color: "from-amber-400 to-orange-500"
  },
  {
    icon: "⏱️",
    title: "Durasi Fleksibel",
    desc: "Atur panjang skrip 15-60 detik sesuai kebutuhan",
    color: "from-blue-400 to-indigo-500"
  }
];

const personas = [
  {
    icon: "🎭",
    title: "UGC Creator",
    desc: "Bikin portofolio nendang, dilirik banyak brand",
    path: "/builder?persona=ugc"
  },
  {
    icon: "🏢",
    title: "Pemilik Brand",
    desc: "Tingkatkan konversi iklan & penjualan",
    path: "/builder?persona=brand"
  },
  {
    icon: "💼",
    title: "Freelancer/Agensi",
    desc: "Hemat waktu riset, puaskan klien",
    path: "/builder?persona=freelancer"
  }
];

const ExampleOutput = ({ data }: { data: any }) => {
  const [expanded, setExpanded] = useState(false);
  
  const scriptParts = data.script.split(" -- ").map((part: string, index: number) => {
    const labels = ["Hook", "Problem", "Agitation", "Solution", "CTA"];
    return (
      <div key={index} className="mb-3">
        <span className="font-bold text-green-400">{labels[index]}:</span>
        <span className="ml-2">{part.replace(`${labels[index]}: `, "")}</span>
      </div>
    );
  });

  return (
    <div className="bg-gray-900 rounded-xl p-5 border border-gray-800 hover:border-green-500/30 transition-all">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <h4 className="text-lg font-bold">{data._internalProductDesc}</h4>
        <span className="bg-green-900/30 text-green-400 px-3 py-1 rounded-full text-sm">
          {data._internalStyle}
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-400 mb-1">Visual Hook</p>
          <p className="font-medium">{data.visualHook}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-400 mb-1">Teks Hook</p>
          <p className="font-medium text-green-400">"{data.textHook}"</p>
        </div>
      </div>
      
      <div className="mt-5">
        <p className="text-sm text-gray-400 mb-1">Skrip Lengkap</p>
        <div className="bg-gray-800/50 p-4 rounded-lg max-h-[200px] overflow-y-auto">
          {scriptParts}
        </div>
      </div>
      
      <div className="mt-5">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-400">Saran Frame</p>
          <button 
            onClick={() => setExpanded(!expanded)}
            className="text-green-500 text-sm"
          >
            {expanded ? "Sembunyikan" : "Lihat Semua"}
          </button>
        </div>
        <p className={`${expanded ? "" : "line-clamp-2"} mt-1`}>
          {data.frames}
        </p>
      </div>
    </div>
  );
};

const examples = [
  {
    visualHook: "Close-up wajah kaget melihat jerawat baru di cermin, lalu zoom out cepat",
    textHook: "Baru bangun udah disambut 'kejutan' di muka? Relate banget!",
    script: "Hook: Baru bangun udah disambut 'kejutan' di muka? Relate banget! Udah coba ini-itu tapi si merah nongol lagi, nongol lagi. -- Problem: Padahal besok ada acara penting, mau ketemu doi, atau sekadar pengen selfie cantik tanpa filter. Jerawat satu biji aja bisa bikin mood ancur seharian. -- Agitation: Makin dipikirin makin stres, makin stres jerawat makin menjadi-jadi. Lingkaran setan yang gak ada habisnya kan? Mau sampai kapan ngumpetin muka atau ngandelin filter terus? -- Solution: Stop siklusnya sekarang! Kenalin AcneWarrior Serum, jagoan hempas jerawat dalam semalam. Dengan Salicylic Acid & Centella Asiatica, langsung nenangin dan kempesin jerawat tanpa bikin kulit kering. -- CTA: Muka glowing bebas drama jerawat bukan mimpi lagi! Klik link di bio buat dapetin AcneWarrior Serum-mu sekarang juga! Ada promo spesial buat kamu yang gercep!",
    frames: "Hook: Wajah kaget di cermin (close-up), lalu transisi ke kalender menandai acara penting. Problem: Shot tangan frustasi memegang beberapa produk skincare gagal. Agitation: Scroll konten IG/TikTok orang lain yang flawless, lalu kembali ke wajah sendiri yang insecure. Solution: Unboxing AcneWarrior Serum, tekstur serum di tangan, aplikasi lembut di wajah, senyum puas. CTA: Pegang produk, tunjuk ke arah link di bio, wajah happy.",
    _internalStyle: "Storytelling",
    _internalAudience: "Remaja & Dewasa Muda",
    _internalProductDesc: "Serum Anti Jerawat"
  },
  {
    visualHook: "Tumpahan kopi di baju putih bersih, ekspresi panik",
    textHook: "NOOO! Baju favorit kena noda pas mau ngedate?!",
    script: "Hook: NOOO! Baju favorit kena noda pas mau ngedate?! Jangan panik dulu! -- Problem: Noda bandel emang nyebelin, apalagi di momen penting. Mau cuci biasa, takutnya malah makin nyebar atau warnanya luntur. -- Agitation: Udah coba berbagai sabun tapi nodanya tetap aja nempel kayak kenangan mantan? Bikin bete dan gak pede kan jadinya. -- Solution: Kenalin Spotless Pen! Solusi praktis basmi noda dalam sekejap. Tinggal oles, gosok dikit, noda hilang tanpa bekas! Aman buat semua jenis kain. -- CTA: Jangan biarin noda ngerusak harimu! Sedia Spotless Pen sekarang juga. Klik keranjang kuning buat harga spesial!",
    frames: "Hook: Slow motion tumpahan kopi, close up ekspresi panik. Problem: Shot baju dengan noda membandel, orangnya keliatan bingung. Agitation: Kompilasi usaha gagal membersihkan noda (misal disikat, dikucek), ekspresi makin frustasi. Solution: Demo penggunaan Spotless Pen, noda hilang dengan mudah. Baju kembali bersih. Senyum lega. CTA: Tunjukkan produk Spotless Pen, arahkan ke CTA (misal keranjang kuning), wajah ceria.",
    _internalStyle: "Problem-Solution",
    _internalAudience: "Siapa saja yang sering berurusan dengan noda",
    _internalProductDesc: "Pena Penghilang Noda Instan"
  }
];

export default function Home() {
  return (
    <>
      <Head>
        <title>{SITE_NAME} • AI Viral Hook Generator TikTok/Reels</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Bikin script video jualan TikTok, Reels, dan Shorts yang viral dengan visual hook menancap di detik pertama" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      {/* Navigation */}
      <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-2xl font-extrabold text-green-500">{MAIN_NAME}</div>
            {SECOND_NAME && <span className="text-white ml-1">{SECOND_NAME}</span>}
          </div>
          
          <div className="hidden md:flex space-x-6">
            <Link href="#features" className="text-gray-300 hover:text-white transition">Fitur</Link>
            <Link href="#examples" className="text-gray-300 hover:text-white transition">Contoh</Link>
            <Link href="#personas" className="text-gray-300 hover:text-white transition">Untuk Siapa</Link>
          </div>
          
          <Link href="/builder" className="bg-green-600 hover:bg-green-700 text-black font-semibold py-2 px-4 rounded-lg transition">
            Builder Lengkap
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-black to-gray-900 pt-20 pb-28">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                Stop Bikin Konten Jualan <span className="text-green-500">Ngebosenin</span>
              </h1>
              
              <p className="text-lg text-gray-300 mb-8 max-w-lg">
                {SITE_NAME} bikin video TikTok & Reels-mu nancep di detik pertama dengan visual hook, teks pembuka, dan skrip durasi pas
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/builder" className="bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-8 rounded-lg text-center transition text-lg">
                  🚀 Generate Sekarang
                </Link>
                <Link href="#examples" className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg text-center transition">
                  Lihat Contoh
                </Link>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="w-8 h-8 rounded-full bg-gray-700 border-2 border-black"></div>
                    ))}
                  </div>
                  <span className="ml-3 text-gray-400">1K+ Creator</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold">★</span>
                  </div>
                  <span className="ml-2 text-gray-400">4.9/5 (328 Reviews)</span>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 relative">
              <div className="relative bg-gray-800/50 border border-gray-700 rounded-2xl p-6 backdrop-blur-sm">
                <div className="absolute -inset-1 bg-green-500/10 rounded-2xl blur-sm z-0"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="text-sm font-medium ml-2">Hook Generator</div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Visual Hook</div>
                      <div className="bg-gray-900 p-3 rounded-lg border border-gray-700">
                        Close-up wajah kaget melihat jerawat baru di cermin
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Teks Hook</div>
                      <div className="bg-gray-900 p-3 rounded-lg border border-gray-700">
                        "Baru bangun udah disambut 'kejutan' di muka? Relate banget!"
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Gaya</div>
                        <div className="bg-gray-900 p-3 rounded-lg border border-gray-700 text-center">
                          Storytelling
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Durasi</div>
                        <div className="bg-gray-900 p-3 rounded-lg border border-gray-700 text-center">
                          30 detik
                        </div>
                      </div>
                    </div>
                    
                    <button className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold transition">
                      Generate 3 Alternatif
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-10 -right-5 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 -left-5 w-48 h-48 bg-green-500/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Dibuat Untuk <span className="text-green-500">Viral</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Fitur yang bikin kontenmu nempel di kepala audience</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className={`bg-gradient-to-br ${feature.color} p-0.5 rounded-2xl hover:scale-[1.02] transition-all`}>
                <div className="bg-gray-900 rounded-2xl p-6 h-full">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Persona Section */}
      <section id="personas" className="py-16 bg-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Kamu <span className="text-green-500">Siapa?</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">HookFreak cocok untuk semua player di dunia konten</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {personas.map((persona, index) => (
              <Link key={index} href={persona.path} className="group">
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 group-hover:border-green-500/50 transition-all h-full">
                  <div className="text-3xl mb-4">{persona.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{persona.title}</h3>
                  <p className="text-gray-400 mb-4">{persona.desc}</p>
                  <span className="text-green-500 font-semibold group-hover:underline inline-flex items-center">
                    Mulai Sekarang 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section id="examples" className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Hasil Nyata <span className="text-green-500">HookFreak</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Contoh skrip yang sudah terbukti meningkatkan engagement</p>
          </div>
          
          <div className="space-y-8">
            {examples.map((example, index) => (
              <ExampleOutput key={index} data={example} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/builder" className="bg-green-600 hover:bg-green-700 text-black font-bold py-3 px-8 rounded-lg text-center transition inline-flex items-center text-lg">
              Coba Sendiri di Builder 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-extrabold text-green-500">{SITE_NAME}</div>
              <p className="text-gray-400 mt-2">Video Sales Hook Generator #1 di Indonesia</p>
            </div>
            
            <div className="flex space-x-6">
              <Link href="#" className="text-gray-400 hover:text-white transition">Terms</Link>
              <Link href="#" className="text-gray-400 hover:text-white transition">Privacy</Link>
              <Link href="#" className="text-gray-400 hover:text-white transition">Contact</Link>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Global Styles */}
      <style jsx global>{`
        body {
          font-family: 'Inter', sans-serif;
          background-color: #000;
          color: #fff;
          overflow-x: hidden;
        }
        
        .container {
          width: 100%;
          margin-right: auto;
          margin-left: auto;
          padding-right: 1rem;
          padding-left: 1rem;
        }
        
        @media (min-width: 640px) {
          .container {
            max-width: 640px;
          }
        }
        
        @media (min-width: 768px) {
          .container {
            max-width: 768px;
          }
        }
        
        @media (min-width: 1024px) {
          .container {
            max-width: 1024px;
          }
        }
        
        @media (min-width: 1280px) {
          .container {
            max-width: 1280px;
          }
        }
      `}</style>
    </>
  );
}
