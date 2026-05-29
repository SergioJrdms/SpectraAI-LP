// Main app: orchestrates sections + Tweaks panel.
const { useEffect, useState, useMemo } = React;

// ───────────────────────────────────────────────────────────────────────────
// Hero (uses HeroComposite from hero.jsx)
// ───────────────────────────────────────────────────────────────────────────
function Hero({ headline, palette }) {
  return (
    <section className="hero-grad relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 pt-32 pb-28 md:pt-40 md:pb-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <div className="reveal in inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[12.5px] font-medium"
            style={{ background: "rgba(255,255,255,0.7)", color: "var(--kv-purple-700)", border: "1px solid var(--kv-border)", backdropFilter: "blur(8px)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 live-dot inline-block" style={{ backgroundColor: "rgb(62, 230, 174)" }} />
              <span className="font-mono uppercase tracking-wider text-[11px]">Prism System · IA que aprende</span>
            </div>

            <h1 className="reveal in reveal-d1 mt-6 font-display font-semibold text-[44px] sm:text-[56px] md:text-[68px] leading-[0.98]"
            style={{ color: "var(--kv-ink)" }}>
              {headline.lead}{" "}
              <span style={{
                background: `linear-gradient(180deg, var(--kv-purple-700), var(--kv-purple-900))`,
                WebkitBackgroundClip: "text", color: "transparent"
              }}>
                {headline.accent}
              </span>
            </h1>

            <p className="reveal in reveal-d2 mt-6 text-[18px] md:text-[20px] max-w-xl leading-relaxed"
            style={{ color: "var(--kv-muted)", textWrap: "pretty" }}>
              {headline.sub}
            </p>

            <div className="reveal in reveal-d3 mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#contato"
              className="cta-primary text-white font-semibold text-[15.5px] px-6 py-3.5 rounded-xl inline-flex items-center justify-center gap-2">
                Agendar demonstração
                <Icon name="arrow-right" size={16} strokeWidth={2.4} />
              </a>
              <a href="#como-funciona"
              className="text-[15.5px] font-medium px-6 py-3.5 rounded-xl inline-flex items-center justify-center gap-2 border"
              style={{ borderColor: "var(--kv-border)", background: "white", color: "var(--kv-ink)" }}>
                <Icon name="play" size={14} strokeWidth={2.4} />
                Ver como funciona
              </a>
            </div>

            <div className="reveal in reveal-d4 mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[12.5px]"
            style={{ color: "var(--kv-muted)" }}>
              <span className="flex items-center gap-1.5"><Icon name="brain-circuit" size={14} strokeWidth={2} /> Aprende a cada vídeo</span>
              <span className="flex items-center gap-1.5"><Icon name="git-fork" size={14} strokeWidth={2} /> Adapta-se ao seu processo</span>
              <span className="flex items-center gap-1.5"><Icon name="shield-check" size={14} strokeWidth={2} /> LGPD-ready</span>
            </div>
          </div>

          <div className="lg:col-span-6 relative reveal in reveal-d2">
            <HeroComposite />
          </div>
        </div>
      </div>
    </section>);

}

// ───────────────────────────────────────────────────────────────────────────
// Headline options
// ───────────────────────────────────────────────────────────────────────────
const HEADLINES = {
  invisivel: {
    label: "Aprende a sua fábrica",
    lead: "Uma IA que aprende como a",
    accent: "sua fábrica trabalha.",
    sub: "Instalamos as câmeras, e as imagens fluem sozinhas pra plataforma. A IA descobre os comportamentos do seu processo, conversa com quem entende do chão de fábrica e vira um especialista da sua operação — não de uma genérica."
  },
  raiox: {
    label: "O sistema que evolui",
    lead: "O primeiro sistema que entende o seu processo industrial —",
    accent: "e melhora sozinho a cada vídeo.",
    sub: "Sem lista fixa de atividades. A IA observa, descobre o vocabulário da sua operação, pede validação e aprende com cada correção. Quanto mais roda, mais preciso fica."
  },
  enxergar: {
    label: "Onde o tempo escapa",
    lead: "Descubra onde o tempo escapa",
    accent: "na sua operação.",
    sub: "Uma IA que aprende o seu chão de fábrica — não um chão genérico — e aponta, com lógica Lean, onde há desperdício, gargalo e ociosidade. Com impacto estimado."
  },
  decisao: {
    label: "Não é monitoramento",
    lead: "Não é monitoramento.",
    accent: "É uma inteligência que aprende a sua operação.",
    sub: "Descobre os comportamentos do seu processo, faz perguntas genuínas sobre como você trabalha e retém esse conhecimento pra sempre. Único no mundo."
  }
};

// Palette options
const PALETTES = {
  classico: { name: "SpectraAI", h900: "#44279C", h700: "#5330C0", h500: "#683BED", h200: "#C5B9F5", h50: "#EFEBFC", dark: false },
  intenso: { name: "Vibrante", h900: "#44279C", h700: "#683BED", h500: "#5330C0", h200: "#C5B9F5", h50: "#EFEBFC", dark: false },
  noturno: { name: "Modo escuro", h900: "#5330C0", h700: "#683BED", h500: "#8B6BF0", h200: "#44279C", h50: "#1A0F36", dark: true },
  azulado: { name: "Roxo azulado", h900: "#3730A3", h700: "#4F46E5", h500: "#6366F1", h200: "#C7D2FE", h50: "#EEF2FF", dark: false }
};

const FONTS = {
  inter: { name: "Inter", display: "'Inter', ui-sans-serif, system-ui, sans-serif", body: "'Inter', ui-sans-serif, system-ui, sans-serif" },
  jakarta: { name: "Plus Jakarta Sans", display: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif", body: "'Inter', ui-sans-serif, system-ui, sans-serif" },
  manrope: { name: "Manrope", display: "'Manrope', ui-sans-serif, system-ui, sans-serif", body: "'Inter', ui-sans-serif, system-ui, sans-serif" },
  grotesk: { name: "Space Grotesk", display: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif", body: "'Inter', ui-sans-serif, system-ui, sans-serif" }
};

// ───────────────────────────────────────────────────────────────────────────
// App shell with Tweaks
// ───────────────────────────────────────────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "headline": "invisivel",
  "palette": "classico",
  "font": "inter"
} /*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply palette + font to CSS vars + body class
  useEffect(() => {
    const p = PALETTES[t.palette] || PALETTES.classico;
    const root = document.documentElement;
    root.style.setProperty("--kv-purple-900", p.h900);
    root.style.setProperty("--kv-purple-700", p.h700);
    root.style.setProperty("--kv-purple-500", p.h500);
    root.style.setProperty("--kv-purple-200", p.h200);
    root.style.setProperty("--kv-purple-50", p.h50);
    document.body.classList.toggle("kv-dark", !!p.dark);

    const f = FONTS[t.font] || FONTS.inter;
    root.style.setProperty("--kv-display", f.display);
    root.style.setProperty("--kv-body", f.body);
  }, [t.palette, t.font]);

  // Reveal-on-scroll
  useReveal();

  const headline = HEADLINES[t.headline] || HEADLINES.invisivel;

  return (
    <>
      <Nav />
      <main>
        <Hero headline={headline} />
        <CredBar />
        <Problem />
        <HowItWorks />
        <Capabilities />
        <Differentials />
        <UseCases />
        <FeaturedCase />
        <CtaForm />
        <FAQ />
      </main>
      <Footer />

      <TweaksPanel>
        <TweakSection label="Headline" />
        <TweakSelect
          label="Variação"
          value={t.headline}
          options={Object.keys(HEADLINES).map((k) => ({ value: k, label: HEADLINES[k].label }))}
          onChange={(v) => setTweak("headline", v)} />
        

        <TweakSection label="Paleta" />
        <TweakSelect
          label="Esquema"
          value={t.palette}
          options={Object.keys(PALETTES).map((k) => ({ value: k, label: PALETTES[k].name }))}
          onChange={(v) => setTweak("palette", v)} />
        
        <TweakColor
          label="Swatches"
          value={[PALETTES[t.palette].h700, PALETTES[t.palette].h900, PALETTES[t.palette].h200]}
          options={Object.keys(PALETTES).map((k) => [PALETTES[k].h700, PALETTES[k].h900, PALETTES[k].h200])}
          onChange={(v) => {
            // Match clicked swatch back to a palette key
            const key = Object.keys(PALETTES).find(
              (k) => PALETTES[k].h700 === v[0] && PALETTES[k].h900 === v[1]
            );
            if (key) setTweak("palette", key);
          }} />
        

        <TweakSection label="Tipografia" />
        <TweakSelect
          label="Display"
          value={t.font}
          options={Object.keys(FONTS).map((k) => ({ value: k, label: FONTS[k].name }))}
          onChange={(v) => setTweak("font", v)} />
        
      </TweaksPanel>
    </>);

}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);