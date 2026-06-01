// src/pages/cli.js — denis.app/cli-style interactive shell. Sun lives here.
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import projectsData from '../data/projects';
import experienceData from '../data/experience';

const COMMANDS = [
  { cmd: '/whoami', desc: 'the short answer' },
  { cmd: '/projects', desc: 'things he shipped' },
  { cmd: '/experience', desc: 'where he worked' },
  { cmd: '/ask', desc: 'talk to Sun' },
  { cmd: '/contact', desc: 'ways to reach him' },
  { cmd: '/ben10', desc: 'hero time' },
  { cmd: '/help', desc: 'all commands' },
];

const BEN10 = `It's hero time. 🟢
Manjunathan's been a Ben 10 fan since the Omnitrix days — the avatar up top is an Omnitrix.
The philosophy fits the work: pick the right form for the problem, then ship.
"Sun" is just the everyday-hero version that answers questions about him.`;

const WHOAMI_KV = [
  ['USER', 'Manjunathan Radhakrishnan (CodingBad02)'],
  ['ROLE', 'AI Solutions Architect · AI Research Architect @ Antz AI'],
  ['ORIGIN', 'Hyderabad, IN · remote-friendly · IST (utc+5:30)'],
  ['FOCUS', 'agentic AI · RAG/search · decision systems · product'],
  ['SINCE', 'shipping production AI since 2022'],
];
const CONTACT_KV = [
  ['EMAIL', 'manjunathan.ai02@gmail.com'],
  ['GITHUB', 'github.com/CodingBad02'],
  ['LINKEDIN', 'linkedin.com/in/manjunathan-r-06396b1b7'],
];
const WHOAMI_LEAD = 'Manjunathan Radhakrishnan — builder. ships AI products people use; makes businesses AI-native. ex-Mad Street Den (Vue.ai), Antz AI.';

const CliPage = () => {
  const router = useRouter();
  const idRef = useRef(1);
  const mk = useCallback((kind, content, extra = {}) => ({ id: idRef.current++, kind, content, ...extra }), []);
  const [session, setSession] = useState('······');
  useEffect(() => { setSession(Math.random().toString(36).slice(2, 8)); }, []);
  const [dark, setDark] = useState(false); // terminal theme (denis defaults light/cream)
  const [lines, setLines] = useState([{ id: 0, kind: 'boot' }]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines]);
  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => {
    const onEsc = (e) => { if (e.key === 'Escape') router.push('/'); };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [router]);

  const askSun = useCallback(async (question) => {
    setBusy(true);
    const ans = mk('answer', '', { streaming: true });
    setLines((p) => [...p, ans]);
    const upd = (content, streaming) => setLines((p) => p.map((l) => (l.id === ans.id ? { ...l, content, streaming } : l)));
    try {
      const res = await fetch('/api/ask', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question }) });
      if (!res.ok || !res.body) {
        let m = 'sun: something went wrong. try again.';
        try { const d = await res.json(); if (d?.message) m = `sun: ${d.message}`; } catch {}
        upd(m, false); setBusy(false); return;
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = '';
      while (true) { const { value, done } = await reader.read(); if (done) break; acc += dec.decode(value, { stream: true }); upd(acc, true); }
      upd(acc, false);
    } catch { upd('sun: something went wrong. try again.', false); }
    finally { setBusy(false); }
  }, [mk]);

  const run = useCallback((raw) => {
    const cmd = raw.trim();
    setLines((p) => [...p, mk('prompt', raw)]);
    if (!cmd) return;
    setHistory((p) => [...p, cmd]); setHistIdx(-1);
    const [head, ...rest] = cmd.split(' ');
    const arg = rest.join(' ').trim();
    const key = head.replace(/^\//, '').toLowerCase();
    switch (key) {
      case 'help': return setLines((p) => [...p, mk('help')]);
      case 'whoami': return setLines((p) => [...p, mk('kv', WHOAMI_KV, { lead: WHOAMI_LEAD })]);
      case 'contact': return setLines((p) => [...p, mk('kv', CONTACT_KV)]);
      case 'ben10': return setLines((p) => [...p, mk('text', BEN10)]);
      case 'projects':
      case 'ls': return setLines((p) => [...p, mk('list', projectsData.map((x) => [x.title, x.description]))]);
      case 'experience': return setLines((p) => [...p, mk('list', experienceData.map((e) => [`${e.position} @ ${e.company}`, e.date]))]);
      case 'clear': return setLines([]);
      case 'ask': return arg ? askSun(arg) : setLines((p) => [...p, mk('text', 'usage: /ask <question>')]);
      default: return askSun(cmd);
    }
  }, [askSun, mk]);

  const onSubmit = (e) => { e.preventDefault(); if (busy) return; const v = input; setInput(''); run(v); };
  const onKeyDown = (e) => {
    if (e.key === 'ArrowUp') { e.preventDefault(); if (!history.length) return; const i = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1); setHistIdx(i); setInput(history[i]); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); if (histIdx === -1) return; const i = histIdx + 1; if (i >= history.length) { setHistIdx(-1); setInput(''); } else { setHistIdx(i); setInput(history[i]); } }
  };

  // theme class helpers
  const t = dark
    ? { paper: 'bg-[#0d0d10]', panel: 'bg-[#141418]', bar: 'bg-white/5', ink: 'text-gray-200', muted: 'text-gray-500', green: 'text-emerald-400', line: 'border-white/10', chip: 'border-white/15', prompt: 'bg-white/5' }
    : { paper: 'bg-term-paper', panel: 'bg-term-panel', bar: 'bg-term-bar', ink: 'text-term-ink', muted: 'text-term-muted', green: 'text-term-green', line: 'border-[rgba(26,30,28,0.12)]', chip: 'border-[rgba(26,30,28,0.18)]', prompt: 'bg-term-bar' };

  const showSlash = input.startsWith('/');
  const slashMatches = COMMANDS.filter((c) => c.cmd.startsWith(input.split(' ')[0]));

  return (
    <>
      <Head>
        <title>CLI | Manjunathan Radhakrishnan</title>
        <meta name="description" content="Interactive terminal — ask Sun anything about Manjunathan." />
      </Head>

      <main className={`min-h-screen ${dark ? 'bg-[#0a0a0b]' : 'bg-term-paper'} font-mono text-[13px] transition-colors`}>
        <div className="mx-auto max-w-5xl px-4 py-6">
          {/* top strip */}
          <div className={`flex items-center justify-between mb-3 ${t.muted}`}>
            <Link href="/" className="hover:underline">← manjunathan.me / cli</Link>
            <span>exit <kbd className={`px-1 border ${t.chip} rounded`}>esc</kbd> · <kbd className={`px-1 border ${t.chip} rounded`}>⌘K</kbd></span>
          </div>

          {/* terminal window */}
          <div className={`rounded-xl overflow-hidden border ${t.line} ${t.panel} shadow-2xl cursor-text`} onClick={() => inputRef.current?.focus()}>
            {/* title bar */}
            <div className={`flex items-center gap-2 px-4 py-2.5 border-b ${t.line}`}>
              <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
              <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
              <span className="h-3 w-3 rounded-full bg-[#28C840]" />
              <span className={`flex-1 text-center ${t.muted}`}>sun@manjunathan.me: ~/cli · <span className="text-[#28C840]">●</span> {session}</span>
              <button onClick={(e) => { e.stopPropagation(); setDark((v) => !v); }} className={`rounded-full border ${t.chip} px-2.5 py-0.5 text-xs ${t.ink}`}>
                ● {dark ? 'Dark' : 'Light'}
              </button>
            </div>

            {/* body */}
            <div ref={scrollRef} className={`h-[72vh] overflow-y-auto px-4 py-4 leading-relaxed ${t.ink} scrollbar-hide`}>
              {lines.map((l) => {
                if (l.kind === 'boot') {
                  return (
                    <div key={l.id} className="mb-4">
                      <div className="flex items-start gap-3">
                        <img src="/images/omnitrix.png" alt="Omnitrix" className="h-14 w-14 [image-rendering:pixelated]" title="huge Ben 10 fan — it's hero time" />
                        <div>
                          <div className={t.ink}><span className="font-semibold">sun.cli</span> <span className={t.muted}>v1.0.0</span></div>
                          <div className={t.muted}>Gemini Flash-Lite · session {session}</div>
                          <div className={t.muted}>~/manjunathan.me</div>
                        </div>
                      </div>
                      <p className={`mt-3 ${t.muted}`}>
                        <span className={t.green}>psst</span> — that's an Omnitrix. Manjunathan's a huge Ben 10 fan, so consider this his "hero time". try <kbd className={`px-1 border ${t.chip} rounded`}>/ben10</kbd>.
                      </p>
                      <p className={`mt-2 ${t.muted}`}>
                        tip: press <kbd className={`px-1 border ${t.chip} rounded`}>/</kbd> to browse commands, or just ask anything.
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {COMMANDS.map((c) => (
                          <button key={c.cmd} onClick={() => run(c.cmd === '/ask' ? '/ask what has he built?' : c.cmd)}
                            className={`rounded-[3px] border ${t.chip} px-2.5 py-1 text-[11px]`}>
                            <span className={`${t.green} font-medium`}>{c.cmd}</span> <span className={t.muted}>{c.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                }
                if (l.kind === 'prompt') return (
                  <div key={l.id} className={`-mx-4 px-4 py-1 mt-2 ${t.prompt}`}><span className={t.green}>›</span> <span className={t.ink}>{l.content}</span></div>
                );
                if (l.kind === 'kv') return (
                  <div key={l.id} className="mt-2 mb-1">
                    {l.lead && <p className={`mb-2 ${t.ink}`}><span className={`${t.green} font-semibold`}>{l.lead.split(' — ')[0]}</span> — {l.lead.split(' — ')[1]}</p>}
                    {l.content.map(([k, v]) => (
                      <div key={k} className="flex gap-4 py-0.5"><span className={`${t.muted} w-24 shrink-0`}>{k}</span><span className={t.ink}>{v}</span></div>
                    ))}
                  </div>
                );
                if (l.kind === 'list') return (
                  <div key={l.id} className="mt-2 mb-1">
                    {l.content.map(([k, v], i) => (
                      <div key={i} className="flex gap-3 py-0.5"><span className={`${t.green} shrink-0`}>›</span><span className={`${t.ink} font-medium shrink-0 whitespace-nowrap`}>{k}</span><span className={`${t.muted} hidden sm:inline`}>— {v}</span></div>
                    ))}
                  </div>
                );
                if (l.kind === 'help') return (
                  <div key={l.id} className="mt-2 mb-1">
                    {COMMANDS.map((c) => (
                      <div key={c.cmd} className="flex gap-3 py-0.5"><span className={`${t.green} w-28 shrink-0`}>{c.cmd}</span><span className={t.muted}>{c.desc}</span></div>
                    ))}
                  </div>
                );
                if (l.kind === 'answer') return (
                  <div key={l.id} className={`mt-1 mb-1 font-mono prose prose-sm max-w-none prose-p:my-1.5 prose-li:my-0.5 prose-headings:font-mono prose-strong:font-mono ${dark ? 'prose-invert' : ''}`}>
                    {l.content ? <ReactMarkdown>{l.content}</ReactMarkdown> : <span className={t.muted}>sun is thinking…</span>}
                    {l.streaming && <span className="cursor align-middle ml-0.5" />}
                  </div>
                );
                return <pre key={l.id} className={`whitespace-pre-wrap break-words font-mono text-[13px] leading-relaxed ${t.ink} mt-1`}>{l.content}</pre>;
              })}

              {/* slash autocomplete */}
              {showSlash && slashMatches.length > 0 && (
                <div className={`mt-2 rounded-md border ${t.line} ${t.bar} p-1`}>
                  {slashMatches.map((c) => (
                    <button key={c.cmd} onClick={() => { setInput(''); run(c.cmd); }} className={`flex w-full gap-3 px-2 py-1 text-left rounded ${t.ink}`}>
                      <span className={`${t.green} w-24`}>{c.cmd}</span><span className={t.muted}>{c.desc}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* input */}
              <form onSubmit={onSubmit} className="flex gap-2 mt-2">
                <span className={t.green}>›</span>
                <input
                  ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={onKeyDown}
                  disabled={busy} autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck={false}
                  placeholder={busy ? 'sun is responding…' : 'type / for commands, or just ask anything…'}
                  className={`flex-1 bg-transparent border-0 p-0 outline-none focus:ring-0 shadow-none ${t.ink} disabled:opacity-60`}
                  aria-label="terminal input"
                />
                <span className={`${t.muted} hidden sm:inline`}>↵ send · / commands</span>
              </form>
            </div>

            {/* footer bar */}
            <div className={`flex items-center justify-between px-4 py-2 border-t ${t.line} ${t.muted} text-[11px]`}>
              <span><span className="text-term-orange">▶▶</span> by using this shell you accept the <Link href="/terms" className="underline hover:opacity-80">Terms</Link> & <Link href="/privacy" className="underline hover:opacity-80">Privacy</Link></span>
              <span>⌘K · /help</span>
            </div>
          </div>

          <p className={`mt-3 text-center text-[11px] ${dark ? 'text-gray-500' : 'text-term-muted'}`}>
            Heads-up: replies are AI-generated (Gemini). · MANJUNATHAN.ME · /CLI · MMXXVI
          </p>
        </div>
      </main>
    </>
  );
};

export default CliPage;
