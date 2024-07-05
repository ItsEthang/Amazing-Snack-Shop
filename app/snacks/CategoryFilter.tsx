"use client";

import { Skeleton } from "@/app/components";
import { Select } from "@radix-ui/themes";
import React from "react";
import { useCategory } from "../hooks/useCategory";
import { useRouter } from "next/navigation";

const CategoryFilter = () => {
  const { data: categories, error, isLoading } = useCategory();
  const router = useRouter();

  if (isLoading) return <Skeleton />;

  if (error) return null;
  return (
    <Select.Root
      onValueChange={(category) => {
        const query =
          category && category !== " " ? `?category=${category}` : "";
        router.push("/snacks" + query);
      }}
    >
      <Select.Trigger placeholder="Filter by category" />
      <Select.Content>
        <Select.Group>
          <Select.Item value=" ">All</Select.Item>
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
