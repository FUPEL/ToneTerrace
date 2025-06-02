import { cn } from "@/lib/utils";

const DynamicTitle = ({ title }: { title: string }) => {
    const length = title.length; // Tidak perlu pakai split + length

    let textClass = '';

    switch (true) {
        case length < 6:
            textClass = 'text-6xl md:text-9xl';
            break;
        case length < 8:
            textClass = 'text-3xl md:text-7xl';
            break;
        case length < 10:
            textClass = 'text-xl md:text-5xl';
            break;
        case length < 24:
            textClass = 'text-lg md:text-2xl';
            break;
        default:
            textClass = 'text-md md:text-xl';
            break;
    }

    return (
        <h1 className={cn("font-phosphorus text-white", textClass)}>{title}</h1>
    );
};

export default DynamicTitle;
