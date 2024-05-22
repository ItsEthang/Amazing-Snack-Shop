import { Button } from "@radix-ui/themes";
import { FaShoppingCart } from "react-icons/fa";

const AddToCart = () => {
  return (
    <Button>
      <FaShoppingCart />
      Add to Cart
    </Button>
  );
};

export default AddToCart;
