// services/api-client.ts
import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://hulumoya.zapto.org";

const api = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
});

// --- Utility Functions ---
export const getAll = async <T>(
  endpoint: string,
  params?: Record<string, any>,
  filters?: Record<string, any>
): Promise<T> => {
  const response = await api.get(endpoint, { params: { ...params, ...filters } });
  return response.data;
};

export const getById = async <T>(endpoint: string, id: string): Promise<T> => {
  const response = await api.get(`${endpoint}/${id}`);
  return response.data;
};

export const getNested = async <T>(endpoint: string): Promise<T> => {
  const response = await api.get(endpoint);
  return response.data;
};

export const post = async <T>(endpoint: string, data: any): Promise<T> => {
  const response = await api.post(endpoint, data);
  return response.data;
};

export const put = async <T>(endpoint: string, id: string, data: any): Promise<T> => {
  const response = await api.put(`${endpoint}/${id}`, data);
  return response.data;
};

export const del = async <T>(endpoint: string, id: string): Promise<T> => {
  const response = await api.delete(`${endpoint}/${id}`);
  return response.data;
};
export const patch = async <T>(endpoint: string, id: string, data: any): Promise<T> => {
  const response = await api.patch(`${endpoint}/${id}`, data);
  return response.data;
};

export const uploadFile = async <T>(endpoint: string, file: File, additionalData?: any): Promise<T> => {
  const formData = new FormData();
  formData.append('file', file);
  
  // Add any additional data to the form data
  if (additionalData) {
    Object.keys(additionalData).forEach(key => {
      formData.append(key, additionalData[key]);
    });
  }

  const response = await api.post(endpoint, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const putFormData = async <T>(endpoint: string, id: string, data: any): Promise<T> => {
  const formData = new FormData();
  
  console.log("Original data being sent:", data);
  
  // Append all data fields to FormData
  Object.keys(data).forEach(key => {
    if (data[key] !== undefined && data[key] !== null) {
      if (Array.isArray(data[key])) {
        // Handle arrays (like skills)
        data[key].forEach((item: any, index: number) => {
          formData.append(`${key}[${index}]`, item);
          console.log(`Added to FormData: ${key}[${index}] = ${item}`);
        });
      } else {
        formData.append(key, data[key]);
        console.log(`Added to FormData: ${key} = ${data[key]}`);
      }
    }
  });

  // Debug: Log all FormData entries
  console.log("FormData entries:");
  for (const [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  const response = await api.put(`${endpoint}/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  console.log(`Response from putFormData:`, response.data);
  return response.data;
};

