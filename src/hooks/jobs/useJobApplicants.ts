// hooks/jobs/useJobApplicants.ts
import { useQuery } from "@tanstack/react-query";
import { getNested } from "../../services/api-client";

export const useJobApplicants = (jobId?: string) => {
  return useQuery({
    queryKey: ["job-applicants", jobId],
    queryFn: () => getNested(`/jobs/${jobId}/applicants`),
    enabled: !!jobId,
    staleTime: 1000 * 30,
  });
};
