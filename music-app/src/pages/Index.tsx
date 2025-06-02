import PlaylistCard from '@/components/PlaylistCard';
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import type { PlaylistType } from '@/types/Playlist';
import { Search, UsersRound } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { AnimatePresence, motion } from "framer-motion";

import * as PlaylistService from '@/api/PlaylistService'
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { renderImage } from '@/lib/cdn';

const features = [
  <Link to={'/playlist/683bdda63302171719c2741d'} className="relative w-full h-full font-ethos px-4 md:px-12 flex flex-col md:flex-row items-center justify-center gap-8">
    <div className="flex justify-center md:justify-end w-full md:w-1/3">
      <img
        src="/image/kerolinlulabay1.png"
        alt="Kerolinlulabay"
        className="size-40 md:size-72 xl:size-96 object-cover"
      />
    </div>
    <div className="w-full md:w-2/3 flex flex-col justify-center items-center md:items-start gap-4">
      <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-black tracking-wide text-center md:text-left leading-tight drop-shadow-md stroke-black">
        Maaf Ini Keluar Literally 13 Detik Yang Lalu
        <span className="font-normal text-sm tracking-wide ml-4">Splits</span>
      </h1>
      <div className="flex flex-row items-center gap-2 mt-2">
        <img src="/image/HUSH.png" alt="Hush" className="w-24 h-auto" />
        <img src="/image/X.png" alt="X" className="w-4 h-4" />
        <img
          src="/image/funeruuu.png"
          alt="Funeruuu logo"
          className="w-24 h-auto object-contain"
        />
      </div>
    </div>
  </Link>,
  <Link to={'/playlist/68370a2489b3b0ba0a39217a'} className="relative w-full h-full font-ethos px-4 md:px-12 flex flex-col md:flex-row items-center justify-center gap-8">
    <div className="flex justify-center md:justify-end w-full md:w-1/3">
      <img
        src="/image/kerolinlulabay 1 (1).png"
        alt="Kerolinlulabay"
        className="size-40 md:size-72 xl:size-96 object-cover"
      />
    </div>
    <div className="w-full md:w-2/3 flex flex-col justify-center items-center md:items-start gap-4">
      <h1 className="font-momxt text-white text-2xl md:text-4xl lg:text-5xl font-black tracking-wide text-center md:text-left leading-tight drop-shadow-md stroke-black">
        Cradle of fear
        <span className="font-ethos font-normal text-sm tracking-wide ml-4">Single</span>
      </h1>
      <div className="flex flex-row items-center gap-2 mt-2">
        <img src="/image/kyroline.png" alt="Hush" className="" />
      </div>
    </div>
  </Link>,
  <Link to={'/playlist/6837092194c218b7b6066feb'} className="relative w-full h-full font-ethos px-4 md:px-12 flex flex-col md:flex-row items-center justify-center gap-8">
    <div className="flex justify-center md:justify-end w-full md:w-1/3">
      <img
        src="/image/ilied-art.png"
        alt="Kerolinlulabay"
        className="size-40 md:size-72 xl:size-96 object-cover"
      />
    </div>
    <div className="w-full md:w-2/3 flex flex-col justify-center items-center md:items-start gap-4">
      <h1 className="font-soopa text-white text-2xl md:text-4xl lg:text-5xl font-black tracking-wide text-center md:text-left leading-tight drop-shadow-md stroke-black">
        I Lied!
        <span className="font-ethos font-normal text-sm tracking-wide ml-4">Single</span>
      </h1>
      <div className="flex flex-row items-center gap-2 mt-2">
        <img src="/image/bit scruffy.png" alt="Hush" className="" />
      </div>
    </div>
  </Link>
]

const backgrounds = [
  "/image/art-1.png",
  "/image/art-2.png",
  "/image/art-3.png"
]


const Index = () => {
  const [recent, setRecent] = useState<PlaylistType[]>([])
  const { logout } = useAuthStore()
  const navigate = useNavigate()
  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const getRecent = async () => {
      const playlists = await PlaylistService.getPlaylists(search)

      setRecent(playlists)
    }
    getRecent()
  }, [search])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="bg-white overflow-hidden [background:linear-gradient(180deg,rgba(45,45,45,1)_0%,rgba(32,32,32,1)_100%)] w-full relative">
      <header className="flex flex-row h-12 w-full bg-[#3e3e3e] shadow-[0px_4px_35px_-15px_#00000040] justify-between items-center px-2 py-2 fixed left top-0 z-50">
        <div className="flex items-center space-x-1 mr-4 text-white">
          <Popover>
            <PopoverTrigger>
                <img className='size-8 mr-4 rounded-full object-cover' src={renderImage('asukashinji.png', "image")} />
            </PopoverTrigger>
            <PopoverContent className='mt-1 flex flex-col p-0 bg-black w-48 text-white rounded-none border-0 font-ethos font-bold'>
              <Link to='/my-profile'>
                <div className="py-1 px-2 cursor-pointer bg-[#323232] hover:bg-[#545353] text-stroke-0">Profile</div>
              </Link>
              <Link to='/setting'>
                <div className="py-1 px-2 cursor-pointer bg-[#323232] hover:bg-[#545353] text-stroke-0">Settings</div>
              </Link>
              <div onClick={handleLogout} className="py-1 px-2 cursor-pointer bg-[#323232] hover:bg-[#545353] text-stroke-0 text-stroke-black">Logout</div>
            </PopoverContent>
          </Popover>
          <Link to='social'>
            <UsersRound />
          </Link>
        </div>

        <div className="relative w-full max-w-md md:max-w-[570px] bg-black/50 rounded-full bg-[url(/searchbar.svg)] bg-[100%_100%] ">
          <Search className='absolute inset-2 object-cover' color="#3E3E3E" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="p-5 pl-12 font-ethos border-transparent focus:border-transparent focus-visible:ring-0 font-light text-white ring-0 border-0 outline-0 focus:ring-0 focus:border-0"
            placeholder="What do you want to play today?"
          />
        </div>
      </header>
      <AnimatePresence mode="wait">
        <motion.section
          key={index}
          className="w-full relative h-[60vh] md:h-[80vh] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgrounds[index]})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {features[index]}
        </motion.section>
      </AnimatePresence>
      {search !== '' ? (
        <section className="px-12 mt-16 max-w-screen">
          <h2 className="[text-shadow:0px_4px_4px_#00000040] [-webkit-text-stroke:1px_#000000] [font-family:'Ethos_Nova-Heavy',Helvetica] font-normal text-white text-[39px] tracking-[-0.78px] leading-[normal] mb-8">
            Search Result
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
                  <CarouselItem key={item.id} className="basis-1/3 lg:basis-1/4 xl:basis-1/5">
                    <PlaylistCard item={item} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>
      ) : (
        <>
          <section className="px-12 mt-16 max-w-screen">
            <h2 className="[text-shadow:0px_4px_4px_#00000040] [-webkit-text-stroke:1px_#000000] [font-family:'Ethos_Nova-Heavy',Helvetica] font-normal text-white text-[39px] tracking-[-0.78px] leading-[normal] mb-8">
              Recently Listened
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
                    <CarouselItem key={item.id} className="basis-1/3 lg:basis-1/4 xl:basis-1/5">
                      <PlaylistCard item={item} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </section>
          <section className="px-12 mt-16">
            <h2 className="[text-shadow:0px_4px_4px_#00000040] [-webkit-text-stroke:1px_#000000] [font-family:'Ethos_Nova-Heavy',Helvetica] font-normal text-white text-[39px] tracking-[-0.78px] leading-[normal] mb-8">
              Hand Picked for You!
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
          <section className="px-12 mt-16">
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
      )}

      <footer className="px-8 mt-16 pb-4">
        <Separator className="w-full h-px mb-2" />

        <div className="flex items-start">
          <img className="w-[120px] md:w-[219px]" alt="Logo" src="/image/logo 2.png" />

          <div className="hidden md:block ml-0 w-[180px] [text-shadow:0px_4px_4px_#00000040] font-abhaya font-normal text-white text-[8px] tracking-[0.64px] leading-[normal]">
            designed and developed by:
            <br />
            <br />
            Hugo Daneindra Megaantara
            <br />
            Muhammad Rafli Arsya Fahriza
          </div>

          <div className="hidden md:block ml-4 w-[180px] font-abhaya font-normal text-white text-[8px] tracking-[0.64px] leading-[normal]">
            coded and developed by:
            <br />
            <br />
            Alfito Faiz Rizqi
            <br />
            Bryan Austin Hidayat
            <br />
            Nicky Aryan Gunawan
          </div>

          <div className="flex-1"></div>

          <div className="w-[149px] h-[88px] relative mr-4">
            <div className="absolute w-[129px] top-2.5 left-[15px] rotate-[-9.38deg] font-phosphorus font-normal text-[#ffffffb2] text-2xl text-center tracking-[1.92px] leading-[normal]">
              Special
              <br />
              Thanks!
            </div>
            <img
              className="absolute w-5 h-5 top-12 left-0"
              alt="Star"
              src="/image/star-4.svg"
            />
            <img
              className="absolute w-[19px] h-[18px] top-8 left-2"
              alt="Star"
              src="/image/star-5.svg"
            />
          </div>

          <div className="font-ethos font-light text-white text-[8px] tracking-[0.64px] leading-[normal]">
            Families and Friends Who have helped out:
            <br />
            <br />
            Taura Pasha (Megan Santana)
            <br />
            Azka Nagari (Enon Enon)
            <br />
            Bhiru Langit (Karolines Lullaby)
            <br />
            PUREST HELL™
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Index