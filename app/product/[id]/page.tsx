import ProductPageClient from "./ProductPageClient";

interface PageProps {
  params: { id: string };
}

export default function ProductPage({ params }: PageProps) {
  const { id } = params;

  return <ProductPageClient productId={id} />;
}
