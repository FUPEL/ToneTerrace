export const renderImage = (path: string, type: 'image' | 'track'): string => {
    return `${import.meta.env.VITE_BACKEND_BASE_URL}/${type === 'image' ? 'images' : 'tracks'}/${path}`
}