import { ArrowLeft, ExternalLink, Pause, Play, Star } from "lucide-react"
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from "react-router-dom"

import * as PlaylistService from '@/api/PlaylistService'
import DynamicTitle from "@/components/DynamicTitle"
import { cn } from "@/lib/utils"
import { renderImage } from "@/lib/cdn"
import { useEffect } from "react"
import { usePlaylistStore } from "@/store/usePlaylistStore"
import type { TrackType } from "@/types/Track"
import { useAudioStore } from "@/store/useAudioStore"
import Duration from "@/components/Duration"

const Playlist = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { playlist, setPlaylist, setSelectedTrackIndex } = usePlaylistStore()
    const { playlist: playingPlaylist, setPlaylist: setPlayingPlaylist, pause, loadAudio, play, buffer, isPlaying } = useAudioStore()

    const { data } = useQuery({
        queryKey: [`playlist-${id}`],
        queryFn: () =>
            PlaylistService.showPlaylist(id as string)
    })

    const isSelected = playlist?.id == playingPlaylist?.id

    const handlePlay = async () => {
        if (!playlist) return
        if (isSelected)
            buffer && play()
        else {
            setPlayingPlaylist(playlist, 0)
            setSelectedTrackIndex(0)
            await loadAudio(playlist.tracks[0].uri)
            play()
            console.log('begin playing playlist')
        }
    }

    useEffect(() => {
        if (data)
            setPlaylist({ ...data, tracks: data.tracks.map((track: TrackType) => ({ ...track, uri: renderImage(track.uri, 'track') })) });
    }, [data])

    if (!playlist)
        return

    return (
        <div className="w-screen h-full md:h-screen bg-gradient-to-r from-[#2B2B2B] to-[#131313] flex flex-col md:flex-row">
            <div className={`relative flex flex-col md:w-full lg:w-md xl:w-2xl h-1/3 md:h-full bg-cover p-8 md:pt-20 md:px-12 z-10`}>
                <img className="absolute inset-0 object-cover w-full h-full -z-10 opacity-25" src={renderImage(playlist.album_background, 'image')} alt="" />
                <ArrowLeft onClick={() => navigate(-1)} className="absolute top-10 left-12 cursor-pointer" stroke={"#fff"} size={32} />
                <img className="w-fit md:w-full h-full md:h-fit aspect-square mb-2" src={renderImage(playlist.album_art, 'image')} alt="" />
                <div className="flex flex-row justify-between items-center">
                    <DynamicTitle title={playlist?.title ?? ''} />
                    <div className="flex flex-col">
                        <span className="font-franie font-semibold text-[#B2B2B2] text-xl italic ">{playlist?.type}</span>
                        <span className="font-ethos font-thin text-[#B2B2B2] text-sm text-right">{Duration(playlist?.duration_total)}</span>
                        <span className="font-ethos font-thin text-[#B2B2B2] text-sm text-right">{playlist?.tracks.length} Songs</span>
                    </div>
                </div>
                <div className="flex flex-row items-center mb-3 w-xs justify-between">
                    <span className="font-ethos text-sm font-thin text-white w-xs">{playlist?.artist}</span>
                    <span className="font-ethos text-sm font-thin text-white">{playlist?.year}</span>
                </div>
                {/* <div className="size-24 aspect-square bg-white rounded-full flex justify-center items-center">
                    <Play onClick={handlePlay} fill="#000" className="" size={72} /> */}
                {(!isSelected || !isPlaying) && <div onClick={handlePlay} className="size-20 bg-white rounded-full flex justify-center items-center">
                    <Play fill="#000" className="" size={48} />
                </div>}
                {isSelected && isPlaying && <div onClick={pause} className="size-20 bg-white rounded-full flex justify-center items-center">
                    <Pause fill="#000" size={48} />
                </div>}
                {/* </div> */}
            </div>
            <div className="w-full h-full overflow-x-auto">
                <div className="p-4 pt-10 border-b border-white/35">
                    <div className="grid grid-cols-12 text-[#B2B2B2] font-ethos text-sm pb-3">
                        <span className="col-span-2 md:col-span-1">#</span>
                        <span className="col-span-10 md:col-span-11">Title</span>
                    </div>
                </div>

                {playlist?.tracks?.map((track: any, index: number) => (
                    <div
                        key={track.id}
                        className={cn(`grid grid-cols-12 items-center cursor-pointer text-white py-3 px-4 border-b border-white/10 hover:bg-white/5 transition font-ethos`,
                            index % 2 == 0 ? 'bg-[#404040]' : 'bg-[#484848]'
                        )}
                        onClick={() => navigate(`/playlist/${playlist.id}/${index}`)}
                    >
                        <span className="col-span-2 md:col-span-1 text-2xl">{index + 1}.</span>
                        <div className="flex flex-col col-span-8 md:col-span-9">
                            <span className="font-medium text-lg md:text-2xl">{track.title}</span>
                            <span className="font-light text-xs md:text-sm">{track.artist}</span>
                        </div>
                        <div className="flex flex-row col-span-2 md:col-span-1 gap-2 justify-end items-end">
                            <Star className="size-4 md:size-6" color="#ffffff" />
                            <ExternalLink className="size-4 md:size-6" color="#ffffff" />
                        </div>
                    </div>
                ))}

            </div>

        </div>
    )
}

export default Playlist