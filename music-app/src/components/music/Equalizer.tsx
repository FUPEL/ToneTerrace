import { useAudioStore } from "@/store/useAudioStore";
import { EqualizerSlider } from "./EqualizerSlider";

const frequencies = [
    { label: '60Hz', value: 60 },
    { label: '150Hz', value: 150 },
    { label: '400Hz', value: 400 },
    { label: '1KHz', value: 1000 },
    { label: '2.4KHz', value: 2400 },
    { label: '15KHz', value: 15000 }
];

const Equalizer = () => {
    const { setFilterGain, setGain, filters } = useAudioStore();

    return (
        <div className="flex flex-row text-white h-full justify-between">
            <div className="flex flex-row justify-evenly mr-2">
                {frequencies.map((freq, index) => (
                    <div key={freq.label} className="mr-4">
                        <EqualizerSlider className="" orientation="vertical" min={-12} max={12} step={0.1} defaultValue={[filters[index]?.gain.value ?? 0]} onValueChange={(e) => setFilterGain(index, e[0])} />
                        <label className="font-ethos font-extrabold">{freq.label}</label>
                    </div>
                ))}
            </div>
            <div className="ml-8 text-white">
                <EqualizerSlider orientation="vertical" min={0} max={2} step={0.01} defaultValue={[1]} onValueChange={(e) => setGain(e[0])} />
                <label className="font-ethos font-extrabold">Volume</label>
            </div>
        </div>
    );
};

export default Equalizer;
