import type { NextPage } from 'next'
import Head from 'next/head'

// recoil
import { useRecoilValue } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'

//utils
import { Movie } from '../../typings'
import requests from '../utils/requests'

// components
import Header from '../components/Header'
import Banner from '../components/Banner'
import Row from '../components/Row'
import Modal from '../components/Modal'

// hooks
import useAuth from '../hooks/useAuth'

interface Props {
  netflixOriginals: Movie[]
  trendingNow: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
  romanceMovies: Movie[]
  documentaries: Movie[]
}

const Home = ({
  netflixOriginals,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries
}: Props) => {

  const { loading } = useAuth()
  const showModal = useRecoilValue(modalState)
  const movie = useRecoilValue(movieState)

  if (loading) return null

  return (
    <div className="relative h-screen bg-gradient-to-b lg:h-[140vh]">
      {/* web head */}
      <Head>
        <title>Home - Net</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* top header includes all navs, logo, search and user auth link */}
      <Header />

      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        {/* top background banner includes the banner info and play, info btn */}
        <Banner netflixOriginals={netflixOriginals} />

        {/* row for different category movies  */}
        <section className='md:space-y-24'>
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={actionMovies} />
          {/* My List */}
          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Scary Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} />
        </section>
      </main>
      {/* Modal */}
      {showModal && <Modal />}
    </div>
  )
}

export default Home

export const getServerSideProps = async() => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries
  ] = await Promise.all([
      fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
      fetch(requests.fetchTrending).then((res) => res.json()),
      fetch(requests.fetchTopRated).then((res) => res.json()),
      fetch(requests.fetchActionMovies).then((res) => res.json()),
      fetch(requests.fetchComedyMovies).then((res) => res.json()),
      fetch(requests.fetchHorrorMovies).then((res) => res.json()),
      fetch(requests.fetchRomanceMovies).then((res) => res.json()),
      fetch(requests.fetchDocumentaries).then((res) => res.json()),
    ])

    return {
      props: {
        netflixOriginals: netflixOriginals.results,
        trendingNow: trendingNow.results,
        topRated: topRated.results,
        actionMovies: actionMovies.results,
        comedyMovies: comedyMovies.results,
        horrorMovies: horrorMovies.results,
        romanceMovies: romanceMovies.results,
        documentaries: documentaries.results,
      }
    }
}
