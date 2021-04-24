export interface IEpisode {
  id: string;
  title: string;
  members: string;
  published_at: string;
  publishedAt: string;
  thumbnail: string;
  description: string;
  durationAsString: string;
  duration: number;
  url: string;
  file: {
    url: string;
    type: string;
    duration: number;
  }
}

export interface IOnlyEpisode {
  episode : IEpisode;
}