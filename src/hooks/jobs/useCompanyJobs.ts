// hooks/jobs/useJobs.ts
import { useQuery } from "@tanstack/react-query";
import { getAll } from "../../services/api-client";

export const useCompanyJobs = (companyId: string, params?: Record<string, any>) => {
  return useQuery({
    queryKey: ["companyJobs", companyId, params],
    queryFn: () => getAll(`/jobs/company/${companyId}`, params),
    staleTime: 1000 * 30, // 30 seconds
  });
};
