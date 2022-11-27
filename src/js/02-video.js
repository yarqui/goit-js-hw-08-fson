import Player from '@vimeo/player';

import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');

const player = new Player(iframe);

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

player.on('play', function () {
  console.log('played the video!');
});

player.on(
  'timeupdate',
  _.throttle(function (e) {
    const updatedPlaybackTime = JSON.stringify(e.seconds);

    localStorage.setItem('videoplayer-current-time', updatedPlaybackTime);
  }, 1000)
);

const playbackPosition = localStorage.getItem('videoplayer-current-time');

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
