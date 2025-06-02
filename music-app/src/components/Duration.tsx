const Duration = (duration: number) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = Math.floor(duration % 60); // <= BULATKAN

    if (hours > 0) {
        return `${hours} jam ${minutes} menit`;
    } else {
        const mm = minutes.toString().padStart(2, '0');
        const ss = seconds.toString().padStart(2, '0');
        return `${mm}:${ss}`;
    }
};


export default Duration