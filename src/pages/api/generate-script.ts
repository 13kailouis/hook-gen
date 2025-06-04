import type { NextApiRequest, NextApiResponse } from "next";
import { generateContentScript } from "@/lib/groq";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const { niche = "", style = "soft-sell", product = "" } = req.body;
  if (!niche) return res.status(400).json({ error: "Niche required" });

  try {
    const script = await generateContentScript(niche, style, product);
    res.json({ script });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
