/*
*    Meet Unlocker
*    Add "Hacked" Features on your VideoConferences
*    Work on Goole Meet (100%), Hangout (100%) & Facebook Messenger (70%)
*    Dave-Hill [@] dyrk [dot] org
*    (c) Dyrk 2020 - 2021
*
*/
var fake_movie, 
  /* Init a Fake Movie */
  create_fake_movie = () => {
    console.error('Init fake Movie');
    fake_movie = document.createElement('video');
    fake_movie.setAttribute('crossOrigin', 'anonymous');
    fake_movie.src = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
    fake_movie.muted = true;
  },
  /* Change the Video Stream */
  change_movie_track = (track) => {
    try {
      let sender = document.z.getSenders().filter(s => s && s.track && s.track.kind == 'video');
      console.error(sender);
      sender.map(s => s.replaceTrack(track));
    } catch (e) {
      console.error(e)
    }
  },
  /* Freeze the Video Stream */
  freeze_camera = () => {
    console.error('Freeze Cam');
    document.z.getSenders().map(s => s && s.track && s.track.kind == 'video' ? document.z.removeTrack(s) : null);
  },
  /* Refresh & Display the Features options */
  refresh_select_hack = (id) => {
    var dom = document.getElementsByTagName('html')[0],
      select = document.getElementById('refresh_select_hack'),
      receiver = document.z.getReceivers().filter(e => e && e.track && e.track.kind == 'video'),
      old_receivers = document.getElementsByClassName('video_receiver_track'),
      option;
    /* Create form if isn't it done */
    if (!id && !select) {
      select = document.createElement('select');
      select.setAttribute('style',
        'position:fixed;top:0px;left:0px;z-index:10000000000');
      select.id = 'refresh_select_hack';
      dom.appendChild(select);
      create_fake_movie();
      ['------', 'Freeze', 'Movie'].map(action => {
        option = document.createElement('option');
        option.textContent = action;
        option.value = action;
        select.appendChild(option);
      });
      select.addEventListener('change', function(evt) {
        try {
          let id = evt.target.value,
            receiver = document.z.getReceivers().filter(e => e && e.track && e.track.kind == 'video');
          if (id.match(/^[0-9]{1,3}$/) && receiver && receiver[id]) {
                /* Usurp Friends Camera */
                return change_movie_track(receiver[id].track);
          }
          switch (id) {
            case 'Freeze':
              /* Freeze Video Stream*/
              freeze_camera();
              break;
            case 'Movie':
              /* Display a Fake Movie instead camera */
              fake_movie.play();
              change_movie_track(fake_movie.captureStream().getVideoTracks()[0]);
              break;
          }
        } catch (e) {
          console.error('err', e);
        }
      });
    }
    /* Remove old receivers options */
    for (var i in old_receivers) {
      if (typeof old_receivers[i] != 'object') continue;
      old_receivers[i].parentNode.removeChild(old_receivers[i]);
    }
    /* Add old receivers options */
    for (var i in receiver) {
      if (typeof receiver[i] != 'object') continue;
      option = document.createElement('option');
      option.textContent = 'Video #' + i;
      option.value = i;
      option.setAttribute('class', 'video_receiver_track');
      select.appendChild(option);
    }
  };
/* Hack prototype to insert Dyrk features */
['addStream', 'createOffer', 'getReceivers'].map(function(name) {
  RTCPeerConnection.prototype[name + '2'] = RTCPeerConnection.prototype[name + '2'] ? RTCPeerConnection.prototype[name + '2'] : RTCPeerConnection.prototype[name];
  RTCPeerConnection.prototype[name] = function(e) {
    if (!document.z) {
      console.log('hack running');
      document.z = this;
      setInterval(refresh_select_hack, 5000);
      refresh_select_hack();
    }
    return this[name + '2'](e);
  };
});
