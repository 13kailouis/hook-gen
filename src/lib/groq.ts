// src/lib/groq.ts
export interface SalesAlternative {
  visualHook: string;
  textHook: string;
  script: string;   // Hook -- Problem -- Agitation -- Solution -- CTA
  frames: string;
  // Internal identifiers
  _internalStyle: string;
  _internalAudience: string;
  _internalProductDesc: string;
  _internalTrend: string;          // NEW: trend / slang injection
}

// =========  FUNGSI BARU: membantu sisipkan slang / emoji harian  =========
const pickDailyTrend = () => {
  const today = new Date().getDate();
  const pool = [
    "🔥", "🤯", "💸", "🚀", "skrrt", "literally", "gokil", "flexin", "no cap",
    "sumpah", "auto", "ngeri", "parah sih", "fix", "bikin kaget"
  ];
  return pool[today % pool.length];
};

// =================   GENERATOR UTAMA  =====================
export async function generateCompleteSalesHooks(
  productDesc = "skincare pencerah wajah",
  audience = "wanita 20-35 thn aktif sosmed, butuh perawatan praktis",
  style = "storytelling edukatif",
  duration = Number(process.env.NEXT_PUBLIC_DEFAULT_DURATION) || 30
): Promise<SalesAlternative[]> {

  // 👉 slang/emoji harian agar tiap hari hook-nya terasa fresh
  const trend = pickDailyTrend();

  const prompt = `
Kamu copywriter video pendek (TikTok/Reels/Shorts) spesialis jualan brutal—pemicunya FOMO,
kagetin, dan selalu “scroll-stopper”. Bahasa kamu: campuran Indonesia kasual + slang,
tanpa basa-basi dan TIDAK ada kata formal textbook sama sekali.

Deskripsi Produk: ${productDesc}
Target Audiens: ${audience}
Gaya Konten: ${style}
TrendKeywordHariIni: ${trend}

Buat 3 ALTERNATIF konten. Format WAJIB:

VisualHook: …
TextHook: …
Script: …
FrameSuggestion: …

**ATURAN KHUSUS TextHook**
• Maksimal 80 karakter, 1 kalimat.  
• Pola: [Stat/Twist Mengejutkan] + [Sapaan Langsung ‘lo/lu/kamu’] + [Janji/Twist singkat].  
• Sisipkan (opsional) 1 emoji atau kata tren “${trend}”.  
• Dilarang memakai frasa klise: hai guys, teman-teman, sobat, smart-people, dst.  
• Harus terasa seperti percakapan spontan, bukan copy-paste ChatGPT.

**ATURAN Script**
Tuliskan narasi lengkap (≤${duration}s) dalam satu paragraf,
pisahkan bagian dengan ' -- ' mengikuti urutan Hook, Problem, Agitation, Solution, CTA.
Bahasa tetap kasual dan energik.

**ATURAN FrameSuggestion**
Berikan saran shot praktis, bisa direkam creator solo pakai HP. Hindari CGI.

Pisahkan tiap alternatif dengan “====”. Output langsung; jangan ada catatan ekstra.
`;

  const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.85,                // naikkan kreativitas global
      max_tokens: 3000,
      top_p: 0.9,
      presence_penalty: 0.4,
      frequency_penalty: 0.3
    }),
  });

  if (!resp.ok) {
    const err = await resp.text();
    console.error("Groq API Error:", resp.status, err);
    throw new Error(\`Groq API error \${resp.status}: \${err}\`);
  }

  const json = await resp.json();
  const text: string = json.choices?.[0]?.message?.content || "";

  return text
    .split(/====+/)
    .map(b => b.trim())
    .filter(Boolean)
    .map(block => ({
      visualHook:  (block.match(/VisualHook:\\s*([\\s\\S]*?)(?=\\nTextHook:)/i)?.[1] || "").trim(),
      textHook:    (block.match(/TextHook:\\s*([\\s\\S]*?)(?=\\nScript:)/i)?.[1] || "").trim(),
      script:      (block.match(/Script:\\s*([\\s\\S]*?)(?=\\nFrameSuggestion:)/i)?.[1] || "").trim(),
      frames:      (block.match(/FrameSuggestion:\\s*([\\s\\S]*)/i)?.[1] || "").trim(),
      _internalStyle: style,
      _internalAudience: audience,
      _internalProductDesc: productDesc,
      _internalTrend: trend
    } as SalesAlternative));
}
