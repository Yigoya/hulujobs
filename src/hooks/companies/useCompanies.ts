// hooks/jobs/useJobs.ts
import { useQuery } from "@tanstack/react-query";
import { getAll } from "../../services/api-client";

export const useCompanies = (params?: Record<string, any> ) => {
  return useQuery({
    queryKey: ["profiles/company/search", params],
    queryFn: () => getAll("/profiles/company/search", params),
    staleTime: 1000 * 60 * 5, // 5 minutes - data stays fresh
    gcTime: 1000 * 60 * 10, // 10 minutes - cache persists in memory
  });
};
