export const metadata = {
  title: {
    default: "Business News | Tecsaro",
    template: "%s | Tecsaro News"
  },
  description: "Curated business news, analysis, and expert insights.",
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen mx-auto max-w-5xl p-4 md:p-6">
      {children}
    </div>
  );
}
