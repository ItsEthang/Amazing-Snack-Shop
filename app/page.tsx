import Pagination from "./components/Pagination";

export default function Home() {
  return (
    <>
      <div>
        Amazing Snack Shop's website is still under construction 🚧 🚧 🚧. Thank
        you for your patience!
      </div>
      <Pagination itemCtn={15} pageSize={5} currPage={1} />
    </>
  );
}
