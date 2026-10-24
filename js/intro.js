/* Opening intro video. Loaded synchronously right after the #tsk-intro markup,
   so a returning visitor never sees the overlay flash. */
(function () {
  var root = document.getElementById('tsk-intro');
  if (!root) return;
  var v = document.getElementById('tsk-video'), hint = root.querySelector('.hint'),
      skip = document.getElementById('tsk-skip'), snd = document.getElementById('tsk-snd');
  var KEY = 'tskIntroSeen', started = false, finished = false, moved = 0, lastX = null, lastY = null;
  var html = document.documentElement;

  function seen() { try { return sessionStorage.getItem(KEY) === '1'; } catch (e) { return false; } }
  function mark() { try { sessionStorage.setItem(KEY, '1'); } catch (e) {} }
  var force = /[?&]intro=1/.test(location.search);
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!force && (seen() || reduce)) { root.parentNode.removeChild(root); return; }

  html.classList.add('tsk-lock');
  var touch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
  if (touch && hint) hint.textContent = 'Tap to begin';

  function finish() {
    if (finished) return; finished = true; mark();
    try { v.pause(); } catch (e) {}
    root.classList.add('done');
    html.classList.remove('tsk-lock');
    removeEventListener('mousemove', onMove); removeEventListener('touchstart', onTouch); removeEventListener('keydown', onKey);
    setTimeout(function () { if (root.parentNode) root.parentNode.removeChild(root); }, 1100);
  }

  function play() {
    if (started || finished) return; started = true;
    v.muted = false; v.volume = 1;
    var p = v.play();
    function playing() { root.classList.add('playing'); }
    if (p && p.then) {
      p.then(playing).catch(function () {
        // sound blocked by the browser: play silently, offer a Sound on button
        v.muted = true;
        v.play().then(function () { playing(); snd.classList.add('show'); })
                .catch(function () { started = false; });
      });
    } else { playing(); }
  }

  function onMove(e) {
    if (lastX !== null) moved += Math.abs(e.clientX - lastX) + Math.abs(e.clientY - lastY);
    lastX = e.clientX; lastY = e.clientY;
    if (moved > 24) play();
  }
  function onTouch(e) { if (e.target === skip) return; play(); }
  function onKey(e) {
    if (e.key === 'Escape') finish();
    else if ((e.key === ' ' || e.key === 'Enter') && !started) { e.preventDefault(); play(); }
  }
  addEventListener('mousemove', onMove, { passive: true });
  addEventListener('touchstart', onTouch, { passive: true });
  addEventListener('keydown', onKey);

  // Browsers only allow sound after a real click / tap / key press (not mouse movement).
  root.addEventListener('click', function (e) {
    if (e.target === skip) return;
    if (!started) { play(); return; }
    if (v.muted) { v.muted = false; snd.classList.remove('show'); }
  });
  snd.addEventListener('click', function (e) { e.stopPropagation(); v.muted = false; v.volume = 1; snd.classList.remove('show'); });
  skip.addEventListener('click', function (e) { e.stopPropagation(); finish(); });

  v.addEventListener('ended', finish);
  v.addEventListener('timeupdate', function () { if (v.duration && v.currentTime > v.duration - 0.12) finish(); });
  v.addEventListener('error', finish);
  document.addEventListener('visibilitychange', function () {
    if (!started || finished) return;
    if (document.hidden) v.pause(); else if (!v.ended) v.play().catch(function () {});
  });
})();
