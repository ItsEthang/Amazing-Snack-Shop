"use client";

import { Skeleton } from "@/app/components";
import { Category } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  onValueChange: (value: string) => void;
}

const CategorySelect = ({ onValueChange }: Props) => {
  const { data: categories, error, isLoading } = useCategory();

  if (isLoading) return <Skeleton />;

  if (error) return null;
  return (
    <>
      <Select.Root onValueChange={onValueChange}>
        <Select.Trigger placeholder="Assign Category" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Category Options</Select.Label>
            <Select.Item value="1">Uncategorized</Select.Item>
            <Select.Item value="7">Packaged Food</Select.Item>
            {categories?.map((category) => (
              <Select.Item key={category.id} value={`${category.id}`}>
                {category.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
};

const useCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      axios.get<Category[]>("/api/categories").then((res) => res.data),
    staleTime: 600_000,
    retry: 3,
  });
};
export default CategorySelect;