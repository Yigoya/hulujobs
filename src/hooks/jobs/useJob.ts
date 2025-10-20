// hooks/jobs/useJob.ts
import { useQuery } from "@tanstack/react-query";
import { getById } from "../../services/api-client";

export const useJob = (id?: string) => {
  return useQuery({
    queryKey: ["job", id],
    queryFn: () => getById(`/jobs`, id!),
    enabled: !!id, // Don't run if no ID
    staleTime: 1000 * 30,
  });
};
