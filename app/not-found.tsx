import Link from "next/link";
import { Home } from "lucide-react";
import PageTransition from "@/components/PageTransition";

export default function NotFound() {
  return (
    <PageTransition>
    <div className="flex flex-col items-center justify-center flex-1 py-24 text-center px-6">
      <div className="text-8xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-sky-400 to-blue-600 mb-4">
        404
      </div>
      <h1 className="text-2xl font-bold mb-2">Halaman Tidak Ditemukan</h1>
      <p className="text-sm text-(--text-muted) max-w-sm mb-8">
        Game yang kamu cari tidak ada di katalog kami. Mungkin sudah dihapus atau URL-nya salah.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-xl hover:from-sky-400 hover:to-blue-500 transition-all shadow-lg shadow-blue-500/25"
      >
        <Home className="w-4 h-4" />
        Kembali ke Beranda
      </Link>
    </div>
    </PageTransition>
  );
}
