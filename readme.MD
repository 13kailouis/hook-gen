# HookFreak – Video Sales Hook Builder

Bangun skrip video jualan TikTok, Reels, dan Shorts dalam sekali klik. Hasilkan visual hook, teks pembuka, skrip 30 detik, dan saran frame secara langsung.

Setiap permintaan memberi tiga versi alternatif supaya kamu bisa pilih yang paling pas.

**Fitur Utama:**
* **Visual Hook Prompt:** Ide adegan pembuka yang kuat & bisa langsung direkam.
* **Teks Hook Nendang:** Kalimat pembuka subtitle/VO yang bikin berhenti scroll.
* **Skrip Video 30 Detik:** Struktur Hook-Problem-Agitation-Solution-CTA yang menjual.
* **Saran Frame Praktis:** Ide visual per bagian skrip untuk memudahkan produksi.
* **3 Alternatif Sekali Generate:** Pilih gaya yang paling cocok untuk brand-mu.

## Cara jalan
1.  Salin file `.env.example` menjadi `.env.local` (`cp .env.example .env.local`).
2.  Isi `GROQ_API_KEY` di dalam `.env.local` dengan API key Groq Anda.
3.  Install dependencies: `npm i`
4.  Jalankan server development: `npm run dev`

Aplikasi akan berjalan di `http://localhost:3000`.
Anda bisa langsung buka halaman utama untuk mencoba generator singkat, atau ke `/builder` untuk fitur input yang lebih lengkap.
