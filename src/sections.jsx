// All the landing page sections except the hero.
// Each section is exported on `window.*`.

const { useEffect, useRef, useState } = React;

// ─────────────────────────────────────────────────────────────────────────
// Reveal-on-scroll observer
// ─────────────────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
window.useReveal = useReveal;

// ─────────────────────────────────────────────────────────────────────────
// Eyebrow / section header bits
// ─────────────────────────────────────────────────────────────────────────
function Eyebrow({ children, icon = "circle-dot" }) {
  return (
    <div className="reveal inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-medium"
    style={{ background: "var(--kv-purple-50)", color: "var(--kv-purple-700)", border: "1px solid var(--kv-border)" }}>
      <Icon name={icon} size={13} strokeWidth={2.2} />
      {children}
    </div>);

}

function SectionTitle({ kicker, title, lead, align = "left" }) {
  return (
    <div className={align === "center" ? "text-center max-w-3xl mx-auto" : "max-w-3xl"}>
      {kicker && <div className="mb-4"><Eyebrow>{kicker}</Eyebrow></div>}
      <h2 className="reveal reveal-d1 font-display font-semibold text-[36px] sm:text-[44px] md:text-[52px] leading-[1.05]"
      style={{ color: "var(--kv-ink)" }}>
        {title}
      </h2>
      {lead &&
      <p className="reveal reveal-d2 mt-5 text-[17px] md:text-[19px] leading-relaxed"
      style={{ color: "var(--kv-muted)", textWrap: "pretty" }}>
          {lead}
        </p>
      }
    </div>);

}
window.SectionTitle = SectionTitle;
window.Eyebrow = Eyebrow;

// ─────────────────────────────────────────────────────────────────────────
// 1. Nav
// ─────────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
  ["Como funciona", "#como-funciona"],
  ["Capacidades", "#capacidades"],
  ["Casos", "#casos"],
  ["FAQ", "#faq"]];

  return (
    <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${scrolled ? "py-2" : "py-3"}`}>
      <div className="mx-auto max-w-7xl px-5">
        <div className={`flex items-center justify-between rounded-2xl transition-all duration-300
          ${scrolled ?
        "bg-white/85 backdrop-blur-md border shadow-sm px-4 py-2" :
        "bg-transparent border border-transparent px-4 py-2"}`}
        style={{ borderColor: scrolled ? "var(--kv-border)" : "transparent" }}>
          <a href="#" className="flex items-center gap-2.5">
            <Logo size={32} />
            <span className="font-display font-bold text-[18px] tracking-tight" style={{ color: "var(--kv-ink)" }}>
              Spectra<span style={{ color: "var(--kv-purple-700)" }}>AI</span>
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-1">
            {links.map(([t, h]) =>
            <a key={h} href={h} className="px-3 py-2 text-[14px] font-medium rounded-lg transition-colors"
            style={{ color: "var(--kv-text)" }}
            onMouseOver={(e) => e.currentTarget.style.background = "var(--kv-purple-50)"}
            onMouseOut={(e) => e.currentTarget.style.background = "transparent"}>
                {t}
              </a>
            )}
          </nav>
          <div className="flex items-center gap-2">
            <a href="#contato" className="hidden sm:inline-flex cta-primary text-white font-medium text-[13.5px] px-4 py-2 rounded-lg items-center gap-2">
              Agendar demonstração
              <Icon name="arrow-right" size={14} strokeWidth={2.4} />
            </a>
            <button aria-label="Menu" onClick={() => setOpen((o) => !o)}
            className="md:hidden w-9 h-9 grid place-items-center rounded-lg border"
            style={{ borderColor: "var(--kv-border)", color: "var(--kv-text)" }}>
              <Icon name={open ? "x" : "menu"} size={18} strokeWidth={2} />
            </button>
          </div>
        </div>

        {open &&
        <div className="md:hidden mt-2 rounded-2xl bg-white border shadow-sm p-2"
        style={{ borderColor: "var(--kv-border)" }}>
            {links.map(([t, h]) =>
          <a key={h} href={h} onClick={() => setOpen(false)}
          className="block px-3 py-2.5 text-[14px] font-medium rounded-lg"
          style={{ color: "var(--kv-text)" }}>{t}</a>
          )}
            <a href="#contato" onClick={() => setOpen(false)}
          className="mt-1 block cta-primary text-white text-center font-medium text-[14px] px-4 py-2.5 rounded-lg">
              Agendar demonstração
            </a>
          </div>
        }
      </div>
    </header>);

}
window.Nav = Nav;

// ─────────────────────────────────────────────────────────────────────────
// Logo mark — SpectraAI prism (image)
// ─────────────────────────────────────────────────────────────────────────
function Logo({ size = 28 }) {
  return (
    <img
      src="assets/prism-mark.png"
      width={size}
      height={size}
      alt="SpectraAI"
      style={{ ...{ width: size, height: size, objectFit: "contain", display: "block" }, width: "46px", height: "46px" }} />);


}
window.Logo = Logo;

// ─────────────────────────────────────────────────────────────────────────
// 2. Credibility bar — "Em parceria com" + placeholder logos
// ─────────────────────────────────────────────────────────────────────────
function CredBar() {
  // Grayscale placeholder wordmarks — feel real but unmistakably fake
  const logos = [
  { name: "Nome Empresa", sub: "alumínio" },
  { name: "Nome Empresa", sub: "aço" },
  { name: "Nome Empresa", sub: "automotiva" },
  { name: "Nome Empresa", sub: "logística" },
  { name: "Nome Empresa", sub: "metalurgia" }];

  return (
    <section className="py-14 border-y" style={{ borderColor: "var(--kv-border)", background: "var(--kv-soft)" }}>
      <div className="mx-auto max-w-7xl px-5">
        <p className="reveal text-center text-[12px] uppercase tracking-[0.18em] font-semibold"
        style={{ color: "var(--kv-muted)" }}>
          Em operação com indústrias do Brasil
        </p>
        <div className="reveal reveal-d1 mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {logos.map((l, i) =>
          <div key={i} className="flex items-baseline gap-2 opacity-70 hover:opacity-100 transition-opacity">
              <span className="font-display font-semibold text-[20px] tracking-tight"
            style={{ color: "var(--kv-ink)", letterSpacing: "-0.03em" }}>
                {l.name}
              </span>
              <span className="text-[10.5px] uppercase tracking-wider font-medium"
            style={{ color: "var(--kv-muted)" }}>
                · {l.sub}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>);

}
window.CredBar = CredBar;

// ─────────────────────────────────────────────────────────────────────────
// 3. Problem section — 4 pain cards
// ─────────────────────────────────────────────────────────────────────────
function Problem() {
  const pains = [
  { icon: "hourglass", title: "Você conhece o resultado. Não entende o processo.",
    body: "No fim do dia bate a meta — ou não bate. Mas o que acontece nas 8 horas que levam até lá? Onde o tempo agrega valor e onde ele só escapa?" },
  { icon: "user-x", title: "Cada consultor começa do zero. E vai embora levando o que aprendeu.",
    body: "Você paga caro por um diagnóstico de produtividade. O especialista entende sua operação, escreve um relatório — e leva o conhecimento junto quando sai." },
  { icon: "package-x", title: "Solução enlatada não fala a língua do seu chão.",
    body: "Lista fixa de atividades, métricas genéricas, dashboard de prateleira. Nada disso entende como a SUA fábrica realmente trabalha." },
  { icon: "copy-x", title: "O que funciona numa fábrica não funciona na sua.",
    body: "Cada planta tem seu fluxo, seu vocabulário, seus gargalos. E quase ninguém se dá ao trabalho de personalizar de verdade." }];

  return (
    <section id="problema" className="kv-section">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          kicker="O ponto cego"
          title={<>Você mede o resultado. Mas ninguém <span style={{ color: "var(--kv-purple-700)" }}>aprende</span> o seu processo.</>}
          lead="O conhecimento sobre como a sua operação realmente funciona está espalhado em cabeças, planilhas e consultorias que vão embora. Nunca fica retido, nunca melhora sozinho." />
        
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5">
          {pains.map((p, i) =>
          <div key={i} className={`reveal reveal-d${i % 4 + 1} relative rounded-2xl p-7 lift border`}
          style={{
            background: "var(--kv-surface)",
            borderColor: "var(--kv-border)",
            boxShadow: "0 1px 0 rgba(68,39,156,0.04), 0 8px 24px -12px rgba(68,39,156,0.10)"
          }}>
              <div className="w-11 h-11 rounded-xl grid place-items-center mb-4"
            style={{ background: "var(--kv-purple-50)", color: "var(--kv-purple-700)" }}>
                <Icon name={p.icon} size={20} strokeWidth={2} />
              </div>
              <h3 className="font-display font-semibold text-[20px] md:text-[22px] leading-snug"
            style={{ color: "var(--kv-ink)" }}>
                {p.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed" style={{ color: "var(--kv-muted)" }}>
                {p.body}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>);

}
window.Problem = Problem;

// ─────────────────────────────────────────────────────────────────────────
// 4. How it works — animated 4-step flow
// ─────────────────────────────────────────────────────────────────────────
function HowItWorks() {
  const [active, setActive] = useState(0);
  const steps = [
  {
    icon: "cctv",
    label: "01 · Instalação",
    title: "Instalamos e as imagens fluem",
    body: "Nossa equipe vai até você, instala câmeras e hardware, e as imagens chegam sozinhas à plataforma."
  },
  {
    icon: "scan-search",
    label: "02 · Descoberta",
    title: "A IA descobre os comportamentos",
    body: "Detecta e rastreia pessoas, interpreta as ações e cria o vocabulário de atividades do seu processo. Sem lista fixa."
  },
  {
    icon: "messages-square",
    label: "03 · Aprendizado",
    title: "Você valida e a IA pergunta",
    body: "Confirma, corrige ou descarta. Ela faz perguntas genuínas e aprende com cada resposta. O esforço humano cai a cada vídeo."
  },
  {
    icon: "trending-up",
    label: "04 · Produtividade",
    title: "Sugestões e padrões",
    body: "Onde o tempo escapa, com lógica Lean, e como o processo evolui ao longo do tempo. Insight que vira ação."
  }];

  // Auto-advance
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % 4), 2800);
    return () => clearInterval(id);
  }, []);
  return (
    <section id="como-funciona" className="kv-section" style={{ background: "var(--kv-soft)" }}>
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          kicker="Como funciona"
          title={<>Do primeiro vídeo a um <span style={{ color: "var(--kv-purple-700)" }}>especialista do seu processo</span>.</>}
          lead={<>Quatro etapas. A gente instala tudo, o <b>Prism System</b> descobre como você trabalha, e o sistema fica mais inteligente a cada vídeo.</>} />
        

        {/* Step header */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-7 left-[6%] right-[6%] h-px" style={{
            background: "linear-gradient(90deg, transparent, rgba(83,48,192,0.35), transparent)"
          }} />
          {steps.map((s, i) =>
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`reveal reveal-d${i + 1} relative rounded-2xl p-5 text-left transition-all duration-300 border`}
            style={{
              background: i === active ? "var(--kv-surface)" : "rgba(255,255,255,0.6)",
              borderColor: i === active ? "transparent" : "var(--kv-border)",
              boxShadow: i === active ?
              "0 14px 36px -16px rgba(83,48,192,0.45), 0 0 0 2px var(--kv-purple-500)" :
              "0 1px 0 rgba(68,39,156,0.03)"
            }}>
            
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl grid place-items-center transition-colors"
              style={{
                background: i === active ? "var(--kv-purple-700)" : "var(--kv-purple-50)",
                color: i === active ? "white" : "var(--kv-purple-700)"
              }}>
                  <Icon name={s.icon} size={18} strokeWidth={2} />
                </div>
                <span className="text-[10.5px] font-mono uppercase tracking-wider" style={{ color: "var(--kv-muted)" }}>
                  {s.label}
                </span>
              </div>
              <h4 className="mt-3 font-display font-semibold text-[17px]" style={{ color: "var(--kv-ink)" }}>
                {s.title}
              </h4>
              <p className="mt-1.5 text-[13.5px] leading-relaxed" style={{ color: "var(--kv-muted)" }}>
                {s.body}
              </p>
            </button>
          )}
        </div>

        {/* Visual stage — animated illustration of the active step */}
        <div className="reveal mt-10 rounded-3xl p-8 md:p-10 border relative overflow-hidden"
        style={{ background: "var(--kv-surface)", borderColor: "var(--kv-border)", minHeight: 280 }}>
          <StepStage active={active} />
        </div>
      </div>
    </section>);

}

function StepStage({ active }) {
  // Render the visual that matches the active step
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center min-h-[260px]">
      <div className="md:col-span-2">
        <div className="text-[11px] font-mono uppercase tracking-widest" style={{ color: "var(--kv-purple-700)" }}>
          Passo {active + 1} de 4
        </div>
        {[
        { t: "Instalamos. Voc\u00ea n\u00e3o levanta um dedo.", d: "Nossa equipe vai at\u00e9 a sua planta, posiciona c\u00e2meras e hardware nos pontos certos, e configura tudo. As imagens passam a fluir automaticamente pra plataforma." },
        { t: "Descobre os comportamentos do seu processo", d: "Sem lista pr\u00e9-definida. A IA observa, descreve cada a\u00e7\u00e3o em linguagem natural e agrupa em comportamentos canônicos \u2014 o vocabul\u00e1rio da SUA opera\u00e7\u00e3o, n\u00e3o de uma gen\u00e9rica." },
        { t: "Voc\u00ea confirma; ela pergunta e aprende", d: "Um loop simples: confirma, corrige ou descarta cada comportamento. A IA faz perguntas genu\u00ednas sobre o seu processo, e cada resposta vira conhecimento permanente." },
        { t: "Onde o tempo escapa \u2014 e o que melhorar", d: "Sugest\u00f5es de produtividade com l\u00f3gica Lean: desperd\u00edcio, gargalo, ociosidade. Mais a evolu\u00e7\u00e3o do processo ao longo do tempo, entre turnos e per\u00edodos." }].
        map((x, i) =>
        <div key={i} className={`mt-3 transition-all duration-500 ${i === active ? "opacity-100" : "opacity-0 absolute"}`}
        aria-hidden={i !== active}
        style={{ position: i === active ? "relative" : "absolute" }}>
            <h4 className="font-display font-semibold text-[24px] md:text-[28px] leading-tight" style={{ color: "var(--kv-ink)" }}>
              {x.t}
            </h4>
            <p className="mt-3 text-[15.5px] leading-relaxed" style={{ color: "var(--kv-muted)" }}>{x.d}</p>
          </div>
        )}
      </div>
      <div className="md:col-span-3">
        <StepVisual active={active} />
      </div>
    </div>);

}

function StepVisual({ active }) {
  // Each step gets its own little visual
  return (
    <div className="relative aspect-[5/3] w-full rounded-2xl overflow-hidden border dotbg"
    style={{ borderColor: "var(--kv-border)", background: "linear-gradient(135deg, #FFFFFF, #FAF7FF)" }}>
      {/* 1. Install + auto-feed — clean HTML + Lucide icons */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${active === 0 ? "opacity-100" : "opacity-0"}`}>
        <div className="absolute inset-0 flex items-center justify-between px-[6%] gap-3">
          {/* Camera with wall mount */}
          <div className="relative flex flex-col items-center pl-7">
            {/* Wall surface — vertical hatched stripe */}
            <div className="absolute left-0 top-1 bottom-8 w-3 rounded-l-md flex flex-col justify-around py-1.5"
                 style={{ background: "#EFEBFC", borderRight: "2px solid #44279C" }}>
              {Array.from({length: 7}).map((_, i) => (
                <div key={i} className="h-px self-end" style={{ width: 7, background: "#C5B9F5" }} />
              ))}
            </div>
            {/* Wall mount plate */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2" style={{ marginTop: "-6px" }}>
              <div className="w-1.5 h-4 rounded-r-sm" style={{ background: "#44279C" }} />
            </div>
            {/* Mount bracket arm */}
            <div className="absolute left-[18px] top-1/2 -translate-y-1/2 h-[3px] rounded-full" style={{ width: 14, background: "#44279C", marginTop: "-4px" }} />
            {/* Knuckle joint */}
            <div className="absolute top-1/2 -translate-y-1/2 rounded-full grid place-items-center"
                 style={{ left: 31, width: 9, height: 9, background: "#44279C", marginTop: "-4px" }}>
              <div className="w-[3px] h-[3px] rounded-full" style={{ background: "#EFEBFC" }} />
            </div>
            {/* Camera body */}
            <div className="relative w-20 h-20 rounded-2xl grid place-items-center shadow-lg border-2"
                 style={{ borderColor: "#44279C", background: "white", boxShadow: "0 12px 24px -10px rgba(68,39,156,0.30)" }}>
              <Icon name="cctv" size={44} strokeWidth={1.8} style={{ color: "#44279C" }} />
              {/* Active LED */}
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full"
                   style={{ background: "#16a34a", animation: "kvPulseGreen 1.6s ease-in-out infinite", boxShadow: "0 0 6px rgba(22,163,74,0.7)" }} />
            </div>
            <div className="mt-3 text-[10.5px] font-mono" style={{ color: "#6B7280" }}>instalada por nós</div>
          </div>

          {/* Signal flow */}
          <div className="flex-1 relative h-3 mx-3">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px"
                 style={{ background: "repeating-linear-gradient(90deg, #C5B9F5 0, #C5B9F5 4px, transparent 4px, transparent 10px)" }} />
            {[0, 0.6, 1.2].map((d, i) => (
              <div key={i} className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                   style={{
                     background: "#5330C0",
                     animation: `kvFlow 1.8s linear infinite`,
                     animationDelay: `${d}s`,
                     boxShadow: "0 0 6px rgba(83,48,192,0.5)",
                   }} />
            ))}
          </div>

          {/* Platform card */}
          <div className="flex flex-col items-center">
            <div className="rounded-2xl px-5 py-4 flex flex-col items-center gap-1.5 shadow-lg"
                 style={{ background: "#44279C", boxShadow: "0 12px 28px -10px rgba(68,39,156,0.45)" }}>
              <Icon name="cloud" size={34} strokeWidth={1.8} style={{ color: "white" }} />
              <div className="text-white text-[11px] font-bold tracking-wide">Plataforma</div>
            </div>
            <div className="mt-3 text-[10.5px] font-mono" style={{ color: "#5330C0" }}>captação automática</div>
          </div>
        </div>
      </div>
      {/* 2. Discover behaviors */}
      <div className={`absolute inset-0 grid place-items-center transition-opacity duration-500 ${active === 1 ? "opacity-100" : "opacity-0"}`}>
        <svg viewBox="0 0 400 240" className="w-[84%] h-auto">
          {/* video frame with tracked person */}
          <rect x="22" y="54" width="130" height="132" rx="8" fill="#1a0f30" stroke="#C5B9F5" strokeWidth="2" />
          <g fill="#0a0614">
            <ellipse cx="74" cy="104" rx="9" ry="9" />
            <rect x="63" y="114" width="22" height="44" rx="5" />
          </g>
          <rect x="54" y="92" width="44" height="76" rx="3" fill="none" stroke="#683BED" strokeWidth="2" className="bbox" />
          <text x="54" y="86" fontSize="9" fontFamily="JetBrains Mono" fill="#683BED">P-02</text>
          <text x="87" y="178" textAnchor="middle" fontSize="8.5" fontFamily="JetBrains Mono" fill="#5330C0">vídeo</text>

          {/* arrows fanning out to discovered labels */}
          {[78, 120, 162].map((y, i) =>
          <path key={i} d={`M156 120 C 180 120, 180 ${y}, 204 ${y}`} stroke="#5330C0" strokeWidth="1.5" fill="none" strokeDasharray="3 4">
              <animate attributeName="stroke-dashoffset" values="14;0" dur="1.2s" repeatCount="indefinite" />
            </path>
          )}

          {/* discovered natural-language labels -> canonical groups */}
          {[
          { y: 70, nl: "empurra carrinho", grp: "movimenta\u00e7\u00e3o" },
          { y: 112, nl: "confere medida", grp: "inspe\u00e7\u00e3o" },
          { y: 154, nl: "parado, aguarda", grp: "espera" }].
          map((b, i) =>
          <g key={i}>
              <rect x="204" y={b.y} width="172" height="34" rx="7" fill="white" stroke="#C5B9F5" strokeWidth="1.5" />
              <text x="214" y={b.y + 14} fontSize="10" fill="#374151" fontStyle="italic">“{b.nl}”</text>
              <text x="214" y={b.y + 27} fontSize="9" fontWeight="700" fill="#44279C">→ {b.grp}</text>
            </g>
          )}
          <text x="290" y="56" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fill="#6B7280">vocabulário do seu processo</text>
        </svg>
      </div>
      {/* 3. Validation loop + AI question */}
      <div className={`absolute inset-0 grid place-items-center transition-opacity duration-500 ${active === 2 ? "opacity-100" : "opacity-0"}`}>
        <svg viewBox="0 0 400 240" className="w-[84%] h-auto">
          {/* behavior card (left) — taller, with before/after state */}
          <rect x="24" y="40" width="172" height="160" rx="9" fill="white" stroke="#C5B9F5" strokeWidth="2" />
          <text x="38" y="62" fontSize="9.5" fill="#374151">Classifiquei como <tspan fontWeight="700" fill="#44279C">espera</tspan></text>
          <text x="38" y="76" fontSize="9" fill="#9CA3AF" fontStyle="italic">“parado, aguardando ciclo”</text>
          {/* confirm / correct buttons */}
          <g>
            <rect x="38" y="86" width="54" height="15" rx="7.5" fill="#dcfce7" />
            <text x="65" y="96" textAnchor="middle" fontSize="8" fontWeight="700" fill="#16a34a">✓ confirmar</text>
            <rect x="98" y="86" width="48" height="15" rx="7.5" fill="white" stroke="#C5B9F5" />
            <text x="122" y="96" textAnchor="middle" fontSize="8" fill="#6B7280">✎ corrigir</text>
          </g>
          {/* divider */}
          <line x1="38" y1="118" x2="182" y2="118" stroke="#EFEBFC" strokeWidth="1.5" />
          {/* after learning — same behavior, now confident */}
          <text x="38" y="134" fontSize="8" fontWeight="700" fill="#16a34a" letterSpacing="0.5">APÓS APRENDER</text>
          <text x="38" y="152" fontSize="9.5" fill="#374151">Reconhece sozinho</text>
          <text x="38" y="166" fontSize="9" fill="#9CA3AF" fontStyle="italic">“espera · padrão do turno”</text>
          <rect x="38" y="176" width="100" height="7" rx="3.5" fill="#EFEBFC" />
          <rect x="38" y="176" width="6" height="7" rx="3.5" fill="#16a34a">
            <animate attributeName="width" values="6;94" dur="1.6s" fill="freeze" />
          </rect>
          <text x="144" y="183" fontSize="8" fontFamily="JetBrains Mono" fontWeight="700" fill="#16a34a">94%</text>

          {/* AI question bubble (right top) */}
          <rect x="248" y="40" width="128" height="82" rx="9" fill="#EFEBFC" stroke="#C5B9F5" strokeWidth="2" />
          <text x="262" y="58" fontSize="8" fontWeight="700" fill="#44279C" letterSpacing="0.5">PERGUNTA DA IA</text>
          <text x="262" y="76" fontSize="9" fill="#374151">Essa pausa antes da</text>
          <text x="262" y="89" fontSize="9" fill="#374151">prensa é padrão do</text>
          <text x="262" y="102" fontSize="9" fill="#374151">turno ou exceção?</text>

          {/* user answer card (right bottom) */}
          <rect x="248" y="138" width="128" height="62" rx="9" fill="white" stroke="#C5B9F5" strokeWidth="2" />
          <text x="262" y="156" fontSize="8" fontWeight="700" fill="#5330C0" letterSpacing="0.5">SUA RESPOSTA</text>
          <text x="262" y="174" fontSize="9" fill="#374151">“Padrão do turno.</text>
          <text x="262" y="187" fontSize="9" fill="#374151">A prensa demora 12s.”</text>

          {/* loop arrow 1: behavior -> AI question (asks) */}
          <g>
            <path d="M196 70 C 222 70, 222 64, 246 64" stroke="#5330C0" strokeWidth="1.6" fill="none" strokeDasharray="4 4">
              <animate attributeName="stroke-dashoffset" values="16;0" dur="1.1s" repeatCount="indefinite" />
            </path>
            <path d="M240 60 L 248 64 L 240 68 Z" fill="#5330C0" />
            <text x="212" y="58" fontSize="7.5" fill="#5330C0" fontFamily="JetBrains Mono">pergunta</text>
          </g>
          {/* loop arrow 2: user answer -> behavior (learns) */}
          <g>
            <path d="M246 168 C 222 168, 222 168, 198 168" stroke="#16a34a" strokeWidth="1.6" fill="none" strokeDasharray="4 4">
              <animate attributeName="stroke-dashoffset" values="0;16" dur="1.1s" repeatCount="indefinite" />
            </path>
            <path d="M204 164 L 196 168 L 204 172 Z" fill="#16a34a" />
            <text x="212" y="180" fontSize="7.5" fill="#16a34a" fontFamily="JetBrains Mono">aprende</text>
          </g>
        </svg>
      </div>
      {/* 4. Lean suggestions + evolution over time */}
      <div className={`absolute inset-0 grid place-items-center transition-opacity duration-500 ${active === 3 ? "opacity-100" : "opacity-0"}`}>
        <svg viewBox="0 0 400 240" className="w-[84%] h-auto">
          {/* Lean suggestion card */}
          <rect x="22" y="40" width="180" height="160" rx="10" fill="white" stroke="#C5B9F5" strokeWidth="2" />
          <text x="36" y="62" fontSize="9" fontWeight="700" fill="#44279C" letterSpacing="0.5">SUGESTÕES LEAN</text>
          <text x="188" y="62" textAnchor="end" fontSize="7.5" fontFamily="JetBrains Mono" fill="#9CA3AF">impacto</text>
          {[
          { t: "Espera evitável · prensa",  w: 78, pct: "alto" },
          { t: "Movimentação em excesso", w: 54, pct: "médio" },
          { t: "Setup acima do padrão",    w: 38, pct: "baixo" }].
          map((s, i) =>
          <g key={i} transform={`translate(36, ${82 + i * 36})`}>
              <text fontSize="9.5" fill="#374151">{s.t}</text>
              <text x="152" y="0" textAnchor="end" fontSize="8" fontFamily="JetBrains Mono" fontWeight="700" fill={i === 0 ? "#44279C" : "#5330C0"}>{s.pct}</text>
              <rect y="8" width="152" height="7" rx="3.5" fill="#EFEBFC" />
              <rect y="8" width={s.w * 1.5} height="7" rx="3.5" fill={i === 0 ? "#44279C" : "#C5B9F5"} />
            </g>
          )}
          {/* Evolution curve */}
          <rect x="216" y="40" width="160" height="160" rx="10" fill="white" stroke="#C5B9F5" strokeWidth="2" />
          <text x="230" y="62" fontSize="9" fontWeight="700" fill="#44279C" letterSpacing="0.5">EVOLUÇÃO</text>
          <text x="230" y="75" fontSize="8" fill="#9CA3AF">valor agregado ao longo do tempo</text>
          {/* axes */}
          <line x1="234" y1="180" x2="362" y2="180" stroke="#E5E7EB" strokeWidth="1" />
          <line x1="234" y1="90" x2="234" y2="180" stroke="#E5E7EB" strokeWidth="1" />
          {/* rising curve */}
          <path d="M234 172 C 270 168, 290 150, 312 132 S 350 102, 362 96" fill="none" stroke="#44279C" strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="stroke-dasharray" values="0 300; 300 0" dur="1.8s" fill="freeze" />
          </path>
          <path d="M234 172 C 270 168, 290 150, 312 132 S 350 102, 362 96 L 362 180 L 234 180 Z" fill="rgba(83,48,192,0.10)" />
          {[[234, 172], [312, 132], [362, 96]].map(([cx, cy], i) =>
          <circle key={i} cx={cx} cy={cy} r="3.5" fill="#44279C" />
          )}
          <text x="344" y="112" fontSize="8.5" fontWeight="700" fill="#16a34a">↗</text>
        </svg>
      </div>
    </div>);

}
window.HowItWorks = HowItWorks;

// ─────────────────────────────────────────────────────────────────────────
// 5. Capabilities — 6-grid with hover micro-animations
// ─────────────────────────────────────────────────────────────────────────
function Capabilities() {
  const items = [
  { icon: "scan-search", title: "Descoberta automática de comportamentos",
    body: "Sem lista fixa de atividades. A IA observa, descreve em linguagem natural e cria o vocabulário do SEU processo — não de um genérico." },
  { icon: "graduation-cap", title: "Aprende com cada validação",
    body: "Confirma ou corrige um comportamento uma vez, e o sistema passa a reconhecê-lo sozinho. O esforço humano cai a cada vídeo." },
  { icon: "messages-square", title: "Perguntas inteligentes sobre o seu processo",
    body: "A IA entrevista a sua operação sempre que percebe uma lacuna. Cada resposta vira conhecimento permanente da plataforma." },
  { icon: "trending-up", title: "Sugestões de produtividade (Lean)",
    body: "Olhando a base agregada, aponta onde o tempo não agrega valor: gargalos, ociosidade e desperdício — com impacto estimado." },
  { icon: "activity", title: "Padrões ao longo do tempo",
    body: "Não só uma foto: tendências, recorrências e desvios entre turnos e períodos. A evolução do processo, visível." },
  { icon: "message-square-text", title: "Dashboard de gestão + chat com os dados",
    body: "Índice de valor agregado, Pareto do tempo e composição valor/apoio/desperdício. E um chat pra conversar com a própria operação." }];

  return (
    <section id="capacidades" className="kv-section">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          kicker="O que você passa a enxergar"
          title={<>Não monitora. <span style={{ color: "var(--kv-purple-700)" }}>Aprende</span> e melhora a cada vídeo.</>}
          lead="Seis frentes que, juntas, transformam imagem bruta em conhecimento retido sobre como a sua operação realmente funciona." />
        

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) =>
          <CapCard key={i} delay={i % 4} {...it} />
          )}
        </div>
      </div>
    </section>);

}

function CapCard({ icon, title, body, delay }) {
  return (
    <div className={`reveal reveal-d${delay + 1} group rounded-2xl p-7 lift border relative overflow-hidden`}
    style={{
      background: "var(--kv-surface)",
      borderColor: "var(--kv-border)",
      boxShadow: "0 1px 0 rgba(68,39,156,0.04)"
    }}>
      <div className="pointer-events-none absolute -top-12 -right-12 w-40 h-40 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"
      style={{ background: "radial-gradient(closest-side, rgba(83,48,192,0.30), transparent)" }} />
      <div className="cap-icon w-12 h-12 rounded-xl grid place-items-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-3deg]"
      style={{ color: "var(--kv-purple-700)" }}>
        <Icon name={icon} size={22} strokeWidth={1.85} />
      </div>
      <h3 className="font-display font-semibold text-[18px] leading-snug" style={{ color: "var(--kv-ink)" }}>
        {title}
      </h3>
      <p className="mt-2 text-[14.5px] leading-relaxed" style={{ color: "var(--kv-muted)" }}>
        {body}
      </p>
      <div className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium"
      style={{ color: "var(--kv-purple-700)" }}>
        <span className="link-u">Ver no produto</span>
        <Icon name="arrow-up-right" size={14} strokeWidth={2.2} />
      </div>
    </div>);

}
window.Capabilities = Capabilities;

// ─────────────────────────────────────────────────────────────────────────
// 6. Differentials — 3 big claims
// ─────────────────────────────────────────────────────────────────────────
function Differentials() {
  const items = [
  { tag: "APRENDE O SEU PROCESSO", title: "Não é enlatado. O Prism System descobre como a SUA operação funciona.",
    body: "Sem lista fixa de atividades. A IA descobre os comportamentos do seu chão de fábrica, fala o seu vocabulário e se adapta ao seu fluxo — não a um processo genérico de prateleira.",
    icon: "git-fork" },
  { tag: "MELHORA A CADA VÍDEO", title: "Fica mais inteligente quanto mais você usa.",
    body: "O loop de validação e as perguntas fazem o sistema evoluir continuamente. E o conhecimento do seu processo fica retido na plataforma — não vai embora com um consultor ou uma troca de equipe.",
    icon: "brain-circuit" },
  { tag: "DESCOBRE, NÃO SÓ MEDE", title: "Investiga a operação como um especialista que nunca esquece.",
    body: "A IA não espera você dizer o que olhar: ela levanta hipóteses, faz perguntas genuínas e transforma isso em ganho de produtividade. É algo que não existe em nenhum outro lugar do mundo.",
    icon: "sparkles" }];

  return (
    <section className="kv-section" style={{ background: "var(--kv-soft)" }}>
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          kicker="Por que SpectraAI"
          title={<>Três coisas que <span style={{ color: "var(--kv-purple-700)" }}>ninguém mais faz</span>.</>}
          lead="O que separa um software de visão computacional de uma inteligência que vira especialista do seu processo." />
        

        <div className="mt-14 space-y-4">
          {items.map((it, i) =>
          <div key={i} className={`reveal reveal-d${i + 1} grid grid-cols-1 md:grid-cols-12 gap-6 items-center rounded-2xl p-7 md:p-8 border`}
          style={{
            background: "var(--kv-surface)",
            borderColor: "var(--kv-border)",
            boxShadow: "0 1px 0 rgba(68,39,156,0.04), 0 8px 24px -16px rgba(68,39,156,0.10)"
          }}>
              <div className="md:col-span-1 flex md:justify-center">
                <div className="w-14 h-14 rounded-2xl grid place-items-center"
              style={{ background: "linear-gradient(135deg, var(--kv-purple-700), var(--kv-purple-900))", color: "white" }}>
                  <Icon name={it.icon} size={24} strokeWidth={1.85} />
                </div>
              </div>
              <div className="md:col-span-3">
                <div className="text-[10.5px] font-mono uppercase tracking-[0.16em] font-semibold"
              style={{ color: "var(--kv-purple-700)" }}>
                  {String(i + 1).padStart(2, "0")} · {it.tag}
                </div>
                <h3 className="mt-2 font-display font-semibold text-[22px] md:text-[24px] leading-tight"
              style={{ color: "var(--kv-ink)" }}>
                  {it.title}
                </h3>
              </div>
              <p className="md:col-span-8 text-[16px] leading-relaxed" style={{ color: "var(--kv-muted)", textWrap: "pretty" }}>
                {it.body}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>);

}
window.Differentials = Differentials;

// ─────────────────────────────────────────────────────────────────────────
// 7. Use cases — 3 verticals
// ─────────────────────────────────────────────────────────────────────────
function UseCases() {
  const cases = [
  {
    tag: "Indústria pesada",
    title: "Linha de produção contínua",
    body: "Alumínio, aço, automotiva. A IA aprende o ritmo da SUA linha e descobre onde o tempo escapa entre uma etapa e outra.",
    stats: [["Comportamentos", "descobertos"], ["Vocabulário", "próprio"]],
    art: "heavy"
  },
  {
    tag: "Logística",
    title: "Galpão e movimentação",
    body: "Pickers, separação, expedição. O gargalo muda de hora em hora — e o sistema aprende esse padrão, em vez de medir uma métrica fixa.",
    stats: [["Fluxo", "mapeado"], ["Ociosidade", "identificada"]],
    art: "warehouse"
  },
  {
    tag: "Montagem",
    title: "Linha de montagem",
    body: "Eletrônicos, autopeças, bens de consumo. A IA entende o ciclo da sua estação e aponta o desperdício com lógica Lean.",
    stats: [["Desperdício", "Lean"], ["Padrões", "no tempo"]],
    art: "assembly"
  }];

  return (
    <section id="casos" className="kv-section">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          kicker="Onde funciona"
          title={<>Uma engine, <span style={{ color: "var(--kv-purple-700)" }}>vários processos</span>.</>}
          lead="A tecnologia é a mesma. O que muda é o que ela aprende: cada chão de fábrica gera seu próprio vocabulário de comportamentos, sozinho." />
        
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          {cases.map((c, i) =>
          <article key={i} className={`reveal reveal-d${i + 1} group rounded-2xl border overflow-hidden lift`}
          style={{ background: "var(--kv-surface)", borderColor: "var(--kv-border)" }}>
              <div className="aspect-[5/3] relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, var(--kv-purple-50), #FFFFFF)" }}>
                <UseCaseArt kind={c.art} />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold"
              style={{ background: "white", color: "var(--kv-purple-700)", border: "1px solid var(--kv-border)" }}>
                  {c.tag}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display font-semibold text-[20px]" style={{ color: "var(--kv-ink)" }}>
                  {c.title}
                </h3>
                <p className="mt-2 text-[14.5px] leading-relaxed" style={{ color: "var(--kv-muted)" }}>{c.body}</p>
                <div className="mt-4 grid grid-cols-2 gap-3 pt-4 border-t" style={{ borderColor: "var(--kv-border)" }}>
                  {c.stats.map(([k, v]) =>
                <div key={k}>
                      <div className="text-[10.5px] font-mono uppercase tracking-wider" style={{ color: "var(--kv-muted)" }}>{k}</div>
                      <div className="text-[18px] font-semibold mt-0.5" style={{ color: "var(--kv-ink)" }}>{v}</div>
                    </div>
                )}
                </div>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>);

}

function UseCaseArt({ kind }) {
  const COMMON_BG = "linear-gradient(135deg, #FFFFFF, #FAF7FF)";

  if (kind === "heavy") {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {/* Backdrop: faint horizontal "industrial floor" lines */}
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent 0 18px, rgba(83,48,192,0.06) 18px 19px)",
        }} />
        {/* Top-right floating detection chip */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-mono shadow-md"
             style={{ background: "white", border: "1.5px solid #5330C0", color: "#44279C" }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#5330C0", boxShadow: "0 0 5px rgba(83,48,192,0.7)" }} />
          ciclo da prensa
        </div>
        {/* Hero icon */}
        <div className="absolute inset-0 grid place-items-center">
          <div className="grid place-items-center w-24 h-24 rounded-2xl"
               style={{ background: "white", border: "1.5px solid #C5B9F5", boxShadow: "0 18px 36px -16px rgba(68,39,156,0.25)" }}>
            <Icon name="factory" size={56} strokeWidth={1.4} style={{ color: "#44279C" }} />
          </div>
        </div>
        {/* Bottom conveyor strip with material blocks */}
        <div className="absolute bottom-0 inset-x-0">
          <div className="flex items-end justify-center gap-3 pb-2.5">
            <div className="w-10 h-3.5 rounded-sm" style={{ background: "#683BED" }} />
            <div className="w-14 h-4 rounded-sm" style={{ background: "#44279C" }} />
            <div className="w-10 h-3 rounded-sm" style={{ background: "#5330C0" }} />
            <div className="w-12 h-3.5 rounded-sm" style={{ background: "#44279C" }} />
          </div>
          <div className="h-1.5 w-full" style={{ background: "#44279C" }} />
          <div className="h-px w-full" style={{ background: "rgba(0,0,0,0.15)" }} />
        </div>
      </div>
    );
  }

  if (kind === "warehouse") {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {/* Backdrop: faint grid suggesting warehouse aisles */}
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage:
            "linear-gradient(90deg, transparent 0 23px, rgba(83,48,192,0.07) 23px 24px), " +
            "linear-gradient(0deg,  transparent 0 23px, rgba(83,48,192,0.07) 23px 24px)",
        }} />
        {/* Top-right detection chip */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-mono shadow-md"
             style={{ background: "white", border: "1.5px solid #5330C0", color: "#44279C" }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#5330C0", boxShadow: "0 0 5px rgba(83,48,192,0.7)" }} />
          transporte · pallet
        </div>
        {/* Top-left stacked pallet boxes accent */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          <div className="flex gap-1">
            <div className="w-5 h-4 rounded-sm" style={{ background: "#C5B9F5" }} />
            <div className="w-5 h-4 rounded-sm" style={{ background: "#683BED" }} />
          </div>
          <div className="flex gap-1">
            <div className="w-5 h-4 rounded-sm" style={{ background: "#5330C0" }} />
            <div className="w-5 h-4 rounded-sm" style={{ background: "#C5B9F5" }} />
          </div>
        </div>
        {/* Hero icon */}
        <div className="absolute inset-0 grid place-items-center">
          <div className="grid place-items-center w-24 h-24 rounded-2xl"
               style={{ background: "white", border: "1.5px solid #C5B9F5", boxShadow: "0 18px 36px -16px rgba(68,39,156,0.25)" }}>
            <Icon name="forklift" size={56} strokeWidth={1.4} style={{ color: "#44279C" }} />
          </div>
        </div>
        {/* Bottom floor line */}
        <div className="absolute bottom-0 inset-x-0 h-1.5" style={{ background: "#44279C" }} />
      </div>
    );
  }

  // assembly
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Backdrop: faint dot grid */}
      <div className="absolute inset-0 opacity-60" style={{
        backgroundImage: "radial-gradient(rgba(83,48,192,0.16) 1px, transparent 1px)",
        backgroundSize: "14px 14px",
      }} />
      {/* Top-right detection chip */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-mono shadow-md"
           style={{ background: "white", border: "1.5px solid #5330C0", color: "#44279C" }}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#5330C0", boxShadow: "0 0 5px rgba(83,48,192,0.7)" }} />
        estação 03 · 28s
      </div>
      {/* Hero — meshing gears */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative grid place-items-center w-24 h-24 rounded-2xl"
             style={{ background: "white", border: "1.5px solid #C5B9F5", boxShadow: "0 18px 36px -16px rgba(68,39,156,0.25)" }}>
          <Icon name="cog" size={52} strokeWidth={1.4} style={{ color: "#44279C" }} />
          <div className="absolute -top-2 -right-2 w-9 h-9 rounded-full grid place-items-center"
               style={{ background: "white", border: "1.5px solid #C5B9F5" }}>
            <Icon name="cog" size={20} strokeWidth={1.6} style={{ color: "#5330C0" }} />
          </div>
        </div>
      </div>
      {/* Bottom: 4 small workstation indicators */}
      <div className="absolute bottom-2 inset-x-0 flex items-end justify-center gap-3">
        {[0,1,2,3].map((i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="w-7 h-1.5 rounded-sm" style={{ background: i === 1 ? "#44279C" : "#C5B9F5" }} />
            <div className="text-[8px] font-mono" style={{ color: "#6B7280" }}>0{i+1}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
window.UseCases = UseCases;

// ─────────────────────────────────────────────────────────────────────────
// 8. Featured case — CBA pull quote
// ─────────────────────────────────────────────────────────────────────────
function FeaturedCase() {
  return (
    <section className="kv-section">
      <div className="mx-auto max-w-7xl px-5">
        <div className="reveal relative rounded-3xl p-10 md:p-16 overflow-hidden border"
        style={{
          background: "linear-gradient(135deg, #5330C0 0%, #44279C 55%, #0B0612 100%)",
          borderColor: "transparent",
          color: "white"
        }}>
          {/* deco */}
          <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(83,48,192,0.55), transparent)" }} />
          <div className="absolute -bottom-32 -left-20 w-[380px] h-[380px] rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(104,59,237,0.30), transparent)" }} />
          <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "18px 18px" }} />

          <div className="relative grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-medium"
              style={{ background: "rgba(255,255,255,0.10)", color: "#C5B9F5" }}>
                <Icon name="quote" size={13} strokeWidth={2.2} />
                Caso destaque · Empresa
              </div>
              <blockquote className="mt-6 font-display font-medium leading-[1.15] text-[28px] sm:text-[36px] md:text-[44px]"
              style={{ letterSpacing: "-0.025em" }}>
                <span style={{ color: "#C5B9F5" }}>“</span>
                A SpectraAI começou a <span style={{ background: "linear-gradient(180deg, #C5B9F5, #5330C0)", WebkitBackgroundClip: "text", color: "rgb(181, 168, 221)" }}>aprender a nossa linha</span> — e a descrever o nosso processo melhor do que a gente conseguia documentar.
                <span style={{ color: "#C5B9F5" }}>”</span>
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full grid place-items-center font-semibold"
                style={{ background: "rgba(255,255,255,0.10)", color: "white" }}>
                  DO
                </div>
                <div>
                  <div className="font-medium text-[15px]">Diretor de Operações · piloto em andamento</div>
                  <div className="text-[13px]" style={{ color: "#C5B9F5" }}>Empresa Piloto · Empresa</div>
                </div>
              </div>
            </div>
            <div className="md:col-span-4">
              <div className="rounded-2xl p-6 border"
              style={{ background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.12)" }}>
                <div className="text-[10.5px] font-mono uppercase tracking-[0.16em] font-semibold mb-4" style={{ color: "#C5B9F5" }}>
                  No piloto
                </div>
                <ul className="space-y-3.5">
                  {[
                  ["scan-search", "Vocabulário do processo mapeado pela IA"],
                  ["eye", "Primeira visibilidade granular da linha"],
                  ["trending-up", "Ganhos de produtividade identificados"],
                  ["brain-circuit", "Conhecimento retido na plataforma"]].
                  map(([ic, l], i) =>
                  <li key={i} className="flex items-start gap-3 text-[14px]" style={{ color: "white" }}>
                      <span className="mt-0.5 w-6 h-6 rounded-lg grid place-items-center shrink-0"
                    style={{ background: "rgba(255,255,255,0.10)", color: "#C5B9F5" }}>
                        <Icon name={ic} size={13} strokeWidth={2} />
                      </span>
                      <span className="leading-snug">{l}</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}
window.FeaturedCase = FeaturedCase;

// ─────────────────────────────────────────────────────────────────────────
// 9. CTA / Lead form with validation + success
// ─────────────────────────────────────────────────────────────────────────
function CtaForm() {
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function validate(f) {
    const e = {};
    if (!f.name.trim() || f.name.trim().length < 2) e.name = "Diga seu nome.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Email inválido.";
    if (!f.company.trim()) e.company = "Qual é a empresa?";
    if (f.phone && !/[\d\s()+-]{8,}/.test(f.phone)) e.phone = "Telefone inválido.";
    return e;
  }

  function onSubmit(e) {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  }

  return (
    <section id="contato" className="kv-section" style={{ background: "var(--kv-soft)" }}>
      <div className="mx-auto max-w-5xl px-5">
        <div className="reveal rounded-3xl border p-8 md:p-14"
        style={{
          background: "var(--kv-surface)",
          borderColor: "var(--kv-border)",
          boxShadow: "0 1px 0 rgba(68,39,156,0.04), 0 30px 60px -30px rgba(68,39,156,0.20)"
        }}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-5">
              <Eyebrow icon="rocket">Pronto pra ver a operação?</Eyebrow>
              <h2 className="mt-5 font-display font-semibold text-[34px] md:text-[42px] leading-[1.05]"
              style={{ color: "var(--kv-ink)" }}>
                Demonstração de <span style={{ color: "var(--kv-purple-700)" }}>30 minutos</span>.
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed" style={{ color: "var(--kv-muted)" }}>
                Mostramos a plataforma aprendendo uma operação real — descobrindo comportamentos, fazendo perguntas e gerando sugestões — e conversamos sobre a sua. Você decide se faz sentido um piloto.
                Sem proposta empurrada, sem deck de 80 slides.
              </p>
              <ul className="mt-6 space-y-3 text-[14.5px]" style={{ color: "var(--kv-text)" }}>
                {[
                "Conversa direta com quem implementa, não com vendedor.",
                "Em até 7 dias na sua agenda.",
                "NDA fácil se for o caso — você manda o seu."].
                map((t, i) =>
                <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full grid place-items-center"
                  style={{ background: "var(--kv-purple-50)", color: "var(--kv-purple-700)" }}>
                      <Icon name="check" size={12} strokeWidth={3} />
                    </span>
                    {t}
                  </li>
                )}
              </ul>
            </div>

            <div className="md:col-span-7">
              {submitted ?
              <div className="rounded-2xl border p-8 text-center"
              style={{ background: "var(--kv-purple-50)", borderColor: "var(--kv-border)" }}>
                  <div className="w-14 h-14 rounded-full grid place-items-center mx-auto"
                style={{ background: "var(--kv-purple-700)", color: "white" }}>
                    <Icon name="check" size={26} strokeWidth={2.5} />
                  </div>
                  <h3 className="mt-5 font-display font-semibold text-[24px]" style={{ color: "var(--kv-ink)" }}>
                    Recebido, {form.name.split(" ")[0]}.
                  </h3>
                  <p className="mt-2 text-[15px]" style={{ color: "var(--kv-muted)" }}>
                    A gente responde em até 24h em <b>{form.email}</b>.<br />
                    Se for urgente, chama no WhatsApp aqui em baixo.
                  </p>
                  <button onClick={() => {setSubmitted(false);setForm({ name: "", email: "", company: "", phone: "" });}}
                className="mt-6 text-[13px] font-medium link-u" style={{ color: "var(--kv-purple-700)" }}>
                    Enviar outro pedido
                  </button>
                </div> :

              <form onSubmit={onSubmit} noValidate className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <Field label="Seu nome" name="name" value={form.name} error={errors.name}
                onChange={(v) => setForm({ ...form, name: v })} placeholder="Como te chamamos?" />
                  <Field label="Email corporativo" name="email" type="email" value={form.email} error={errors.email}
                onChange={(v) => setForm({ ...form, email: v })} placeholder="voce@empresa.com.br" />
                  <Field label="Empresa" name="company" value={form.company} error={errors.company}
                onChange={(v) => setForm({ ...form, company: v })} placeholder="Razão social ou marca" />
                  <Field label="WhatsApp (opcional)" name="phone" value={form.phone} error={errors.phone}
                onChange={(v) => setForm({ ...form, phone: v })} placeholder="(11) 9 9999 9999" />
                  <div className="sm:col-span-2 mt-2 flex flex-col sm:flex-row sm:items-center gap-3">
                    <button type="submit" disabled={loading}
                  className="cta-primary text-white font-semibold text-[15px] px-6 py-3.5 rounded-xl inline-flex items-center justify-center gap-2 disabled:opacity-70">
                      {loading ?
                    <><span className="w-3 h-3 rounded-full bg-white/80 animate-pulse" /> Enviando…</> :

                    <>Agendar demonstração <Icon name="arrow-right" size={16} strokeWidth={2.4} /></>
                    }
                    </button>
                    <p className="text-[12px]" style={{ color: "var(--kv-muted)" }}>
                      Levamos LGPD a sério. Seus dados ficam só com a gente.
                    </p>
                  </div>
                </form>
              }
            </div>
          </div>
        </div>
      </div>
    </section>);

}

function Field({ label, name, value, onChange, error, type = "text", placeholder }) {
  return (
    <label className="block">
      <span className="block text-[12.5px] font-medium mb-1.5" style={{ color: "var(--kv-text)" }}>{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`kv-input ${error ? "invalid" : ""}`}
        autoComplete="off" />
      
      {error && <span className="block text-[11.5px] mt-1.5" style={{ color: "#DC2626" }}>{error}</span>}
    </label>);

}
window.CtaForm = CtaForm;

// ─────────────────────────────────────────────────────────────────────────
// 10. FAQ — accordion
// ─────────────────────────────────────────────────────────────────────────
function FAQ() {
  const items = [
  { q: "Como o Prism System aprende o meu processo?",
    a: "O Prism observa o vídeo da sua operação, detecta e rastreia as pessoas, descreve cada ação em linguagem natural e agrupa tudo em comportamentos canônicos — o vocabulário do seu processo. Em seguida pede sua validação e faz perguntas genuínas sobre o que viu. Cada confirmação e cada resposta vira conhecimento permanente: depois de poucas validações de um comportamento, ele passa a reconhecê-lo sozinho." },
  { q: "Preciso configurar a lista de atividades antes?",
    a: "Não. Esse é o ponto. Não existe lista fixa pra você preencher. A IA descobre os comportamentos da sua operação a partir do vídeo — inclusive os que você nem pensaria em listar. Você só valida e corrige o que ela propõe." },
  { q: "Como as imagens chegam à plataforma?",
    a: "A gente vai até a sua planta, instala as câmeras e o hardware nos pontos certos e configura tudo. A partir daí as imagens fluem automaticamente para a plataforma — você não precisa subir nada manualmente nem montar um time de TI pra isso." },
  { q: "O conhecimento fica retido se eu trocar de equipe?",
    a: "Fica. Tudo o que a IA aprende sobre o seu processo — comportamentos, vocabulário, respostas às perguntas — fica registrado na plataforma, não na cabeça de um consultor. Trocou de gestor ou de turno? O conhecimento do processo continua lá, e só cresce." },
  { q: "E a privacidade dos colaboradores? E LGPD?",
    a: "Tratamos privacidade como requisito de produto, não nota de rodapé. Os modelos identificam atividades e comportamentos do processo, não pessoas físicas — não fazemos reconhecimento facial. Trabalhamos com base legal de legítimo interesse, comunicação clara aos colaboradores, registros de acesso, retenção mínima e contrato de processamento de dados nos termos da LGPD." },
  { q: "Em quanto tempo eu vejo valor?",
    a: "Depois da instalação, os primeiros comportamentos aparecem nos primeiros vídeos. A precisão e a profundidade crescem com o uso: quanto mais a IA roda e quanto mais você valida, mais ela entende a sua operação e mais relevantes ficam as sugestões de produtividade. É um sistema que melhora com o tempo, não um relatório único." },
  { q: "Qual é o custo?",
    a: "É um SaaS, com a instalação de câmeras e hardware no início. O valor depende da escala da operação e da profundidade da análise. Na demonstração a gente conversa aberto sobre isso e ajuda você a montar a hipótese de retorno antes de qualquer contrato." },
  { q: "Vocês instalam tudo ou só licenciam o software?",
    a: "Instalamos tudo. Nossa equipe vai até você, posiciona câmeras e hardware, configura a captação e calibra os modelos para o seu ambiente. A plataforma é o produto principal, mas você não precisa se preocupar com a infraestrutura — isso é com a gente." },
  { q: "Atendem fora de São Paulo?",
    a: "Sim. Operação no Brasil inteiro, com instalação e suporte presencial onde for necessário. O time fica em São Paulo, mas viaja muito." }];

  return (
    <section id="faq" className="kv-section">
      <div className="mx-auto max-w-4xl px-5">
        <SectionTitle
          align="center"
          kicker="Perguntas frequentes"
          title={<>O que perguntam <span style={{ color: "var(--kv-purple-700)" }}>antes</span> de comprar.</>}
          lead="Se a sua dúvida não está aqui, manda no WhatsApp. Respondemos no mesmo dia útil." />
        
        <div className="reveal mt-12 rounded-2xl border divide-y"
        style={{ background: "var(--kv-surface)", borderColor: "var(--kv-border)" }}>
          {items.map((it, i) =>
          <details key={i} className="group" style={{ borderColor: "var(--kv-border)" }}>
              <summary className="flex items-start gap-4 px-6 py-5 cursor-pointer list-none">
                <div className="flex-1 font-display font-semibold text-[17px] md:text-[18px] leading-snug"
              style={{ color: "var(--kv-ink)" }}>
                  {it.q}
                </div>
                <div className="mt-1 w-7 h-7 rounded-full grid place-items-center shrink-0 transition-colors faq-chev"
              style={{ background: "var(--kv-purple-50)", color: "var(--kv-purple-700)" }}>
                  <Icon name="plus" size={15} strokeWidth={2.4} />
                </div>
              </summary>
              <div className="px-6 pb-6 -mt-1 text-[15px] leading-relaxed" style={{ color: "var(--kv-muted)" }}>
                {it.a}
              </div>
            </details>
          )}
        </div>
      </div>
    </section>);

}
window.FAQ = FAQ;

// ─────────────────────────────────────────────────────────────────────────
// 11. Footer
// ─────────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="pt-20 pb-10 border-t" style={{ borderColor: "var(--kv-border)", background: "var(--kv-surface)" }}>
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10">
          <div className="col-span-2 md:col-span-5">
            <a href="#" className="flex items-center gap-2.5">
              <Logo size={36} />
              <div className="leading-tight">
                <div className="font-display font-bold text-[20px] tracking-tight" style={{ color: "var(--kv-ink)" }}>
                  Spectra<span style={{ color: "var(--kv-purple-700)" }}>AI</span>
                </div>
                <div className="text-[10.5px] font-mono uppercase tracking-[0.16em] mt-0.5" style={{ color: "var(--kv-muted)" }}>
                  Prism System
                </div>
              </div>
            </a>
            <p className="mt-4 text-[14.5px] leading-relaxed max-w-md" style={{ color: "var(--kv-muted)" }}>
              A primeira inteligência que aprende a sua operação industrial por vídeo — descobre os comportamentos do seu processo, conversa com quem o conhece e vira um especialista do seu chão de fábrica.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer"
              className="w-9 h-9 rounded-lg border grid place-items-center hover:bg-[var(--kv-purple-50)] transition-colors"
              style={{ borderColor: "var(--kv-border)", color: "var(--kv-purple-700)" }}
              aria-label="LinkedIn">
                <Icon name="linkedin" size={16} strokeWidth={2} />
              </a>
              <a href="mailto:contato@spectraai.com.br"
              className="w-9 h-9 rounded-lg border grid place-items-center hover:bg-[var(--kv-purple-50)] transition-colors"
              style={{ borderColor: "var(--kv-border)", color: "var(--kv-purple-700)" }}
              aria-label="Email">
                <Icon name="mail" size={16} strokeWidth={2} />
              </a>
              <a href="https://wa.me/5511999999999" target="_blank" rel="noreferrer"
              className="w-9 h-9 rounded-lg border grid place-items-center hover:bg-[var(--kv-purple-50)] transition-colors"
              style={{ borderColor: "var(--kv-border)", color: "var(--kv-purple-700)" }}
              aria-label="WhatsApp">
                <Icon name="message-circle" size={16} strokeWidth={2} />
              </a>
            </div>
          </div>
          {[
          { title: "Produto", links: ["Como funciona", "Capacidades", "Casos", "Preço"] },
          { title: "Empresa", links: ["Sobre", "Cases", "Blog", "Carreiras"] },
          { title: "Contato", links: ["contato@spectraai.com.br", "WhatsApp", "LinkedIn"] }].
          map((c) =>
          <div key={c.title} className="md:col-span-2">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--kv-muted)" }}>
                {c.title}
              </div>
              <ul className="mt-3 space-y-2.5">
                {c.links.map((l) =>
              <li key={l}><a href="#" className="text-[14px] hover:opacity-80 transition-opacity" style={{ color: "var(--kv-text)" }}>{l}</a></li>
              )}
              </ul>
            </div>
          )}
          <div className="md:col-span-1" />
        </div>

        <div className="mt-12 pt-6 border-t flex flex-col md:flex-row md:items-center md:justify-between gap-3"
        style={{ borderColor: "var(--kv-border)" }}>
          <div className="text-[12.5px]" style={{ color: "var(--kv-muted)" }}>
            © 2026 SpectraAI Tecnologia Ltda · CNPJ 00.000.000/0001-00 · São Paulo, SP
          </div>
          <div className="flex items-center gap-4 text-[12.5px]" style={{ color: "var(--kv-muted)" }}>
            <a href="#" className="hover:opacity-80">Termos</a>
            <a href="#" className="hover:opacity-80">Privacidade</a>
            <a href="#" className="hover:opacity-80">LGPD</a>
          </div>
        </div>
      </div>
    </footer>);

}
window.Footer = Footer;
