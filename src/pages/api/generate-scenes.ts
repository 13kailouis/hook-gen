import type { NextApiRequest, NextApiResponse } from "next";
import { generateHookScenes } from "@/lib/groq";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const { niche = "", tone = "edukatif" } = req.body;
  if (!niche) return res.status(400).json({ error: "Niche required" });

  try {
    const data = await generateHookScenes(niche, tone);
    res.json({ hooks: data });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
