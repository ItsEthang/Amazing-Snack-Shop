import { Button } from "@radix-ui/themes";
import Link from "next/link";

const SnackToolBar = () => {
  return (
    <div className="mb-5">
      <Button>
        <Link href="/snacks/new">Add Snack</Link>
      </Button>
    </div>
  );
};

export default SnackToolBar;
