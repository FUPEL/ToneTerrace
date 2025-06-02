import Equalizer from "@/components/music/Equalizer"
import MusicControl from "@/components/music/MusicControl"
import { ChevronLeft } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import DynamicMusic from "@/components/DynamicMusic"
import { renderImage } from "@/lib/cdn"
import { usePlaylistStore } from "@/store/usePlaylistStore"
import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { showPlaylist } from "@/api/PlaylistService"
import type { TrackType } from "@/types/Track"

const Music = () => {
    const { id, index } = useParams()
    const navigate = useNavigate()
    const { playlist, setSelectedTrackIndex, setPlaylist } = usePlaylistStore()

    const { data } = useQuery({
        queryKey: [`playlist-${id}`],
        queryFn: () =>
            showPlaylist(id as string)
    })

    useEffect(() => {
        if (data)
            setPlaylist({ ...data, tracks: data.tracks.map((track: TrackType) => ({ ...track, uri: renderImage(track.uri, 'track') })) });
    }, [data])

    if (!playlist || !index)
        return

    useEffect(() => { setSelectedTrackIndex(parseInt(index)) }, [index, playlist])

    return (
        <div className="relative w-screen min-h-screen flex justify-center items-center bg-cover" style={{ backgroundImage: `url(${renderImage(playlist?.album_background, 'image')})` }}>
            <div className="absolute inset-0 bg-black opacity-60" />
            <ChevronLeft onClick={() => navigate(-1)} className="absolute inset-8 z-50 cursor-pointer" size={48} color="#ffffff" />
            <div className="max-w-5xl mx-auto flex flex-col items-stretch z-0">
                <div className="grid grid-rows-2 md:grid-rows-1 grid-cols-1 md:grid-cols-2">
                    <div className="flex w-full justify-end items-end">
                        <img className="h-full aspect-square" src={renderImage(playlist.album_art, 'image')} alt="" />
                    </div>
                    <div className="flex flex-col p-8 pb-16 justify-center items-start h-full flex-1 text-white">
                        <div className="flex flex-col mb-4">
                            <DynamicMusic title={playlist?.tracks[parseInt(index)].title} />
                            <p className="font-franie font-light">{playlist?.tracks[parseInt(index)].artist}</p>
                        </div>
                        <div className="flex flex-1 w-full">
                            <Equalizer />
                        </div>
                    </div>
                </div>
                <MusicControl />
            </div>
        </div>
    )
}

export default Music