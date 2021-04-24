export interface IEpisode {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
}

export interface IPlayer {
  episodeList: Array<IEpisode>;
  currentEpisodeIndex: number;
  play: (episode: IEpisode) => void;
  togglePlay: () => void;
  setPlayingState: (playing: boolean) => void;
  isPlaying: boolean
}