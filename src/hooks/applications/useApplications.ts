// hooks/jobs/useJobs.ts
import { useQuery } from "@tanstack/react-query";
import { getAll } from "../../services/api-client";

export const useApplications = (companyId: string, params?: Record<string, any>) => {
  return useQuery({
    queryKey: [`applications/${companyId}`, params],
    queryFn: () => getAll(`/companies/${companyId}/applications`, params),
    staleTime: 1000 * 30, // 30 seconds
  });
};
