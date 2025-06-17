import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Dummy analytics data
  const data = {
    spend: 500,
    impressions: 25000,
    clicks: 1200,
    conversions: 80,
    costPerClick: 500 / 1200,
    costPerAcquisition: 500 / 80,
    revenue: 1500,
    roi: ((1500 - 500) / 500) * 100,
  };

  res.status(200).json({ data });
}
