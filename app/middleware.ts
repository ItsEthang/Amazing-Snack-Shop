export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/snacks/new", "/snacks/orders", "/snacks/:id+/edit"],
};
