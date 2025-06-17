import Head from 'next/head';
import useSWR from 'swr';
import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/router';

const fetcher = (url:string) => fetch(url).then(r=>r.json());

export default function Dashboard(){
  const { user, loading } = useAuth();
  const router = useRouter();
  const { data, error } = useSWR(user ? '/api/analytics' : null, fetcher);

  if(!loading && !user){
    router.replace('/login?next=/dashboard');
    return null;
  }

  return (
    <>
      <Head>
        <title>Campaign Dashboard</title>
      </Head>
      <main style={{maxWidth:800,margin:'0 auto',padding:'2rem 1rem'}}>
        <h1 style={{textAlign:'center',marginBottom:'2rem'}}>Campaign Analytics</h1>
        {error && <p style={{color:'#ff6b6b'}}>Failed to load data</p>}
        {!data && <p>Loading...</p>}
        {data && (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:'1rem'}}>
            <div className='card'><b>Spend</b><p>${'{'}data.data.spend{'}'}</p></div>
            <div className='card'><b>Impressions</b><p>${'{'}data.data.impressions{'}'}</p></div>
            <div className='card'><b>Clicks</b><p>${'{'}data.data.clicks{'}'}</p></div>
            <div className='card'><b>Conversions</b><p>${'{'}data.data.conversions{'}'}</p></div>
            <div className='card'><b>CPC</b><p>${'{'}data.data.costPerClick.toFixed(2){'}'}</p></div>
            <div className='card'><b>CPA</b><p>${'{'}data.data.costPerAcquisition.toFixed(2){'}'}</p></div>
            <div className='card'><b>Revenue</b><p>${'{'}data.data.revenue{'}'}</p></div>
            <div className='card'><b>ROI</b><p>${'{'}data.data.roi.toFixed(1){'}'}%</p></div>
          </div>
        )}
      </main>
      <style jsx>{`
        .card{background:var(--card-color);padding:1rem;border-radius:8px;text-align:center;border:1px solid #242424;}
        .card b{display:block;margin-bottom:.5rem;color:var(--highlight-color)}
      `}</style>
    </>
  );
}
