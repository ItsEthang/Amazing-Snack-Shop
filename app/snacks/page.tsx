import React from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const SnacksPage = () => {
  return (
    <Button>
      <Link href="/snacks/new">Add Snack</Link>
    </Button>
  );
};

export default SnacksPage;
