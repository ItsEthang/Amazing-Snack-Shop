import { Category } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCategory = () =>
  useQuery({
    queryKey: ["newestSnacks"],
    queryFn: () =>
      axios.get<Category[]>("/api/snacks/newest").then((res) => res.data),
    staleTime: 300_000,
    retry: 3,
  });
