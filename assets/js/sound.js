class SoundController {
  constructor(config) {

    this.sounds = {};

    config.sounds.forEach(sound_conf => {

      let audio = document.createElement("AUDIO");
      audio.src = sound_conf.src;
      audio.volume = sound_conf.hasOwnProperty('vol') ? sound_conf.vol : 1;

      if (sound_conf.hasOwnProperty('loop')) { audio.loop = true; }

      this.sounds[sound_conf.name] = {
        name : sound_conf.name,
        domEL : audio,
        src : sound_conf.src
      };

      document.body.appendChild(audio);

    })

  }

  playSound(soundName) {
    this.sounds[soundName].domEL.play();
  }

  stopSound(soundName) {
    this.sounds[soundName].domEL.pause();
    this.sounds[soundName].domEL.currentTime = 0;
  }

}
