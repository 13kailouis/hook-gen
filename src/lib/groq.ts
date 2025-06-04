export async function generateHooks(niche: string, tone: string, product?: string) {
    const basePrompt = [
   "Kamu copywriter TikTok kelas jagoan.",
      `Saat diberi "${niche}", keluarkan *persis* 10 hook pembuka berdurasi 1 detik yang dijamin viral dan fresh.`,
      "Jangan pakai bullet point, jangan pakai emoji.",
      "Tulis pakai bahasa tongkrongan Gen Z,",
      "Pisahkan setiap hook dengan newline biasa.",
    ];
  
    if (tone === "affiliate") {
      basePrompt.push(
        "Tulis 10 hook viral TikTok khusus untuk creator affiliate yang menjual produk (skincare, lifestyle, alat rumah tangga, dll).",
        "Gunakan bahasa anak muda (bahasa tongkrongan Gen Z).",
        "Setiap hook harus langsung menembak perhatian otak dalam 1 detik pertama.",
        "Fokus pada gaya hook tanpa visual, jadi: otak harus membayangkan sendiri lewat kata-kata.",
        "Gunakan pola ini:",
        "- Konflik batin atau kalimat yang malu-malu tapi jujur",
        "- Cerita singkat yang janji ada ending mengejutkan",
        "- Larangan atau sindiran halus",
        "- Pertanyaan kontras atau gak masuk akal",
        "- Gunakan kata 'lu', 'lo', atau 'kamu' di awal kalimat",
        "Contoh hook:",
        `"Gue malu ngakuin ini, tapi ternyata manjur banget."`,
        `"Lu gak bakal percaya kalau belum nyobain sendiri."`,
        `"Dulu gue pikir ini produk receh... ternyata malah bikin kecanduan."`,
        `"Lo gak akan ngerti hype-nya sampe nyobain sendiri."`,
        "Jangan pakai bullet, jangan pakai nomor, jangan pakai emoji. Pisahkan hook dengan newline biasa. Jangan tambahkan penjelasan atau pengantar apapun."
      );
  
      if (product && product.trim() !== "") {
        basePrompt.push(`Fokuskan hook seolah sedang menjual produk berikut: "${product}".`);
      }
    } else {
      basePrompt.push(
        `Gunakan tone: ${tone}.`,
        "Pastikan hook-nya sangat memicu rasa penasaran, ketakutan, atau apapun yang bikin berhenti scroll di 1 detik pertama."
      );
    }
  
    const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: basePrompt.join(" "),
          },
        ],
        stream: false,
        temperature: 0.2,
        max_tokens: 512,
      }),
    });
  
    if (!resp.ok) throw new Error(`Groq API error ${resp.status}`);
    const json = await resp.json();
    const text: string =
      json.choices?.[0]?.message?.content ?? "Gagal menghasilkan hook";
    return text.trim().split("\n").map((h: string) => h.trim()).filter(Boolean);
  }
  

export interface HookScene {
  visual: string;
  text: string;
}

export async function generateHookScenes(niche: string, tone: string) {
  const prompt = `Kamu adalah pakar kreator konten pendek. Buat 5 ide hook video dengan format:\nVisual: <deskripsi adegan 1-2 detik>\nText: <kalimat pembuka>.\nGaya: ${tone}. Niche atau produk: ${niche}. Jangan pakai bullet atau nomor.`;

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
      temperature: 0.3,
      max_tokens: 512,
    }),
  });

  if (!resp.ok) throw new Error(`Groq API error ${resp.status}`);
  const json = await resp.json();
  const text: string = json.choices?.[0]?.message?.content || "";

  return text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .reduce<HookScene[]>((acc, line) => {
      const match = line.match(/Visual:\s*(.*?)\s*Text:\s*(.*)/i);
      if (match) {
        acc.push({ visual: match[1], text: match[2] });
      }
      return acc;
    }, []);
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
  const base = `Buat skrip video 15-60 detik dengan format Hook-Problem-Agitation-Solution-CTA. Gaya penyampaian ${style}. Niche atau produk: ${niche}${
    product ? ", fokus pada produk: " + product : ""
  }. Jawab dengan format:\nHook: ...\nProblem: ...\nAgitation: ...\nSolution: ...\nCTA: ...`;

  const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: base }],
      stream: false,
      temperature: 0.3,
      max_tokens: 512,
    }),
  });

  if (!resp.ok) throw new Error(`Groq API error ${resp.status}`);
  const json = await resp.json();
  const text: string = json.choices?.[0]?.message?.content || "";

  const get = (label: string) => {
    const m = text.match(new RegExp(`${label}:\\s*(.*)`, "i"));
    return m ? m[1].trim() : "";
  };

  return {
    hook: get("Hook"),
    problem: get("Problem"),
    agitation: get("Agitation"),
    solution: get("Solution"),
    cta: get("CTA"),
  } as ContentScript;
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
  const prompt = `Buat ${count} ide konten pendek untuk brand ${brand} yang menjual ${product}. Audiens utama: ${audience}. Format per konten:\nJudul: ...\nVisual: ...\nTextHook: ...\nHook: ...\nProblem: ...\nSolution: ...\nCTA: ...\nThumbnail: ...\nVO: ...`;

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
      temperature: 0.4,
      max_tokens: 2048,
    }),
  });

  if (!resp.ok) throw new Error(`Groq API error ${resp.status}`);
  const json = await resp.json();
  const text: string = json.choices?.[0]?.message?.content || "";

  const items: BatchItem[] = [];
  const parts = text.split(/\n(?=Judul:)/i).filter(Boolean);
  for (const part of parts) {
    const get = (label: string) => {
      const m = part.match(new RegExp(`${label}:\\s*(.*)`, "i"));
      return m ? m[1].trim() : "";
    };
    items.push({
      title: get("Judul"),
      visual: get("Visual"),
      text: get("TextHook"),
      hook: get("Hook"),
      problem: get("Problem"),
      solution: get("Solution"),
      cta: get("CTA"),
      thumbnail: get("Thumbnail"),
      vo: get("VO"),
    });
  }
  return items;
}

