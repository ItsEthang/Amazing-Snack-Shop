import { Button } from "@radix-ui/themes";
import { PiEmpty } from "react-icons/pi";

interface Props {
  onClear: () => void;
}

const ClearCartButton = ({ onClear }: Props) => {
  return (
    <Button onClick={onClear} color="ruby">
      <PiEmpty />
      Clear Cart
    </Button>
  );
};

export default ClearCartButton;
