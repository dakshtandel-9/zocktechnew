import Image from "next/image";

/** Theme-aware logo: white wordmark on dark, black wordmark on light. */
export function Logo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <>
      <Image
        src="/brand/zocktech-logo-dark.png"
        alt="ZockTech"
        width={384}
        height={93}
        className={`only-dark ${className}`}
        fetchPriority="high"
      />
      <Image
        src="/brand/zocktech-logo-light.png"
        alt="ZockTech"
        width={384}
        height={93}
        className={`only-light ${className}`}
        fetchPriority="high"
      />
    </>
  );
}
