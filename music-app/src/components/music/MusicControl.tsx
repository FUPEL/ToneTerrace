import { useAudioStore } from "@/store/useAudioStore";
import { useEffect, useState } from "react";
import { Pause, Play } from 'lucide-react'
import { SeekerSlider } from "./SeekerSlider";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { useLocation } from "react-router-dom";

const MusicControl = () => {
  const { play, pause, isPlaying, getCurrentTime, seekTo, loadAudio, buffer, playlist: playingPlaylist, currentIndex, setPlaylist, next, previous } = useAudioStore();
  const [currentTime, setCurrentTime] = useState(0);
  const { playlist: selectedPlaylist, selectedTrackIndex } = usePlaylistStore()

  const location = useLocation()

  const isSelected = playingPlaylist?.id == selectedPlaylist?.id && currentIndex == selectedTrackIndex

  useEffect(() => {
    if (!buffer && playingPlaylist?.tracks.length !== 0)
      loadAudio(playingPlaylist?.tracks[currentIndex].uri as string)
  }, [playingPlaylist]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying && isSelected) {
      interval = setInterval(() => {
        setCurrentTime(getCurrentTime());
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isPlaying, isSelected, location.pathname]);

  const handleSeek = (e: number[]) => {
    if (!isSelected)
      return;
    seekTo(e[0]);
    setCurrentTime(e[0]);
  };

  const handlePlay = async () => {
    if (!selectedPlaylist) return
    if (isSelected)
      buffer && play()
    else {
      setPlaylist(selectedPlaylist, selectedTrackIndex)
      await loadAudio(selectedPlaylist.tracks[selectedTrackIndex].uri)
      play()
      handleSeek([0])
    }
  }

  const handlePrev = async () => {
    if (selectedPlaylist && selectedTrackIndex < selectedPlaylist?.tracks.length)
      previous()
  }

  const handleNext = async () => {
    if (selectedPlaylist && selectedTrackIndex < selectedPlaylist?.tracks.length)
      next()
  }

  return (
    <div className="flex flex-col mt-8 z-50">
      <div className="flex items-center space-x-2">
        {/* <span>{currentTime.toFixed(1)}s</span> */}
        <SeekerSlider min={0} max={buffer?.duration ?? 0} step={0.1} value={[currentTime]} onValueChange={handleSeek} />
        {/* <span>{buffer?.duration?.toFixed(1)}s</span> */}
      </div>

      <div className="flex space-x-2 justify-center items-center mt-4">
        <svg onClick={handlePrev} width="61" height="43" viewBox="0 0 61 43" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.5 24.0981C20.5 22.9434 20.5 20.0566 22.5 18.9019L45.75 5.47852C47.75 4.32382 50.25 5.7672 50.25 8.0766L50.25 34.9234C50.25 37.2328 47.75 38.6762 45.75 37.5215L22.5 24.0981Z" fill="white" />
          <path d="M4.5 23.5981C2.5 22.4434 2.5 19.5566 4.5 18.4019L22.5 8.00961C24.5 6.85492 27 8.29829 27 10.6077L27 31.3923C27 33.7017 24.5 35.1451 22.5 33.9904L4.5 23.5981Z" fill="white" />
        </svg>
        {(!isSelected || !isPlaying) && <div onClick={handlePlay} className="size-20 bg-white rounded-full flex justify-center items-center">
          <Play fill="#000" className="" size={48} />
        </div>}
        {isSelected && isPlaying && <div onClick={pause} className="size-20 bg-white rounded-full flex justify-center items-center">
          <Pause fill="#000" size={48} />
        </div>}
        <svg onClick={handleNext} width="61" height="43" viewBox="0 0 61 43" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M38.5 18.9019C40.5 20.0566 40.5 22.9434 38.5 24.0981L15.25 37.5215C13.25 38.6762 10.75 37.2328 10.75 34.9234L10.75 8.07661C10.75 5.7672 13.25 4.32384 15.25 5.47854L38.5 18.9019Z" fill="white" />
          <path d="M56.5 19.4019C58.5 20.5566 58.5 23.4434 56.5 24.5981L38.5 34.9904C36.5 36.1451 34 34.7017 34 32.3923L34 11.6077C34 9.2983 36.5 7.85493 38.5 9.00963L56.5 19.4019Z" fill="white" />
        </svg>

        {/* {!isPlaying && <button onClick={() => buffer && play(buffer)}>▶️ Play</button>} */}
        {/* {isPlaying && <button onClick={pause}>⏸️ Pause</button>}
        {!isPlaying && buffer && <button onClick={resume}>🔁 Resume</button>} */}
        {/* <button onClick={stop}>⏹️ Stop</button> */}
      </div>
    </div>
  );
};

export default MusicControl;
