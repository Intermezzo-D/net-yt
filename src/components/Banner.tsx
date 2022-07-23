import Image from "next/image"
import { useEffect, useState } from "react"

// styles
import { FaPlay } from 'react-icons/fa'
import { InformationCircleIcon } from '@heroicons/react/outline'

// utils
import { Movie } from "../../typings"
import { baseUrl } from "../constants/movie"

interface Props {
  netflixOriginals: Movie[]
}

function Banner({ netflixOriginals }: Props) {
  const [bannerMovie, setBannerMovie] = useState<Movie | null>(null)

  useEffect(() => {
    setBannerMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)])
  }, [netflixOriginals])

  return (
    <div className="flex flex-col space-y-3 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      {/* main background image */}
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
        <Image 
          src={`${baseUrl}${bannerMovie?.backdrop_path || bannerMovie?.poster_path}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      {/* banner movie info */}
      <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
        {bannerMovie?.title || bannerMovie?.name || bannerMovie?.original_name}
      </h1>
      <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
        {bannerMovie?.overview}
      </p>
      {/* play and info btn */}
      <div className="flex space-x-3">
        <button className="bannerButton bg-white text-black">
          <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" />
          play
        </button>

        <button className="bannerButton bg-[gray]/70">
          <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" />
          More Info
        </button>
      </div>
    </div>
  )
}

export default Banner