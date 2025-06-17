import type { NextApiRequest, NextApiResponse } from 'next';
import { generateAdCopy, AdCopy } from '@/lib/ad';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { product = '', audience = '', tone = '' } = req.body;

  try {
    const copy: AdCopy = await generateAdCopy(product, audience, tone);
    res.status(200).json({ copy });
  } catch (err: any) {
    console.error('Error in /api/generate-ad:', err);
    res.status(500).json({ error: err.message || 'Failed to generate ad copy' });
  }
}
