// Hero composite: tells the LEARNING story, not live monitoring.
// 1) Video frame (installed cameras feed it automatically) with bounding boxes
// 2) "Comportamentos descobertos" card — natural-language labels consolidating with rising confidence
// 3) "Validação + pergunta da IA" card — human-in-the-loop + a genuine AI question
// 4) "Sugestão de produtividade" pill emerging at the end

const { useEffect, useState, useRef } = React;

// ───────────────────────────────────────────────────────────────────────────
// Video frame — installed cameras, abstracted factory scene with tracked people
// ───────────────────────────────────────────────────────────────────────────
function VideoFrame() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2000);
    return () => clearInterval(id);
  }, []);

  const ops = [
  { id: "P-01", x: 14, y: 38, w: 18, h: 36, act: "movimenta peça" },
  { id: "P-02", x: 45, y: 30, w: 16, h: 42, act: "ajusta setup" },
  { id: "P-03", x: 70, y: 44, w: 14, h: 30, act: "aguarda máquina" }];


  return (
    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-white/10"
    style={{ background: "linear-gradient(180deg, #1a0f30 0%, #0d0820 60%, #050309 100%)" }}>
      <svg viewBox="0 0 320 200" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="floor" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#1a0f30" stopOpacity="0" />
            <stop offset="1" stopColor="#2a1a52" stopOpacity=".55" />
          </linearGradient>
          <linearGradient id="machGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#3b2470" />
            <stop offset="1" stopColor="#1a0f30" />
          </linearGradient>
        </defs>
        <rect x="0" y="140" width="320" height="60" fill="url(#floor)" />
        <g stroke="rgba(83,48,192,0.18)" strokeWidth=".5">
          <line x1="0" y1="140" x2="320" y2="140" />
          <line x1="40" y1="200" x2="120" y2="140" />
          <line x1="280" y1="200" x2="200" y2="140" />
          <line x1="160" y1="200" x2="160" y2="140" />
        </g>
        <g fill="url(#machGrad)" stroke="rgba(83,48,192,0.28)" strokeWidth=".6">
          <rect x="20" y="98" width="60" height="50" rx="3" />
          <rect x="125" y="86" width="70" height="62" rx="3" />
          <rect x="230" y="100" width="60" height="48" rx="3" />
          <rect x="56" y="84" width="14" height="14" />
          <rect x="160" y="70" width="14" height="14" />
          <rect x="266" y="86" width="12" height="12" />
        </g>
        <rect x="0" y="158" width="320" height="6" fill="#241640" stroke="rgba(83,48,192,0.3)" strokeWidth=".4" />
        <g fill="rgba(255,235,180,0.18)">
          <ellipse cx="60" cy="22" rx="40" ry="6" />
          <ellipse cx="160" cy="22" rx="40" ry="6" />
          <ellipse cx="260" cy="22" rx="40" ry="6" />
        </g>
        <g fill="#0a0614" stroke="rgba(255,255,255,0.05)">
          <g transform="translate(60,128)">
            <ellipse cx="0" cy="-2" rx="4" ry="4" />
            <rect x="-5" y="2" width="10" height="22" rx="3" />
          </g>
          <g transform="translate(165,118)">
            <ellipse cx="0" cy="-2" rx="4" ry="4" />
            <rect x="-5" y="2" width="10" height="26" rx="3" />
          </g>
          <g transform="translate(254,128)">
            <ellipse cx="0" cy="-2" rx="3.5" ry="3.5" />
            <rect x="-5" y="2" width="10" height="22" rx="3" />
          </g>
        </g>
      </svg>

      <div className="absolute inset-0 scanlines pointer-events-none opacity-50" />

      {/* Bounding boxes — labelled with discovered ACTIVITIES (natural language) */}
      {ops.map((o, i) =>
      <div
        key={o.id}
        className="absolute bbox rounded-md"
        style={{
          left: `${o.x}%`, top: `${o.y}%`, width: `${o.w}%`, height: `${o.h}%`,
          border: "1.5px solid rgba(104,59,237,0.95)",
          background: "rgba(83,48,192,0.05)",
          animationDelay: `${i * 0.4}s`
        }}>
        
          <div className="absolute -top-[18px] left-0 px-1.5 py-[2px] rounded-[4px] text-[9px] font-mono font-medium"
        style={{ background: "rgba(83,48,192,0.95)", color: "white", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
            {o.id}
          </div>
          <div className="absolute -bottom-[16px] right-0 px-1.5 py-[1px] rounded-[3px] text-[8.5px] font-mono"
        style={{ background: "rgba(0,0,0,0.7)", color: "rgba(197,185,245,0.95)", letterSpacing: "0.03em", whiteSpace: "nowrap" }}>
            {o.act}
          </div>
        </div>
      )}

      {/* HUD — emphasizes auto-capture + interpretation, not "live surveillance" */}
      <div className="absolute top-3 left-3 flex items-center gap-2 text-[10px] font-mono">
        <span className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/60 text-white/90">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 live-dot inline-block" />
          INTERPRETANDO
        </span>
        <span className="px-2 py-1 rounded-md bg-black/40 text-white/70">CAM-04 · captação automática</span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-3 py-2 flex items-center justify-between text-[10px] font-mono"
      style={{ background: "linear-gradient(0deg, rgba(0,0,0,.7), transparent)" }}>
        <span className="text-white/70">3 pessoas rastreadas · 3 ações descritas</span>
        <span className="text-white/50">detect · track · descrever</span>
      </div>
    </div>);

}

// ───────────────────────────────────────────────────────────────────────────
// "Comportamentos descobertos" — labels consolidating, confidence rising
// ───────────────────────────────────────────────────────────────────────────
function useConfidence(target, delay = 0, duration = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf, start;
    const startAt = performance.now() + delay;
    const step = (t) => {
      if (t < startAt) {raf = requestAnimationFrame(step);return;}
      if (!start) start = t;
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, delay, duration]);
  return val;
}

function BehaviorRow({ label, group, conf, delay }) {
  const c = useConfidence(conf, delay);
  const settled = c >= conf - 0.3;
  return (
    <div className="opacity-0" style={{ animation: `kvFadeUp .5s ease forwards`, animationDelay: `${delay}ms` }}>
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <div className="text-[11.5px] text-gray-700 leading-tight truncate">
            <span className="text-gray-400">“</span>{label}<span className="text-gray-400">”</span>
          </div>
          <div className="text-[10px] mt-0.5 flex items-center gap-1" style={{ color: "var(--kv-purple-700)" }}>
            <Icon name="corner-down-right" size={10} strokeWidth={2.2} />
            <span className="font-medium">{group}</span>
          </div>
        </div>
        <div className="text-[10px] font-mono tabular-nums shrink-0" style={{ color: settled ? "#16a34a" : "var(--kv-muted)" }}>
          {Math.round(c)}%
        </div>
      </div>
      <div className="mt-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--kv-purple-50)" }}>
        <div className="h-full rounded-full transition-[width] duration-300"
        style={{ width: `${c}%`, background: settled ? "linear-gradient(90deg,#22c55e,#16a34a)" : "linear-gradient(90deg,#5330C0,#44279C)" }} />
      </div>
    </div>);

}

function DiscoveryCard() {
  return (
    <div className="rounded-xl bg-white border shadow-xl"
    style={{ borderColor: "rgba(68,39,156,0.08)", boxShadow: "0 30px 60px -20px rgba(68,39,156,0.25), 0 8px 18px -8px rgba(68,39,156,0.18)" }}>
      <div className="flex items-center justify-between px-4 pt-3.5 pb-2.5 border-b" style={{ borderColor: "rgba(68,39,156,0.07)" }}>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md grid place-items-center" style={{ background: "var(--kv-purple-50)", color: "var(--kv-purple-700)" }}>
            <Icon name="scan-search" size={13} strokeWidth={2} />
          </div>
          <div className="text-[12px] font-semibold text-gray-800">Comportamentos descobertos</div>
        </div>
        <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded" style={{ background: "var(--kv-purple-50)", color: "var(--kv-purple-700)" }}>Linha A</span>
      </div>
      <div className="px-4 py-3.5 space-y-3">
        <BehaviorRow label="empurra carrinho até a prensa" group="movimentação" conf={96} delay={150} />
        <BehaviorRow label="confere medida com paquímetro" group="inspeção" conf={91} delay={500} />
        <BehaviorRow label="parado, aguardando ciclo" group="espera" conf={78} delay={900} />
      </div>
      <div className="px-4 pb-3.5 -mt-1 flex items-center gap-1.5 text-[10.5px]" style={{ color: "var(--kv-muted)" }}>
        <Icon name="sparkles" size={11} strokeWidth={2} />
        vocabulário do seu processo, criado pela IA
      </div>
    </div>);

}

// ───────────────────────────────────────────────────────────────────────────
// "Validação + pergunta da IA" — human-in-the-loop + genuine question
// ───────────────────────────────────────────────────────────────────────────
function ValidationCard() {
  const [phase, setPhase] = useState(0); // 0 ask, 1 answered/confident
  useEffect(() => {
    const id = setInterval(() => setPhase((p) => (p + 1) % 2), 3600);
    return () => clearInterval(id);
  }, []);
  const conf = phase === 1 ? 94 : 71;
  return (
    <div className="rounded-xl bg-white border shadow-xl overflow-hidden"
    style={{ borderColor: "rgba(68,39,156,0.08)", boxShadow: "0 22px 40px -18px rgba(68,39,156,0.25)" }}>
      <div className="px-3.5 py-2.5 flex items-center gap-2 border-b"
      style={{ borderColor: "rgba(68,39,156,0.07)" }}>
        <img src="assets/prism-mark.png" alt="" width="22" height="22"
        style={{ objectFit: "contain", display: "block", width: "32px", height: "32px" }} />
        <div className="text-[11.5px] leading-tight">
          <div className="font-semibold text-gray-800">Prism aprende</div>
          <div className="text-[9.5px] text-gray-400">validação · pergunta</div>
        </div>
      </div>

      <div className="p-3.5 space-y-2.5">
        {/* behavior to validate */}
        <div className="rounded-lg border px-2.5 py-2" style={{ borderColor: "rgba(68,39,156,0.1)", background: "#FBFAFF" }}>
          <div className="text-[11px] text-gray-700 leading-snug">
            Classifiquei como <b style={{ color: "var(--kv-purple-700)" }}>espera</b>: “parado, aguardando ciclo”.
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium"
            style={{ background: phase === 1 ? "#dcfce7" : "var(--kv-purple-50)", color: phase === 1 ? "#16a34a" : "var(--kv-purple-700)", transition: "all .3s" }}>
              <Icon name="check" size={11} strokeWidth={3} /> {phase === 1 ? "confirmado" : "confirmar"}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium border"
            style={{ borderColor: "rgba(68,39,156,0.12)", color: "var(--kv-muted)" }}>
              <Icon name="pencil" size={10} strokeWidth={2.4} /> corrigir
            </span>
          </div>
        </div>

        {/* genuine AI question */}
        <div className="rounded-lg px-2.5 py-2" style={{ background: "var(--kv-purple-50)" }}>
          <div className="text-[9.5px] font-semibold uppercase tracking-wider mb-1 flex items-center gap-1" style={{ color: "var(--kv-purple-700)" }}>
            <Icon name="message-circle-question" size={11} strokeWidth={2.2} /> Pergunta da IA
          </div>
          <div className="text-[11px] text-gray-700 leading-snug">
            Essa pausa antes da prensa é padrão do turno ou exceção?
          </div>
        </div>

        {/* confidence growing */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--kv-purple-50)" }}>
            <div className="h-full rounded-full transition-[width] duration-700"
            style={{ width: `${conf}%`, background: "linear-gradient(90deg,#5330C0,#44279C)" }} />
          </div>
          <span className="text-[10px] font-mono tabular-nums" style={{ color: "var(--kv-purple-700)" }}>{conf}%</span>
        </div>
        <div className="text-[10px] -mt-1" style={{ color: "var(--kv-muted)" }}>
          confiança do modelo {phase === 1 ? "após sua resposta" : "antes de aprender"}
        </div>
      </div>
    </div>);

}

// ───────────────────────────────────────────────────────────────────────────
// "Sugestão de produtividade" pill — emerges last
// ───────────────────────────────────────────────────────────────────────────
function SuggestionPill() {
  return (
    <div className="rounded-xl px-3.5 py-3 shadow-xl border flex items-start gap-2.5"
    style={{
      background: "linear-gradient(135deg, #44279C, #0B0612)", color: "white",
      borderColor: "rgba(104,59,237,0.4)",
      boxShadow: "0 18px 40px -16px rgba(68,39,156,0.6)",
      animation: "kvFadeUp .6s ease forwards", animationDelay: "1.3s", opacity: 0
    }}>
      <div className="w-7 h-7 rounded-lg grid place-items-center shrink-0" style={{ background: "rgba(255,255,255,0.14)" }}>
        <Icon name="trending-up" size={15} strokeWidth={2.2} />
      </div>
      <div className="leading-tight">
        <div className="text-[9.5px] uppercase tracking-wider font-semibold" style={{ color: "#C5B9F5" }}>Sugestão Lean</div>
        <div className="text-[12px] font-medium mt-0.5">Espera evitável antes da prensa — potencial de recuperar tempo na Linha A.</div>
      </div>
    </div>);

}

// ───────────────────────────────────────────────────────────────────────────
// HeroComposite — arranges the learning story
// ───────────────────────────────────────────────────────────────────────────
function HeroComposite() {
  return (
    <div className="relative w-full">
      <div className="absolute -inset-8 rounded-[40px] -z-10 opacity-60"
      style={{ background: "radial-gradient(60% 60% at 50% 30%, rgba(83,48,192,0.22), transparent 70%)" }} />
      <div className="relative">
        <VideoFrame />
        {/* Floating discovery card — top right overlap */}
        <div className="hidden md:block absolute -right-6 -top-10 w-[60%] max-w-[400px]">
          <DiscoveryCard />
        </div>
        {/* Floating validation card — bottom left overlap */}
        <div className="hidden md:block absolute -left-8 bottom-2 w-[50%] max-w-[300px]">
          <ValidationCard />
        </div>
        {/* Suggestion pill — bottom right, emerges last */}
        <div className="hidden lg:block absolute -right-4 -bottom-10 w-[58%] max-w-[340px]">
          <SuggestionPill />
        </div>
      </div>
      {/* Mobile: stacked below */}
      <div className="md:hidden mt-6 grid grid-cols-1 gap-4">
        <DiscoveryCard />
        <ValidationCard />
        <SuggestionPill />
      </div>
    </div>);

}

window.HeroComposite = HeroComposite;