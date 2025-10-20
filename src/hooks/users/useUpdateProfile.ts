// hooks/users/useUpdateProfile.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putFormData, uploadFile } from "../../services/api-client";

interface UpdateProfileParams {
  userId: string;
  profileData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    title: string;
    bio: string;
    experience: string;
    education: string;
    skills: string[];
    linkedin?: string;
    github?: string;
    resumeUrl?: string;
  };
}

interface UploadResumeParams {
  userId: string;
  file: File;
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation({
    mutationFn: ({ userId, profileData }: UpdateProfileParams) => 
      putFormData(`/profiles/seeker`, userId, profileData),
    onSuccess: (data, variables) => {
      // Invalidate user profile queries to refetch the updated data
      queryClient.invalidateQueries({ queryKey: ["user", variables.userId] });
      // You can also update the cache directly if needed
      queryClient.setQueryData(["user", variables.userId], data);
    },
  });

  const uploadResumeMutation = useMutation({
    mutationFn: ({ userId, file }: UploadResumeParams) => 
      uploadFile(`/profiles/seeker/${userId}/resume`, file),
    onSuccess: (data, variables) => {
      // Invalidate user profile queries to refetch the updated data
      queryClient.invalidateQueries({ queryKey: ["user", variables.userId] });
      // Update the cache with the new resume URL if provided in response
      queryClient.setQueryData(["user", variables.userId], data);
    },
  });

  return {
    updateProfile: updateProfileMutation.mutate,
    updateProfileAsync: updateProfileMutation.mutateAsync,
    isUpdating: updateProfileMutation.isPending,
    updateError: updateProfileMutation.error,
    isSuccess: updateProfileMutation.isSuccess,
    data: updateProfileMutation.data,
    
    // Resume upload methods
    uploadResume: uploadResumeMutation.mutate,
    uploadResumeAsync: uploadResumeMutation.mutateAsync,
    isUploadingResume: uploadResumeMutation.isPending,
    uploadResumeError: uploadResumeMutation.error,
    isResumeUploadSuccess: uploadResumeMutation.isSuccess,
    resumeUploadData: uploadResumeMutation.data,
  };
};
