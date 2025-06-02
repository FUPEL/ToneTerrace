import { EqualizerSlider } from "@/components/music/EqualizerSlider"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SettingPage = () => {
    return (
        <div className="relative w-screen min-h-screen p-4 md:p-20 bg-[linear-gradient(to_right,_#202020,_#2D2D2D,_#2D2D2D,_#2D2D2D,_#202020)]">
            <div className="max-w-6xl mx-auto text-white font-ethos">
                <Link to={'/'}>
                    <ArrowLeft className="absolute inset-8" color="#fff" />
                </Link>
                <h1 className="font-extrabold text-4xl mb-4 md:mb-16">Settings</h1>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col mb-2">
                        <h1 className="text-2xl">Explicit Content</h1>
                        <h3 className="text-sm">Allow explicit-rated content to play </h3>
                    </div>
                    <Switch />
                </div>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col mb-2">
                        <h1 className="text-2xl">Language</h1>
                        <h3 className="text-sm">Choose language</h3>
                    </div>
                    <Select>
                        <SelectTrigger className="w-[180px] placeholder:text-white focus-visible:border-ring focus-visible:ring-0 font-ethos font-black border-0 rounded-none bg-[#212121]">
                            <SelectValue className="text-white placeholder:text-white" placeholder="English" />
                        </SelectTrigger>
                        <SelectContent className="w-[180px] text-white font-ethos font-black border-0 rounded-none bg-[#212121]">
                            <SelectGroup>
                                <SelectLabel className="text-white">Sorry We haven’t added more languages, Stay tuned for future updates!</SelectLabel>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <h1 className="my-2 text-2xl font-extrabold">Playback</h1>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col mb-2">
                        <h1 className="text-2xl">Gapless Playback</h1>
                    </div>
                    <Switch />
                </div>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col mb-2">
                        <h1 className="text-2xl">Mono Audio</h1>
                        <h3 className="text-sm">Makes the left and right speaker play the same audiio</h3>
                    </div>
                    <Switch />
                </div>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col mb-2">
                        <h1 className="text-2xl">Equalizer</h1>
                        <h3 className="text-sm">Turn on/off the equalizer opting for a cleaner screen</h3>
                    </div>
                    <Switch />
                </div>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col mb-2">
                        <h1 className="text-2xl">Autoplay</h1>
                        <h3 className="text-sm">Enjoy nonstop listening. When your song ends, we’ll play you something similar</h3>
                    </div>
                    <Switch />
                </div>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col mb-2">
                        <h1 className="text-2xl">Crossfade</h1>
                        <h3 className="text-sm">Enable seamless transition to the next song played</h3>
                    </div>
                    <EqualizerSlider className="max-w-96" />
                </div>
            </div>
        </div>
    )
}

export default SettingPage