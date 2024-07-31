"use client";
import { Select } from "@radix-ui/themes";
import { Snack } from "@prisma/client";
import { useRouter } from "next/navigation";

const SortBy = () => {
  const sortOptions: { option: string; value: keyof Snack; order: string }[] = [
    { option: "Newest Arrivals", value: "addedOn", order: "desc" },
    { option: "Name: A - Z", value: "name", order: "asc" },
    { option: "Name: Z - A", value: "name", order: "desc" },
    { option: "Price: Low to High", value: "price", order: "asc" },
    { option: "Price: High to Low", value: "price", order: "desc" },
  ];
  const router = useRouter();

  // const query = option && option !== " " ? `?sortBy=${option}` : "";
  //       router.push("/snacks" + query);
  return (
    <Select.Root
      onValueChange={(option) => {
        const [value, order] = option.split("|");
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);

        // Merge or set sortBy parameter
        params.set("sortBy", value && value !== " " ? value : "");
        params.set("order", order && order !== " " ? order : "");

        // Construct new URL
        const newQuery = params.toString();
        router.push(`/snacks?${newQuery}`);
      }}
    >
      <Select.Trigger placeholder="Sort by..." />
      <Select.Content>
        <Select.Group>
          {sortOptions.map((option) => (
            <Select.Item
              value={`${option.value}|${option.order}`}
              key={option.option}
            >
              {option.option}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default SortBy;
