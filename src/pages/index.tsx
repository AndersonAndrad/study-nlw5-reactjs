// dependencies
import { GetStaticProps } from 'next'
import { api } from '../services/api.services';
import { format, parseISO } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import Image from 'next/image'
import Link from 'next/link';

// utils
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString.utils';

// interfaces
import { IHomeProps, IEpisode} from '../interfaces/HomeProps.interface'

// styles 
import styles from '../styles/home.module.scss';

export default function Home({ allEpisodes, latestEpisodes }: IHomeProps) {
  return (
    <div className={styles.homepage}>
      <section className={styles.latestEpisodes}>
         <h2>ultimos lancamentos</h2>

         <ul>
          {latestEpisodes.map((episode: IEpisode) => {
            return(
              <li key={episode.id}>
                <Image width={192} height={192} objectFit="cover" src={episode.thumbnail} alt=""/>

                <div className={styles.episodeDetails}>
                  <Link href={`/episodes/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>
                  <p>{episode.members}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                </div>

                <button type='button'>
                  <img src="/play-green.svg " alt=""/>
                </button>

              </li>
            )
          })}
         </ul>
      </section>
      <section className={styles.allEpisodes}>
       <h2>todos os episodios</h2>
      
        <table cellSpacing={0}>
          <thead>
            <th></th>
            <th>podcast</th>
            <th>integrantes</th>
            <th>data</th>
            <th>duracao</th>
            <th></th>
          </thead>
          <tbody>
            {
              allEpisodes.map((episode: IEpisode) => {
                return (
                  <tr key={episode.id}>
                    <td style={{width: 72}}><Image width={120} height={120} src={episode.thumbnail} objectFit='cover'/></td>
                    <td>
                      <Link  href={`/episodes/${episode.id}`}><a>{episode.title}</a></Link>
                    </td>
                    <td>{episode.members}</td>
                    <td style={{width: 100}}>{episode.publishedAt}</td>
                    <td>{episode.durationAsString}</td>
                    <td><button type='button'><img src="/play-green.svg" alt=""/></button></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </section>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  });

  const episodes = data.map((episode: IEpisode) => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {
        locale: ptBr
      }),
      durationAsString: convertDurationToTimeString(episode.file.duration),
      duration: Number(episode.file.duration),
      description: episode.description,
      url: episode.file.url 
    }
  });

  const latestEpisodes = episodes.splice(0, 2);
  const allEpisodes = episodes.splice(2, episodes.length);

  return {
    props: {
      episodes,
      latestEpisodes,
      allEpisodes
    },
    revalidate: 60 * 60 * 8,
  }
}