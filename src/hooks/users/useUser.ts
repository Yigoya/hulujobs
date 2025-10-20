// hooks/jobs/useJob.ts
import { useQuery } from "@tanstack/react-query";
import { getById } from "../../services/api-client";

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getById(`/profiles/seeker`, id!),
    enabled: !!id, // Don't run if no ID
    staleTime: 1000 * 30,
  });
};
