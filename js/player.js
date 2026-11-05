// Player de música: um único <audio> compartilhado por todos os álbuns.

const audio = new Audio();
audio.preload = "auto";

let current = null; // { album: índice, track: índice }

const albumsEl = document.getElementById("albums");

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}

function volumeIcon(volume) {
  const speaker =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor"/>';
  let waves;
  if (volume === 0) {
    waves = '<line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>';
  } else if (volume < 0.5) {
    waves = '<path d="M15.5 8.5a5 5 0 0 1 0 7"/>';
  } else {
    waves = '<path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/>';
  }
  return speaker + waves + "</svg>";
}

function albumTemplate(album) {
  const label = album.commissioned
    ? '<span class="pt">Composições Originais sob Encomenda</span><span class="en">Commissioned Original Compositions</span>'
    : '<span class="pt">Álbum</span><span class="en">Album</span>';
  const singular = album.tracks.length === 1;
  const platformsButton = album.link
    ? `<br><br><a class="btn" href="${escapeHtml(album.link)}" target="_blank" rel="noopener">
         <span class="pt">Ouvir em todas as plataformas</span><span class="en">Listen on all platforms</span></a>`
    : "";

  return `
    <div class="box">
      <h3>${label}</h3>
      <div class="album">
        <div class="cover"><img src="${album.cover}" alt=""></div>
        <div>
          <h2>${escapeHtml(album.title)} (${escapeHtml(album.year)})</h2>
          ${escapeHtml(album.artist)} · ${album.tracks.length}
          <span class="pt">${singular ? "faixa" : "faixas"}</span><span class="en">${singular ? "track" : "tracks"}</span>
          ${platformsButton}
          <div class="display">
            <div class="now-playing">&gt; <span class="pt">escolha uma faixa</span><span class="en">pick a track</span></div>
          </div>
          <div class="controls">
            <button data-action="prev">◀◀</button>
            <button data-action="play">▶</button>
            <button data-action="next">▶▶</button>
            <button data-action="stop">■</button>
            <input class="seek" type="range" min="0" max="100" value="0">
            <span class="time">0:00</span>
            <span class="volume-group">
              <button type="button" class="volume-btn" title="Volume" aria-label="Volume"></button>
              <input type="range" class="volume" min="0" max="100" value="100" title="Volume">
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="box">
      <h3><span class="pt">Faixas</span><span class="en">Tracklist</span></h3>
      <div class="tracklist"></div>
    </div>`;
}

function renderAlbum(album, albumIndex) {
  const wrapper = document.createElement("div");
  wrapper.style.cssText = "display:grid;gap:12px";
  wrapper.innerHTML = albumTemplate(album);

  const find = (selector) => wrapper.querySelector(selector);
  const ui = {
    nowPlaying: find(".now-playing"),
    playButton: find('[data-action="play"]'),
    seek: find(".seek"),
    time: find(".time"),
    volume: find(".volume"),
    volumeButton: find(".volume-btn"),
    rows: [],
  };
  album.ui = ui;

  ui.volumeButton.innerHTML = volumeIcon(1);
  ui.volume.oninput = () => setVolume(ui.volume.value / 100);
  ui.volumeButton.onclick = () => setVolume(audio.volume > 0 ? 0 : 1);

  const tracklist = find(".tracklist");
  album.tracks.forEach((track, trackIndex) => {
    const row = document.createElement("div");
    row.className = "track";
    row.innerHTML = `<span>${trackIndex + 1}. ${escapeHtml(track.name)}</span><span>▶</span>`;
    row.onclick = () => playTrack(albumIndex, trackIndex);
    tracklist.appendChild(row);
    ui.rows.push(row);
  });

  const isCurrent = () => current && current.album === albumIndex;

  ui.playButton.onclick = () => {
    if (!isCurrent()) return playTrack(albumIndex, 0);
    audio.paused ? play() : audio.pause();
  };
  find('[data-action="next"]').onclick = () =>
    playTrack(albumIndex, isCurrent() ? current.track + 1 : 0);
  find('[data-action="prev"]').onclick = () =>
    playTrack(albumIndex, isCurrent() ? Math.max(0, current.track - 1) : 0);
  find('[data-action="stop"]').onclick = () => {
    audio.pause();
    audio.currentTime = 0;
  };
  ui.seek.oninput = () => {
    if (isCurrent() && audio.duration) audio.currentTime = (ui.seek.value / 100) * audio.duration;
  };

  albumsEl.appendChild(wrapper);
}

function setVolume(volume) {
  audio.volume = volume;
  ALBUMS.forEach((album) => {
    album.ui.volume.value = Math.round(volume * 100);
    album.ui.volumeButton.innerHTML = volumeIcon(volume);
  });
}

function showMessage(text) {
  if (current) ALBUMS[current.album].ui.nowPlaying.textContent = "> " + text;
}

function play() {
  const promise = audio.play();
  if (promise && promise.catch) {
    promise.catch((error) => {
      if (error.name !== "AbortError") showMessage("erro ao carregar a faixa / load error");
    });
  }
}

function playTrack(albumIndex, trackIndex) {
  const album = ALBUMS[albumIndex];
  if (trackIndex < 0 || trackIndex >= album.tracks.length) return;

  if (current && current.album !== albumIndex) resetAlbumUi(ALBUMS[current.album].ui);

  current = { album: albumIndex, track: trackIndex };
  audio.src = album.tracks[trackIndex].file;
  showMessage(album.tracks[trackIndex].name);
  album.ui.rows.forEach((row, i) => row.classList.toggle("playing", i === trackIndex));
  play();
}

function resetAlbumUi(ui) {
  ui.rows.forEach((row) => row.classList.remove("playing"));
  ui.playButton.textContent = "▶";
  ui.seek.value = 0;
  ui.time.textContent = "0:00";
}

function formatTime(seconds) {
  const s = Math.floor(seconds);
  return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
}

audio.onplay = () => { if (current) ALBUMS[current.album].ui.playButton.textContent = "❚❚"; };
audio.onpause = () => { if (current) ALBUMS[current.album].ui.playButton.textContent = "▶"; };
audio.onended = () => { if (current) playTrack(current.album, current.track + 1); };
audio.onerror = () => showMessage("erro ao carregar a faixa / load error");
audio.ontimeupdate = () => {
  if (!current || !audio.duration) return;
  const ui = ALBUMS[current.album].ui;
  ui.seek.value = (audio.currentTime / audio.duration) * 100;
  ui.time.textContent = formatTime(audio.currentTime);
};

ALBUMS.forEach(renderAlbum);
