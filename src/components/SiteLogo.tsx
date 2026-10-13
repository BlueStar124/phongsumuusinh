import Image from "next/image";

export function SiteLogo({ className = "" }: { className?: string }) {
  return <Image src="/icon.svg" alt="Logo Vị mưu sinh" width={36} height={36} className={`site-logo ${className}`} unoptimized />;
}
