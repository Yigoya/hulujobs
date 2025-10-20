// hooks/jobs/useCompanySavedApplications.ts
import { useQuery } from "@tanstack/react-query";
import { getAll } from "../../services/api-client";

export const useCompanySavedApplications = (companyId: string, params?: Record<string, any>) => {
  return useQuery({
    queryKey: ["companySavedApplications", companyId, params],
    queryFn: () => getAll(`/saved/${companyId}/applications`, params),
    staleTime: 1000 * 30, // 30 seconds
  });
};

