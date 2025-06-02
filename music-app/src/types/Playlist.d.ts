import type { TrackType } from "./Track"

export type PlaylistType = {
    id: string, 
    title: string, 
    artist: string,
    type: string, 
    album_art: string, 
    album_background: string, 
    duration_total: number,
    year: number,
    tracks : TrackType[]
}