import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowDownRight, BookOpen, BriefcaseBusiness, Check, CircleDollarSign, Gauge, GraduationCap, Network, ScanSearch, ShieldCheck, Sparkles, Users, X } from 'lucide-react';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

const COP = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
const EXPIRES_AT = new Date('2026-09-12T23:59:59-05:00').getTime();
const PLATFORM = 15_361_000;
const BUNDLE = 18_500_000;
const AGENT_EXCLUSIVE = 6_915_000;
const AGENT_NORMAL = 13_863_000;
const LEADS = 1_450_000;
const LEADS_NORMAL = 1_800_000;
const Ecosystem = React.lazy(() => import('./Ecosystem.jsx'));

const areas = [
  { id: 'talent', label: 'Talento + oportunidades', short: 'BOARD', icon: BriefcaseBusiness, title: 'El talento no queda archivado. Encuentra una oportunidad.', desc: 'Perfiles, criterios, búsqueda y conexiones con empresas viven en un board accionable.', metric: 'MATCH // ACTIVO', bullets: ['Perfiles y portafolios', 'Oportunidades de empresas', 'Seguimiento de postulaciones'] },
  { id: 'community', label: 'Comunidad', short: 'RED', icon: Users, title: 'Una comunidad que genera contexto, no ruido.', desc: 'Conversaciones, expertos y recursos organizados alrededor del progreso de cada persona.', metric: 'CONEXIÓN // CONTINUA', bullets: ['Espacios temáticos', 'Interacción entre miembros', 'Recursos compartidos'] },
  { id: 'learning', label: 'Aprendizaje', short: 'RUTA', icon: GraduationCap, title: 'Aprender tiene una ruta y una salida.', desc: 'Programas, contenidos y progreso conectados con capacidades que el mercado realmente busca.', metric: 'PROGRESO // MEDIBLE', bullets: ['Rutas de aprendizaje', 'Progreso individual', 'Diagnóstico y recomendación'] },
  { id: 'ops', label: 'Gestión interna', short: 'OPS', icon: Gauge, title: 'Profesores y administradores ven el sistema completo.', desc: 'Un tablero operacional para contenidos, personas, comunidad, oportunidades e indicadores.', metric: 'CONTROL // UNIFICADO', bullets: ['Roles y permisos', 'Operación académica', 'Indicadores y actividad'] },
];

const plans = [
  { id: 'none', name: 'Sin gestión', price: 0, desc: '$480.000 por sesión cuando se requiera.' },
  { id: 'basic', name: 'Básica', price: 855_000, desc: 'Soporte funcional: respuesta ≤24 h y resolución ≤30 h.' },
  { id: 'premium', name: 'Premium', price: 2_300_000, desc: 'Respuesta ≤18 h, actualizaciones, integraciones y hasta 4 h de formación.' },
  { id: 'partner', name: 'Asociado Solvers', price: 5_000_000, desc: 'Respuesta ≤12 h, 4 skills/mes, 8 h de formación y desarrollo a medida.' },
];

function useCountdown() {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const timer = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(timer); }, []);
  const d = Math.max(0, EXPIRES_AT - now);
  return { días: Math.floor(d / 86_400_000), horas: Math.floor((d / 3_600_000) % 24), minutos: Math.floor((d / 60_000) % 60), segundos: Math.floor((d / 1000) % 60) };
}

function Countdown() { const value = useCountdown(); return <div className="countdown">{Object.entries(value).map(([label, amount]) => <div key={label}><strong>{String(amount).padStart(2,'0')}</strong><span>{label}</span></div>)}</div>; }

function App() {
  const root = useRef();
  const [areaIndex, setAreaIndex] = useState(0);
  const [scope, setScope] = useState('platform');
  const [leads, setLeads] = useState(true);
  const [planId, setPlanId] = useState('premium');
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return undefined;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let frame; const raf = (time) => { lenis.raf(time); frame = requestAnimationFrame(raf); }; frame = requestAnimationFrame(raf);
    const context = gsap.context(() => gsap.utils.toArray('[data-reveal]').forEach((item) => gsap.fromTo(item, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: .85, ease: 'power3.out', scrollTrigger: { trigger: item, start: 'top 86%' } })), root);
    return () => { cancelAnimationFrame(frame); lenis.destroy(); context.revert(); };
  }, []);

  const combined = scope === 'bundle';
  const base = combined ? BUNDLE : PLATFORM;
  const skillTotal = leads ? LEADS : 0;
  const oneTime = base + skillTotal;
  const plan = plans.find((item) => item.id === planId);
  const monthly = Math.round(plan.price * (combined ? 1.25 : 1));
  const reference = combined ? AGENT_NORMAL + PLATFORM + (leads ? LEADS_NORMAL : 0) : PLATFORM + (leads ? LEADS_NORMAL : 0);
  const saving = reference - oneTime;
  const installments = useMemo(() => [oneTime * .5, oneTime * .3, oneTime * .2], [oneTime]);
  const area = areas[areaIndex];
  const AreaIcon = area.icon;

  return <main ref={root}>
    <header className="nav shell"><a className="brand" href="#top"><span className="brand-symbol">S/</span><span><b>SOLVERS</b><small>PROPUESTA // VR-02</small></span></a><a className="nav-action" href="#ecosistema">Explorar sistema <ArrowDownRight size={15} /></a></header>

    <section className="hero shell" id="top">
      <div className="hero-copy" data-reveal><div className="eyebrow"><span /> ECOSISTEMA FRACTIONAL // FASE 2</div><h1>Aprender.<br />Conectar.<br /><em>Convertir.</em></h1><p>Una comunidad aislada conversa. Una plataforma conectada transforma aprendizaje, talento y oportunidades en un sistema que puede medirse, gestionarse y crecer.</p><div className="hero-actions"><a className="primary" href="#ecosistema">Ver el recorrido <ArrowDownRight /></a><div><span>DESARROLLO</span><strong>{COP.format(PLATFORM)}</strong></div></div></div>
      <div className="hero-canvas"><Suspense fallback={<div className="canvas-fallback">MAPEANDO ECOSISTEMA</div>}><Ecosystem activeIndex={areaIndex} /></Suspense><div className="canvas-label"><span>NÚCLEO</span><strong>FRACTIONAL OS</strong><i>ONLINE</i></div></div>
    </section>

    <section className="signal-strip"><div className="shell">{['DIAGNÓSTICO','APRENDIZAJE','COMUNIDAD','TALENTO','OPORTUNIDAD','CONVERSIÓN'].map((item,i)=><span key={item}>{String(i+1).padStart(2,'0')} // {item}</span>)}</div></section>

    <section className="section shell" data-reveal><div className="section-heading"><div><span className="index">01 / PROBLEMA OPERATIVO</span><h2>El valor se pierde<br />entre plataformas.</h2></div><p>Si el diagnóstico vive en un formulario, el aprendizaje en otro lugar y las oportunidades en una hoja, cada traspaso rompe contexto. La plataforma preserva ese contexto hasta la conversión.</p></div><div className="before-after"><div><span>HOY / FRAGMENTADO</span><div className="fragmented">{['Leads','Cursos','Comunidad','Talento','Empresas'].map((x)=><i key={x}>{x}</i>)}</div></div><div className="flow-arrow">→</div><div><span>CON EL SISTEMA</span><div className="unified"><strong>FRACTIONAL<br/>OS</strong><small>UN SOLO CONTEXTO</small></div></div></div></section>

    <section className="ecosystem" id="ecosistema"><div className="shell" data-reveal><div className="section-heading"><div><span className="index">02 / ECOSISTEMA</span><h2>Cuatro espacios.<br />Una sola operación.</h2></div><p>Explora cómo cada frente alimenta al siguiente y cómo profesores y administradores conservan control del ciclo completo.</p></div><div className="explorer">
      <nav className="area-tabs" aria-label="Áreas de la plataforma">{areas.map((item,index)=>{const Icon=item.icon;return <button key={item.id} onClick={()=>setAreaIndex(index)} className={areaIndex===index?'active':''}><span>0{index+1}</span><Icon/><strong>{item.label}</strong></button>})}</nav>
      <div className="area-display"><AnimatePresence mode="wait"><motion.div key={area.id} initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-18}} className="area-copy"><div className="area-icon"><AreaIcon/></div><span>{area.metric}</span><h3>{area.title}</h3><p>{area.desc}</p><ul>{area.bullets.map((bullet)=><li key={bullet}><Check size={14}/>{bullet}</li>)}</ul></motion.div></AnimatePresence><div className="area-mini-map"><div className="radar"><i/><i/><i/><strong>{area.short}</strong></div></div></div>
    </div></div></section>

    <section className="leads shell" data-reveal><div className="leads-visual"><ScanSearch size={42}/><div className="funnel"><span>LEAD</span><i/><span>DIAGNÓSTICO</span><i/><span>OPORTUNIDAD</span><i/><strong>CONVERSIÓN</strong></div></div><div className="leads-copy"><span className="index">03 / PUENTE INTELIGENTE</span><h2>Leads Ops no trae una lista.<br />Trae criterio.</h2><p>Califica cada oportunidad con las reglas entrenadas para la metodología, genera un diagnóstico y activa la ruta adecuada de aprendizaje, comunidad o conversión.</p><div className="skill-price"><del>{COP.format(LEADS_NORMAL)}</del><strong>{COP.format(LEADS)}</strong><small>Skill adicional, fuera del bundle</small></div></div></section>

    <section className="agent-support"><div className="shell support-grid" data-reveal><div><span className="index">04 / SOPORTE INTERNO</span><h2>Las preguntas operativas no frenan el progreso.</h2><p>Un agente interno ayuda a orientar temas financieros y laborales: impuestos, contratos, procesos y documentación. Mantiene contexto dentro de la plataforma y escala a un especialista cuando corresponde.</p><small>La orientación del agente no sustituye asesoría jurídica, tributaria o contable profesional.</small></div><div className="support-console"><div><span>AGENT // SUPPORT</span><i>ONLINE</i></div><p>&gt; ¿Qué debo revisar antes de firmar este contrato?</p><strong>Preparando checklist según tu perfil, jurisdicción y tipo de vinculación...</strong><div className="console-progress"><i/></div></div></div></section>

    <section className="calculator" id="configurar"><div className="shell" data-reveal><div className="section-heading"><div><span className="index">05 / CONFIGURACIÓN</span><h2>Activa el sistema<br />por etapas o completo.</h2></div><p>Compara la plataforma sola con el ecosistema completo. Leads Ops y la gestión permanecen visibles como decisiones independientes.</p></div><div className="calc-layout"><div className="calc-controls">
      <div className="choice"><span>ALCANCE</span><div className="scope-buttons"><button className={!combined?'active':''} onClick={()=>setScope('platform')}><span>Solo Fase 2</span><strong>{COP.format(PLATFORM)}</strong><small>6 semanas</small></button><button className={combined?'active':''} onClick={()=>setScope('bundle')}><span>Fase 1 + Fase 2</span><strong>{COP.format(BUNDLE)}</strong><small>Ahorra {COP.format(3_776_000)}</small></button></div></div>
      <div className="choice"><span>SKILL RECOMENDADA</span><button className={`leads-toggle ${leads?'active':''}`} onClick={()=>setLeads(!leads)}><div><ScanSearch/><span><strong>Leads Ops</strong><small>Diagnóstico y calificación para conversión</small></span></div><b>{COP.format(LEADS)}</b><i>{leads?<Check/>:<span>+</span>}</i></button></div>
      <div className="choice"><span>GESTIÓN MENSUAL OPCIONAL</span><div className="plans">{plans.map((item)=><button key={item.id} onClick={()=>setPlanId(item.id)} className={planId===item.id?'active':''}><div><strong>{item.name}</strong><p>{item.desc}</p></div><b>{item.price?`${COP.format(Math.round(item.price*(combined?1.25:1)))}/mes`:'$0/mes'}</b></button>)}</div></div>
    </div><aside className="summary"><div className="summary-head"><span>SISTEMA // VR-02</span><i>CONFIGURADO</i></div><div className="summary-value"><span>INVERSIÓN ÚNICA</span><AnimatePresence mode="wait"><motion.strong key={oneTime} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}}>{COP.format(oneTime)}</motion.strong></AnimatePresence><p>{combined?'Dos desarrollos base':'Plataforma Fase 2'}{leads?' + Leads Ops':''}.</p></div><div className="saving"><span>AHORRO SOBRE REFERENCIA</span><strong>{COP.format(saving)}</strong></div><div className="summary-lines"><div><span>Desarrollo</span><strong>{COP.format(base)}</strong></div><div><span>Leads Ops</span><strong>{leads?COP.format(LEADS):'—'}</strong></div><div><span>Gestión</span><strong>{monthly?`${COP.format(monthly)}/mes`:'Por sesión'}</strong></div></div><div className="payments"><span>PAGOS 50 / 30 / 20</span>{['Inicio','Semana 2','Entrega semana 6'].map((x,i)=><div key={x}><span>{x}</span><strong>{COP.format(installments[i])}</strong></div>)}</div><button className="primary" onClick={()=>setModal(true)}>Revisar selección <ArrowDownRight/></button></aside></div></div></section>

    <section className="timeline shell" data-reveal><div><span className="index">06 / ENTREGA</span><h2>Seis semanas.<br />Un sistema conectado.</h2></div><div className="weeks">{['Arquitectura y accesos','Experiencia y comunidad','Aprendizaje y talento','Operación interna','Agente e integraciones','Pruebas y entrega'].map((x,i)=><div key={x}><span>SEMANA {i+1}</span><strong>{x}</strong></div>)}</div></section>

    <section className="validity"><div className="shell validity-grid"><div><span>VIGENCIA GLOBAL</span><h2>La oportunidad vence.<br />El sistema permanece.</h2><p>Propuesta válida hasta el 12 de septiembre de 2026.</p></div><Countdown/></div></section>

    <footer className="shell"><div className="brand"><span className="brand-symbol">S/</span><span><b>SOLVERS</b><small>FRACTIONAL OS</small></span></div><p>Verónica Restrepo · Propuesta confidencial · 2026</p></footer>

    <AnimatePresence>{modal&&<motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setModal(false)}><motion.div className="modal" initial={{scale:.97,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:.97,opacity:0}} onClick={(e)=>e.stopPropagation()}><button className="close" onClick={()=>setModal(false)}><X/></button><span>SELECCIÓN LISTA</span><h2>{combined?'Ecosistema completo':'Plataforma fractional'}</h2><strong>{COP.format(oneTime)}</strong><p>{leads?'Incluye Leads Ops como skill adicional. ':'Sin skills adicionales. '}Entrega en 6 semanas.</p><div>La aceptación formal se documenta con alcance y contrato definitivos.</div></motion.div></motion.div>}</AnimatePresence>
  </main>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
