export const dynamic = 'force-dynamic';

import dynamicImport from "next/dynamic";

const CheckoutClient = dynamicImport(() => import("./../../components/CheckoutClient"), {
  ssr: false,
});

export default function CheckoutPage() {
  return <CheckoutClient />;
}

