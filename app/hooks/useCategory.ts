import { Category } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCategory = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      axios.get<Category[]>("/api/categories").then((res) => res.data),
    staleTime: 6000_000,
    retry: 3,
  });
