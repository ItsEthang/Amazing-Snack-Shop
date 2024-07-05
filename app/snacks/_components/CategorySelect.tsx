"use client";

import { Skeleton } from "@/app/components";
import { Select } from "@radix-ui/themes";
import { useCategory } from "@/app/hooks/useCategory";

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

export default CategorySelect;
