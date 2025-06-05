export interface SalesAlternative {
  visualHook: string;
  textHook: string;
  script: string; // Format: Hook -- Problem -- Agitation -- Solution -- CTA
  frames: string; // Deskripsi per bagian skrip
  // Internal identifiers
  _internalStyle: string;
  _internalAudience: string;
  _internalProductDesc: string;
}

// Fungsi utama untuk menghasilkan 3 alternatif sales hook
export async function generateCompleteSalesHooks(
  productDesc: string,
  audience: string,
  style: string,
  duration?: number
): Promise<SalesAlternative[]> {
  // Default values jika input tidak lengkap
  const finalProductDesc = productDesc || "skincare pencerah wajah";
  const finalAudience = audience || "wanita usia 20-35 tahun yang aktif di sosial media dan tertarik dengan perawatan kulit praktis";
  const finalStyle = style || "storytelling edukatif";
  const finalDuration = duration || Number(process.env.NEXT_PUBLIC_DEFAULT_DURATION) || 30;

  const prompt = `
Kamu adalah seorang scriptwriter video TikTok profesional dengan spesialisasi membuat konten jualan yang viral dan sangat efektif. Gayamu santai, tidak kaku, dan mengikuti tren terbaru. Klienmu adalah kreator konten dan marketer yang butuh skrip siap pakai, bukan ide abstrak atau deskripsi umum. Outputmu harus langsung usable dan jauh dari kesan textbook.

Deskripsi Produk: ${finalProductDesc}
Target Audiens: ${finalAudience}
Gaya Konten: ${finalStyle}

Tugasmu adalah menghasilkan 3 (TIGA) alternatif LENGKAP untuk konten video pendek (TikTok, Reels, Shorts) berdasarkan informasi di atas. Setiap alternatif HARUS terdiri dari EMPAT bagian berikut, dengan format persis seperti ini:

VisualHook: [Deskripsi adegan pembuka 1–2 detik yang kuat secara visual, konkret, bisa direkam dengan HP, tanpa CGI. Fokus pada framing, gerakan, ekspresi, atau aksi mendadak. Hindari contoh yang terlalu umum atau klise.]

TextHook: [Racik kalimat 7–12 kata yang lahir spontan dan berkarakter. Awali dengan kata kerja aktif yang bikin kaget atau terasa sindiran. Campur slang Gen-Z dan bahasa lisan Indonesia plus 1–2 kata Inggris populer. Jauhi kata formal seperti "temukan", "dapatkan", "solusi", "produk", "silakan". Selipkan satu elemen tak terduga: angka aneh, emoji tunggal, atau onomatope "brut"/"cekrek". Larang frasa klise "Guys, pernah ga…", "Tahukah kamu…", "Halo semuanya…". Bebas pakai tanda baca nggak baku (?!, triple-dots, huruf kapital sebagian) asalkan mudah dibaca. Jika gaya mengandung "storytelling" tambahkan nada curhat singkat; jika "edukatif" sisipkan vibe "kasih tau lo nih"; jika "komedi" beri punchline sarkastik di akhir.]

Script: [Narasi video lengkap (maksimal ${finalDuration} detik) dengan struktur Hook - Problem - Agitation - Solution - CTA. Tulis sebagai PARAGRAF yang mengalir alami dan enak didengar/dibaca, BUKAN outline poin-poin. Pisahkan setiap bagian (Hook, Problem, Agitation, Solution, CTA) secara eksplisit dengan ' -- ' (spasi, dua strip, spasi). Gunakan gaya percakapan santai khas sosial media dan hindari kalimat textbook.
Contoh struktur internal (jangan tampilkan ini di output, hanya sebagai panduanmu):
Hook: (Lanjutkan atau elaborasi dari TextHook, tarik perhatian lebih dalam)
--
Problem: (Sebutkan masalah utama yang dihadapi audiens terkait produk)
--
Agitation: (Perburuk masalahnya, buat audiens merasakan urgensi atau ketidaknyamanan lebih dalam)
--
Solution: (kenalkan produk sebagai solusi elegan dan efektif untuk masalah tersebut)
--
CTA: (Ajak audiens melakukan tindakan spesifik, misal klik link, beli sekarang, follow)
]

FrameSuggestion: [Saran visual praktis untuk setiap bagian skrip (Hook, Problem, Agitation, Solution, CTA). Deskripsikan angle kamera, gerakan, ekspresi wajah, objek relevan, atau B-roll yang mendukung narasi. Harus actionable untuk kreator solo.
Contoh:
Hook: Extreme close-up mata (angle dari bawah), lalu cepat zoom out menunjukkan seluruh wajah dengan ekspresi terkejut.
Problem: POV shot melihat tangan sendiri memegang beberapa produk skincare lama yang tidak efektif, ekspresi wajah terlihat dari pantulan cermin (jika ada) atau bahu yang lesu.
Agitation: Transisi cepat: scrolling konten sosial media yang menampilkan orang lain dengan kulit bagus, diselingi shot close-up area kulit sendiri yang bermasalah. Ekspresi sedikit iri atau cemas.
Solution: Unboxing produk dengan antusias. Shot close-up tekstur produk saat diaplikasikan ke punggung tangan. Transisi ke wajah yang tersenyum puas setelah beberapa waktu penggunaan (bisa simulasi).
CTA: Pegang produk di samping wajah, senyum percaya diri, lalu arahkan jari ke tombol CTA atau area link di bio. Tampilkan teks promo singkat jika ada.]

Pastikan setiap alternatif dipisahkan dengan "====" (empat sama dengan).
Output HARUS 100% usable dan langsung bisa dieksekusi. Jangan ada disclaimer, jangan menjelaskan prosesmu, jangan ada basa-basi atau kalimat pengantar/penutup dari kamu. Pastikan setiap alternatif terasa fresh dan tidak terdengar seperti template. Langsung ke intinya.
  `;

  const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`, // Pastikan GROQ_API_KEY ada di .env.local
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile", // Atau model GPT-4 lain yang tersedia jika ada
      messages: [{ role: "user", content: prompt }],
      stream: false,
      temperature: 0.85, // Lebih tinggi khusus agar TextHook terasa spontan
      max_tokens: 3000, // Sesuaikan jika output sering terpotong
    }),
  });

  if (!resp.ok) {
    const errorBody = await resp.text();
    console.error("Groq API Error:", resp.status, errorBody);
    throw new Error(`Groq API error ${resp.status}: ${errorBody}`);
  }

  const json = await resp.json();
  const text: string = json.choices?.[0]?.message?.content || "";

  function sanitizeTextHook(str: string): string {
    let clean = str.replace(/\s{2,}/g, ' ').trim();
    clean = clean.replace(/\.$/, '');
    if (clean.length > 80) clean = clean.slice(0, 80);
    return clean;
  }

  const alternativesRaw = text.split(/====+/).map(b => b.trim()).filter(Boolean);

  return alternativesRaw.map(block => {
    const visualHook = (block.match(/VisualHook:\s*([\s\S]*?)(?=\nTextHook:)/i)?.[1] || "").trim();
    const textHookRaw = (block.match(/TextHook:\s*([\s\S]*?)(?=\nScript:)/i)?.[1] || "").trim();
    const textHook = sanitizeTextHook(textHookRaw);
    const script = (block.match(/Script:\s*([\s\S]*?)(?=\nFrameSuggestion:)/i)?.[1] || "").trim();
    const frames = (block.match(/FrameSuggestion:\s*([\s\S]*)/i)?.[1] || "").trim();

    return {
      visualHook,
      textHook,
      script,
      frames,
      _internalStyle: finalStyle,
      _internalAudience: finalAudience,
      _internalProductDesc: finalProductDesc,
    } as SalesAlternative;
  });
}

// Fungsi-fungsi lama (generateHooks, generateHookScenes, generateContentScript, generateBatchPack)
// dapat Anda hapus atau komentari jika tidak lagi digunakan.
// Contoh:
/*
export async function generateHooks(niche: string, tone: string, product?: string) {
    // ... implementasi lama ...
}

export interface HookScene {
  visual: string;
  text: string;
}

export async function generateHookScenes(niche: string, tone: string) {
    // ... implementasi lama ...
}

export interface ContentScript {
  hook: string;
  problem: string;
  agitation: string;
  solution: string;
  cta: string;
}

export async function generateContentScript(
  niche: string,
  style: string,
  product?: string
) {
    // ... implementasi lama ...
}

export interface BatchItem {
  title: string;
  visual: string;
  text: string;
  hook: string;
  problem: string;
  solution: string;
  cta: string;
  thumbnail: string;
  vo: string;
}

export async function generateBatchPack(
  brand: string,
  product: string,
  audience: string,
  count = 10
) {
    // ... implementasi lama ...
}


export interface SalesHook { // Ini adalah interface lama, digantikan SalesAlternative
  visualHook: string;
  textHook: string;
  script: string;
  frames: string;
}

export async function generateSalesHooks(desc: string, audience: string, style: string) {
    // ... implementasi lama ...
}
*/

// Placeholder to satisfy build for legacy API routes
export async function generateBatchPack(
  brand: string,
  product: string,
  audience: string,
  count = 10
) {
  throw new Error("generateBatchPack is not implemented");
}

export async function generateHooks(
  niche: string,
  tone: string,
  product?: string
) {
  throw new Error("generateHooks is not implemented");
}

export async function generateHookScenes(niche: string, tone: string) {
  throw new Error("generateHookScenes is not implemented");
}
