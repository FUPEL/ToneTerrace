import axiosInstance from "@/lib/axiosInstance";


export const getPlaylists = async (search?: string) => {
    const response = (await axiosInstance.get(`/api/playlists?q=${search ?? ''}`)).data

    return response
}

export const showPlaylist = async (id: string) => {
    const response = (await axiosInstance.get(`/api/playlists/${id}`)).data

    return response
}