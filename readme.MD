# ProfitHook – AI Video Ad Generator

Bangun naskah video iklan TikTok, Reels, dan Shorts yang berorientasi profit dalam sekali klik. ProfitHook menghasilkan visual hook, teks pembuka, skrip siap eksekusi, dan saran frame otomatis.

Setiap permintaan langsung memberi tiga alternatif agar kamu bisa memilih mana yang paling potensial meningkatkan konversi.

**Fitur Utama:**
* **Visual Hook Prompt:** Ide adegan pembuka yang kuat & bisa langsung direkam.
* **Script Fokus Profit:** Struktur Hook–Problem–Agitation–Solution–CTA yang dioptimalkan untuk jualan.
* **Prompt Visual dan Frame:** Saran adegan pembuka hingga penutup untuk memaksimalkan engagement.
* **Durasi Fleksibel:** Tentukan panjang video 15–60 detik sesuai kebutuhan kampanye.
* **Tiga Variasi Otomatis:** Lebih banyak opsi untuk A/B testing iklan.

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
