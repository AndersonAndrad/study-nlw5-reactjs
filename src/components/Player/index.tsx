// components
import { useContext, useEffect, useRef, useState } from 'react';
import { PlayerContext } from '../../contexts/Player.context';
import Image from 'next/image';
import Slider from 'rc-slider';

// utils
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString.utils';

// styles
import styles from './styles.module.scss';
import 'rc-slider/assets/index.css';

export function Player(){
  // constants useState
  const [ progress, setProgress ] = useState(0);

  // others constants
  const audioRef = useRef<HTMLAudioElement>(null)
  const { 
    currentEpisodeIndex, 
    episodeList, 
    isPlaying, 
    togglePlay, 
    setPlayingState,
    playNext,
    playPrevius,
    hasNext,
    hasPrevius,
    isLooping,
    toggleLoop,
    isShuffling,
    toggleShuffled,
    clearPlayerState
  } = useContext(PlayerContext);
  const episode = episodeList[currentEpisodeIndex];

  useEffect(() => {
    if(!audioRef.current){
      return;
    }

    if(isPlaying){
      audioRef.current.play();
    }else {
      audioRef.current.pause();
    }

  }, [isPlaying])

  function setupProgressListenner() {
    audioRef.current.currentTime = 0;
    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime));
    })
   }
  
   function handleSeek(amount: number) {
    audioRef.current.currentTime = amount;
    setProgress(amount);
   }

   function handleEpisodeEnded() {
     if (hasNext) {
       playNext();
     } else {
       clearPlayerState();
     }
   }

  return(
   <div className={styles.playerContainer}>
     <header>
       <img src="/playing.svg" alt=""/>
       <strong>tocando agora</strong>
     </header>
     
     { episode ? (
       <div className={styles.currentEpisode}>
         <Image width={592} height={592} src={episode.thumbnail} objectFit='cover' />
        <strong>{episode.title}</strong>
        <span>{episode.members}</span>
       </div>
     ) : (
       <div className={styles.emptyPlayer}>
         <strong>selecione um podcast para ouvir</strong>
        </div>
     ) } 

     <footer className={!episode && styles.empty}>
       <div className={styles.progress}>
         <span>{convertDurationToTimeString(progress)}</span>
         <div className={styles.slider}>
          { episode ? (
            <Slider
            onChange={ handleSeek }
            max={ episode.duration }
            value={ progress }
            trackStyle={{ background: '#04d361' }}
            railStyle={{ background: '#9f75ff' }}
            handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
            />
          ) : (
            <div className={styles.emptySlider}/>
          )}
         </div>
         <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
       </div>

       { episode && (
         <audio
            src={ episode.url }
            ref={ audioRef }
            autoPlay
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
            loop={ isLooping }
            onLoadedMetadata={ setupProgressListenner }
            onEnded={ handleEpisodeEnded }
         />
       )}
       
       <div className={styles.buttons}>
         <button type='button' disabled={!episode || episodeList.length === 1} onClick={() => toggleShuffled()} className={isShuffling && styles.isActive} >
           <img src="/shuffle.svg" alt=""/>
         </button>
         <button type='button' disabled={!episode || !hasPrevius} onClick={() => playPrevius()}>
           <img src="/play-previous.svg" alt=""/>
         </button>
         <button type='button' onClick={() => togglePlay()} className={styles.playButton} disabled={!episode}>
           { isPlaying ? (<img src="/pause.svg" alt=""/>) : (<img src="/play.svg" alt=""/>) }
         </button>
         <button type='button' disabled={!episode || !hasNext} onClick={() => playNext()} >
           <img src="/play-next.svg" alt=""/>
         </button>
         <button type='button' disabled={!episode} className={isLooping && styles.isActive} onClick={() => toggleLoop()}>
           <img src="/repeat.svg" alt=""/>
         </button>
       </div>
     </footer>
   </div>
  )
}