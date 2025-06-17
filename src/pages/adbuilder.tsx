import Head from 'next/head';
import { useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/router';

export default function AdBuilder(){
  const { user, loading } = useAuth();
  const router = useRouter();
  const [product,setProduct]=useState('');
  const [audience,setAudience]=useState('');
  const [tone,setTone]=useState('persuasif');
  const [copy,setCopy]=useState(null as any);
  const [busy,setBusy]=useState(false);
  const [err,setErr]=useState<string|null>(null);

  if(!loading && !user){
    router.replace('/login?next=/adbuilder');
    return null;
  }

  async function generate(e:React.FormEvent){
    e.preventDefault();
    setBusy(true); setErr(null); setCopy(null);
    try{
      const r=await fetch('/api/generate-ad',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({product,audience,tone})
      });
      if(!r.ok) throw new Error((await r.json()).error);
      const d=await r.json();
      setCopy(d.copy);
    }catch(err:any){setErr(err.message);}
    finally{setBusy(false);}
  }

  return (
    <>
      <Head>
        <title>Ad Builder</title>
      </Head>
      <main style={{maxWidth:720,margin:'0 auto',padding:'2rem 1rem'}}>
        <h1 style={{textAlign:'center',marginBottom:'2rem'}}>Generate Ad Copy</h1>
        <form onSubmit={generate} style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <input value={product} onChange={e=>setProduct(e.target.value)} placeholder="Deskripsi produk"/>
          <input value={audience} onChange={e=>setAudience(e.target.value)} placeholder="Target audiens"/>
          <select value={tone} onChange={e=>setTone(e.target.value)}>
            {['persuasif','friendly','informatif','soft sell','hard sell'].map(v=>(<option key={v} value={v}>{v}</option>))}
          </select>
          <button className="btn primary" disabled={busy}>{busy?'Generate...':'Generate'}</button>
          {err && <p style={{color:'#ff6b6b'}}>{err}</p>}
        </form>

        {copy && (
          <div style={{marginTop:'2rem'}}>
            <h2>Result</h2>
            <p><strong>Headline:</strong> {copy.headline}</p>
            <p><strong>Primary Text:</strong> {copy.primaryText}</p>
            <p><strong>Description:</strong> {copy.description}</p>
          </div>
        )}
      </main>
      <style jsx>{`
        input, select{
          width:100%;padding:.8rem;border:1px solid #333;border-radius:6px;background:#0b0b0b;color:var(--text-color);
        }
      `}</style>
    </>
  );
}
