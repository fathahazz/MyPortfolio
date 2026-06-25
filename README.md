# Fathahazz — Portfolio Website

Website portfolio personal untuk Fathahaz Nur Ramdhani (Web & App Developer, UI/UX Designer). Dibangun sebagai single-page static site — satu file HTML, tanpa framework, tanpa build step.

## 🔗 Demo

Belum di-deploy? Lihat [bagian deploy](#-deploy-ke-github-pages) di bawah.

## 📁 Struktur Project

```
.
├── index.html      # seluruh halaman (HTML + CSS + JS dalam satu file)
└── README.md
```

Semua section ada di satu file `index.html`:

| Section | Isi |
|---|---|
| Hero | Headline utama, sticker dekoratif, partikel bintang |
| Tentang | Foto profil, bio singkat |
| Layanan | 3 kartu layanan (Web Dev, App Dev, UI/UX) |
| Proyek | Showcase 3 proyek + tombol "lihat semua" (expand ke 6) |
| Kontak | Info kontak + tombol WhatsApp |
| Testimoni & Footer | 1 testimoni contoh + 2 placeholder kosong, footer + navigasi |

## ✨ Fitur

- **Navbar fixed** dengan highlight otomatis sesuai section yang sedang dilihat (active state)
- **Animasi mengambang** pada bintang & sticker di Hero (naik-turun terus-menerus, CSS keyframes)
- **Sparkle interaktif** di section Tentang & Kontak — bergerak mengikuti posisi cursor mouse
- **Proyek expandable** — tampil 3 dulu, klik "Lihat seluruh proyek" untuk munculkan sisanya
- **Tombol Back to Top** — muncul setelah scroll, klik untuk balik ke Hero
- **Mobile menu** — burger menu yang otomatis tertutup saat klik di luar area navbar atau saat scroll
- **Scrollbar custom** berwarna oranye (Chrome/Edge/Safari & Firefox)
- Fully responsive — breakpoint untuk desktop, tablet, dan mobile

## 🛠️ Cara Edit Konten

Semua teks, link, dan data ada langsung di `index.html`, cari lewat `Ctrl+F` / `Cmd+F`:

| Mau ubah... | Cari teks ini di kode |
|---|---|
| Foto profil (section Tentang) | `GANTI src di bawah ini` |
| Thumbnail proyek | `ganti dengan <img src="...">` |
| Daftar/jumlah proyek | Blok `<div class="project-card">` — copy/hapus blok untuk nambah/kurangin |
| Testimoni | Blok `<div class="testi-card">` pertama — copy strukturnya untuk nambah testi baru, hapus class `testi-placeholder` |
| Nomor WhatsApp | Cari `6282110757763` |
| Email | Cari `fathahazz31@gmail.com` |
| Link Instagram | Cari `fthahazz_` |

## 🚀 Deploy ke GitHub Pages

1. Push project ini ke repository GitHub (public atau private dengan GitHub Pro).
2. Buka repo → **Settings** → **Pages** (di sidebar kiri).
3. Di **Build and deployment** → **Source**, pilih **Deploy from a branch**.
4. Pilih branch `main` (atau `master`) dan folder `/ (root)`, lalu **Save**.
5. Tunggu 1–2 menit, GitHub akan kasih link aktif di bagian atas halaman Pages, biasanya berbentuk:
   ```
   https://<username>.github.io/<nama-repo>/
   ```

Tidak perlu build step, npm install, atau konfigurasi tambahan — karena ini cuma file statis HTML.

### Lewat terminal (kalau repo belum ada)

```bash
git init
git add .
git commit -m "Initial commit: portfolio website"
git branch -M main
git remote add origin https://github.com/<username>/<nama-repo>.git
git push -u origin main
```

Lalu lanjut ke langkah Settings → Pages di atas.

## 🌐 Custom Domain (opsional)

Kalau punya domain sendiri, tambahkan file `CNAME` (tanpa ekstensi) di root project isi domainnya, contoh:
```
fathahazz.com
```
Lalu arahkan DNS domain ke GitHub Pages sesuai [panduan resmi GitHub](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## 🎨 Tech Stack

- HTML5 + CSS3 (custom properties / CSS variables)
- Vanilla JavaScript (tanpa library/framework)
- Font: [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) (display/serif) + [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (body) via Google Fonts

## 📄 Lisensi

Bebas dipakai dan dimodifikasi untuk keperluan personal.
