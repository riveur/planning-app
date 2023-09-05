import { LaravelPaginationResponse } from "@/types"
import axios from "axios"

export async function fetchTableData<T>(
  url: string, { page, size }: { page: number, size: number }
) {
  return await axios.get<LaravelPaginationResponse<T>>(`${url}?page=${page}&size=${size}`)
    .then(response => response.data);
}