// src/pages/api/generate-script.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { generateCompleteSalesHooks, SalesAlternative } from "@/lib/groq"; // Import SalesAlternative

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const {
    description = "", // Deskripsi produk
    audience = "",    // Target audiens
    style = "",       // Gaya konten, e.g., "storytelling", "hard-sell"
  } = req.body;

  // Tidak perlu validasi input kosong di sini jika kita ingin mengandalkan default
  // di generateCompleteSalesHooks untuk fitur "lihat hasil nyata dalam 5 detik".

  try {
    const alternatives: SalesAlternative[] = await generateCompleteSalesHooks(description, audience, style); //
    // Kirim semua alternatif ke client
    res.status(200).json({ alternatives });
  } catch (err: any) {
    console.error("Error in /api/generate-script:", err);
    res.status(500).json({ error: err.message || "Failed to generate script" });
  }
}
