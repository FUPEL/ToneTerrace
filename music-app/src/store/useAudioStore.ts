import type { PlaylistType } from "@/types/Playlist";
import axios from "axios";
import { create } from "zustand";


type AudioState = {
    context: AudioContext | null;
    source: AudioBufferSourceNode | null;
    buffer: AudioBuffer | null,
    gainNode: GainNode | null;
    filters: BiquadFilterNode[];
    isPlaying: boolean;
    startTime: number;
    offset: number;
    userStopAction: boolean;

    playlist: PlaylistType | null;
    currentIndex: number;

    setPlaylist: (playlist: PlaylistType, index: number) => void;
    next: () => void;
    previous: () => void;


    pause: () => void;
    resume: () => void;
    getCurrentTime: () => number;

    init: () => void;
    play: () => void;
    stop: (userAction: boolean) => void;
    loadAudio: (url: string) => Promise<void>;
    setGain: (value: number) => void;
    setFilterGain: (index: number, gain: number) => void;
    seekTo: (time: number) => void;
};

export const useAudioStore = create<AudioState>((set, get) => {
    return {
        context: null,
        source: null,
        buffer: null,
        gainNode: null,
        filters: [],
        isPlaying: false,
        startTime: 0,
        offset: 0,
        playlist: null,
        currentIndex: 0,

        userStopAction: false,

        init: () => {
            const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
            const context = new AudioCtx();
            const gainNode = context.createGain();
            const frequencies = [60, 150, 400, 1000, 2400, 15000];

            const filters = frequencies.map((freq) => {
                const filter = context.createBiquadFilter();
                filter.type = "peaking";
                filter.frequency.value = freq;
                filter.Q.value = 1;
                filter.gain.value = 0;
                return filter;
            });

            filters.reduce((prev, curr) => {
                prev.connect(curr);
                return curr;
            });

            filters[filters.length - 1].connect(gainNode);
            gainNode.connect(context.destination);

            set({ context, filters, gainNode });
        },

        play: async () => {
            const { context, filters, offset, buffer, playlist, currentIndex, loadAudio } = get();

            let newBuffer = buffer;

            if (!newBuffer && playlist && playlist.tracks.length > 0) {
                await loadAudio(playlist.tracks[currentIndex].uri);
                newBuffer = get().buffer;
            }

            if (!context || filters.length === 0 || !newBuffer) return; 

            const source = context.createBufferSource();
            source.buffer = newBuffer;
            source.connect(filters[0]);

            const startTime = context.currentTime;
            source.start(0, offset, newBuffer.duration - offset);

            source.onended = () => {
                const { userStopAction, currentIndex, playlist } = get();
                if (userStopAction) {
                    set({userStopAction: false})
                    return
                };

                if (playlist && currentIndex < playlist.tracks.length - 1) {
                    console.log('kita next')
                    get().next(); // Auto-play next
                } else {
                    console.log('kita reset')
                    set({ isPlaying: false, offset: 0 }); // Reset
                }
            };

            set({ source, isPlaying: true, startTime });
        },

        setPlaylist: (playlist, index) => {
            set({ userStopAction: true })
            get().source?.stop()
            set({ playlist: playlist, currentIndex: index ?? 0 });
        },

        next: async () => {
            const { currentIndex, playlist, stop, loadAudio, play } = get();
            if (playlist && currentIndex < playlist.tracks.length - 1) {
                stop(true);
                const nextIndex = currentIndex + 1;
                set({ currentIndex: nextIndex });
                await loadAudio(playlist.tracks[nextIndex].uri);
                play();
            }
        },

        previous: async () => {
            const { currentIndex, playlist, stop, loadAudio, play } = get();
            if (playlist && currentIndex > 0) {
                stop(true);
                const prevIndex = currentIndex - 1;
                set({ currentIndex: prevIndex });
                await loadAudio(playlist.tracks[prevIndex].uri);
                play();
            }
        },


        // play: () => {
        //     const { context, filters, offset, buffer } = get();
        //     if (buffer == null)
        //         return

        //     if (!context || filters.length === 0) return;

        //     const source = context.createBufferSource();
        //     source.buffer = buffer;
        //     source.connect(filters[0]);

        //     const startTime = context.currentTime;
        //     source.start(0, offset, buffer.duration - offset);
        //     source.onended = () => {
        //         const { userStopAction } = get();
        //         if (userStopAction)
        //             return

        //         console.log('audio end')
        //         set({ isPlaying: false, offset: 0 });
        //     }
        //     set({ source, isPlaying: true, startTime });
        // },

        pause: () => {
            const { source, context, startTime, offset } = get();
            if (!context || !source) return;
            set({ userStopAction: true })
            source.stop();
            const newOffset = offset + (context.currentTime - startTime);
            set({ isPlaying: false, offset: newOffset });
        },


        resume: () => {
            const { context, filters, offset } = get();
            if (!context || filters.length === 0) return;

            const source = context.createBufferSource();
            const buffer = get().source?.buffer;
            if (!buffer) return;

            source.buffer = buffer;
            source.connect(filters[0]);

            const startTime = context.currentTime;
            source.start(0, offset, buffer.duration - offset);
            source.onended = () => {
                const { userStopAction, currentIndex, playlist } = get();
                if (userStopAction)  {
                    set({userStopAction: false})
                    return
                };

                if (playlist && currentIndex < playlist.tracks.length - 1) {
                    console.log('kita next')
                    get().next(); // Auto-play next
                } else {
                    console.log('kita reset')
                    set({ isPlaying: false, offset: 0 }); // Reset
                }
            };

            set({ source, isPlaying: true, startTime });
        },

        stop: (userAction: boolean) => {
            const { source } = get();
            set({ userStopAction: userAction })
            source?.stop();
            set({ isPlaying: false, offset: 0 });
        },

        loadAudio: async (url: string) => {
            const { context } = get();
            if (!context) return;

            // const response = await fetch(url, {
            //     headers: {
            //         "origin": "http://localhost:5173",
            //     }
            // });

            // const arrayBuffer = await response.arrayBuffer();
            // const decoded = await context.decodeAudioData(arrayBuffer);

            // set({ buffer: decoded });

            const response = await axios.get(url, {
                responseType: 'arraybuffer',
                headers: {
                    Origin: 'http://localhost:5173', // Header ini sebenarnya tidak perlu, lihat catatan di bawah
                },
                withCredentials: false, // Set ke true jika butuh cookie atau otorisasi
            });

            const decoded = await context.decodeAudioData(response.data);
            set({ buffer: decoded });
        },

        setGain: (value) => {
            const { gainNode } = get();
            if (gainNode) gainNode.gain.value = value;
        },

        setFilterGain: (index, gain) => {
            const { filters } = get();
            if (filters[index]) filters[index].gain.value = gain;
        },

        getCurrentTime: () => {
            const { context, startTime, offset, isPlaying } = get();
            if (!context) return 0;
            return isPlaying ? offset + (context.currentTime - startTime) : offset;
        },

        seekTo: (time) => {
            const { context, filters, source } = get();
            const buffer = source?.buffer;
            if (!context || !buffer) return;
            set({ userStopAction: true })
            source.stop();

            const newSource = context.createBufferSource();
            newSource.buffer = buffer;
            newSource.connect(filters[0]);
            newSource.start(0, time, buffer.duration - time);
            newSource.onended = () => {
                const { userStopAction, currentIndex, playlist } = get();
                if (userStopAction)  {
                    set({userStopAction: false})
                    return
                };

                if (playlist && currentIndex < playlist.tracks.length - 1) {
                    console.log('kita next')
                    get().next(); // Auto-play next
                } else {
                    console.log('kita reset')
                    set({ isPlaying: false, offset: 0 }); // Reset
                }
            };

            set({
                source: newSource,
                startTime: context.currentTime,
                offset: time,
                isPlaying: true,
            });
        },
    }
});

