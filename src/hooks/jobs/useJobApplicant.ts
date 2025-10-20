// hooks/jobs/useJobApplicant.ts
import { useQuery } from "@tanstack/react-query";
import { getNested } from "../../services/api-client";

export const useJobApplicant = (jobId?: string, applicantId?: string) => {
  return useQuery({
    queryKey: ["job-applicant", jobId, applicantId],
    queryFn: () => getNested(`/jobs/${jobId}/applicants/${applicantId}`),
    enabled: !!jobId && !!applicantId,
    staleTime: 1000 * 30,
  });
};
