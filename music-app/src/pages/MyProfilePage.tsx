import { renderImage } from "@/lib/cdn";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { useEffect, useState } from "react";
import type { PlaylistType } from "@/types/Playlist";
import * as PlaylistService from '@/api/PlaylistService'
import PlaylistCard from "@/components/PlaylistCard";
import { House } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

export default function MyProfilePage() {
    const [recent, setRecent] = useState<PlaylistType[]>([])
    const { user } = useAuthStore()

    useEffect(() => {
        const getRecent = async () => {
            const playlists = await PlaylistService.getPlaylists()

            setRecent(playlists)
        }
        getRecent()
    }, [])
    return (
        <>
            <div className="relative flex flex-col w-full bg-[#241F1F] font-ethos p-4 md:p-20 text-white">
                <Link to={'/'} className="absolute top-12 left-20">
                    <House color="#ffffff" />
                </Link>
                <div className="flex flex-row w-full max-w-7xl min-h-64 mx-auto gap-8">
                    <img className="w-full max-w-80 h-full aspect-square object-cover rounded-full" src={renderImage('asukashinji.png', "image")} alt="" />
                    <div className="flex flex-col gap-8 w-full">
                        <div className="flex flex-row w-full justify-evenly items-center">
                            <h1 className="font-black text-8xl">{user?.username}</h1>
                            <div className="flex flex-col items-center justify-center gap-4">
                                <span className="font-ethos font-thin">999<span className="ml-2 font-black">Followers</span></span>
                                <span className="font-ethos font-thin">999<span className="ml-2 font-black">Following</span></span>
                            </div>
                            <div className="flex items-center justify-center">
                                <svg width="33" height="46" viewBox="0 0 33 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.5332 32.3682V45.9355H7.79395V32.3682H0.510742V29.8867H7.79395V16.6416H0.510742V14.1602H7.79395V0.786133H10.5332V14.1602H23.0371V0.786133H25.7441V14.1602H33V16.6416H25.7441V29.8867H33V32.3682H25.7441V45.9355H23.0371V32.3682H10.5332ZM23.0371 16.6416H10.5332V29.8867H23.0371V16.6416Z" fill="white" />
                                </svg>
                            </div>
                            <img className="aspect-square h-16" src="/RANK3.png" alt="" />
                        </div>
                        <div className="grid grid-cols-3 p-8 gap-16 from-[#48362D] to-[#40404C] bg-gradient-to-b rounded-[64px]">
                            <div className="flex flex-col items-center gap-2">
                                <h1 className="font-phosphorus text-3xl font-bold">Favorite <br /> Artist!</h1>
                                <img src={renderImage('/korn.png', 'image')} className="rounded-full aspect-square size-32 shadow-[0px_0px_41px_1px_rgba(255,46,88,1)]" alt="" />
                                <h1 className="font-black text-stroke-[0.75px]">Korn</h1>
                            </div>
                            <div className="flex flex-col items-center  gap-2">
                                <h1 className="font-phosphorus text-3xl font-bold">Favorite <br /> Album!</h1>
                                <img src={renderImage('/lampasd.jpg', 'image')} className="rounded-full aspect-square size-32 shadow-[0px_0px_41px_1px_rgba(255,244,189,1)]" alt="" />
                                <h1 className="font-black text-stroke-[0.75px]">ランプ幻想</h1>
                                <h1 className="text-xs">Lamp</h1>
                            </div>
                            <div className="flex flex-col items-center  gap-2">
                                <h1 className="font-phosphorus text-3xl font-bold">Favorite <br /> Song!</h1>
                                <img src={renderImage('/song.png', 'image')} className="rounded-full aspect-square size-32 shadow-[0px_0px_41px_1px_rgba(117,47,0,1)]" alt="" />
                                <h1 className="font-black text-stroke-[0.75px]">Afx237 v.7</h1>
                                <h1 className="text-xs items-center text-center">Drukqs -<br />Aphex Twin</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="bg-[#222121] px-12 py-16">
                <h2 className="[text-shadow:0px_4px_4px_#00000040] [-webkit-text-stroke:1px_#000000] [font-family:'Ethos_Nova-Heavy',Helvetica] font-normal text-white text-[39px] tracking-[-0.78px] leading-[normal] mb-8">
                    Your Playlist
                </h2>
                <div className="flex space-x-16 relative">
                    <Carousel
                        opts={{
                            align: "start",
                        }}
                        className="w-full max-w-7xl"
                    >
                        <CarouselContent>
                            {recent.map((item) => (
                                <CarouselItem key={item.id} className="md:basis-1/2 lg:1/3 xl:basis-1/5">
                                    <PlaylistCard item={item} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </section>
        </>
    );
}
