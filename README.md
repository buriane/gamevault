# 🎮 GameVault

Katalog game modern dibangun pakai **Next.js 16**. Menampilkan koleksi game lengkap dengan fitur pencarian, filter, sorting, wishlist, dan dark/light mode.

## 📋 Cara Menjalankan

### Requirement

- **Node.js** ≥ 18
- **npm** ≥ 9

### Instalasi & Menjalankan

```bash
# 1. Clone repository
git clone https://github.com/buriane/gamevault.git
cd gamevault

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Build Production

```bash
npm run build
npm start
```

---

## 🛠 Tech Stack

| Teknologi | Versi | Alasan |
|-----------|-------|--------|
| **Next.js** | 16.2.6 | Framework utama pilihan karena familiar dengan ekosistem React. Fitur bawaan seperti App Router, `next/image`, `loading.tsx`, dan zero-config deployment ke Vercel sangat relevan untuk project ini. |
| **React** | 19.2.4 | Hooks terbaru dan performa rendering yang lebih handal. |
| **TypeScript** | ^5 | Type safety biar gak sering kena runtime error dan enak pas refactoring. |
| **Tailwind CSS** | v4 | Styling berbasis utility. Dikombinasi dengan CSS variables buat sistem theming yang rapi. |
| **Framer Motion** | ^12.38 | Buat animasi transisi antar halaman (fade-in + slide-up). |
| **Lucide React** | ^1.14 | Icon set yang clean dan ringan. |
| **next-themes** | ^0.4.4 | Library andalan buat handle dark/light mode dengan aman tanpa isu hydration atau FOUC. |

---

## 📁 Struktur Folder

```
gamevault/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (font, theme script, navbar, footer)
│   ├── page.tsx                  # Homepage (hero banner + game grid)
│   ├── not-found.tsx             # Custom 404 page
│   ├── globals.css               # CSS variables (light/dark), animations, scrollbar
│   ├── games/
│   │   ├── (catalog)/            # Route group untuk katalog
│   │   │   ├── page.tsx          # Halaman katalog (search, filter, sort, pagination)
│   │   │   └── loading.tsx       # Skeleton loader untuk katalog
│   │   └── [slug]/               # Dynamic route per game
│   │       ├── page.tsx          # Detail game (cover, info, screenshots, sidebar)
│   │       └── loading.tsx       # Skeleton loader untuk detail
│   └── wishlist/
│       └── page.tsx              # Wishlist page
│
├── components/                   # Reusable UI components
│   ├── Navbar.tsx                # Navigasi utama (responsive, icon-only di mobile)
│   ├── Footer.tsx                # Footer site
│   ├── HeroBanner.tsx            # Carousel featured games (auto-rotate + keyboard nav)
│   ├── GameCard.tsx              # Card game dengan hover effects & shine animation
│   ├── GameCardSkeleton.tsx      # Skeleton placeholder untuk GameCard
│   ├── FilterBar.tsx             # Search + Sort + Genre/Platform/Year filters
│   ├── ScreenshotGallery.tsx     # Gallery + Lightbox (keyboard navigable)
│   ├── WishlistButton.tsx        # Toggle add/remove wishlist
│   └── PageTransition.tsx        # Framer Motion fade-in + slide-up wrapper
│
├── context/                      # React Context providers
│   ├── ThemeProvider.tsx         # Wrapper next-themes untuk dark/light mode
│   └── WishlistContext.tsx       # State management wishlist (localStorage)
│
├── data/
│   └── games.json                # 33 game entries (static data source)
│
└── lib/
    └── utils.ts                  # Helper functions (getGameBySlug, formatPrice, formatDate, dll.)
```

---

## ✅ Fitur

### Core Features
- [x] **Katalog Game**: Grid responsif (2/3/4 kolom) dengan search, sort (6 opsi), filter multi-select genre/platform/tahun
- [x] **Detail Game**: Hero background, cover image, rating, harga, deskripsi, screenshots, info sidebar
- [x] **Wishlist**: Persistent via localStorage, toggle dari detail page, badge count di navbar
- [x] **Pagination**: 12 item per halaman dengan navigasi halaman
- [x] **404 Page**: Custom not-found page

### UI/UX Enhancements
- [x] **Dark/Light Mode**: Toggle via navbar, system preference detection, persistent via localStorage
- [x] **Skeleton Loaders**: Tampil saat navigasi antar halaman games dan detail game
- [x] **Page Transition Animations**: Fade-in + slide-up via Framer Motion
- [x] **Hover Effects**: Card shine sweep animation (CSS), scale on hover, color transitions
- [x] **Empty States**: Desain khusus untuk wishlist kosong dan zero search results
- [x] **Responsive Design**: Mobile-first, compact navbar, proper stacking pada semua breakpoint
- [x] **Custom Scrollbar**: Themed scrollbar yang cocok dengan dark/light mode

### Accessibility
- [x] **ARIA Labels**: Semua interactive element punya label deskriptif
- [x] **Keyboard Navigation**: Hero carousel (← →), Screenshot lightbox (← →)
- [x] **ARIA Landmarks**: `role="navigation"`, `role="main"`, `role="contentinfo"`
- [x] **Screen Reader Support**: `aria-live` regions, `aria-current="page"`, `aria-expanded`

### Performance
- [x] **Next.js Image Optimization**: Pakai `loading="eager"` dan `fetchPriority="high"` buat image LCP, plus `sizes` responsif.
- [x] **Font Optimization**: `Plus_Jakarta_Sans` via `next/font` (anti FOUT).
- [x] **Optimasi Theming**: Di-handle oleh `next-themes` biar transisi loading dan tema smooth.

---

## ⚠️ Trade-offs

### Sinkronisasi Tema (FOUC & Skeleton Loading)
Awalnya, pas web di-reload dalam kondisi *light mode*, komponen *skeleton loader* sering berkedip pakai warna gelap dulu sebelum pindah ke terang. Ini masalah SSR di mana server gak tau tema apa yang dipilih user di *localStorage*.

**Solusinya:** Kode dark mode buatan sendiri udah dibongkar dan sekarang pakai `next-themes`. Library ini jauh lebih optimal karena nyisipin script khusus yang jalan duluan sebelum browser nge-render UI. Sekarang, *skeleton loading* otomatis ngikutin tema (termasuk *system preference*) dengan sangat mulus tanpa *glitch*.

---

## 🧪 Testing

Unit test menggunakan **Jest** dan **React Testing Library** untuk memverifikasi komponen utama.

### Menjalankan Test

```bash
npm test
```

### Coverage

| Komponen | Jumlah Test | Status |
|----------|-------------|--------|
| `GameCard` | 8 tests | ✅ PASS |
| `WishlistButton` | 6 tests | ✅ PASS |
| **Total** | **14 tests** | **✅ All Pass** |

> Waktu eksekusi: ~3 detik — dijalankan dengan `jest` tanpa flag tambahan.

### Skenario yang Diuji

**GameCard**
- Render judul, rating, dan genre dari props
- Format harga dalam IDR (`Rp450.000`)
- Conditional rendering harga 0 → "Free"
- Alt text cover image untuk accessibility
- Link href mengarah ke `/games/[slug]` yang benar
- Maksimal 2 genre ditampilkan (`.slice(0, 2)`)

**WishlistButton**
- Label awal "Add to Wishlist"
- ARIA label deskriptif untuk accessibility
- Toggle add/remove saat diklik
- Persistensi ke `localStorage` saat ditambahkan
- Hapus dari `localStorage` saat di-toggle off
- Prop `showLabel={false}` menyembunyikan label teks