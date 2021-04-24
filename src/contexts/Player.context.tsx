import { createContext, useState, useContext } from 'react';
import { IEpisode, IPlayer, IPlayerContextProviderProps } from '../interfaces/Player.interface';

export const PlayerContext = createContext({} as IPlayer);

export function PlayerContextProvider({ children }: IPlayerContextProviderProps){
  // contants useState
  const [ episodeList, setEpisodeList ] = useState([]);
  const [ currentEpisodeIndex, setCurrentEpisodeIndex ] = useState(0);
  const [ isPlaying, setIsPlaying ] = useState(false);
  const [ isLooping, setIsLooping ] = useState(false);
  const [ isShuffling, setIsShuffling ] = useState(false);

  // others constants
  const hasPrevius = currentEpisodeIndex > 0;
  const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length;
  const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length);
  
  function play(episode: IEpisode){
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: IEpisode[], index: number){
    setEpisodeList(list);
    setCurrentEpisodeIndex(index)
    setIsPlaying(true);
  }

  function togglePlay( ){
    setIsPlaying(!isPlaying);
  }

  function toggleLoop(){
    setIsLooping(!isLooping);
  }

  function toggleShuffled(){
    setIsShuffling(!isShuffling);
  }

  function setPlayingState(playing: boolean){
    setIsPlaying(playing);
  }

  function playNext(){
    if(isShuffling){
      nextRandomEpisodeIndex
    } else if (hasNext){
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  }

  function playPrevius(){
    if(hasPrevius){
      setCurrentEpisodeIndex(currentEpisodeIndex - 1)
    }
  }

  function clearPlayerState(){
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }

  return (
    <PlayerContext.Provider value={{ 
      episodeList, 
      currentEpisodeIndex, 
      play, 
      isPlaying, 
      togglePlay, 
      setPlayingState,
      playList,
      playNext,
      playPrevius,
      hasNext,
      hasPrevius,
      isLooping,
      toggleLoop,
      isShuffling,
      toggleShuffled,
      clearPlayerState
      }}>
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
  return useContext(PlayerContext);
}