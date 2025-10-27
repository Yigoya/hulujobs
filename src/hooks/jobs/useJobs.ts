// hooks/jobs/useJobs.ts
import { useQuery } from "@tanstack/react-query";
import { getAll } from "../../services/api-client";

export const useJobs = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: ["jobs", params],
    queryFn: () => getAll("/jobs", params),
    staleTime: 1000 * 60 * 5, // 5 minutes - data stays fresh
    gcTime: 1000 * 60 * 10, // 10 minutes - cache persists in memory
  });
};
