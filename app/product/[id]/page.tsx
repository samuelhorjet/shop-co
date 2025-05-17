import ProductPageClient from "./ProductPageClient";

interface Params {
  id: string;
}

interface PageProps {
  params: Params;
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function Product({ params }: PageProps) {
  const { id } = params;

  // Since we're using the async keyword, this function now returns a Promise
  // which should satisfy the type constraint

  return <ProductPageClient productId={id} />;
}
