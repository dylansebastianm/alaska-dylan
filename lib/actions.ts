import axios, { AxiosResponse } from "axios";
import type { ApiResponse, UserData } from "./types";

export async function getUserData(userId: number): Promise<{ data: UserData | null; error: string | null }> {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.get(
      `https://api7.cloudframework.io/recruitment/fullstack/users?id=${userId}`,
      {
        headers: {
          "X-WEB-KEY": "Development",
        }
      }
    );
    if (!response.data.success) {
      return { data: null, error: "No se pudo cargar la información del usuario. Por favor, inténtelo más tarde." };
    }

    return { data: response.data.data, error: null };
  } catch (error: any) {
    return { data: null, error: "No se pudo cargar la información del usuario. Por favor, inténtelo más tarde." };
  }
}
