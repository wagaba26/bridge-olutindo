export default function SettingsPage() {
  return (
    <section className="panel p-6">
      <h1 className="font-display text-2xl">Settings</h1>
      <p className="mt-2 text-sm text-[#5a5f5f]">
        Profile and billing settings will appear here.
      </p>
      <div className="mt-4 grid gap-3">
        <div className="panel-soft px-4 py-3 text-sm">Update profile</div>
        <div className="panel-soft px-4 py-3 text-sm">Manage subscription</div>
      </div>
    </section>
  );
}
