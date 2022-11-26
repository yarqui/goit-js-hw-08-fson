import Player from '@vimeo/player';
import 'lodash.throttle';

const iframe = document.querySelector('iframe');

const player = new Player(iframe);

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

player.on('play', function () {
  console.log('played the video!');
});

const throttledTimeUpdate = _.throttle(e => {
  const videoPlayerTimeUpdate = JSON.stringify(e.seconds);

  console.log(videoPlayerTimeUpdate);
  localStorage.setItem('videoplayer-current-time', videoPlayerTimeUpdate);
}, 100);

player.on('timeupdate', throttledTimeUpdate());

const playbackPosition = localStorage.getItem('videoplayer-current-time');

try {
  const parsedPlaybackPosition = JSON.parse(playbackPosition);
  console.log('parsedPlaybackPosition:', parsedPlaybackPosition);

  player
    .setCurrentTime(parsedPlaybackPosition)
    .then(function (seconds) {
      // seconds = the actual time that the player seeked to
    })
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
} catch (error) {
  console.log(error.name);
  console.log(error.message);
}
