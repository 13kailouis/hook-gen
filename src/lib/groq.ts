// src/lib/groq.ts
export interface SalesAlternative {
  visualHook: string;
  textHook: string;
  script: string;   // Format: Hook -- Problem -- Agitation -- Solution -- CTA
  frames: string;   // Deskripsi per bagian skrip
  // internal
  _internalStyle: string;
  _internalAudience: string;
  _internalProductDesc: string;
}

/** daftar slang populer — update sewaktu-waktu */
const SLANG_BANK = [
  "auto cuan", "bestie", "gaskeun", "slebew", "no debat",
  "sumpah ini edan", "skip? nggak lah", "fix banget", "mager kalau biasa",
];

/** ambil n slang acak agar tiap prompt beda */
function pickRandomSlang(n = 2): string[] {
  return SLANG_BANK
    .sort(() => 0.5 - Math.random())
    .slice(0, n);
}

// ———————————————————————————————————————————————————————————————

export async function generateCompleteSalesHooks(
  productDesc: string,
  audience: string,
  style: string,
  duration?: number
): Promise<SalesAlternative[]> {
  const finalProductDesc =
    productDesc || "skincare pencerah wajah";
  const finalAudience =
    audience ||
    "wanita 20-35 th aktif sosmed yang pengen perawatan kulit simple";
  const finalStyle = style || "storytelling edukatif";
  const finalDuration =
    duration || Number(process.env.NEXT_PUBLIC_DEFAULT_DURATION) || 30;

  const slang = pickRandomSlang(2).join(", ");

  const prompt = `
🔥  Kamu = scriptwriter TikTok paling savage 2025. Job-mu: tulis konten jualan yang
    bikin orang berhenti scroll detik itu juga, tanpa rasa “iklan”.
    Style: ngobrol selow, nyelipin slang (“${slang}”), bawa vibe teman curhat.
    Dilarang keras pakai kalimat textbook, formal, atau kata basi “solusi inovatif”.

Deskripsi Produk: ${finalProductDesc}
Target Audiens : ${finalAudience}
Gaya Konten    : ${finalStyle}

Buat TIGA alternatif full-stack konten (TikTok/Reels/Shorts, max ${finalDuration}s):
• VisualHook  : adegan pembuka 1-2 detik — harus bisa direkam pakai HP, real-life, tanpa CGI.
• TextHook    : satu kalimat punchline pembuka — emosional, provokatif, atau absurd, kasih rasa FOMO.
• Script      : paragraf mengalir (Hook -- Problem -- Agitation -- Solution -- CTA) pisah pakai " -- ".
                Tulisan harus terdengar spontan, ritme cepat, ada micro-pauses (… atau “—”) bila perlu.
• FrameSuggestion: tips visual praktis per bagian (angle, gesture, prop, B-roll).

Wajib:
– selipkan minimal 1 emoji relevan (max 2) di setiap TextHook & CTA biar eye-catching di feed.
– CTA selalu memicu aksi jelas: klik link/keranjang/bio, atau comment keyword.
– Hindari frasa klise “kamu pasti”, “produk ini”, “problem kulitmu”.
– Output bersih, usable, TANPA disclaimer, TANPA penjelasan ekstra.
– Pisahkan tiap alternatif dengan "====".

Tulis sekarang.`;

  const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      stream: false,
      temperature: 0.85,        // lebih liar
      presence_penalty: 0.4,    // cegah repetisi
      max_tokens: 3000,
    }),
  });

  if (!resp.ok) {
    const err = await resp.text();
    console.error("Groq API Error:", resp.status, err);
    throw new Error(`Groq API error ${resp.status}: ${err}`);
  }

  const { choices } = await resp.json();
  const raw: string =
    choices?.[0]?.message?.content || "";

  const blocks = raw
    .split(/====+/)
    .map(b => b.trim())
    .filter(Boolean);

  return blocks.map(block => {
    const visualHook = (block.match(/VisualHook:\s*([\s\S]*?)(?=\nTextHook:)/i)?.[1] || "").trim();
    const textHook  = (block.match(/TextHook:\s*([\s\S]*?)(?=\nScript:)/i)?.[1] || "").trim();
    const script    = (block.match(/Script:\s*([\s\S]*?)(?=\nFrameSuggestion:)/i)?.[1] || "").trim();
    const frames    = (block.match(/FrameSuggestion:\s*([\s\S]*)/i)?.[1] || "").trim();

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

// ———————————————————————————————————————————————————————————————
// Legacy stubs (biarkan saja kalau masih dipakai build lama)
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
