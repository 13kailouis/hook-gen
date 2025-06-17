export interface AdCopy {
  headline: string;
  primaryText: string;
  description: string;
}

export async function generateAdCopy(product: string, audience: string, tone: string): Promise<AdCopy> {
  const finalProduct = product || 'produk skincare';
  const finalAudience = audience || 'wanita usia 20-35 tahun';
  const finalTone = tone || 'persuasif dan ramah';

  const prompt = `Kamu adalah copywriter iklan berpengalaman. Buat satu set copy iklan berbayar yang menarik untuk ${finalProduct}. Target audiensnya ${finalAudience}. Gunakan gaya bahasa ${finalTone}. Format output:
Headline: <maks 8 kata>
PrimaryText: <30-40 kata>
Description: <maks 15 kata>`;

  const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 500,
      stream: false,
    }),
  });

  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error(`Groq API error ${resp.status}: ${txt}`);
  }

  const data = await resp.json();
  const text: string = data.choices?.[0]?.message?.content || '';

  return {
    headline: (text.match(/Headline:\s*(.*)/i)?.[1] || '').trim(),
    primaryText: (text.match(/PrimaryText:\s*([\s\S]*?)(?=\n|Description:)/i)?.[1] || '').trim(),
    description: (text.match(/Description:\s*(.*)/i)?.[1] || '').trim(),
  };
}
