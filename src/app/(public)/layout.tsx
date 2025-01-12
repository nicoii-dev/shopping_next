import { PublicNavbar } from "@/components/public/navbar";

export default function ProtectedGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicNavbar />
      {children}
    </>
  );
}
