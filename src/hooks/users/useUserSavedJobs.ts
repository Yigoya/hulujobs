// hooks/jobs/useUserSavedJobs.ts
import { useQuery } from "@tanstack/react-query";
import { getAll } from "../../services/api-client";

export const useUserSavedJobs = (userId: string, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ["userSavedJobs", userId],
    queryFn: () => getAll(`/saved/${userId}/jobs`),
    staleTime: 1000 * 30, // 30 seconds
    enabled: options?.enabled !== false && !!userId, // Only fetch if enabled and userId exists
  });
};
