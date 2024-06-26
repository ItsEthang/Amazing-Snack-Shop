import CartContext, { CartItem } from "@/app/context/CartContext";
import { Button, Flex } from "@radix-ui/themes";
import { useContext } from "react";

interface Props {
  cartItem: CartItem;
}

const AdjustQuantity = ({ cartItem }: Props) => {
  const { addToCart, deleteFromCart } = useContext(CartContext);

  const onIncrease = (item: CartItem) => {
    const newQty = item.quantity + 1;
    const updatedItem = { ...cartItem, quantity: newQty };
    if (newQty > cartItem.product.quantity) return;
    addToCart(updatedItem.product, updatedItem.quantity);
  };

  const onDecrease = (item: CartItem) => {
    const newQty = item.quantity - 1;
    const updatedItem = { ...cartItem, quantity: newQty };
    if (newQty <= 0) {
      deleteFromCart(updatedItem.product.id);
    } else {
      addToCart(updatedItem.product, updatedItem.quantity);
    }
  };

  return (
    <Flex>
      <Button
        radius="none"
        color="gray"
        variant="soft"
        size="1"
        highContrast
        onClick={() => onDecrease(cartItem)}
      >
        -
      </Button>
      <input
        readOnly
        value={cartItem.quantity}
        className="text-center max-w-12"
      ></input>
      <Button
        radius="none"
        color="gray"
        variant="soft"
        size="1"
        highContrast
        onClick={() => onIncrease(cartItem)}
      >
        +
      </Button>
    </Flex>
  );
};

export default AdjustQuantity;
