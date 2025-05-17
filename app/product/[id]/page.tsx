import ProductPageClient from "./ProductPageClient";

interface Params {
  id: string;
}

interface PageProps {
  params: Params;
}

export default function Product({ params }: PageProps) {
  const { id } = params;

  // No async here since you just pass the id down

  return <ProductPageClient productId={id} />;
}
