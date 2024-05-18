import { Badge } from "@radix-ui/themes";

const SnackStockBadge = ({ quantity }: { quantity: number }) => {
  const badgeColor = quantity >= 10 ? "green" : quantity > 0 ? "orange" : "red";
  const badgeText =
    quantity >= 10 ? "In Stock" : quantity > 0 ? "Low Stock" : "Out of Stock";
  return <Badge color={badgeColor}>{badgeText}</Badge>;
};

export default SnackStockBadge;
