import { showPlaylist } from "@/api/PlaylistService";
import type { PlaylistType } from "@/types/Playlist"
import { create } from "zustand";

type PlaylistStore = {
    playlist: PlaylistType | null;
    selectedTrackIndex: number;

    getPlaylist: (id: string) => Promise<void>;
    setPlaylist: (playlist: PlaylistType) => Promise<void>;
    setSelectedTrackIndex: (index: number) => void;
}

export const usePlaylistStore = create<PlaylistStore>((set) => ({
    playlist: null,
    selectedTrackIndex: -1,

    getPlaylist: async (id: string) => {
        const playlist = (await showPlaylist(id)) as PlaylistType

        set({ playlist })
    },

    setPlaylist: async (playlist: PlaylistType) => {
        set({ playlist })
    },

    setSelectedTrackIndex: (index: number) => {
        set({ selectedTrackIndex: index })
    }
}))