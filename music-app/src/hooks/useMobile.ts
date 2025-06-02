import { useMediaQuery } from 'react-responsive'

export const useMobile = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  return isMobile
}