import type { NextApiRequest, NextApiResponse } from "next";
import { generateHooks } from "@/lib/groq";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const { niche = "", tone = "fear", product = "" } = req.body;

  if (!niche) return res.status(400).json({ error: "Niche required" });

  try {
    const hooks = await generateHooks(niche, tone, product);
    res.json({ hooks });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
