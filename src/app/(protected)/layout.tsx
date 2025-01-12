import { ProtectedNavbar } from "@/components/protected/navbar";

export default function ProtectedGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProtectedNavbar />
      {children}
    </>
  );
}
