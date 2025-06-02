import MusicControlFloating from "@/components/music/MusicControlFloating"
import { useAuthStore } from "@/store/useAuthStore"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import * as AuthService from '@/api/AuthService'
import { useAudioStore } from "@/store/useAudioStore"
const queryClient = new QueryClient()

const MainAppLayout = () => {
    const navigate = useNavigate()
    const { init, source } = useAudioStore()
    useEffect(() => {
        AuthService.me().catch(() => navigate('/login'))
        if (!source)
            init()
    }, [])

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <div className="">
                    <Outlet />
                    <MusicControlFloating />
                </div>
            </QueryClientProvider>
        </>
    )
}

export default MainAppLayout