import axiosInstance from "@/lib/axiosInstance";


export const getTracks = async () => {
    const response = (await axiosInstance.get('/api/tracks')).data

    return response
}

export const showTrack = async (id: string) => {
    const response = (await axiosInstance.get(`/api/tracks/${id}`)).data

    return response
}