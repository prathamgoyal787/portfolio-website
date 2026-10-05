import type { CSSProperties } from "react";
import Script from "next/script";

const EMAIL = "prathamg2003@gmail.com";
const RESUME = "/Pratham_Resume.pdf";
const LINKEDIN = "https://www.linkedin.com/in/pratham-goyal";
const GITHUB = "https://github.com/prathamgoyal787";

const ROUTE = [
  { id: "top", label: "Start" },
  { id: "work", label: "Work" },
  { id: "badminton", label: "Badminton" },
  { id: "reading", label: "Reading" },
  { id: "music", label: "Music" },
  { id: "ai", label: "AI" },
  { id: "contact", label: "Hello" },
];

const SPINES = [
  { c: "#2B0F3A", h: "150px" },
  { c: "#0A0F2E", h: "205px" },
  { c: "#FFE7A8", h: "170px", dark: true },
  { c: "#7B2D8E", h: "190px" },
  { c: "#1B6B5A", h: "160px" },
  { c: "#F4F1FF", h: "215px", dark: true },
  { c: "#B4281B", h: "175px" },
  { c: "#FFCBA4", h: "185px", dark: true },
  { c: "#0B2447", h: "200px", lean: "11deg" },
];

const vars = (v: Record<string, string>) => v as CSSProperties;

function Ridge({ d }: { d: string }) {
  return (
    <svg className="ridge" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
      <path fill="currentColor" d={d} />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip" href="#work">Skip to content</a>
      <a className="brand" href="#top">Pratham Goyal</a>
      <nav className="route" aria-label="Sections">
        <ol>
          {ROUTE.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} data-s={id}><span>{label}</span></a>
            </li>
          ))}
        </ol>
      </nav>

      <header className="hero" id="top">
        <canvas id="stars" aria-hidden="true"></canvas>
        <div className="moon" id="moon" aria-hidden="true"></div>
        <div className="hero-in">
          <h1 className="name" aria-label="Pratham Goyal">
            <span className="ln" data-split>Pratham</span>
            <span className="ln out" data-split>Goyal</span>
          </h1>
          <p className="roleline">
            <span>I&apos;m a</span>{" "}
            <span className="roles" id="roles">
              <span className="on">backend engineer</span>
              <span>reader</span>
              <span>music lover</span>
              <span>AI explorer</span>
              <span>badminton player</span>
            </span>
          </p>
          <p className="hero-note">This page is a short journey from night to morning. Scroll, and stop wherever something looks interesting.</p>
          <div className="hero-actions">
            <a className="btn solid" id="startJourney" href="#work" style={vars({ "--fg": "var(--moon)", "--bg": "var(--night)" })}>Start the journey</a>
            <a className="btn" href={`mailto:${EMAIL}`}>Email me</a>
          </div>
        </div>
        <div className="cue" aria-hidden="true"></div>
      </header>

      <main>
        <section className="scene work" id="work" aria-labelledby="work-h">
          <Ridge d="M0 120V82L110 44L210 80L350 16L510 84L640 52L770 92L910 26L1050 82L1180 46L1310 80L1440 38V120Z" />
          <div className="sunwrap" aria-hidden="true"><div className="sun" id="sun"></div></div>
          <div className="wrap work-grid">
            <div>
              <h2 id="work-h">By day, I build backends.</h2>
              <p className="lede">I&apos;m a Senior Software Engineer at Salescode.ai in Gurugram. I design reactive Java services, and I mentor two other engineers.</p>
              <div className="actions">
                <a className="btn solid" href={RESUME}>Download résumé</a>
                <a className="btn" href={LINKEDIN}>LinkedIn</a>
                <a className="btn" href={GITHUB}>GitHub</a>
              </div>
            </div>
            <ul className="facts">
              <li><b>Reactive Java services</b><span>Spring Boot and WebFlux, non-blocking from the API down to PostgreSQL.</span></li>
              <li><b>Event-driven pipelines</b><span>Kafka and Apache Flink moving data between systems.</span></li>
              <li><b>Fast on purpose</b><span>A two-tier Redis and EhCache cache, plus indexing, cut API response time by 60%.</span></li>
            </ul>
          </div>
        </section>

        <section className="scene court" id="badminton" aria-labelledby="bad-h">
          <Ridge d="M0 120V74C180 18 360 18 540 72S900 124 1080 62S1340 28 1440 72V120Z" />
          <div className="wrap court-grid">
            <div>
              <h2 id="bad-h">I play badminton.</h2>
              <p className="lede">It&apos;s the sport I come back to.</p>
              <p className="fact-note">A shuttle slows down so sharply that even a hard hit falls almost straight down. Its feathers make that much drag.</p>
            </div>
            <svg className="court-art" id="courtArt" viewBox="0 0 1000 400" role="img" aria-label="A shuttlecock flying over a badminton net and dropping steeply on the far side.">
              <path className="guide" d="M110 340C250 20 700 -30 810 340" />
              <line className="ground" x1="40" y1="340" x2="960" y2="340" />
              <line className="netline" x1="500" y1="340" x2="500" y2="230" />
              <line className="net-top" x1="500" y1="236" x2="500" y2="228" />
              <line className="net-mesh" x1="494" y1="260" x2="506" y2="260" />
              <line className="net-mesh" x1="494" y1="285" x2="506" y2="285" />
              <line className="net-mesh" x1="494" y1="310" x2="506" y2="310" />
              <path className="trail" id="trail" d="M110 340C250 20 700 -30 810 340" />
              <g id="shuttle">
                <polygon points="-5,-4 -34,-17 -34,17 -5,4" fill="#fff" stroke="#0B2447" strokeWidth="2.5" strokeLinejoin="round" />
                <line x1="-14" y1="-8.5" x2="-14" y2="8.5" stroke="#0B2447" strokeWidth="2" />
                <line x1="-24" y1="-12.5" x2="-24" y2="12.5" stroke="#0B2447" strokeWidth="2" />
                <circle r="8.5" fill="#FF8A5B" stroke="#0B2447" strokeWidth="2.5" />
              </g>
            </svg>
          </div>
        </section>

        <section className="scene reading" id="reading" aria-labelledby="read-h">
          <Ridge d="M0 120V60Q90 20 180 60T360 60T540 60T720 60T900 60T1080 60T1260 60T1440 60V120Z" />
          <div className="wrap">
            <h2 id="read-h">Reading.</h2>
            <p className="read-text" id="readText">I love reading. Give me a good book and a quiet hour and I&apos;m happy. I&apos;m curious by nature, and books are where I go to find out how things really work, one idea at a time.</p>
            <p className="now-reading" id="nowReading">Reading right now: <b id="nowTitle"></b></p>
            <div className="shelf" id="shelf" role="img" aria-label="A shelf of books">
              {SPINES.map((s, i) => (
                <div
                  key={i}
                  className="spine"
                  style={{
                    ...vars({ "--c": s.c, "--h": s.h, ...(s.lean ? { "--lean": s.lean } : {}) }),
                    ...(s.dark ? { color: "#2B0F3A" } : {}),
                  }}
                >
                  <span></span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="scene music" id="music" aria-labelledby="music-h">
          <Ridge d="M0 120V70H80V40H150V90H230V30H300V60H380V20H440V80H540V50H610V95H700V35H790V70H880V25H960V85H1050V45H1130V75H1230V30H1320V65H1440V120Z" />
          <canvas id="waves" aria-hidden="true"></canvas>
          <div className="wrap scene-in">
            <h2 id="music-h">Music is always on.</h2>
            <p className="lede">I love music. It plays through most of my days, working or not.</p>
            <ul className="songs" id="songs"></ul>
            <p className="music-hint">Move your cursor through the sound. Click to send out a pulse.</p>
          </div>
        </section>

        <section className="scene ai" id="ai" aria-labelledby="ai-h">
          <Ridge d="M0 120V92L40 40L80 90L120 30L170 94L210 50L260 90L300 22L350 92L400 44L450 88L500 34L560 94L610 48L660 90L720 26L780 94L830 46L880 90L940 30L1000 92L1050 52L1100 88L1160 24L1220 94L1270 44L1330 90L1390 36L1440 82V120Z" />
          <div className="wrap">
            <h2 id="ai-h">Chasing what&apos;s new in AI.</h2>
            <div className="words" id="wordsBox" aria-label="Particles that spell out the words new models, new ideas, new tools and new things. Click to change the word.">
              <canvas id="words" aria-hidden="true"></canvas>
            </div>
            <div className="ai-cols">
              <p className="lede" style={{ marginTop: 0 }}>I explore AI the way some people explore cities. A new model lands, and I go and walk around it to see what it can really do.</p>
              <div>
                <ul className="ai-areas" aria-label="Areas I like to explore">
                  <li>Language</li><li>Images</li><li>Voice</li><li>Video</li><li>Music</li><li>Agents</li>
                </ul>
                <ul className="ainotes" id="ainotes"></ul>
              </div>
            </div>
            <div className="also" id="also"><p>Also into</p><ul id="alsoList"></ul></div>
          </div>
        </section>

        <footer className="scene hello" id="contact">
          <Ridge d="M0 120V80C300 20 600 110 900 60S1300 40 1440 70V120Z" />
          <div className="sunwrap" aria-hidden="true"><div className="sunrise" id="sunrise"></div></div>
          <div className="wrap">
            <p className="say" id="say">Say hello.</p>
            <a className="mail" id="mail" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <div className="row">
              <button className="btn solid" id="copy" type="button">Copy email</button>
              <a className="btn" href={LINKEDIN}>LinkedIn</a>
              <a className="btn" href={GITHUB}>GitHub</a>
              <a className="btn" href={RESUME}>Download résumé</a>
            </div>
            <p className="fine">Open to roles anywhere in India or remote. &copy; 2026 Pratham Goyal.</p>
          </div>
        </footer>
      </main>

      {/* Scene animations: vanilla JS that takes over the static markup above once the page is interactive. */}
      <Script src="/journey.js" strategy="afterInteractive" />
    </>
  );
}
