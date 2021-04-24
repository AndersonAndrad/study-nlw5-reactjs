// components
import { useContext, useEffect, useRef } from 'react';
import { PlayerContext } from '../../contexts/Player.context';
import Image from 'next/image';
import Slider from 'rc-slider';

// styles
import styles from './styles.module.scss';
import 'rc-slider/assets/index.css';

export function Player(){
  const audioRef = useRef<HTMLAudioElement>(null)
  const { currentEpisodeIndex, episodeList, isPlaying, togglePlay, setPlayingState } = useContext(PlayerContext);
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
         <span>00:00</span>
         <div className={styles.slider}>
          { episode ? (
            <Slider 
            trackStyle={{background: '#04d361'}}
            railStyle={{background: '#9f75ff'}}
            handleStyle={{borderColor: '#04d361', borderWidth: 4}}
            />
          ) : (
            <div className={styles.emptySlider}/>
          )}
         </div>
         <span>00:00</span>
       </div>

       { episode && (
         <audio
            src={episode.url}
            ref={audioRef}
            autoPlay
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
         />
       )}
       
       <div className={styles.buttons}>
         <button type='button' disabled={!episode}><img src="/shuffle.svg" alt=""/></button>
         <button type='button' disabled={!episode}><img src="/play-previous.svg" alt=""/></button>
         <button type='button' onClick={() => togglePlay()} className={styles.playButton} disabled={!episode}>
           { isPlaying ? (<img src="/pause.svg" alt=""/>) : (<img src="/play.svg" alt=""/>) }
         </button>
         <button type='button' disabled={!episode}><img src="/play-next.svg" alt=""/></button>
         <button type='button' disabled={!episode}><img src="/repeat.svg" alt=""/></button>
       </div>
     </footer>
   </div>
  )
}