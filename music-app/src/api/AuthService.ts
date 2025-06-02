import axiosInstance from "@/lib/axiosInstance";


export const login = async ({ username, email, password }: { username: string, email: string, password: string }) => {
    const response = (await axiosInstance.post('/api/auth/login', {
        username, email, password
    })).data

    return response
}

export const register = async ({ username, email, password }: { username: string, email: string, password: string }) => {
    const response = (await axiosInstance.post('/api/auth/register', {
        username, email, password
    })).data

    return response
}

export const me = async (): Promise<number> => {
    return (await axiosInstance.get('/api/auth/me')).status
}