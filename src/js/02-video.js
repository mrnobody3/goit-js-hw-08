import throttle from 'lodash.throttle';
import Player from '@vimeo/player';
const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const LOCAL_STORAGE_KEY = 'videoplayer-current-time';

function onPlay() {
  console.log('played the video!');
}
player.on('play', onPlay);

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

player.on('timeupdate', throttle(onTimeUpdate, 1000));

function onTimeUpdate(data) {
  localStorage.setItem(LOCAL_STORAGE_KEY, data.seconds);
}

player
  .setCurrentTime(localStorage.getItem(LOCAL_STORAGE_KEY))
  .then(function (seconds = 0) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
