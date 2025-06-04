import type { NextApiRequest, NextApiResponse } from "next";
import { generateSalesHooks } from "@/lib/groq";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const {
    description = "",
    audience = "",
    style = "soft-sell",
  } = req.body;
  if (!description)
    return res.status(400).json({ error: "Description required" });

  try {
    const hooks = await generateSalesHooks(description, audience, style);
    res.json({ hooks });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
