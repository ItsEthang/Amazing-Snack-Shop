import { Button } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import Link from "next/link";
import authOptions from "../auth/AuthOptions";

const SnackToolBar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="mb-5">
      {session && (
        <Button>
          <Link href="/snacks/new">Add Snack</Link>
        </Button>
      )}
    </div>
  );
};

export default SnackToolBar;
