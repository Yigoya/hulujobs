// hooks/jobs/useJobApplications.ts
import { useQuery } from "@tanstack/react-query";
import { getAll } from "../../services/api-client";

export const useJobApplications = (companyId: string, jobId: string, params?: Record<string, any>) => {
  return useQuery({
    queryKey: [`applications/${companyId}/${jobId}`, params],
    queryFn: () => getAll(`/jobs/${companyId}/applications/${jobId}`, params),
    staleTime: 1000 * 30, // 30 seconds
  });
};
