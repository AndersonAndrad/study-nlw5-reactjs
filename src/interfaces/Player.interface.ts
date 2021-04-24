import { ReactNode } from "react";
export interface IEpisode {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
}

export interface IPlayer {
  // variables
  episodeList: Array<IEpisode>;
  currentEpisodeIndex: number;
  isPlaying: boolean;
  hasNext: boolean;
  hasPrevius: boolean;
  isLooping: boolean;
  isShuffling: boolean;

  // functions
  play: (episode: IEpisode) => void;
  togglePlay: () => void;
  setPlayingState: (playing: boolean) => void;
  playList: (list: Array<IEpisode>, index: number) => void;
  playNext: () => void;
  playPrevius: () => void;
  toggleLoop: () => void;
  toggleShuffled: () => void;
  clearPlayerState: () => void;
}

export interface IPlayerContextProviderProps {
  children: ReactNode;
}