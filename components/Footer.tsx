import { Gamepad2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-(--border-subtle) bg-(--bg-footer) mt-auto" role="contentinfo">
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-linear-to-br from-sky-500/20 to-blue-600/20 border border-(--border-subtle)">
            <Gamepad2 className="w-4 h-4 text-sky-400" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-(--text-muted)">
            GameVault
          </span>
        </div>
        <p className="text-sm text-(--text-faint)">
          © {new Date().getFullYear()} GameVault. All rights reserved.
        </p>
      </div>
    </footer>
  );
}