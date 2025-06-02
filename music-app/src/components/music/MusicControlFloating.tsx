import { useAudioStore } from "@/store/useAudioStore";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link, matchPath, useLocation } from "react-router-dom";
import { Pause, Play } from "lucide-react";
import { FloatingPlayerSeekerSlider } from "./FloatingPlayerSeekerSlider";
import { useMobile } from "@/hooks/useMobile";
import { renderImage } from "@/lib/cdn";

const MusicControlFloating = () => {
  const { pause, resume, isPlaying, getCurrentTime, seekTo, loadAudio, buffer, playlist, currentIndex } = useAudioStore();
  const [visible, setVisible] = useState<Boolean>(true)
  const [hidden, setHidden] = useState<Boolean>(false)
  const isMobile = useMobile()
  const [currentTime, setCurrentTime] = useState(0);
  const location = useLocation()

  useEffect(() => {
    if (!buffer && playlist?.tracks.length !== 0)
      loadAudio(playlist?.tracks[currentIndex].uri as string)
  }, [playlist]);

  useEffect(() => {
    if (isMobile) {
      setVisible(true)
    }
  }, [isMobile])

  useEffect(() => {
    if (playlist && playlist?.tracks.length < 1 || currentIndex == -1)
      setHidden(true)
    else
      setHidden(false)
  }, [playlist, currentIndex])

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(getCurrentTime());
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => setHidden(!(!matchPath('/music/:id', location.pathname))), [location.pathname])

  const handleSeek = (e: number[]) => {
    seekTo(e[0]);
    setCurrentTime(e[0]);
  };

  const toggleVisible = () => {
    setVisible(prev => !prev)
  }

  if (!playlist?.tracks[currentIndex])
    return (<></>)

  return (
    <Card className={`fixed h-20 w-full md:h-fit md:w-[312px] bottom-0 right-0 md:bottom-2 md:right-2 bg-[#3e3e3e] rounded-none md:rounded-2xl border-0 overflow px-0 py-0 transition-transform z-50 ${hidden ? 'hidden' : 'block'} ${visible ? 'translate-y-0' : 'translate-y-10/12'}`}>
      <CardContent className="relative flex flex-row md:flex-col p-4 gap-2">
        <div onClick={toggleVisible} className="absolute hidden md:block -top-1 h-2 w-2/3 bg-white left-1/2 -translate-x-1/2 rounded-full cursor-pointer"></div>
        <Link to={'/current-playing'}>
          <img
            className="size-80 object-cover"
            alt="Widuri now palu ying"
            src={renderImage(playlist.album_art, 'image')}
          />
        </Link>
        <div className="flex flex-col w-full">
          <div className="font-franie font-semibold tracking-[-0.23px] text-white text-base md:text-[23px] leading-[normal]">
            {playlist.tracks[currentIndex].title}
          </div>

          <div className="font-franie font-normal text-[#dfdfdf] text-[8px] tracking-[0] leading-[normal]">
            {playlist.tracks[currentIndex].artist}
          </div>

          <div className="flex flex-row mt-1">
            <FloatingPlayerSeekerSlider min={0} max={buffer?.duration ?? 0} step={0.1} value={[currentTime]} onValueChange={handleSeek} />
            {!isPlaying && buffer && <Play onClick={resume} color="#ffffff" fill="#ffffff" className="ml-4" />}
            {isPlaying && <Pause onClick={pause} color="#ffffff" fill="#ffffff" className="ml-4" />}
          </div>
        </div>

      </CardContent>
    </Card>
    //   <div className="flex space-x-2">
    //     {!isPlaying && <button onClick={() => buffer && play(buffer)}>▶️ Play</button>}
    //     {isPlaying && <button onClick={pause}>⏸️ Pause</button>}
    //     {!isPlaying && buffer && <button onClick={resume}>🔁 Resume</button>}
    //     <button onClick={stop}>⏹️ Stop</button>
    //   </div>
  );
};

export default MusicControlFloating;
