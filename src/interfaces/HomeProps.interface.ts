export interface IEpisode {
  id: string;
  title: string;
  members: string;
  published_at: string;
  publishedAt: string;
  thumbnail: string;
  description: string;
  durationAsString: string;
  file: {
    url: string;
    type: string;
    duration: number;
  }
}

export interface IHomeProps {
  episodes: Array<IEpisode>;
  allEpisodes: Array<IEpisode>;
  latestEpisodes: Array<IEpisode>;
}