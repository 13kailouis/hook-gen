import Head from "next/head";
import Link from "next/link";

export default function Pricing() {
  const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "ProfitHook";
  const plans = [
    { name: "Free", price: "$0", features: ["5 scripts per day", "Community access"] },
    { name: "Pro", price: "$29/mo", features: ["Unlimited scripts", "Priority support", "Commercial license"] },
    { name: "Enterprise", price: "Contact", features: ["Custom limits", "Dedicated support"] },
  ];
  return (
    <>
      <Head>
        <title>{SITE_NAME} Pricing</title>
      </Head>
      <main style={{ maxWidth: 800, margin: "40px auto", padding: "0 1rem" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem", textAlign: "center" }}>
          Choose Your Plan
        </h1>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          {plans.map(plan => (
            <div key={plan.name} style={{ flex: "1 1 200px", border: "1px solid #ccc", borderRadius: 8, padding: "1rem" }}>
              <h2 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>{plan.name}</h2>
              <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>{plan.price}</p>
              <ul style={{ marginBottom: "1rem" }}>
                {plan.features.map(f => <li key={f}>• {f}</li>)}
              </ul>
              <Link href="/login" style={{ color: "white", background: "#000", padding: "0.5rem 1rem", borderRadius: 4 }}>Get Started</Link>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
