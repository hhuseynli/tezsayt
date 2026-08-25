import Link from "next/link";

export default function LocaleNotFound() {
  return (
    <section className="bg-bg">
      <div className="max-w-[560px] mx-auto px-[20px] py-[96px] text-center">
        <h1 className="font-serif text-[32px] md:text-[48px] font-normal leading-[1.1]">
          Page not found
        </h1>
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
    </section>
  );
}
