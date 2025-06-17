# AdOptimizer AI – Ads & Content Optimizer

Platform ini membantu Anda membuat copy iklan yang efektif sekaligus memantau performa kampanye dalam satu dashboard.

**Fitur Utama:**
* **AI Ad Builder:** Buat headline dan teks iklan otomatis.
* **Dashboard ROI:** Lihat metrik penting seperti CPC dan ROI secara instan.
* **Workflow Otomatis:** Follow-up lead dan CRM sederhana.

## Cara jalan
1.  Salin file `.env.example` menjadi `.env.local` (`cp .env.example .env.local`).
2.  Isi `GROQ_API_KEY` di dalam `.env.local` dengan API key Groq Anda.
3.  Atur `NEXT_PUBLIC_DEFAULT_DURATION` jika ingin mengubah durasi script default (opsional).
4.  Opsional: set `NEXT_PUBLIC_SITE_NAME` untuk mengganti nama brand pada tampilan.
5.  Untuk mengaktifkan login Google, isi variabel Firebase yang sudah disediakan pada `.env.example` (`NEXT_PUBLIC_FIREBASE_*`).
6.  Install dependencies: `npm i`
7.  Jalankan server development: `npm run dev`

Aplikasi akan berjalan di `http://localhost:3000`.
Landing page menampilkan ringkasan fitur dan contoh hasil.
Buka `/builder` untuk menggunakan generator skrip lengkap. Halaman ini memerlukan login Google lebih dulu.
