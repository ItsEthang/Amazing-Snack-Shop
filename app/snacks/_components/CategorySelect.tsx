"use client";

import { Skeleton } from "@/app/components";
import { Category } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  onValueChange: (value: string) => void;
  defaultValue: string | undefined;
}

const CategorySelect = ({ onValueChange, defaultValue }: Props) => {
  const { data: categories, error, isLoading } = useCategory();

  if (isLoading) return <Skeleton />;

  if (error) return null;
  return (
    <>
      <Select.Root defaultValue={defaultValue} onValueChange={onValueChange}>
        <Select.Trigger placeholder="Assign Category" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Category Options</Select.Label>
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

const useCategory = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      axios.get<Category[]>("/api/categories").then((res) => res.data),
    staleTime: 6000_000,
    retry: 3,
  });
export default CategorySelect;
