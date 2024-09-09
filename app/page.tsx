import { Grid } from "@radix-ui/themes";
import FeaturedSnack from "./FeaturedSnack";
import NewestSnacks from "./NewestSnacks";

export default function Home() {
  return (
    <>
      <div className="mb-5">
        Amazing Snack Shop's website is still under construction 🚧 🚧 🚧. Thank
        you for your patience!
      </div>
      <NewestSnacks />
      <Grid columns={{ initial: "1", sm: "2" }} gap="5" className="mt-5">
        <FeaturedSnack categoryId="6" categoryName="Packaged" />
        <FeaturedSnack categoryId="7" categoryName="Drinks" />
      </Grid>
    </>
  );
}
