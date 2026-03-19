import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "About", "Skills", "Contact"];

const SKILLS = [
  { name: "Core Java", icon: "☕", level: 70 },
  { name: "HTML", icon: "🌐", level: 85 },
  { name: "CSS", icon: "🎨", level: 80 },
  { name: "VS Code", icon: "💻", level: 90 },
  { name: "Git & GitHub", icon: "🐙", level: 65 },
];

const GLITCH_CHARS = "!<>-_\\/[]{}—=+*^?#@$%";

function GlitchText({ text }) {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef(null);

  const glitch = () => {
    let iter = 0;
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDisplay(
        text.split("").map((char, i) =>
          i < iter ? text[i] : char === " " ? " " : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        ).join("")
      );
      iter += 0.5;
      if (iter >= text.length) clearInterval(intervalRef.current);
    }, 30);
  };

  useEffect(() => {
    glitch();
    return () => clearInterval(intervalRef.current);
  }, []);

  return <span onMouseEnter={glitch} style={{ fontFamily: "'Courier New', monospace" }}>{display}</span>;
}

export default function SanjayPortfolio() {
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 200);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
  };

  return (
    <div style={S.root}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { width: 100%; min-height: 100vh; overflow-x: hidden; background: #030b14; }
        #root { width: 100%; }
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap');

        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; } 50% { opacity: 0; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 10px #00ffe7, 0 0 20px #00ffe740; }
          50% { box-shadow: 0 0 20px #00ffe7, 0 0 40px #00ffe770, 0 0 60px #00ffe730; }
        }
        @keyframes grid-move {
          from { background-position: 0 0; }
          to { background-position: 40px 40px; }
        }
        @keyframes border-glow {
          0%, 100% { border-color: #00ffe780; }
          50% { border-color: #00ffe7; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .nav-btn:hover { color: #00ffe7 !important; text-shadow: 0 0 8px #00ffe7 !important; }
        .skill-bar { transition: width 1.2s cubic-bezier(.4,0,.2,1); }
        .contact-card:hover { border-color: #00ffe7 !important; transform: translateX(6px); }
        .scroll-btn:hover { background: #00ffe7 !important; color: #030b14 !important; }
        .outline-btn:hover { background: #00ffe720 !important; }
      `}</style>

      {/* Scanline overlay */}
      <div style={S.scanline} />

      {/* Grid background */}
      <div style={S.gridBg} />

      {/* HEADER */}
      <header style={{ ...S.header, ...(scrolled ? S.headerScrolled : {}) }}>
        <div style={S.logoWrap}>
          <span style={S.logoBracket}>[</span>
          <span style={S.logoMain}>SPG</span>
          <span style={S.logoBracket}>]</span>
        </div>
        <nav style={S.nav}>
          {NAV_LINKS.map((item) => (
            <button
              key={item}
              className="nav-btn"
              onClick={() => scrollTo(item)}
              style={{ ...S.navBtn, ...(active === item ? S.navActive : {}) }}
            >
              {active === item && <span style={S.navDot}>▶ </span>}
              {item}
            </button>
          ))}
        </nav>
      </header>

      {/* HOME */}
      <section id="home" style={S.home}>
        <div style={S.homeGlow} />
        <div style={{ ...S.homeContent, opacity: loaded ? 1 : 0, animation: loaded ? "fadeUp 0.8s ease forwards" : "none" }}>
          <div style={S.tag}>&lt; developer /&gt;</div>
          <h1 style={S.heroName}>
            <GlitchText text="Sanjay Puri Goswami" />
          </h1>
          <div style={S.termLine}>
            <span style={S.prompt}>~$</span>
            <span style={S.termText}> BCA 1st Year Student</span>
            <span style={{ ...S.cursor, animation: "blink 1s infinite" }}>█</span>
          </div>
          <p style={S.heroRole}>// Aspiring Full Stack Developer 🚀</p>
          <div style={S.heroBtns}>
            <button className="scroll-btn" onClick={() => scrollTo("Contact")} style={S.primaryBtn}>
              CONTACT_ME.exe
            </button>
            <button className="outline-btn" onClick={() => scrollTo("Skills")} style={S.outlineBtn}>
              VIEW_SKILLS()
            </button>
          </div>
        </div>
        {/* Floating decorative element */}
        <div style={S.floatingBox}>
          <div style={S.floatInner}>
            <div style={S.floatLine}>STATUS: ONLINE</div>
            <div style={S.floatLine}>MODE: LEARNING</div>
            <div style={S.floatLine}>STACK: FULL</div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={S.section}>
        <div style={S.sectionInner}>
          <div style={S.sectionHead}>
            <span style={S.sectionNum}>01.</span>
            <h2 style={S.sectionTitle}>ABOUT_ME</h2>
            <div style={S.headLine} />
          </div>
          <div style={S.aboutGrid}>
            <div style={S.aboutLeft}>
              <div style={S.avatarBox}>
                <div style={S.avatarInner}>SPG</div>
                <div style={S.avatarRing} />
              </div>
            </div>
            <div style={S.aboutRight}>
              {[
                { label: "NAME", value: "Sanjay Puri Goswami" },
                { label: "COURSE", value: "BCA — 1st Year" },
                { label: "STATUS", value: "Currently Learning" },
                { label: "LEARNING", value: "Core Java, HTML, CSS" },
                { label: "GOAL", value: "Full Stack Developer" },
              ].map((row) => (
                <div key={row.label} style={S.infoRow}>
                  <span style={S.infoKey}>{row.label}</span>
                  <span style={S.infoSep}> :: </span>
                  <span style={S.infoVal}>{row.value}</span>
                </div>
              ))}
              <p style={S.aboutBio}>
                Passionate about software development and web technologies. Building a strong foundation to create efficient, real-world applications. Ready to level up. 🎯
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ ...S.section, background: "#060e1a" }}>
        <div style={S.sectionInner}>
          <div style={S.sectionHead}>
            <span style={S.sectionNum}>02.</span>
            <h2 style={S.sectionTitle}>SKILL_SET</h2>
            <div style={S.headLine} />
          </div>
          <div style={S.skillsWrap}>
            {SKILLS.map((skill, i) => (
              <div
                key={skill.name}
                onMouseEnter={() => setHoveredSkill(i)}
                onMouseLeave={() => setHoveredSkill(null)}
                style={{
                  ...S.skillRow,
                  borderColor: hoveredSkill === i ? "#00ffe7" : "#00ffe720",
                  background: hoveredSkill === i ? "#00ffe708" : "transparent",
                  transition: "all 0.3s",
                }}
              >
                <span style={S.skillIcon}>{skill.icon}</span>
                <div style={S.skillInfo}>
                  <div style={S.skillTop}>
                    <span style={S.skillName}>{skill.name}</span>
                    <span style={S.skillPct}>{skill.level}%</span>
                  </div>
                  <div style={S.barTrack}>
                    <div
                      className="skill-bar"
                      style={{ ...S.barFill, width: hoveredSkill === i || loaded ? `${skill.level}%` : "0%" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={S.section}>
        <div style={S.sectionInner}>
          <div style={S.sectionHead}>
            <span style={S.sectionNum}>03.</span>
            <h2 style={S.sectionTitle}>CONTACT</h2>
            <div style={S.headLine} />
          </div>
          <div style={S.contactWrap}>
            {[
              { icon: "📞", label: "PHONE", value: "+91 7772862754", href: "tel:+917772862754" },
              { icon: "📧", label: "EMAIL", value: "sanjaygoswami2754@gmail.com", href: "mailto:sanjaygoswami2754@gmail.com" },
              { icon: "📍", label: "LOCATION", value: "Madhya Pradesh, India", href: null },
            ].map((item) => (
              <div key={item.label} className="contact-card" style={S.contactCard}>
                <span style={S.contactIcon}>{item.icon}</span>
                <div>
                  <div style={S.contactLabel}>{item.label}</div>
                  {item.href ? (
                    <a href={item.href} style={S.contactVal}>{item.value}</a>
                  ) : (
                    <span style={S.contactValPlain}>{item.value}</span>
                  )}
                </div>
                <span style={S.contactArrow}>→</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={S.footer}>
        <div style={S.footerLine} />
        <p style={S.footerText}>
          <span style={{ color: "#00ffe7" }}>©</span> 2026 Sanjay Puri Goswami &nbsp;|&nbsp; Built with React
        </p>
      </footer>
    </div>
  );
}

const S = {
  root: {
    fontFamily: "'Share Tech Mono', 'Courier New', monospace",
    background: "#030b14",
    color: "#c8d8e8",
    width: "100%",
    minHeight: "100vh",
    overflowX: "hidden",
    position: "relative",
  },
  scanline: {
    position: "fixed",
    top: 0, left: 0, right: 0,
    height: "2px",
    background: "linear-gradient(transparent, #00ffe720, transparent)",
    zIndex: 9999,
    pointerEvents: "none",
    animation: "scanline 6s linear infinite",
  },
  gridBg: {
    position: "fixed",
    inset: 0,
    backgroundImage: "linear-gradient(#00ffe708 1px, transparent 1px), linear-gradient(90deg, #00ffe708 1px, transparent 1px)",
    backgroundSize: "40px 40px",
    animation: "grid-move 4s linear infinite",
    pointerEvents: "none",
    zIndex: 0,
  },
  header: {
    position: "fixed",
    top: 0, left: 0,
    width: "100%",
    zIndex: 100,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 48px",
    background: "transparent",
    transition: "all 0.4s",
  },
  headerScrolled: {
    background: "rgba(3,11,20,0.92)",
    borderBottom: "1px solid #00ffe730",
    backdropFilter: "blur(10px)",
  },
  logoWrap: { display: "flex", alignItems: "center", gap: 2 },
  logoBracket: { color: "#00ffe7", fontSize: 22, fontWeight: 700 },
  logoMain: { color: "#fff", fontSize: 20, fontWeight: 700, letterSpacing: 3, fontFamily: "'Orbitron', monospace" },
  nav: { display: "flex", gap: 4 },
  navBtn: {
    background: "none",
    border: "none",
    color: "#8899aa",
    fontSize: 13,
    letterSpacing: 2,
    padding: "8px 16px",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.2s",
  },
  navActive: { color: "#00ffe7", textShadow: "0 0 8px #00ffe7" },
  navDot: { color: "#00ffe7", fontSize: 10 },

  home: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 1,
    padding: "80px 48px 40px",
    flexWrap: "wrap",
    gap: 40,
  },
  homeGlow: {
    position: "absolute",
    width: 600,
    height: 600,
    borderRadius: "50%",
    background: "radial-gradient(circle, #00ffe715 0%, transparent 70%)",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    pointerEvents: "none",
  },
  homeContent: { zIndex: 1, maxWidth: 560 },
  tag: {
    color: "#00ffe7",
    fontSize: 13,
    letterSpacing: 3,
    marginBottom: 20,
    opacity: 0.8,
  },
  heroName: {
    fontFamily: "'Orbitron', monospace",
    fontSize: "clamp(1.8rem, 4vw, 3rem)",
    fontWeight: 900,
    color: "#fff",
    marginBottom: 20,
    lineHeight: 1.2,
    textShadow: "0 0 30px #00ffe730",
  },
  termLine: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    marginBottom: 10,
    fontSize: 16,
  },
  prompt: { color: "#00ffe7", fontWeight: 700 },
  termText: { color: "#c8d8e8" },
  cursor: { color: "#00ffe7", fontSize: 18 },
  heroRole: { color: "#556677", fontSize: 14, marginBottom: 36, letterSpacing: 1 },
  heroBtns: { display: "flex", gap: 16, flexWrap: "wrap" },
  primaryBtn: {
    background: "#00ffe7",
    color: "#030b14",
    border: "none",
    padding: "12px 28px",
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: 2,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.2s",
    clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
  },
  outlineBtn: {
    background: "transparent",
    color: "#00ffe7",
    border: "1px solid #00ffe750",
    padding: "12px 28px",
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: 2,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.2s",
  },
  floatingBox: {
    zIndex: 1,
    border: "1px solid #00ffe730",
    padding: "24px 28px",
    background: "#00ffe705",
    animation: "float 4s ease-in-out infinite, pulse-glow 3s ease-in-out infinite",
    minWidth: 200,
  },
  floatInner: { display: "flex", flexDirection: "column", gap: 10 },
  floatLine: { color: "#00ffe7", fontSize: 12, letterSpacing: 2 },

  section: {
    padding: "100px 48px",
    position: "relative",
    zIndex: 1,
    background: "#030b14",
  },
  sectionInner: { maxWidth: 860, margin: "0 auto" },
  sectionHead: { display: "flex", alignItems: "center", gap: 16, marginBottom: 56 },
  sectionNum: { color: "#00ffe7", fontSize: 13, fontWeight: 700, letterSpacing: 2 },
  sectionTitle: {
    fontFamily: "'Orbitron', monospace",
    fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
    fontWeight: 700,
    color: "#fff",
    letterSpacing: 4,
  },
  headLine: { flex: 1, height: 1, background: "linear-gradient(90deg, #00ffe730, transparent)" },

  aboutGrid: { display: "flex", gap: 48, alignItems: "flex-start", flexWrap: "wrap" },
  aboutLeft: { display: "flex", justifyContent: "center", flexShrink: 0 },
  avatarBox: { position: "relative", width: 120, height: 120 },
  avatarInner: {
    width: 120, height: 120,
    background: "linear-gradient(135deg, #00ffe715, #00ffe730)",
    border: "2px solid #00ffe7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Orbitron', monospace",
    fontSize: 22,
    fontWeight: 900,
    color: "#00ffe7",
    boxShadow: "0 0 30px #00ffe740",
    animation: "pulse-glow 3s ease-in-out infinite",
  },
  avatarRing: {
    position: "absolute",
    inset: -8,
    border: "1px solid #00ffe730",
    animation: "border-glow 2s ease-in-out infinite",
  },
  aboutRight: { flex: 1, minWidth: 260 },
  infoRow: { display: "flex", alignItems: "baseline", gap: 4, marginBottom: 14, fontSize: 14 },
  infoKey: { color: "#00ffe7", letterSpacing: 2, minWidth: 90, fontSize: 12 },
  infoSep: { color: "#334455" },
  infoVal: { color: "#c8d8e8" },
  aboutBio: { marginTop: 24, color: "#778899", lineHeight: 1.8, fontSize: 14, borderLeft: "2px solid #00ffe730", paddingLeft: 16 },

  skillsWrap: { display: "flex", flexDirection: "column", gap: 16 },
  skillRow: {
    display: "flex",
    alignItems: "center",
    gap: 20,
    padding: "16px 20px",
    border: "1px solid #00ffe720",
    cursor: "default",
  },
  skillIcon: { fontSize: 24, width: 36, textAlign: "center", flexShrink: 0 },
  skillInfo: { flex: 1 },
  skillTop: { display: "flex", justifyContent: "space-between", marginBottom: 8 },
  skillName: { color: "#c8d8e8", fontSize: 14, letterSpacing: 1 },
  skillPct: { color: "#00ffe7", fontSize: 13, fontWeight: 700 },
  barTrack: { height: 4, background: "#00ffe715", width: "100%" },
  barFill: { height: "100%", background: "linear-gradient(90deg, #00ffe7, #00ccbb)", transition: "width 1.2s cubic-bezier(.4,0,.2,1)" },

  contactWrap: { display: "flex", flexDirection: "column", gap: 16, maxWidth: 600 },
  contactCard: {
    display: "flex",
    alignItems: "center",
    gap: 20,
    padding: "20px 24px",
    border: "1px solid #00ffe720",
    background: "#00ffe705",
    cursor: "pointer",
    transition: "all 0.3s",
  },
  contactIcon: { fontSize: 22, flexShrink: 0 },
  contactLabel: { color: "#00ffe7", fontSize: 11, letterSpacing: 3, marginBottom: 4 },
  contactVal: { color: "#c8d8e8", fontSize: 15, textDecoration: "none" },
  contactValPlain: { color: "#c8d8e8", fontSize: 15 },
  contactArrow: { marginLeft: "auto", color: "#00ffe730", fontSize: 18 },

  footer: { position: "relative", zIndex: 1, padding: "32px 48px", textAlign: "center" },
  footerLine: { height: 1, background: "linear-gradient(90deg, transparent, #00ffe730, transparent)", marginBottom: 24 },
  footerText: { color: "#445566", fontSize: 13, letterSpacing: 2 },
};
