// hooks/jobs/useJob.ts
import { useQuery } from "@tanstack/react-query";
import { getById } from "../../services/api-client";

export const useCompany = (id?: string) => {
  return useQuery({
    queryKey: ["company", id],
    queryFn: () => getById(`/profiles/company/detail`, id!),
    enabled: !!id, // Don't run if no ID
    staleTime: 1000 * 30,
  });
};
