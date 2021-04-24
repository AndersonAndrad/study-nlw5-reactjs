// dependencies
import { format, parseISO } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { usePlayer } from '../../contexts/Player.context';
import Head from 'next/head';

// services
import { api } from '../../services/api.services';

// ultils
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString.utils';

// interfaces
import { IOnlyEpisode } from '../../interfaces/Episode.interface';

// styles
import styles from './episode.module.scss';

export default function Episode({ episode } : IOnlyEpisode){
  const { play } = usePlayer();

  return(
    <div className={styles.episode}>
      <Head>
        <title>{episode.title} | Podcaster</title>
      </Head>
      <div className={styles.thumbinailContainer}>
        <Link href='/' >
          <button><img src="/arrow-left.svg" alt=""/></button>
        </Link>
        <Image width={700} height={160} src={episode.thumbnail} objectFit='cover' />
        <button type='button'><img src="/play.svg" alt="" onClick={() => play(episode)}/></button>
      </div>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </header>

      <div className={styles.description} dangerouslySetInnerHTML={{__html: episode.description}}/>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async(ctx) => {
  const {slug} = ctx.params;
  const { data } = await api.get(`/episodes/${slug}`);

  const episode = {
    id: data.id,
      title: data.title,
      thumbnail: data.thumbnail,
      members: data.members,
      publishedAt: format(parseISO(data.published_at), 'd MMM yy', {
        locale: ptBr
      }),
      durationAsString: convertDurationToTimeString(data.file.duration),
      duration: Number(data.file.duration),
      description: data.description,
      url: data.file.url 
  }

  return {
    props: {
      episode
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}