// hooks/useSaveJob.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { post, del } from "../services/api-client";

interface SaveJobParams {
  userId: string;
  jobId: number;
}

interface UnsaveJobParams {
  userId: string;
  jobId: number;
}

export const useSaveJob = () => {
  const queryClient = useQueryClient();

  const saveJobMutation = useMutation({
    mutationFn: ({ userId, jobId }: SaveJobParams) => 
      post(`/saved/${userId}/jobs/${jobId}`, {}),
    onSuccess: () => {
      // Invalidate saved jobs queries to refetch the list
      queryClient.invalidateQueries({ queryKey: ["saved-jobs"] });
    },
  });

  const unsaveJobMutation = useMutation({
    mutationFn: ({ userId, jobId }: UnsaveJobParams) => 
      del(`/saved/${userId}/jobs`, jobId.toString()),
    onSuccess: () => {
      // Invalidate saved jobs queries to refetch the list
      queryClient.invalidateQueries({ queryKey: ["saved-jobs"] });
    },
  });

  return {
    saveJob: saveJobMutation.mutate,
    unsaveJob: unsaveJobMutation.mutate,
    isSaving: saveJobMutation.isPending,
    isUnsaving: unsaveJobMutation.isPending,
    saveError: saveJobMutation.error,
    unsaveError: unsaveJobMutation.error,
    isLoading: saveJobMutation.isPending || unsaveJobMutation.isPending,
  };
};
