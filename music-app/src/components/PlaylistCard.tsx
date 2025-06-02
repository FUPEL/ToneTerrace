import { renderImage } from "@/lib/cdn"
import type { PlaylistType } from "@/types/Playlist"
import { Link } from "react-router-dom"

const PlaylistCard = ({ item }: { item: PlaylistType }) => {
    return (
        <Link to={`/playlist/${item.id}`} className="flex flex-col gap-3">
            <img className="size-32 md:size-48 lg:size-52 xl:size-60 shadow-xl rounded-xl" src={renderImage(item.album_art, 'image')} alt="" />
            <div className="p-1 text-white">
                <h1 className="font-ethos font-bold text-lg md:text-2xl">{item.title}</h1>
                <h3 className="font-ethos font-thin text-xs md:text-sm">{item.artist}</h3>
            </div>
        </Link>
    )
}

export default PlaylistCard