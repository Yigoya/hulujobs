// hooks/jobs/useJobs.ts
import { useQuery } from "@tanstack/react-query";
import { getAll } from "../../services/api-client";

export const useJobs = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: ["jobs", params],
    queryFn: () => getAll("/jobs", params),
    staleTime: 1000 * 30, // 30 seconds
  });
};
