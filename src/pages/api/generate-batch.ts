import type { NextApiRequest, NextApiResponse } from "next";
import { generateBatchPack } from "@/lib/groq";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const { brand = "", product = "", audience = "", count = 10 } = req.body;
  if (!brand || !product) return res.status(400).json({ error: "Brand and product required" });

  try {
    const batch = await generateBatchPack(brand, product, audience, Number(count));
    res.json({ batch });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
