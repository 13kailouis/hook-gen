export async function generateHooks(niche: string, tone: string, product?: string) {
    const basePrompt = [
      "Kamu adalah copywriter spesialis TikTok.",
      `Tolong buatkan 10 hook 1 detik pertama yang sangat sangat bikin viral untuk niche: "${niche}".`,
      "Jangan pakai bullet point, jangan pakai emoji.",
       "Gunakan bahasa anak muda (bahasa tongkrongan Gen Z).",
        "Setiap hook harus langsung menembak perhatian otak dalam 1 detik pertama.",
        "Fokus pada gaya hook tanpa visual, jadi: otak harus membayangkan sendiri lewat kata-kata.",
         "Gunakan pola ini:",
        "- Konflik batin atau kalimat yang malu-malu tapi jujur",
        "- Cerita singkat yang janji ada ending mengejutkan",
        "- Larangan atau sindiran halus",
        "- Pertanyaan kontras atau gak masuk akal",
        "- Gunakan kata 'lu', 'lo', atau 'kamu' di awal kalimat",
      "Pakai bahasa tongkrongan dan Gen Z.",
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
        "Pastikan hook-nya sangat memicu rasa penasaran, ketakutan, atau luka psikologis kecil audiens, atau apapun yang bikin berhenti scroll di 1 detik pertama."
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
  
