import DashboardLayoutShell from "@/components/dashboard/DashboardLayout";

export const metadata = {
  title: {
    default: "Dashboard | Tecsaro",
    template: "%s | Dashboard — Tecsaro"
  },
  description: "Your personal dashboard for saved content, engagement and learning.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayoutShell>
      {children}
    </DashboardLayoutShell>
  );
}
