export const metadata = {
  title: {
    default: "Account | Tecsaro",
    template: "%s | Tecsaro"
  },
  description: "Access your account and manage your Tecsaro experience.",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {children}
    </div>
  );
}
