import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--v2-border)] bg-[var(--v2-surface)]">
      <div className="v2-container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-semibold">Bridge Olutindo Academy</p>
            <p className="mt-2 text-sm text-[var(--v2-text-muted)]">Structured Japanese learning for real outcomes.</p>
          </div>
          <div className="space-y-2 text-sm">
            <Link className="block text-[var(--v2-text-muted)] hover:text-[var(--v2-text)]" href="/v2/privacy">Privacy</Link>
            <Link className="block text-[var(--v2-text-muted)] hover:text-[var(--v2-text)]" href="/v2/terms">Terms</Link>
            <Link className="block text-[var(--v2-text-muted)] hover:text-[var(--v2-text)]" href="/v2/faq">FAQ</Link>
          </div>
          <div className="text-sm text-[var(--v2-text-muted)]">Kampala, Uganda<br />support@bridgeolutindo.academy</div>
        </div>
      </div>
    </footer>
  );
}
