import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string; slug: string }> };

export default async function GuidePage({ params }: Props) {
  // No articles yet — all slugs return 404
  notFound();
}
