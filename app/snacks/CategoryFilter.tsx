"use client";

import { Skeleton } from "@/app/components";
import { Select } from "@radix-ui/themes";
import React from "react";
import { useCategory } from "../hooks/useCategory";

const CategoryFilter = () => {
  const { data: categories, error, isLoading } = useCategory();

  if (isLoading) return <Skeleton />;

  if (error) return null;
  return (
    <Select.Root>
      <Select.Trigger placeholder="Filter by category" />
      <Select.Content>
        <Select.Group>
          {categories?.map((category) => (
            <Select.Item key={category.id} value={`${category.id}`}>
              {category.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default CategoryFilter;
