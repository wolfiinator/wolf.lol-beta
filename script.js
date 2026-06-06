let hasUserInteracted = false;

function initMedia() {
  console.log("initMedia called");
  const musicPlayer = document.getElementById('music-player');
  const backgroundVideo = document.getElementById('background');
  if (!musicPlayer || !backgroundVideo) {
    console.error("Media elements not found");
    return;
  }
  musicPlayer.volume = 0.3;
  backgroundVideo.muted = true; 
  backgroundVideo.loop = true;

  const applyVideoFallback = () => {
    document.body.classList.add('video-fallback');
    backgroundVideo.classList.add('hidden');
  };
  backgroundVideo.addEventListener('error', applyVideoFallback);
  const backgroundSource = backgroundVideo.querySelector('source');
  if (backgroundSource) {
    backgroundSource.addEventListener('error', applyVideoFallback);
  }

  
  backgroundVideo.play().catch(err => {
    console.error("Failed to play background video:", err);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const startScreen = document.getElementById('start-screen');
  const startText = document.getElementById('start-text');
  const profileName = document.getElementById('profile-name');
  const profileBio = document.getElementById('profile-bio');
  const visitorCount = document.getElementById('visitor-count');
  const musicPlayer = document.getElementById('music-player');
  const albumPlayer = document.getElementById('album-player');
  const musicManifestNode = document.getElementById('music-manifest');
  const customPlayerManifestNode = document.getElementById('custom-player-manifest');
  const openMoreButton = document.getElementById('open-more');
  const closeMoreButton = document.getElementById('close-more');
  const moreHomeView = document.getElementById('more-home-view');
  const morePresetsView = document.getElementById('more-presets-view');
  const moreMusicView = document.getElementById('more-music-view');
  const moreInterestsView = document.getElementById('more-interests-view');
  const moreInterestsCharactersView = document.getElementById('more-interests-characters-view');
  const moreInterestsGamesView = document.getElementById('more-interests-games-view');
  const moreMessagesView = document.getElementById('more-messages-view');
  const musicArtistSelectView = document.getElementById('music-artist-select-view');
  const musicArtistPlayerView = document.getElementById('music-artist-player-view');
  const musicArtistListNode = document.getElementById('music-artist-list');
  const musicArtistHeading = document.getElementById('music-artist-heading');
  const musicArtistBackButton = document.getElementById('music-artist-back');
  const openMoreMusicButton = document.getElementById('open-more-music');
  const openMoreInterestsButton = document.getElementById('open-more-interests');
  const openMorePresetsButton = document.getElementById('open-more-presets');
  const openMoreMessagesButton = document.getElementById('open-more-messages');
  const morePresetsBackButton = document.getElementById('more-presets-back');
  const moreMusicBackButton = document.getElementById('more-music-back');
  const moreInterestsBackButton = document.getElementById('more-interests-back');
  const moreInterestsCharactersBackButton = document.getElementById('more-interests-characters-back');
  const moreInterestsGamesBackButton = document.getElementById('more-interests-games-back');
  const moreMessagesBackButton = document.getElementById('more-messages-back');
  const musicListNode = document.getElementById('music-list');
  const musicNowPlayingNode = document.getElementById('music-now-playing');
  const musicCoverNode = document.getElementById('music-cover');
  const musicPrevButton = document.getElementById('music-prev');
  const musicPlayPauseButton = document.getElementById('music-play-pause');
  const musicNextButton = document.getElementById('music-next');
  const musicLoopButton = document.getElementById('music-loop');
  const musicEqualizer = document.getElementById('music-equalizer');
  const profileClock = document.getElementById('profile-clock');
  const volumeIcon = document.getElementById('volume-icon');
  const volumeSlider = document.getElementById('volume-slider');
  const transparencySlider = document.getElementById('transparency-slider');
  const backgroundVideo = document.getElementById('background');
  const hackerOverlay = document.getElementById('hacker-overlay');
  const snowOverlay = document.getElementById('snow-overlay');
  const glitchOverlay = document.querySelector('.glitch-overlay');
  const profileBlock = document.getElementById('profile-block');
  const skillsBlock = document.getElementById('skills-block');
  const guestbookPanel = document.getElementById('guestbook-panel');
  const profilePicture = document.querySelector('.profile-picture');
  const profileContainer = document.querySelector('.profile-container');
  const socialIcons = document.querySelectorAll('.social-link-btn');
  const badges = document.querySelectorAll('.badge');
  const interestTabs = document.querySelectorAll('.interest-tab');
  const interestCharacterTabs = document.querySelectorAll('.interest-character-tab');
  const interestGameTabs = document.querySelectorAll('.interest-game-tab');
  const presetButtons = document.querySelectorAll('.preset-card');
  const interestsNextPageButton = document.getElementById('interests-next-page');
  const characterInterestsNextPageButton = document.getElementById('character-interests-next-page');
  const interestImage = document.getElementById('interest-image');
  const interestName = document.getElementById('interest-name');
  const interestDescription = document.getElementById('interest-description');
  const interestCharacterImage = document.getElementById('interest-character-image');
  const interestCharacterName = document.getElementById('interest-character-name');
  const interestCharacterDescription = document.getElementById('interest-character-description');
  const interestGameImage = document.getElementById('interest-game-image');
  const interestGameName = document.getElementById('interest-game-name');
  const interestGameDescription = document.getElementById('interest-game-description');
  const equalizerBars = musicEqualizer ? Array.from(musicEqualizer.querySelectorAll('span')) : [];
  const discordAvatar = document.getElementById('discord-avatar');
  const discordLabel = document.getElementById('discord-label');
  const discordName = document.getElementById('discord-name');
  const discordStatus = document.getElementById('discord-status');
  const spotifyPresence = document.getElementById('spotify-presence');
  const spotifyAvatar = document.getElementById('spotify-avatar');
  const spotifyLabel = document.getElementById('spotify-label');
  const spotifySong = document.getElementById('spotify-song');
  const spotifyArtist = document.getElementById('spotify-artist');
  const discordUserId = '222604250667155456';
  const discordStatusLabels = {
    online: 'online',
    idle: 'idle',
    dnd: 'do not disturb',
    offline: 'offline'
  };

  function getDiscordAvatarUrl(user) {
    if (!user?.id || !user?.avatar) return 'assets/profile.gif';

    const extension = user.avatar.startsWith('a_') ? 'gif' : 'png';
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${extension}?size=128`;
  }

  function getDiscordStatusText(presence) {
    const customStatus = presence?.activities?.find((activity) => activity.type === 4);
    const emoji = customStatus?.emoji?.name || '';
    const state = customStatus?.state || '';
    const status = discordStatusLabels[presence?.discord_status] || 'offline';
    const customText = [emoji, state].filter(Boolean).join(' ').trim();

    return customText || status;
  }

  function getDiscordRichActivity(presence) {
    return presence?.activities?.find((activity) => {
      if (activity.type === 4) return false;
      if (presence?.spotify && activity.name?.toLowerCase() === 'spotify') return false;
      return activity.name || activity.details || activity.state;
    }) || null;
  }

  function getDiscordActivityImageUrl(activity, fallbackUser) {
    const image = activity?.assets?.large_image || activity?.assets?.small_image;
    if (!image) return getDiscordAvatarUrl(fallbackUser);
    if (image.startsWith('http')) return image;
    if (image.startsWith('mp:')) return `https://media.discordapp.net/${image.slice(3)}`;
    if (activity.application_id) {
      return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${image}.png`;
    }
    return getDiscordAvatarUrl(fallbackUser);
  }

  async function getDiscordPresence() {
    try {
      const response = await fetch(`https://api.lanyard.rest/v1/users/${discordUserId}`, { cache: 'no-store' });
      if (!response.ok) return null;

      const payload = await response.json();
      return payload?.success ? payload.data : null;
    } catch (error) {
      console.error('Discord presence failed:', error);
      return null;
    }
  }

  function renderSpotifyPresence(presence) {
    if (!spotifyPresence || !spotifyAvatar || !spotifyLabel || !spotifySong || !spotifyArtist) return;

    const spotify = presence?.spotify;
    if (!spotify) {
      spotifyPresence.classList.add('hidden');
      spotifyAvatar.src = 'assets/profile.gif';
      spotifySong.textContent = 'not listening';
      spotifyArtist.textContent = 'spotify is idle';
      return;
    }

    spotifyPresence.classList.remove('hidden');
    spotifyAvatar.src = spotify.album_art_url || 'assets/profile.gif';
    spotifyAvatar.alt = `${spotify.song || 'Spotify'} album art`;
    spotifyLabel.textContent = 'spotify • listening';
    spotifySong.textContent = spotify.song || 'unknown song';
    spotifyArtist.textContent = [spotify.artist, spotify.album].filter(Boolean).join(' • ') || 'unknown artist';
  }

  function renderDiscordPresence(presence) {
    if (!discordAvatar || !discordLabel || !discordName || !discordStatus) return;

    if (!presence) {
      discordAvatar.src = 'assets/profile.gif';
      discordAvatar.alt = 'Discord profile unavailable';
      discordLabel.textContent = 'discord profile';
      discordName.textContent = 'profile unavailable';
      discordStatus.textContent = `user ${discordUserId}`;
      renderSpotifyPresence(null);
      return;
    }

    const user = presence.discord_user || {};
    const displayName = user.global_name || user.display_name || user.username || 'wolf.';
    const status = discordStatusLabels[presence.discord_status] || 'offline';

    const activity = getDiscordRichActivity(presence);
    const activityText = [activity?.details, activity?.state].filter(Boolean).join(' • ');

    discordAvatar.src = getDiscordActivityImageUrl(activity, user);
    discordAvatar.alt = activity ? `${activity.name} Discord rich presence image` : `${displayName} Discord avatar`;
    discordLabel.textContent = activity ? `discord • ${status}` : `discord profile • ${status}`;
    discordName.textContent = activity?.name || displayName;
    discordStatus.textContent = activityText || getDiscordStatusText(presence);
    renderSpotifyPresence(presence);
  }

  async function updateDiscordPresence() {
    renderDiscordPresence(await getDiscordPresence());
  }

  const interestsContent = {
    beastars: {
      name: 'Beastars',
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e1/BEASTARS%2C_volume_1.jpg/250px-BEASTARS%2C_volume_1.jpg',
      alt: 'Beastars volume cover art',
      description: "In this anthropomorphic world, gentle wolf Legoshi struggles with instinct, identity, and love after a classmate's murder deepens the divide between carnivores and herbivores at Cherryton Academy."
    },
    'fantastic-mr-fox': {
      name: 'Fantastic Mr. Fox',
      image: 'https://upload.wikimedia.org/wikipedia/en/a/af/Fantastic_mr_fox.jpg',
      alt: 'Fantastic Mr. Fox theatrical poster',
      description: 'A clever fox returns to stealing from three ruthless farmers, pulling his family and entire animal community into a stylish, hilarious underground survival heist.'
    },
    'the-bad-guys-1': {
      name: 'The Bad Guys (2022)',
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/00/The_Bad_Guys_poster.jpeg/250px-The_Bad_Guys_poster.jpeg',
      alt: 'The Bad Guys 2022 poster',
      description: 'After years of high-profile crimes, a notorious animal crew is forced into a good-behavior experiment that starts as a con but slowly becomes a real shot at redemption.'
    },
    'the-bad-guys-2': {
      name: 'The Bad Guys 2 (2025)',
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/The_Bad_Guys_2_%282025%29_teaser_poster.jpg/250px-The_Bad_Guys_2_%282025%29_teaser_poster.jpg',
      alt: 'The Bad Guys 2 teaser poster',
      description: 'The reformed crew gets pulled back into the action when a new all-female criminal team forces them into one more globe-trotting heist.'
    }
  };

  const gameInterestsContent = {
    vrchat: {
      name: 'VRChat',
      image: 'assets/vrchat.jpg',
      alt: 'VRChat artwork',
      description: 'VRChat is a social virtual reality platform where users interact through custom 3D avatars in user-created worlds, offering limitless creative and social experiences.'
    },
    chilloutvr: {
      name: 'ChilloutVR',
      image: 'assets/chilloutvr.png',
      alt: 'ChilloutVR artwork',
      description: 'ChilloutVR is a social sandbox game enabling players and content creators to create, share and explore content in a massive multiplayer metaverse alone, with friends or anyone around the world. Meet new people and explore virtual worlds together.'
    }
  };

  const characterInterestsContent = {
    'mr-wolf': {
      name: 'Mr. Wolf (The Bad Guys)',
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/00/The_Bad_Guys_poster.jpeg/250px-The_Bad_Guys_poster.jpeg',
      alt: 'The Bad Guys poster featuring Mr. Wolf',
      description: 'Mr. Wolf is cool under pressure and always ten steps ahead. I like how he balances mastermind energy with real loyalty, and how his growth turns him into someone who leads with heart.'
    },
    legoshi: {
      name: 'Legoshi (Beastars)',
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e1/BEASTARS%2C_volume_1.jpg/250px-BEASTARS%2C_volume_1.jpg',
      alt: 'Beastars volume one cover featuring Legoshi',
      description: 'Legoshi is quiet, gentle, and intense in a way that feels real. His story about self-control and identity makes him one of the most memorable characters in Beastars.'
    },
    jack: {
      name: 'Jack (Beastars)',
      image: 'assets/jack.jpg',
      alt: 'Jack from Beastars',
      description: 'Jack is dependable, warm, and genuinely kind, and he brings balance to Legoshi when things get dark. Their friendship is one of the strongest parts of the whole series.'
    }
  };

  
  const fallbackManifest = {
    folder: 'assets',
    tracks: [
      { name: 'Background', file: 'background_music.mp3', theme: 'home-theme' },
      { name: 'Hacker', file: 'hacker_music.mp3', theme: 'hacker-theme' },
      { name: 'Rain', file: 'rain_music.mp3', theme: 'rain-theme' },
      { name: 'Anime', file: 'anime_music.mp3', theme: 'anime-theme' },
      { name: 'Car', file: 'car_music.mp3', theme: 'car-theme' }
    ]
  };

  function parseMusicManifest() {
    if (!musicManifestNode) {
      return fallbackManifest;
    }

    try {
      const parsed = JSON.parse(musicManifestNode.textContent);
      if (!Array.isArray(parsed?.tracks) || parsed.tracks.length === 0) {
        return fallbackManifest;
      }
      return parsed;
    } catch (err) {
      console.error('Failed to parse music manifest:', err);
      return fallbackManifest;
    }
  }

  const musicManifest = parseMusicManifest();

  function resolveTrackSrc(track) {
    const folder = (musicManifest.folder || 'assets').replace(/\/$/, '');
    return `${folder}/${track.file}`;
  }

  function findTrackByTheme(themeClass) {
    const themedTrack = musicManifest.tracks.find((track) => track.theme === themeClass);
    return themedTrack || musicManifest.tracks[0];
  }

  async function parseCustomPlayerManifest() {
    try {
      const response = await fetch('custom-player-manifest.json', { cache: 'no-store' });
      if (response.ok) {
        const parsed = await response.json();
        if (Array.isArray(parsed?.artists)) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Failed to load external custom player manifest:', err);
    }

    if (!customPlayerManifestNode) {
      return { artists: [] };
    }

    try {
      const parsed = JSON.parse(customPlayerManifestNode.textContent);
      if (!Array.isArray(parsed?.artists)) {
        return { artists: [] };
      }
      return parsed;
    } catch (err) {
      console.error('Failed to parse custom player manifest:', err);
      return { artists: [] };
    }
  }

  function getTrackTitle(trackFile, configuredTitle) {
    if (typeof configuredTitle === 'string' && configuredTitle.trim()) {
      return configuredTitle.trim();
    }

    const fileName = (trackFile || '').split('/').pop() || '';
    return decodeURIComponent(fileName)
      .replace(/\.[^.]+$/, '')
      .replace(/[._-]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function resolveCoverSource(folder, artistCover, trackCover) {
    if (trackCover) {
      return `${folder}/${trackCover}`;
    }
    if (artistCover) {
      return `${folder}/${artistCover}`;
    }
    return 'assets/profile.gif';
  }

  const customMusicManifest = await parseCustomPlayerManifest();
  const customArtists = [];
  const customTracks = [];
  customMusicManifest.artists.forEach((artist, artistIndex) => {
    const folder = (artist.folder || 'music').replace(/\/$/, '');
    const artistEntry = {
      index: artistIndex,
      name: artist.name || `artist ${artistIndex + 1}`,
      tracks: []
    };

    (artist.tracks || []).forEach((trackEntry) => {
      const trackConfig = typeof trackEntry === 'string' ? { file: trackEntry } : (trackEntry || {});
      if (!trackConfig.file) {
        return;
      }
      const track = {
        index: customTracks.length,
        artistIndex,
        artistName: artist.name || 'unknown artist',
        src: `${folder}/${trackConfig.file}`,
        coverSrc: resolveCoverSource(folder, artist.cover, trackConfig.cover),
        title: getTrackTitle(trackConfig.file, trackConfig.title)
      };
      customTracks.push(track);
      artistEntry.tracks.push(track);
    });

    customArtists.push(artistEntry);
  });
  let activeCustomTrackIndex = -1;
  let activeArtistIndex = -1;


  const cursor = document.querySelector('.custom-cursor');
  const useCustomCursor = false;
  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

  if (useCustomCursor && cursor && isTouchDevice) {
    document.body.classList.add('touch-device');
    
    document.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      cursor.style.left = touch.clientX + 'px';
      cursor.style.top = touch.clientY + 'px';
      cursor.style.display = 'block';
    });

    document.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      cursor.style.left = touch.clientX + 'px';
      cursor.style.top = touch.clientY + 'px';
      cursor.style.display = 'block';
    });

    document.addEventListener('touchend', () => {
      cursor.style.display = 'none'; 
    });
  } else if (useCustomCursor && cursor) {

    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      cursor.style.display = 'block';
    });

    document.addEventListener('mousedown', () => {
      cursor.style.transform = 'scale(0.8) translate(-50%, -50%)';
    });

    document.addEventListener('mouseup', () => {
      cursor.style.transform = 'scale(1) translate(-50%, -50%)';
    });
  }


  const startMessage = "wolf.lol";
  let startTextContent = '';
  let startIndex = 0;
  let startCursorVisible = true;

  function typeWriterStart() {
    if (startIndex < startMessage.length) {
      startTextContent = startMessage.slice(0, startIndex + 1);
      startIndex++;
    }
    startText.textContent = startTextContent + (startCursorVisible ? '|' : ' ');
    setTimeout(typeWriterStart, 100);
  }


  setInterval(() => {
    startCursorVisible = !startCursorVisible;
    startText.textContent = startTextContent + (startCursorVisible ? '|' : ' ');
  }, 500);


  function initializeVisitorCounter() {
    const fixedViewCount = 192729;
    visitorCount.textContent = fixedViewCount.toLocaleString();
  }


  initializeVisitorCounter();


  function updateProfileClock() {
    const time = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    profileClock.textContent = `local time: ${time}`;
  }

  updateProfileClock();
  setInterval(updateProfileClock, 1000);

  function refreshPlayPauseButton() {
    if (!musicPlayPauseButton || !albumPlayer) return;
    musicPlayPauseButton.textContent = albumPlayer.paused ? 'Play' : 'Pause';
  }

  function refreshLoopButton() {
    if (!musicLoopButton || !albumPlayer) return;
    musicLoopButton.textContent = `Loop: ${albumPlayer.loop ? 'on' : 'off'}`;
  }

  function updateMusicAnimations() {
    if (!albumPlayer) return;
    const isPlaying = !albumPlayer.paused;
    if (musicCoverNode) {
      musicCoverNode.classList.toggle('playing', isPlaying);
    }
    if (musicEqualizer) {
      musicEqualizer.classList.toggle('playing', isPlaying);
    }
  }

  let audioContext = null;
  let analyserNode = null;
  let sourceNode = null;
  let equalizerFrame = null;

  function resetEqualizerBars() {
    equalizerBars.forEach((bar) => {
      bar.style.height = '4px';
      bar.style.opacity = '0.35';
    });
  }

  function renderEqualizerFrame() {
    if (!analyserNode || !equalizerBars.length) {
      equalizerFrame = null;
      return;
    }

    const frequencyData = new Uint8Array(analyserNode.frequencyBinCount);
    analyserNode.getByteFrequencyData(frequencyData);
    const bucketSize = Math.floor(frequencyData.length / equalizerBars.length) || 1;

    equalizerBars.forEach((bar, index) => {
      const start = index * bucketSize;
      const end = Math.min(start + bucketSize, frequencyData.length);
      let sum = 0;
      for (let i = start; i < end; i++) {
        sum += frequencyData[i];
      }
      const average = sum / Math.max(end - start, 1);
      const normalized = average / 255;
      const barHeight = 4 + normalized * 14;
      bar.style.height = `${barHeight.toFixed(1)}px`;
      bar.style.opacity = `${Math.min(1, 0.45 + normalized * 0.55)}`;
    });

    equalizerFrame = requestAnimationFrame(renderEqualizerFrame);
  }

  function stopEqualizerLoop() {
    if (equalizerFrame) {
      cancelAnimationFrame(equalizerFrame);
      equalizerFrame = null;
    }
    resetEqualizerBars();
  }

  async function initializeEqualizer() {
    if (!albumPlayer || !equalizerBars.length) return;
    if (audioContext && analyserNode) return;

    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextCtor) return;

    audioContext = new AudioContextCtor();
    sourceNode = audioContext.createMediaElementSource(albumPlayer);
    analyserNode = audioContext.createAnalyser();
    analyserNode.fftSize = 128;
    analyserNode.smoothingTimeConstant = 0.82;

    sourceNode.connect(analyserNode);
    analyserNode.connect(audioContext.destination);
    resetEqualizerBars();
  }

  async function startEqualizerLoop() {
    await initializeEqualizer();
    if (audioContext?.state === 'suspended') {
      await audioContext.resume();
    }
    if (!equalizerFrame) {
      renderEqualizerFrame();
    }
  }

  function formatTrackTime(rawSeconds) {
    if (!Number.isFinite(rawSeconds) || rawSeconds < 0) return '00:00';
    const seconds = Math.floor(rawSeconds);
    const minutes = Math.floor(seconds / 60);
    const remaining = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remaining).padStart(2, '0')}`;
  }

  function renderTrackList() {
    if (!musicListNode) return;
    musicListNode.innerHTML = '';

    if (activeArtistIndex < 0 || !customArtists[activeArtistIndex]) {
      musicListNode.textContent = 'Select an artist.';
      return;
    }

    if (customArtists[activeArtistIndex].tracks.length === 0) {
      musicListNode.textContent = 'No songs added yet.';
      return;
    }

    const artistLabel = document.createElement('div');
    artistLabel.className = 'music-artist';
    artistLabel.textContent = customArtists[activeArtistIndex].name;
    musicListNode.appendChild(artistLabel);

    customArtists[activeArtistIndex].tracks.forEach((track) => {
      const button = document.createElement('button');
      button.className = 'music-track-button';
      button.type = 'button';
      button.dataset.trackIndex = String(track.index);
      button.textContent = track.title;
      button.addEventListener('click', () => playCustomTrack(track.index));
      musicListNode.appendChild(button);
    });
  }

  function updateActiveTrackUI() {
    const trackButtons = document.querySelectorAll('.music-track-button');
    trackButtons.forEach((button) => {
      button.classList.toggle('active', Number(button.dataset.trackIndex) === activeCustomTrackIndex);
    });
  }

  function showMusicArtistList() {
    if (musicArtistSelectView) {
      musicArtistSelectView.classList.remove('hidden');
    }
    if (musicArtistPlayerView) {
      musicArtistPlayerView.classList.add('hidden');
    }
    activeArtistIndex = -1;
  }

  function showMusicArtistPlayer(artistIndex) {
    if (!customArtists[artistIndex]) return;
    activeArtistIndex = artistIndex;
    if (musicArtistHeading) {
      musicArtistHeading.textContent = customArtists[artistIndex].name;
    }
    if (musicArtistSelectView) {
      musicArtistSelectView.classList.add('hidden');
    }
    if (musicArtistPlayerView) {
      musicArtistPlayerView.classList.remove('hidden');
      gsap.fromTo(musicArtistPlayerView, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.26, ease: 'power2.out' });
    }
    renderTrackList();
    updateActiveTrackUI();
  }

  function renderArtistList() {
    if (!musicArtistListNode) return;
    musicArtistListNode.innerHTML = '';

    if (customArtists.length === 0) {
      musicArtistListNode.textContent = 'No artists configured yet.';
      return;
    }

    customArtists.forEach((artist) => {
      const button = document.createElement('button');
      button.className = 'music-artist-card';
      button.type = 'button';
      button.textContent = artist.name;
      button.addEventListener('click', () => showMusicArtistPlayer(artist.index));
      musicArtistListNode.appendChild(button);
    });
  }

  function playCustomTrack(index) {
    if (!albumPlayer || index < 0 || index >= customTracks.length) return;
    const track = customTracks[index];
    if (activeArtistIndex !== track.artistIndex) {
      showMusicArtistPlayer(track.artistIndex);
    }
    activeCustomTrackIndex = index;
    albumPlayer.src = track.src;
    albumPlayer.volume = volumeSlider.value;
    albumPlayer.muted = isMuted;
    albumPlayer.play().catch((err) => console.error('Failed to play custom track:', err));
    if (musicNowPlayingNode) {
      musicNowPlayingNode.textContent = `Now Playing: ${track.artistName} — ${track.title}`;
    }
    if (musicCoverNode && track.coverSrc) {
      musicCoverNode.src = track.coverSrc;
      musicCoverNode.alt = `${track.artistName} album cover`;
    }
    updateActiveTrackUI();
    refreshPlayPauseButton();
    updateMusicAnimations();
    if (currentAudio) {
      currentAudio.pause();
    }
  }


  startScreen.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    currentAudio.muted = false;
    currentAudio.play().catch(err => {
      console.error("Failed to play music after start screen click:", err);
    });
    profileBlock.classList.remove('hidden');
    gsap.fromTo(profileBlock,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out', onComplete: () => {
        profileBlock.classList.add('profile-appear');
        
      }}
    );
    if (!isTouchDevice) {
      try {
        new cursorTrailEffect({
          length: 10,
          size: 8,
          speed: 0.2
        });
        console.log("Cursor trail initialized");
      } catch (err) {
        console.error("Failed to initialize cursor trail effect:", err);
      }
    }
    typeWriterName();
    typeWriterBio();
  });

  startScreen.addEventListener('touchstart', (e) => {
    e.preventDefault();
    startScreen.classList.add('hidden');
    currentAudio.muted = false;
    currentAudio.play().catch(err => {
      console.error("Failed to play music after start screen touch:", err);
    });
    profileBlock.classList.remove('hidden');
    gsap.fromTo(profileBlock,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out', onComplete: () => {
        profileBlock.classList.add('profile-appear');
        
      }}
    );
    if (!isTouchDevice) {
      try {
        new cursorTrailEffect({
          length: 10,
          size: 8,
          speed: 0.2
        });
        console.log("Cursor trail initialized");
      } catch (err) {
        console.error("Failed to initialize cursor trail effect:", err);
      }
    }
    typeWriterName();
    typeWriterBio();
  });


  const name = "wolf.";
  let nameText = '';
  let nameIndex = 0;
  let isNameDeleting = false;
  let nameCursorVisible = true;

  function typeWriterName() {
    if (!isNameDeleting && nameIndex < name.length) {
      nameText = name.slice(0, nameIndex + 1);
      nameIndex++;
    } else if (isNameDeleting && nameIndex > 0) {
      nameText = name.slice(0, nameIndex - 1);
      nameIndex--;
    } else if (nameIndex === name.length) {
      isNameDeleting = true;
      setTimeout(typeWriterName, 10000);
      return;
    } else if (nameIndex === 0) {
      isNameDeleting = false;
    }
    profileName.textContent = nameText + (nameCursorVisible ? '|' : ' ');
    if (Math.random() < 0.1) {
      profileName.classList.add('glitch');
      setTimeout(() => profileName.classList.remove('glitch'), 200);
    }
    setTimeout(typeWriterName, isNameDeleting ? 150 : 300);
  }

  setInterval(() => {
    nameCursorVisible = !nameCursorVisible;
    profileName.textContent = nameText + (nameCursorVisible ? '|' : ' ');
  }, 500);


  const bioMessages = [
    "love yall.",
    "the best oat."
  ];
  let bioText = '';
  let bioIndex = 0;
  let bioMessageIndex = 0;
  let isBioDeleting = false;
  let bioCursorVisible = true;

  function typeWriterBio() {
    if (!isBioDeleting && bioIndex < bioMessages[bioMessageIndex].length) {
      bioText = bioMessages[bioMessageIndex].slice(0, bioIndex + 1);
      bioIndex++;
    } else if (isBioDeleting && bioIndex > 0) {
      bioText = bioMessages[bioMessageIndex].slice(0, bioIndex - 1);
      bioIndex--;
    } else if (bioIndex === bioMessages[bioMessageIndex].length) {
      isBioDeleting = true;
      setTimeout(typeWriterBio, 2000);
      return;
    } else if (bioIndex === 0 && isBioDeleting) {
      isBioDeleting = false;
      bioMessageIndex = (bioMessageIndex + 1) % bioMessages.length;
    }
    profileBio.textContent = bioText + (bioCursorVisible ? '|' : ' ');
    if (Math.random() < 0.1) {
      profileBio.classList.add('glitch');
      setTimeout(() => profileBio.classList.remove('glitch'), 200);
    }
    setTimeout(typeWriterBio, isBioDeleting ? 75 : 150);
  }

  setInterval(() => {
    bioCursorVisible = !bioCursorVisible;
    profileBio.textContent = bioText + (bioCursorVisible ? '|' : ' ');
  }, 500);


  const profilePresets = {
    blue: {
      name: 'Blue',
      background: 'assets/background.mp4',
      profile: 'assets/profile.gif',
      primaryColor: '#00CED1',
      secondaryColor: '#2563EB'
    },
    orange: {
      name: 'Orange',
      background: 'assets/background2.mp4',
      profile: 'assets/pfp2.jpg',
      primaryColor: '#FF8A1D',
      secondaryColor: '#FF4D00'
    },
    black: {
      name: 'Black',
      background: 'assets/background3.mp4',
      profile: 'assets/pfp3.jpg',
      primaryColor: '#E5E7EB',
      secondaryColor: '#6B7280'
    }
  };
  const presetStorageKey = 'wolf-profile-preset';
  let activePresetKey = localStorage.getItem(presetStorageKey);
  if (!profilePresets[activePresetKey]) {
    activePresetKey = 'blue';
  }

  function refreshPresetButtons() {
    presetButtons.forEach((button) => {
      const isActive = button.dataset.preset === activePresetKey;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
  }

  function setBackgroundSource(src) {
    if (!backgroundVideo || !src) {
      return;
    }

    const currentSrc = backgroundVideo.currentSrc || backgroundVideo.src || '';
    if (!currentSrc.endsWith(src)) {
      backgroundVideo.src = src;
      backgroundVideo.load();
    }
    backgroundVideo.play().catch((err) => console.error('Failed to play preset background:', err));
  }

  function applyProfilePreset(presetKey, shouldSave = true) {
    const preset = profilePresets[presetKey] || profilePresets.blue;
    activePresetKey = profilePresets[presetKey] ? presetKey : 'blue';

    if (shouldSave) {
      localStorage.setItem(presetStorageKey, activePresetKey);
    }

    if (profilePicture) {
      profilePicture.src = preset.profile;
      profilePicture.alt = `${preset.name} profile`;
    }
    if (backgroundVideo) {
      backgroundVideo.poster = preset.profile;
      setBackgroundSource(preset.background);
    }
    document.documentElement.style.setProperty('--primary-color', preset.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', preset.secondaryColor);
    document.body.dataset.preset = activePresetKey;
    refreshPresetButtons();
  }

  applyProfilePreset(activePresetKey, false);

  presetButtons.forEach((button) => {
    const selectPreset = () => applyProfilePreset(button.dataset.preset);
    button.addEventListener('click', selectPreset);
    button.addEventListener('touchstart', (e) => {
      e.preventDefault();
      selectPreset();
    });
  });

  let currentAudio = musicPlayer;

  function playTrackForTheme(themeClass) {
    const track = findTrackByTheme(themeClass);
    if (!track) {
      return;
    }

    const nextSrc = resolveTrackSrc(track);
    if (!currentAudio.src.endsWith(nextSrc)) {
      currentAudio.src = nextSrc;
      currentAudio.load();
    }

    currentAudio.volume = volumeSlider.value;
    currentAudio.muted = isMuted;
    currentAudio.play().catch(err => console.error('Failed to play theme music:', err));
  }

  let isMuted = false;
  currentAudio.muted = true;
  playTrackForTheme('home-theme');

  volumeIcon.addEventListener('click', () => {
    isMuted = !isMuted;
    currentAudio.muted = isMuted;
    if (albumPlayer) {
      albumPlayer.muted = isMuted;
    }
    volumeIcon.innerHTML = isMuted
      ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path>`
      : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>`;
  });

  volumeIcon.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isMuted = !isMuted;
    currentAudio.muted = isMuted;
    if (albumPlayer) {
      albumPlayer.muted = isMuted;
    }
    volumeIcon.innerHTML = isMuted
      ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path>`
      : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>`;
  });

  volumeSlider.addEventListener('input', () => {
    currentAudio.volume = volumeSlider.value;
    if (albumPlayer) {
      albumPlayer.volume = volumeSlider.value;
    }
    isMuted = false;
    currentAudio.muted = false;
    volumeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>`;
  });


  const setPanelTransparency = (panel, opacity) => {
    if (!panel) {
      return;
    }

    if (opacity == 0) {
      panel.style.background = 'rgba(0, 0, 0, 0)';
      panel.style.borderOpacity = '0';
      panel.style.borderColor = 'transparent';
      panel.style.backdropFilter = 'none';
      return;
    }

    panel.style.background = `rgba(0, 0, 0, ${opacity})`;
    panel.style.borderOpacity = opacity;
    panel.style.borderColor = '';
    panel.style.backdropFilter = `blur(${10 * opacity}px)`;
  };

  transparencySlider.addEventListener('input', () => {
    const opacity = transparencySlider.value;
    setPanelTransparency(profileBlock, opacity);
    setPanelTransparency(skillsBlock, opacity);
    setPanelTransparency(guestbookPanel, opacity);

    profileBlock.style.pointerEvents = 'auto';
    socialIcons.forEach(icon => {
      icon.style.pointerEvents = 'auto';
      icon.style.opacity = '1';
    });
    badges.forEach(badge => {
      badge.style.pointerEvents = 'auto';
      badge.style.opacity = '1';
    });
    profilePicture.style.pointerEvents = 'auto';
    profilePicture.style.opacity = '1';
    profileName.style.opacity = '1';
    profileBio.style.opacity = '1';
    visitorCount.style.opacity = '1';
  });


  function switchTheme(videoSrc, themeClass, overlay = null, overlayOverProfile = false) {
    let primaryColor;
    switch (themeClass) {
      case 'home-theme':
        primaryColor = '#00CED1';
        break;
      case 'hacker-theme':
        primaryColor = '#22C55E';
        break;
      case 'rain-theme':
        primaryColor = '#1E3A8A';
        break;
      case 'anime-theme':
        primaryColor = '#DC2626';
        break;
      case 'car-theme':
        primaryColor = '#EAB308';
        break;
      default:
        primaryColor = '#00CED1';
    }
    const activePreset = profilePresets[activePresetKey];
    document.documentElement.style.setProperty('--primary-color', activePreset?.primaryColor || primaryColor);
    if (activePreset?.secondaryColor) {
      document.documentElement.style.setProperty('--secondary-color', activePreset.secondaryColor);
    }

    gsap.to(backgroundVideo, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        setBackgroundSource(profilePresets[activePresetKey]?.background || videoSrc);

        if (currentAudio) {
          currentAudio.pause();
          currentAudio.currentTime = 0;
        }
        if (!albumPlayer || albumPlayer.paused) {
          playTrackForTheme(themeClass);
        }

        document.body.classList.remove('home-theme', 'hacker-theme', 'rain-theme', 'anime-theme', 'car-theme');
        document.body.classList.add(themeClass);

        hackerOverlay.classList.add('hidden');
        snowOverlay.classList.add('hidden');
        profileBlock.style.zIndex = overlayOverProfile ? 10 : 20;
        skillsBlock.style.zIndex = overlayOverProfile ? 10 : 20;
        if (overlay) {
          overlay.classList.remove('hidden');
        }

        gsap.to(backgroundVideo, {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => {
            
          }
        });
      }
    });
  }


  const autoThemes = [
    ['home-theme', null, false],
    ['hacker-theme', hackerOverlay, false],
    ['rain-theme', snowOverlay, true],
    ['anime-theme', null, false],
    ['car-theme', null, false]
  ];
  let autoThemeIndex = 0;

  function cycleTheme() {
    autoThemeIndex = (autoThemeIndex + 1) % autoThemes.length;
    const [themeClass, overlayNode, overProfile] = autoThemes[autoThemeIndex];
    switchTheme('assets/background.mp4', themeClass, overlayNode, overProfile);
  }

  setInterval(cycleTheme, 18000);

 
  function handleTilt(e, element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    let clientX, clientY;

    if (e.type === 'touchmove') {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const mouseX = clientX - centerX;
    const mouseY = clientY - centerY;

    const maxTilt = 15;
    const tiltX = (mouseY / rect.height) * maxTilt;
    const tiltY = -(mouseX / rect.width) * maxTilt;

    gsap.to(element, {
      rotationX: tiltX,
      rotationY: tiltY,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 1000
    });

  }

  profileBlock.addEventListener('mousemove', (e) => handleTilt(e, profileBlock));
  profileBlock.addEventListener('touchmove', (e) => {
    e.preventDefault();
    handleTilt(e, profileBlock);
  });

  skillsBlock.addEventListener('mousemove', (e) => handleTilt(e, skillsBlock));
  skillsBlock.addEventListener('touchmove', (e) => {
    e.preventDefault();
    handleTilt(e, skillsBlock);
  });

  profileBlock.addEventListener('mouseleave', () => {
    gsap.to(profileBlock, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  });
  profileBlock.addEventListener('touchend', () => {
    gsap.to(profileBlock, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  });

  skillsBlock.addEventListener('mouseleave', () => {
    gsap.to(skillsBlock, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  });
  skillsBlock.addEventListener('touchend', () => {
    gsap.to(skillsBlock, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  });


  profilePicture.addEventListener('mouseenter', () => {
    glitchOverlay.style.opacity = '1';
    setTimeout(() => {
      glitchOverlay.style.opacity = '0';
    }, 500);
  });


  let orbitAngle = 0;
  let orbitSpeed = 110;
  let orbitBoostUntil = 0;
  let lastOrbitTime = performance.now();

  function tickOrbit(now) {
    const elapsed = (now - lastOrbitTime) / 1000;
    lastOrbitTime = now;
    const speed = now < orbitBoostUntil ? orbitSpeed * 3 : orbitSpeed;
    orbitAngle = (orbitAngle + speed * elapsed) % 360;
    profileContainer.style.setProperty('--orbit-angle', orbitAngle.toFixed(3));
    requestAnimationFrame(tickOrbit);
  }

  function boostOrbit() {
    orbitBoostUntil = performance.now() + 750;
  }

  requestAnimationFrame(tickOrbit);

  profilePicture.addEventListener('click', boostOrbit);

  profilePicture.addEventListener('touchstart', (e) => {
    e.preventDefault();
    boostOrbit();
  });

  updateDiscordPresence();
  setInterval(updateDiscordPresence, 30000);

 
  let activeMoreSubview = moreHomeView;

  function showMoreSubview(targetView) {
    if (!targetView || targetView === activeMoreSubview) return;
    const currentView = activeMoreSubview;
    const revealTarget = () => {
      targetView.classList.remove('hidden');
      gsap.fromTo(targetView, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.28, ease: 'power2.out' });
      activeMoreSubview = targetView;
    };

    if (!currentView || currentView.classList.contains('hidden')) {
      revealTarget();
      return;
    }

    gsap.to(currentView, {
      autoAlpha: 0,
      y: -8,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        currentView.classList.add('hidden');
        currentView.style.opacity = '';
        currentView.style.transform = '';
        revealTarget();
      }
    });
  }

  function openMoreView() {
    localStorage.setItem(presetStorageKey, activePresetKey);
    gsap.to(profileBlock, {
      x: -100,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        profileBlock.classList.add('hidden');
        skillsBlock.classList.remove('hidden');
        [moreHomeView, morePresetsView, moreMusicView, moreInterestsView, moreInterestsCharactersView, moreInterestsGamesView, moreMessagesView].forEach((view) => view && view.classList.add('hidden'));
        activeMoreSubview = null;
        showMoreSubview(moreHomeView);
        gsap.fromTo(skillsBlock,
          { x: 100, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
        );
      }
    });
  }

  function closeMoreView() {
    gsap.to(skillsBlock, {
      x: 100,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        skillsBlock.classList.add('hidden');
        profileBlock.classList.remove('hidden');
        showMusicArtistList();
        showMoreSubview(moreHomeView);
        gsap.fromTo(profileBlock,
          { x: -100, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
        );
      }
    });
  }

  if (openMoreButton) {
    openMoreButton.addEventListener('click', openMoreView);
    openMoreButton.addEventListener('touchstart', (e) => {
      e.preventDefault();
      openMoreView();
    });
  }

  if (closeMoreButton) {
    closeMoreButton.addEventListener('click', closeMoreView);
    closeMoreButton.addEventListener('touchstart', (e) => {
      e.preventDefault();
      closeMoreView();
    });
  }


  if (openMoreMusicButton) {
    openMoreMusicButton.addEventListener('click', () => {
      showMusicArtistList();
      showMoreSubview(moreMusicView);
    });
  }

  if (openMoreInterestsButton) {
    openMoreInterestsButton.addEventListener('click', () => {
      showMoreSubview(moreInterestsView);
      updateInterestTab('beastars');
    });
  }

  if (openMorePresetsButton) {
    openMorePresetsButton.addEventListener('click', () => {
      localStorage.setItem(presetStorageKey, activePresetKey);
      refreshPresetButtons();
      showMoreSubview(morePresetsView);
    });
  }

  if (openMoreMessagesButton) {
    openMoreMessagesButton.addEventListener('click', () => showMoreSubview(moreMessagesView));
  }

  if (morePresetsBackButton) {
    morePresetsBackButton.addEventListener('click', () => {
      localStorage.setItem(presetStorageKey, activePresetKey);
      showMoreSubview(moreHomeView);
    });
  }

  if (moreMusicBackButton) {
    moreMusicBackButton.addEventListener('click', () => {
      showMusicArtistList();
      showMoreSubview(moreHomeView);
    });
  }

  if (moreInterestsBackButton) {
    moreInterestsBackButton.addEventListener('click', () => showMoreSubview(moreHomeView));
  }

  if (moreMessagesBackButton) {
    moreMessagesBackButton.addEventListener('click', () => showMoreSubview(moreHomeView));
  }

  if (moreInterestsCharactersBackButton) {
    moreInterestsCharactersBackButton.addEventListener('click', () => showMoreSubview(moreInterestsView));
  }

  if (moreInterestsGamesBackButton) {
    moreInterestsGamesBackButton.addEventListener('click', () => showMoreSubview(moreInterestsCharactersView));
  }

  function updateInterestTab(interestKey) {
    const interest = interestsContent[interestKey];
    if (!interest || !interestImage || !interestName || !interestDescription) return;
    const applyInterest = () => {
      interestImage.src = interest.image;
      interestImage.alt = interest.alt;
      interestName.textContent = interest.name;
      interestDescription.textContent = interest.description;
      const interestItem = interestImage.closest('.interest-item');
      if (interestItem) {
        gsap.fromTo(interestItem, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.24, ease: 'power2.out' });
      }
    };

    const interestItem = interestImage.closest('.interest-item');
    if (interestItem) {
      gsap.to(interestItem, {
        autoAlpha: 0,
        y: -6,
        duration: 0.15,
        ease: 'power2.in',
        onComplete: applyInterest
      });
    } else {
      applyInterest();
    }

    interestTabs.forEach((tab) => {
      const isActive = tab.dataset.interest === interestKey;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
    });

    if (interestsNextPageButton) {
      const canAdvance = interestKey === 'the-bad-guys-2';
      interestsNextPageButton.hidden = !canAdvance;
      interestsNextPageButton.classList.toggle('is-visible', canAdvance);
    }
  }

  function updateCharacterInterestTab(interestKey) {
    const interest = characterInterestsContent[interestKey];
    if (!interest || !interestCharacterImage || !interestCharacterName || !interestCharacterDescription) return;
    const applyInterest = () => {
      interestCharacterImage.src = interest.image;
      interestCharacterImage.alt = interest.alt;
      interestCharacterName.textContent = interest.name;
      interestCharacterDescription.textContent = interest.description;
      const interestItem = interestCharacterImage.closest('.interest-item');
      if (interestItem) {
        gsap.fromTo(interestItem, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.24, ease: 'power2.out' });
      }
    };

    const interestItem = interestCharacterImage.closest('.interest-item');
    if (interestItem) {
      gsap.to(interestItem, {
        autoAlpha: 0,
        y: -6,
        duration: 0.15,
        ease: 'power2.in',
        onComplete: applyInterest
      });
    } else {
      applyInterest();
    }

    interestCharacterTabs.forEach((tab) => {
      const isActive = tab.dataset.characterInterest === interestKey;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
    });

    if (characterInterestsNextPageButton) {
      const canAdvance = interestKey === 'jack';
      characterInterestsNextPageButton.hidden = !canAdvance;
      characterInterestsNextPageButton.classList.toggle('is-visible', canAdvance);
    }
  }

  function updateGameInterestTab(interestKey) {
    const interest = gameInterestsContent[interestKey];
    if (!interest || !interestGameImage || !interestGameName || !interestGameDescription) return;
    const applyInterest = () => {
      interestGameImage.src = interest.image;
      interestGameImage.alt = interest.alt;
      interestGameName.textContent = interest.name;
      interestGameDescription.textContent = interest.description;
      const interestItem = interestGameImage.closest('.interest-item');
      if (interestItem) {
        gsap.fromTo(interestItem, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.24, ease: 'power2.out' });
      }
    };

    const interestItem = interestGameImage.closest('.interest-item');
    if (interestItem) {
      gsap.to(interestItem, {
        autoAlpha: 0,
        y: -6,
        duration: 0.15,
        ease: 'power2.in',
        onComplete: applyInterest
      });
    } else {
      applyInterest();
    }

    interestGameTabs.forEach((tab) => {
      const isActive = tab.dataset.gameInterest === interestKey;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
    });
  }

  interestTabs.forEach((tab) => {
    tab.addEventListener('click', () => updateInterestTab(tab.dataset.interest));
    tab.addEventListener('touchstart', (e) => {
      e.preventDefault();
      updateInterestTab(tab.dataset.interest);
    });
  });

  interestCharacterTabs.forEach((tab) => {
    tab.addEventListener('click', () => updateCharacterInterestTab(tab.dataset.characterInterest));
    tab.addEventListener('touchstart', (e) => {
      e.preventDefault();
      updateCharacterInterestTab(tab.dataset.characterInterest);
    });
  });

  interestGameTabs.forEach((tab) => {
    tab.addEventListener('click', () => updateGameInterestTab(tab.dataset.gameInterest));
    tab.addEventListener('touchstart', (e) => {
      e.preventDefault();
      updateGameInterestTab(tab.dataset.gameInterest);
    });
  });

  if (interestsNextPageButton) {
    interestsNextPageButton.addEventListener('click', () => {
      showMoreSubview(moreInterestsCharactersView);
      updateCharacterInterestTab('mr-wolf');
    });
  }

  if (characterInterestsNextPageButton) {
    characterInterestsNextPageButton.addEventListener('click', () => {
      showMoreSubview(moreInterestsGamesView);
      updateGameInterestTab('vrchat');
    });
  }

  updateInterestTab('beastars');
  updateCharacterInterestTab('mr-wolf');
  updateGameInterestTab('vrchat');
  renderArtistList();
  showMusicArtistList();
  refreshPlayPauseButton();
  refreshLoopButton();

  if (musicArtistBackButton) {
    musicArtistBackButton.addEventListener('click', showMusicArtistList);
  }

  if (musicPlayPauseButton && albumPlayer) {
    musicPlayPauseButton.addEventListener('click', () => {
      if (!albumPlayer.src && customTracks.length > 0) {
        playCustomTrack(0);
        return;
      }
      if (albumPlayer.paused) {
        albumPlayer.play().catch((err) => console.error('Failed to resume custom track:', err));
      } else {
        albumPlayer.pause();
      }
      refreshPlayPauseButton();
      updateMusicAnimations();
    });
  }

  if (musicPrevButton) {
    musicPrevButton.addEventListener('click', () => {
      if (customTracks.length === 0) return;
      const nextIndex = activeCustomTrackIndex <= 0 ? customTracks.length - 1 : activeCustomTrackIndex - 1;
      playCustomTrack(nextIndex);
    });
  }

  if (musicNextButton) {
    musicNextButton.addEventListener('click', () => {
      if (customTracks.length === 0) return;
      const nextIndex = (activeCustomTrackIndex + 1) % customTracks.length;
      playCustomTrack(nextIndex);
    });
  }

  if (musicLoopButton && albumPlayer) {
    musicLoopButton.addEventListener('click', () => {
      albumPlayer.loop = !albumPlayer.loop;
      refreshLoopButton();
    });
  }

  if (albumPlayer) {
    albumPlayer.addEventListener('play', () => {
      refreshPlayPauseButton();
      updateMusicAnimations();
      startEqualizerLoop().catch((err) => console.warn('Equalizer unavailable:', err));
    });
    albumPlayer.addEventListener('pause', () => {
      refreshPlayPauseButton();
      updateMusicAnimations();
      stopEqualizerLoop();
    });
    albumPlayer.addEventListener('ended', () => {
      stopEqualizerLoop();
      if (customTracks.length === 0) return;
      const nextIndex = (activeCustomTrackIndex + 1) % customTracks.length;
      playCustomTrack(nextIndex);
    });
  }


  typeWriterStart();
});
