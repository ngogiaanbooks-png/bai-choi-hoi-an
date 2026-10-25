import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { asset, videoMedia } from '../data/media.js';
import { S } from '../data/strings.js';
import { useLang } from '../i18n.jsx';
import DownloadLink from './DownloadLink.jsx';

const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

// Trình phát theo khung "Chi tiết video": khung 16:9 nền than, thanh điều khiển dưới (phát, thời gian, phụ đề, tải).
// Chưa có tệp thì vẫn giữ đúng bố cục; bấm phát sẽ báo video đang được hoàn thiện.
export default function VideoPlayer({ v, start = 0, compact = false, tone = 'than' }) {
  const { L, lang } = useLang();
  const m = videoMedia(v.id);
  const src = asset(m.src);
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(start);
  const [sub, setSub] = useState(lang);
  const [notice, setNotice] = useState(false);
  const total = v.phut * 60;

  useEffect(() => {
    const el = ref.current;
    if (el && start) el.currentTime = start;
    setTime(start);
  }, [start, v.id]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    for (const tr of el.textTracks) tr.mode = tr.language === sub ? 'showing' : 'disabled';
  }, [sub, src]);

  const toggle = () => {
    const el = ref.current;
    if (!el) { setNotice(true); return; }
    if (el.paused) el.play(); else el.pause();
  };

  return (
    <div className={`player player-${tone} ${compact ? 'is-compact' : ''}`}>
      <div className="player-screen">
        {src ? (
          <video
            ref={ref}
            src={src}
            poster={asset(m.poster) || undefined}
            preload="metadata"
            playsInline
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
            onClick={toggle}
          >
            {m.vtt?.vi ? <track kind="subtitles" srcLang="vi" label="Tiếng Việt" src={asset(m.vtt.vi)} /> : null}
            {m.vtt?.en ? <track kind="subtitles" srcLang="en" label="English" src={asset(m.vtt.en)} /> : null}
          </video>
        ) : (
          <button type="button" className="player-poster" onClick={toggle} aria-label={`${lang === 'en' ? 'Play' : 'Phát'} ${v.id}`}>
            {m.poster ? <img src={asset(m.poster)} alt="" /> : <span className="player-ph">{v.id}</span>}
            <span className="player-big" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M7 4.5v15l13-7.5z" /></svg>
            </span>
          </button>
        )}
        <AnimatePresence>
          {notice ? (
            <motion.div className="player-notice" role="status" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p>{lang === 'en' ? 'This video is being finalised and will be available soon.' : 'Video đang được hoàn thiện và sẽ sớm có trên website.'}</p>
              <button type="button" className="btn btn-yellow" onClick={() => setNotice(false)}>{L(S.close)}</button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      {compact ? null : (
        <div className="player-bar">
          <div className="player-left">
            <button type="button" className="player-play" onClick={toggle} aria-label={playing ? (lang === 'en' ? 'Pause' : 'Tạm dừng') : (lang === 'en' ? 'Play' : 'Phát')}>
              {playing ? (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M6 4h4v16H6zM14 4h4v16h-4z" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M6 4l14 8-14 8z" /></svg>
              )}
            </button>
            <span className="player-time">{fmt(time)} / {fmt(ref.current?.duration || total)}</span>
          </div>
          <div className="player-right">
            <label className="player-sub">
              <span>{lang === 'en' ? 'Subtitles' : 'Phụ đề'}</span>
              <select value={sub} onChange={(e) => setSub(e.target.value)}>
                <option value="vi">Tiếng Việt</option>
                <option value="en">English</option>
                <option value="off">{lang === 'en' ? 'Off' : 'Tắt'}</option>
              </select>
            </label>
            <DownloadLink href={m.tai} variant="ghost-yellow">{lang === 'en' ? 'Download video and subtitles' : 'Tải video và phụ đề'}</DownloadLink>
          </div>
        </div>
      )}
    </div>
  );
}
