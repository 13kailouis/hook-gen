# HookFreak – Video Sales Hook Builder

Bangun skrip video jualan TikTok, Reels, dan Shorts dalam sekali klik. Hasilkan visual hook, teks pembuka, skrip berdurasi fleksibel, dan saran frame secara langsung.

Setiap permintaan memberi tiga versi alternatif supaya kamu bisa pilih yang paling pas.

**Fitur Utama:**
* **Visual Hook Prompt:** Ide adegan pembuka yang kuat & bisa langsung direkam.
* **Teks Hook Nendang:** Kalimat pembuka subtitle/VO yang bikin berhenti scroll.
* **Skrip Video Sesuai Durasi:** Struktur Hook-Problem-Agitation-Solution-CTA dengan panjang yang bisa diatur.
* **Saran Frame Praktis:** Ide visual per bagian skrip untuk memudahkan produksi.
* **3 Alternatif Sekali Generate:** Pilih gaya yang paling cocok untuk brand-mu.

## Cara jalan
1.  Salin file `.env.example` menjadi `.env.local` (`cp .env.example .env.local`).
2.  Isi `GROQ_API_KEY` di dalam `.env.local` dengan API key Groq Anda.
3.  Atur `NEXT_PUBLIC_DEFAULT_DURATION` jika ingin mengubah durasi script default (opsional).

4.  Opsional: set `NEXT_PUBLIC_SITE_NAME` untuk mengganti nama brand pada tampilan.
5.  Install dependencies: `npm i`
6.  Jalankan server development: `npm run dev`
4.  Install dependencies: `npm i`
5.  Jalankan server development: `npm run dev`


Aplikasi akan berjalan di `http://localhost:3000`.
Landing page kini hanya menampilkan informasi dan contoh hasil.
Buka `/builder` untuk langsung menggunakan generator skrip lengkap.
