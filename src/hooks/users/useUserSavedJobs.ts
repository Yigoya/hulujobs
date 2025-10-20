// hooks/jobs/useUserSavedJobs.ts
import { useQuery } from "@tanstack/react-query";
import { getAll } from "../../services/api-client";

export const useUserSavedJobs = (userId: string, params?: Record<string, any>) => {
  return useQuery({
    queryKey: ["userSavedJobs", userId, params],
    queryFn: () => getAll(`/saved/${userId}/jobs`, params),
    staleTime: 1000 * 30, // 30 seconds
  });
};
