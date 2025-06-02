const DynamicMusic = ({ title }: { title: string }) => {
    const length = title?.length; // Tidak perlu pakai split + length

    let textClass = '';

    switch (true) {
        case length < 15:
            textClass = 'text-7xl';
            break;
        case length < 25:
            textClass = 'text-4xl';
            break;
        case length < 35:
            textClass = 'text-2xl';
            break;
        default:
            textClass = 'text-xl';
            break;
    }

    return (
        <h1 className={`font-franie font-semibold text-white italic ${textClass} w-xs`}>
            {title}
        </h1>
    );
};

export default DynamicMusic;
