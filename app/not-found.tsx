import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="text-center px-[24px]">
        <h1 className="font-serif text-[32px] font-normal">Page not found</h1>
        <p className="text-[16px] text-text-muted mt-[12px]">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-block text-accent font-medium hover:underline mt-[24px]"
        >
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
