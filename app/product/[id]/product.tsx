import ProductPage from "./page";

export default async function Product({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  // If you want, you could fetch product data here for SSR,
  // but since you are importing products from a lib, just pass id

  return <ProductPage productId={id} />;
}
