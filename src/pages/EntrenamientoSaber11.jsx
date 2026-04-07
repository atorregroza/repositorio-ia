import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { practicaQuestions, modeloQuestions } from '../data/saber11Questions'

/* ─── palette ─── */
const TEAL = '#2b5a52'
const TEAL_LIGHT = '#e8f0ee'
const GOLD = '#fbb041'
const GOLD_LIGHT = '#fef5e4'
const RED_TIP = '#c0392b'

/* ─── tiny helpers ─── */
const SectionBadge = ({ n, label }) => (
  <span
    className="inline-block rounded-full px-4 py-1 text-sm font-semibold text-white mb-3"
    style={{ background: TEAL }}
  >
    {n}. {label}
  </span>
)

const Card = ({ children, className = '' }) => (
  <div className={`rounded-2xl border border-gray-200 bg-white p-6 shadow-sm ${className}`}>
    {children}
  </div>
)

const TipBox = ({ children, color = GOLD }) => (
  <div
    className="rounded-xl p-4 mt-4 font-semibold text-sm leading-relaxed"
    style={{ background: color === GOLD ? GOLD_LIGHT : '#fde8e8', borderLeft: `4px solid ${color}` }}
  >
    {children}
  </div>
)

const MathBlock = ({ children }) => (
  <div className="bg-gray-50 rounded-lg p-4 my-3 font-mono text-sm leading-relaxed">{children}</div>
)

const Badge = ({ label }) => (
  <span className="inline-block rounded-full border border-gray-300 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700">
    {label}
  </span>
)

const SimpleTable = ({ headers, rows, accent = TEAL }) => (
  <table className="w-full border-collapse my-4 text-sm">
    <thead>
      <tr>
        {headers.map((h, i) => (
          <th key={i} className="py-2 px-4 text-center font-semibold text-white" style={{ background: accent }}>
            {h}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row, ri) => (
        <tr key={ri} className={ri % 2 === 0 ? 'bg-blue-50/50' : 'bg-white'}>
          {row.map((cell, ci) => (
            <td key={ci} className="py-2 px-4 text-center border-b border-gray-100">
              {cell}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
)

/* ─── Quiz component (reused for both sets) ─── */
function QuizSection({ questions, title, checkLabel = 'Revisar respuestas', resetLabel = 'Reiniciar' }) {
  const [selected, setSelected] = useState({})
  const [checked, setChecked] = useState(false)

  const pick = (qId, optIdx) => {
    if (checked) return
    setSelected((p) => ({ ...p, [qId]: optIdx }))
  }

  const score = checked
    ? questions.reduce((s, q) => s + (selected[q.id] === q.answer ? 1 : 0), 0)
    : null

  let lastCat = null

  return (
    <div>
      {questions.map((q) => {
        const showCatHeader = q.category && q.category !== lastCat
        if (q.category) lastCat = q.category
        return (
          <div key={q.id}>
            {showCatHeader && (
              <div className="mt-8 mb-4">
                <h3 className="text-xl font-bold" style={{ color: TEAL }}>{q.category}</h3>
                {q.categoryIntro && <p className="text-sm text-gray-600 mt-1">{q.categoryIntro}</p>}
              </div>
            )}
            <Card className="mb-4">
              <p className="font-bold text-gray-900 mb-3">
                {q.id}. {q.q.split('\n')[0]}
              </p>
              {q.table && <SimpleTable headers={q.table.headers} rows={q.table.rows} />}
              <div className="space-y-2">
                {q.opts.map((opt, i) => {
                  const isSelected = selected[q.id] === i
                  const isCorrect = q.answer === i
                  let border = 'border-gray-200'
                  let bg = 'bg-white'
                  if (checked && isSelected && isCorrect) { border = 'border-green-500'; bg = 'bg-green-50' }
                  else if (checked && isSelected && !isCorrect) { border = 'border-red-400'; bg = 'bg-red-50' }
                  else if (checked && isCorrect) { border = 'border-green-400'; bg = 'bg-green-50/50' }
                  else if (isSelected) { border = 'border-teal-500'; bg = 'bg-teal-50' }

                  return (
                    <button
                      key={i}
                      onClick={() => pick(q.id, i)}
                      className={`w-full text-left rounded-lg border ${border} ${bg} px-4 py-3 text-sm transition-all cursor-pointer hover:border-teal-400`}
                    >
                      <span className="font-medium mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
                    </button>
                  )
                })}
              </div>
              {checked && (
                <div className={`mt-3 rounded-lg p-3 text-sm ${selected[q.id] === q.answer ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  {selected[q.id] === q.answer ? '✓ ¡Correcto! ' : '✗ Incorrecto. '}
                  {q.explanation}
                </div>
              )}
            </Card>
          </div>
        )
      })}

      {/* Score + buttons */}
      <div className="flex flex-wrap items-center gap-4 mt-6">
        <button
          onClick={() => setChecked(true)}
          disabled={checked}
          className="rounded-xl px-6 py-3 font-semibold text-white shadow-md transition-transform active:scale-95 disabled:opacity-50"
          style={{ background: TEAL }}
        >
          {checkLabel}
        </button>
        <button
          onClick={() => { setSelected({}); setChecked(false) }}
          className="rounded-xl border-2 px-6 py-3 font-semibold transition-transform active:scale-95"
          style={{ borderColor: TEAL, color: TEAL }}
        >
          {resetLabel}
        </button>
        {score !== null && (
          <span className="text-lg font-bold" style={{ color: TEAL }}>
            Resultado: {score}/{questions.length}
          </span>
        )}
      </div>
    </div>
  )
}

/* ─── SVG geometric figures ─── */
const SvgRectangle = () => (
  <svg viewBox="0 0 200 140" className="w-48 mx-auto">
    <rect x="30" y="20" width="140" height="90" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
    <line x1="30" y1="115" x2="170" y2="115" stroke="#dc2626" strokeWidth="3" />
    <line x1="175" y1="20" x2="175" y2="110" stroke="#0d9488" strokeWidth="3" strokeDasharray="6 4" />
    <text x="100" y="135" textAnchor="middle" fontSize="16" fontWeight="bold">b</text>
    <text x="188" y="70" textAnchor="middle" fontSize="16" fontWeight="bold">h</text>
  </svg>
)

const SvgSquare = () => (
  <svg viewBox="0 0 160 160" className="w-36 mx-auto">
    <rect x="20" y="10" width="110" height="110" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
    <line x1="20" y1="125" x2="130" y2="125" stroke="#dc2626" strokeWidth="3" />
    <text x="75" y="145" textAnchor="middle" fontSize="16" fontWeight="bold">l</text>
  </svg>
)

const SvgTriangle = () => (
  <svg viewBox="0 0 200 170" className="w-48 mx-auto">
    <polygon points="100,15 20,145 180,145" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
    <line x1="100" y1="15" x2="100" y2="145" stroke="#0d9488" strokeWidth="3" strokeDasharray="6 4" />
    <line x1="20" y1="150" x2="180" y2="150" stroke="#dc2626" strokeWidth="3" />
    <text x="100" y="168" textAnchor="middle" fontSize="16" fontWeight="bold">b</text>
    <text x="112" y="90" fontSize="16" fontWeight="bold">h</text>
  </svg>
)

const SvgCircle = () => (
  <svg viewBox="0 0 180 180" className="w-40 mx-auto">
    <circle cx="90" cy="90" r="70" fill="none" stroke="#2563eb" strokeWidth="3" />
    <circle cx="90" cy="90" r="4" fill="#1e293b" />
    <line x1="90" y1="90" x2="160" y2="90" stroke="#dc2626" strokeWidth="3" />
    <text x="128" y="82" fontSize="16" fontWeight="bold">r</text>
  </svg>
)

const SvgTrapezoid = () => (
  <svg viewBox="0 0 220 160" className="w-52 mx-auto">
    <polygon points="60,20 160,20 200,130 20,130" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
    <line x1="60" y1="15" x2="160" y2="15" stroke="#dc2626" strokeWidth="3" />
    <line x1="20" y1="135" x2="200" y2="135" stroke="#dc2626" strokeWidth="3" />
    <line x1="160" y1="20" x2="160" y2="130" stroke="#0d9488" strokeWidth="3" strokeDasharray="6 4" />
    <text x="110" y="10" textAnchor="middle" fontSize="14" fontWeight="bold">b</text>
    <text x="110" y="152" textAnchor="middle" fontSize="14" fontWeight="bold">B</text>
    <text x="170" y="80" fontSize="14" fontWeight="bold">h</text>
  </svg>
)

const SvgParallelogram = () => (
  <svg viewBox="0 0 220 140" className="w-52 mx-auto">
    <polygon points="50,15 200,15 170,120 20,120" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
    <line x1="20" y1="125" x2="170" y2="125" stroke="#dc2626" strokeWidth="3" />
    <line x1="170" y1="15" x2="170" y2="120" stroke="#0d9488" strokeWidth="3" strokeDasharray="6 4" />
    <text x="95" y="140" textAnchor="middle" fontSize="14" fontWeight="bold">b</text>
    <text x="180" y="72" fontSize="14" fontWeight="bold">h</text>
  </svg>
)

const SvgPitagoras = () => (
  <svg viewBox="0 0 200 200" className="w-48 mx-auto">
    <polygon points="30,170 30,50 170,170" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
    <rect x="30" y="155" width="15" height="15" fill="none" stroke="#2563eb" strokeWidth="1.5" />
    <line x1="30" y1="50" x2="170" y2="170" stroke="#2563eb" strokeWidth="3" />
    <text x="15" y="118" textAnchor="middle" fontSize="20" fontWeight="bold">3</text>
    <text x="100" y="192" textAnchor="middle" fontSize="20" fontWeight="bold">4</text>
    <text x="110" y="100" textAnchor="middle" fontSize="20" fontWeight="bold">h</text>
  </svg>
)

const SvgCartesian = () => (
  <svg viewBox="0 0 260 260" className="w-64 mx-auto">
    {/* grid */}
    {[-4,-3,-2,-1,0,1,2,3,4].map(i => (
      <g key={i}>
        <line x1={130+i*25} y1="10" x2={130+i*25} y2="250" stroke="#e5e7eb" strokeWidth="1" />
        <line x1="10" y1={130-i*25} x2="250" y2={130-i*25} stroke="#e5e7eb" strokeWidth="1" />
      </g>
    ))}
    {/* axes */}
    <line x1="10" y1="130" x2="250" y2="130" stroke="#1e293b" strokeWidth="2" markerEnd="url(#arrow)" />
    <line x1="130" y1="250" x2="130" y2="10" stroke="#1e293b" strokeWidth="2" markerEnd="url(#arrow)" />
    <defs><marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10" fill="#1e293b"/></marker></defs>
    {/* labels */}
    <text x="248" y="145" fontSize="14" fontWeight="bold">x</text>
    <text x="135" y="18" fontSize="14" fontWeight="bold">y</text>
    {[-4,-3,-2,-1,1,2,3,4].map(i => (
      <text key={`x${i}`} x={130+i*25} y="148" textAnchor="middle" fontSize="10">{i}</text>
    ))}
    {[-3,-2,-1,1,2,3].map(i => (
      <text key={`y${i}`} x="120" y={130-i*25+4} textAnchor="end" fontSize="10">{i}</text>
    ))}
    <text x="122" y="145" textAnchor="end" fontSize="10">0</text>
    {/* point A(-2, 3) */}
    <line x1={130-2*25} y1={130-3*25} x2={130-2*25} y2="130" stroke="#0d9488" strokeWidth="1.5" strokeDasharray="4 3" />
    <line x1={130-2*25} y1={130-3*25} x2="130" y2={130-3*25} stroke="#0d9488" strokeWidth="1.5" strokeDasharray="4 3" />
    <circle cx={130-2*25} cy={130-3*25} r="5" fill="#dc2626" />
    <text x={130-2*25+5} y={130-3*25-8} fontSize="13" fontWeight="bold">A(−2, 3)</text>
  </svg>
)

/* ─── Table of contents ─── */
const sections = [
  { id: 's1', n: 1, label: 'Qué debes saber del examen' },
  { id: 's2', n: 2, label: 'Qué evalúa Matemáticas' },
  { id: 's3', n: 3, label: 'Contenidos' },
  { id: 's4', n: 4, label: 'Componentes' },
  { id: 's5', n: 5, label: 'Cómo entrenar' },
  { id: 's6', n: 6, label: 'Lo fundamental que debe dominar' },
  { id: 's7', n: 7, label: 'Tipos de preguntas' },
  { id: 's8', n: 8, label: 'Áreas y perímetros esenciales' },
  { id: 's9', n: 9, label: 'Práctica guiada' },
  { id: 's10', n: 10, label: 'Ejercicios de modelos comunes' },
  { id: 's11', n: 11, label: 'Tips para el día del examen' },
]

/* ════════════════════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════════════════════ */
export default function EntrenamientoSaber11() {
  const [tocOpen, setTocOpen] = useState(false)
  const mainRef = useRef()

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setTocOpen(false)
  }

  return (
    <div
      ref={mainRef}
      className="saber11-page min-h-screen text-left"
      style={{ background: '#f8fafb', color: '#1e293b', fontFamily: "'Poppins', system-ui, sans-serif" }}
    >
      {/* ─── Header ─── */}
      <header
        className="relative overflow-hidden px-6 py-10 md:py-16"
        style={{ background: `linear-gradient(135deg, ${TEAL} 0%, #1a3c36 100%)` }}
      >
        <div className="mx-auto max-w-3xl relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 no-underline">
            ← Volver al portafolio
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold"
              style={{ background: GOLD, color: TEAL }}>
              M
            </div>
            <div className="text-white/80 text-sm leading-tight">
              <span className="font-bold text-white">Maryam Math</span><br />Plataforma Educativa
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            Entrenamiento Saber 11<br />Matemáticas
          </h1>

          <p className="text-white/80 text-base leading-relaxed max-w-xl">
            Cada paso cuenta. Con práctica, calma y constancia, puedes entender mejor las matemáticas,
            fortalecer lo fundamental y ganar seguridad para responder cada vez mejor en el examen.
          </p>

          <div
            className="mt-6 rounded-xl px-5 py-3 text-sm"
            style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.9)' }}
          >
            Autoría: <strong>Astrid Torregroza Olivero</strong>, Lic. en Matemáticas y Física · Plataforma: <strong>Maryam Math</strong>
          </div>
        </div>
      </header>

      {/* ─── Floating TOC toggle (mobile) ─── */}
      <button
        onClick={() => setTocOpen(!tocOpen)}
        className="fixed bottom-6 right-6 z-50 md:hidden w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-white text-xl"
        style={{ background: TEAL }}
        aria-label="Índice"
      >
        ☰
      </button>

      {/* ─── TOC sidebar / overlay ─── */}
      {tocOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 md:hidden" onClick={() => setTocOpen(false)}>
          <nav
            className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-2xl p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-bold text-lg mb-4" style={{ color: TEAL }}>Índice</h3>
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="block w-full text-left py-2 text-sm hover:text-teal-700 text-gray-700"
              >
                {s.n}. {s.label}
              </button>
            ))}
          </nav>
        </div>
      )}

      <div className="mx-auto max-w-3xl px-4 md:px-6 py-8 space-y-12">
        {/* ─── Desktop TOC ─── */}
        <Card>
          <h3 className="font-bold text-lg mb-3" style={{ color: TEAL }}>Índice</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="text-left py-1.5 px-2 text-sm rounded-lg hover:bg-teal-50 text-gray-700 hover:text-teal-800 transition cursor-pointer"
              >
                <span className="font-semibold" style={{ color: TEAL }}>{s.n}.</span> {s.label}
              </button>
            ))}
          </div>
        </Card>

        {/* ════ SECCIÓN 1 ════ */}
        <section id="s1">
          <SectionBadge n={1} label="Qué debes saber del examen" />
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Estructura en palabras simples</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• La prueba de Matemáticas tiene <strong>50 preguntas</strong>.</li>
              <li>• Se divide en <strong>2 bloques de 25 preguntas</strong>.</li>
              <li>• Son preguntas de <strong>selección múltiple con única respuesta</strong>.</li>
              <li>• No todo es hacer cuentas: también hay que <strong>leer, interpretar y decidir</strong>.</li>
            </ul>
            <TipBox color={RED_TIP}>
              Clave para este estudiante: primero entender la situación, después hacer la cuenta.
            </TipBox>
          </Card>
        </section>

        {/* ════ SECCIÓN 2 ════ */}
        <section id="s2">
          <SectionBadge n={2} label="Qué evalúa Matemáticas" />
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Competencias que más salen</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Interpretación y representación:</strong> leer tablas, gráficas, planos y datos.</li>
              <li>• <strong>Formulación y ejecución:</strong> escoger la operación correcta y resolver.</li>
              <li>• <strong>Argumentación:</strong> decidir si una conclusión o un procedimiento tiene sentido.</li>
            </ul>
            <div className="mt-4 border-l-4 border-gray-300 pl-4 text-gray-600 italic text-sm">
              En Saber 11 muchas preguntas parecen de "leer bien" antes que de matemáticas difíciles.
            </div>
          </Card>
        </section>

        {/* ════ SECCIÓN 3 ════ */}
        <section id="s3">
          <SectionBadge n={3} label="Contenidos" />
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Lo más importante</h2>
            <div className="flex flex-wrap gap-2">
              {['Porcentajes', 'Fracciones', 'Decimales', 'Promedios', 'Tablas y gráficas', 'Regla de tres', 'Probabilidad simple', 'Áreas y perímetros'].map((t) => (
                <Badge key={t} label={t} />
              ))}
            </div>
          </Card>
        </section>

        {/* ════ SECCIÓN 4 ════ */}
        <section id="s4">
          <SectionBadge n={4} label="Componentes" />
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Temas grandes</h2>
            <ul className="space-y-1 text-gray-700">
              <li>• Estadística</li>
              <li>• Geometría</li>
              <li>• Álgebra y cálculo</li>
            </ul>
            <p className="mt-3 text-sm text-gray-500 italic">Para empezar, conviene dominar primero lo cotidiano y básico.</p>
          </Card>
        </section>

        {/* ════ SECCIÓN 5 ════ */}
        <section id="s5">
          <SectionBadge n={5} label="Cómo entrenar" />
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Regla de oro</h2>
            <ul className="space-y-1 text-gray-700">
              <li>• Leer despacio</li>
              <li>• Subrayar datos</li>
              <li>• Estimar antes de responder</li>
              <li>• Eliminar opciones imposibles</li>
            </ul>
          </Card>
        </section>

        {/* ════ SECCIÓN 6: Ejemplos ════ */}
        <section id="s6">
          <SectionBadge n={6} label="Lo fundamental que debe dominar" />
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Prioridad de estudio para subir rápido</h2>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 mb-6">
              <li>Porcentajes, descuentos y aumentos.</li>
              <li>Fracciones, decimales y equivalencias.</li>
              <li>Promedio y rango.</li>
              <li>Lectura de tablas y gráficas.</li>
              <li>Razones, proporciones y regla de tres.</li>
              <li>Ecuaciones lineales muy sencillas.</li>
              <li>Conteo simple y probabilidad básica.</li>
              <li>Perímetro, área, escala, plano cartesiano, circunferencia, teorema de Pitágoras, teorema de Tales, volumen y área superficial de cilindro, cono y esfera.</li>
            </ol>

            {/* Ejemplo 1 */}
            <div className="border rounded-xl p-5 mb-5">
              <h3 className="font-bold mb-2" style={{ color: TEAL }}>Ejemplo 1. Porcentajes, descuentos y aumentos</h3>
              <p><strong>Ejemplo:</strong> Un cuaderno vale $20.000 y tiene 10 % de descuento.</p>
              <MathBlock>
                10 % de 20.000 = 20.000 × 10 ÷ 100 = 2.000<br />
                20.000 − 2.000 = 18.000
              </MathBlock>
              <TipBox>Idea fácil: primero hallas el descuento y luego se lo quitas al precio.</TipBox>
            </div>

            {/* Ejemplo 2 */}
            <div className="border rounded-xl p-5 mb-5">
              <h3 className="font-bold mb-2" style={{ color: TEAL }}>Ejemplo 2. Fracciones, decimales y equivalencias</h3>
              <p><strong>Ejemplo:</strong> ¿A qué fracción equivale 0,5?</p>
              <MathBlock>0,5 = 5/10 = 1/2</MathBlock>
              <TipBox>Idea fácil: escribe el decimal como fracción y simplifica.</TipBox>
            </div>

            {/* Ejemplo 3 */}
            <div className="border rounded-xl p-5 mb-5">
              <h3 className="font-bold mb-2" style={{ color: TEAL }}>Ejemplo 3. Promedio, mediana y rango</h3>
              <p><strong>Ejemplo:</strong> Datos: 2, 4, 6, 8 y 10.</p>
              <MathBlock>
                Promedio = (2 + 4 + 6 + 8 + 10) ÷ 5 = 30 ÷ 5 = 6<br />
                Mediana = 6, porque es el dato del centro<br />
                Rango = 10 − 2 = 8
              </MathBlock>
              <TipBox>Idea fácil: promedio es sumar y dividir; mediana es el dato de la mitad; rango es mayor menos menor.</TipBox>
            </div>

            {/* Ejemplo 4 */}
            <div className="border rounded-xl p-5 mb-5">
              <h3 className="font-bold mb-2" style={{ color: TEAL }}>Ejemplo 4. Frecuencia acumulada</h3>
              <p><strong>Ejemplo:</strong> Número de libros leídos por 10 estudiantes.</p>
              <SimpleTable
                headers={['Libros', 'Frecuencia', 'Frecuencia acumulada']}
                rows={[['1', '2', '2'], ['2', '4', '6'], ['3', '3', '9'], ['4', '1', '10']]}
              />
              <MathBlock>2 + 4 = 6 → 6 + 3 = 9 → 9 + 1 = 10</MathBlock>
              <TipBox>Idea fácil: vas sumando la frecuencia anterior con la nueva.</TipBox>
            </div>

            {/* Ejemplo 5 */}
            <div className="border rounded-xl p-5 mb-5">
              <h3 className="font-bold mb-2" style={{ color: TEAL }}>Ejemplo 5. Lectura de tablas y gráficas</h3>
              <p><strong>Ejemplo:</strong> En una tabla aparecen estas ventas: lunes 5, martes 8, miércoles 6.</p>
              <MathBlock>Mayor valor = 8. Ese valor corresponde al martes.</MathBlock>
              <TipBox>Idea fácil: primero mira qué número es mayor y luego ubica a qué día pertenece.</TipBox>
            </div>

            {/* Ejemplo 6 */}
            <div className="border rounded-xl p-5 mb-5">
              <h3 className="font-bold mb-2" style={{ color: TEAL }}>Ejemplo 6. Razones, proporciones y regla de tres</h3>
              <p><strong>Ejemplo:</strong> Si 2 cuadernos cuestan $6.000, ¿cuánto cuestan 5 cuadernos?</p>
              <MathBlock>
                1 cuaderno = 6.000 ÷ 2 = 3.000<br />
                5 cuadernos = 3.000 × 5 = 15.000
              </MathBlock>
              <TipBox>Idea fácil: primero buscas cuánto vale 1 y después multiplicas.</TipBox>
            </div>

            {/* Ejemplo 7 */}
            <div className="border rounded-xl p-5 mb-5">
              <h3 className="font-bold mb-2" style={{ color: TEAL }}>Ejemplo 7. Ecuaciones lineales muy sencillas</h3>
              <p><strong>Ejemplo:</strong> x + 3 = 10</p>
              <MathBlock>x = 10 − 3 = 7</MathBlock>
              <TipBox>Idea fácil: pasa el número al otro lado haciendo la operación contraria.</TipBox>
            </div>

            {/* Ejemplo 8 */}
            <div className="border rounded-xl p-5 mb-5">
              <h3 className="font-bold mb-2" style={{ color: TEAL }}>Ejemplo 8. Probabilidad básica, permutación y combinación</h3>
              <p><strong>Ejemplo básico:</strong> En una bolsa hay 2 balotas rojas y 3 azules.</p>
              <MathBlock>Total = 2 + 3 = 5. Probabilidad de roja = 2/5</MathBlock>

              <p className="mt-4"><strong>Permutación:</strong> con las letras A, B y C, forma claves de 2 letras sin repetir.</p>
              <div className="flex flex-wrap gap-2 my-2">
                {['AB', 'AC', 'BA', 'BC', 'CA', 'CB'].map(c => (
                  <span key={c} className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm font-mono font-semibold">{c}</span>
                ))}
              </div>
              <MathBlock>³P₂ = 3 × 2 = 6. El orden sí importa: AB y BA cuentan distinto.</MathBlock>

              <p className="mt-4"><strong>Combinación:</strong> de 4 estudiantes, elegir 2 para representar al curso.</p>
              <div className="flex flex-wrap gap-2 my-2">
                {['AB', 'AC', 'AD', 'BC', 'BD', 'CD'].map(c => (
                  <span key={c} className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-mono font-semibold">{c}</span>
                ))}
              </div>
              <MathBlock>⁴C₂ = (4 × 3) / (2 × 1) = 6. El orden no importa: AB y BA son la misma pareja.</MathBlock>
              <TipBox>Idea fácil: en permutación el orden importa; en combinación no.</TipBox>
            </div>

            {/* Ejemplo 9 */}
            <div className="border rounded-xl p-5 mb-5">
              <h3 className="font-bold mb-2" style={{ color: TEAL }}>Ejemplo 9. Perímetro, área, escala y coordenadas</h3>
              <p><strong>Ejemplo de perímetro:</strong> un cuadrado de lado 4.</p>
              <MathBlock>Perímetro = 4 + 4 + 4 + 4 = 16</MathBlock>
              <p><strong>Ejemplo de área:</strong> un rectángulo de 5 por 3.</p>
              <MathBlock>Área = 5 × 3 = 15</MathBlock>
              <p><strong>Ejemplo de coordenadas:</strong> el punto (2, 4).</p>
              <MathBlock>Primero avanzas 2 en horizontal. Luego subes 4 en vertical.</MathBlock>
              <TipBox>Idea fácil: perímetro suma bordes; área multiplica largo por ancho.</TipBox>
            </div>

            {/* Ejemplo 10 */}
            <div className="border rounded-xl p-5 mb-5">
              <h3 className="font-bold mb-2" style={{ color: TEAL }}>Ejemplo 10. Volumen de cilindro, cono y esfera</h3>
              <SimpleTable
                headers={['Sólido', 'Volumen', 'Relación útil']}
                rows={[
                  ['Cilindro', 'V = πr²h', 'Sirve como referencia para comparar con el cono.'],
                  ['Cono', 'V = (1/3) πr²h', 'Con la misma base y altura, vale la tercera parte del cilindro.'],
                  ['Esfera', 'V = (4/3) πr³', 'Si el cilindro tiene radio r y altura 2r, la esfera ocupa 2/3 del cilindro.'],
                ]}
              />
              <p className="mt-3"><strong>Ejemplo rápido con r = 3 y h = 6:</strong></p>
              <MathBlock>
                V_cil = π(3²)(6) = 54π<br />
                V_cono = (1/3) π(3²)(6) = 18π<br />
                V_esf = (4/3) π(3³) = 36π
              </MathBlock>
              <TipBox>Recuerda: cono = 1/3 del cilindro cuando tienen la misma base y altura. Y con h = 2r, la esfera = 2/3 del cilindro.</TipBox>
            </div>

            {/* Ejemplo 11 */}
            <div className="border rounded-xl p-5 mb-5">
              <h3 className="font-bold mb-2" style={{ color: TEAL }}>Ejemplo 11. Área superficial de cilindro, cono y esfera</h3>
              <SimpleTable
                headers={['Sólido', 'Área superficial total', 'Ejemplo directo']}
                rows={[
                  ['Cilindro', 'A_T = 2πr² + 2πrh', 'r=2, h=5 ⇒ A_T = 2π(4) + 2π(2)(5) = 28π'],
                  ['Cono', 'A_T = πr² + πrg', 'r=3, g=5 ⇒ A_T = π(9) + π(3)(5) = 24π'],
                  ['Esfera', 'A = 4πr²', 'r=3 ⇒ A = 4π(9) = 36π'],
                ]}
              />
              <TipBox color={RED_TIP}>Recuerda: en el cono la letra g es la generatriz, no la altura vertical. Esa confusión hace fallar muchas preguntas.</TipBox>
            </div>

            {/* Ejemplo 12 — Pitágoras */}
            <div className="border rounded-xl p-5 mb-5">
              <h3 className="font-bold mb-2" style={{ color: TEAL }}>Ejemplo 12. Teorema de Pitágoras</h3>
              <p><strong>Ejemplo:</strong> En un triángulo rectángulo, los catetos miden 3 y 4. Hallar la hipotenusa.</p>
              <SvgPitagoras />
              <MathBlock>h² = 3² + 4² = 9 + 16 = 25 → h = 5</MathBlock>
              <TipBox>Idea fácil: en un triángulo rectángulo, el lado más largo se halla con cateto² + cateto².</TipBox>
            </div>

            {/* Ejemplo 13 — Tales */}
            <div className="border rounded-xl p-5 mb-5">
              <h3 className="font-bold mb-2" style={{ color: TEAL }}>Ejemplo 13. Teorema de Tales</h3>
              <p><strong>Ejemplo:</strong> Una persona de 2 m proyecta una sombra de 3 m. Un árbol proyecta una sombra de 9 m. Hallar la altura del árbol.</p>
              <MathBlock>x/9 = 2/3 → x = (9 × 2) / 3 = 6 m</MathBlock>
              <TipBox>Idea fácil: comparas altura con sombra en ambos triángulos porque tienen la misma forma.</TipBox>
            </div>

            {/* Ejemplo 14 — Plano cartesiano */}
            <div className="border rounded-xl p-5 mb-5">
              <h3 className="font-bold mb-2" style={{ color: TEAL }}>Ejemplo 14. Plano cartesiano</h3>
              <p><strong>Ejemplo:</strong> Ubicar el punto A(−2, 3).</p>
              <SvgCartesian />
              <MathBlock>
                Desde el origen, vas 2 unidades a la izquierda.<br />
                Luego subes 3 unidades.<br />
                El punto queda en el cuadrante II.
              </MathBlock>
              <TipBox>Idea fácil: la primera coordenada mueve en horizontal y la segunda en vertical.</TipBox>
            </div>

            {/* Ejemplo 15 — Circunferencia */}
            <div className="border rounded-xl p-5 mb-5">
              <h3 className="font-bold mb-2" style={{ color: TEAL }}>Ejemplo 15. Circunferencia</h3>
              <p><strong>Ejemplo:</strong> Hallar la longitud de una circunferencia de radio 4 cm.</p>
              <SvgCircle />
              <MathBlock>C = 2πr = 2 × 3,14 × 4 = 25,12 cm</MathBlock>
              <TipBox>Idea fácil: para la longitud de la circunferencia usas 2πr.</TipBox>
            </div>

            {/* Ejemplo 16 — Ternas pitagóricas */}
            <div className="border rounded-xl p-5 mb-5">
              <h3 className="font-bold mb-2" style={{ color: TEAL }}>Ejemplo 16. Ternas pitagóricas</h3>
              <p><strong>Idea clave:</strong> una terna pitagórica es un grupo de 3 números que cumple a² + b² = c².</p>
              <SimpleTable
                headers={['Cateto 1', 'Cateto 2', 'Hipotenusa', 'Terna base']}
                rows={[
                  ['3', '4', '5', '3 - 4 - 5'],
                  ['5', '12', '13', '5 - 12 - 13'],
                  ['8', '15', '17', '8 - 15 - 17'],
                  ['7', '24', '25', '7 - 24 - 25'],
                  ['6', '8', '10', '2 × (3 - 4 - 5)'],
                  ['9', '12', '15', '3 × (3 - 4 - 5)'],
                  ['15', '36', '39', '3 × (5 - 12 - 13)'],
                ]}
              />
              <p className="mt-3"><strong>Ejemplo rápido:</strong> si los catetos miden 24 y 32, no parece fácil; pero ambos son múltiplos de 3 y 4.</p>
              <MathBlock>24 = 3 × 8, 32 = 4 × 8 → hipotenusa = 5 × 8 = 40</MathBlock>
              <TipBox>Si reconoces la terna base, puedes resolver triángulos grandes mucho más rápido.</TipBox>
              <TipBox color={RED_TIP}>
                No necesitas ser fuerte en álgebra avanzada para mejorar bastante. Con lo básico bien aprendido ya puedes sumar muchos puntos.
              </TipBox>
            </div>
          </Card>
        </section>

        {/* ════ SECCIÓN 7 ════ */}
        <section id="s7">
          <SectionBadge n={7} label="Tipos de preguntas que suelen aparecer" />
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Modelos comunes</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• Preguntas con tablas de precios, tiempos, encuestas o resultados.</li>
              <li>• Preguntas con gráficas donde debes comparar, interpretar o detectar errores.</li>
              <li>• Situaciones de transporte, compras, descuentos, subsidios, deporte o salud.</li>
              <li>• Problemas donde debes decidir qué operación usar.</li>
              <li>• Preguntas donde te muestran una conclusión y tú decides si está bien o mal.</li>
              <li>• Situaciones con perímetros, áreas, escalas, planos y medidas de figuras geométricas.</li>
            </ul>
          </Card>
        </section>

        {/* ════ SECCIÓN 8: Áreas y perímetros ════ */}
        <section id="s8">
          <SectionBadge n={8} label="Áreas y perímetros esenciales" />
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Figuras geométricas que más conviene recordar</h2>
            <p className="text-sm text-gray-600 mb-6">
              Aquí están las fórmulas básicas de las figuras que más suelen aparecer en contextos escolares y cotidianos.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="border rounded-xl p-4">
                <h4 className="font-bold mb-2" style={{ color: TEAL }}>Rectángulo</h4>
                <SvgRectangle />
                <div className="mt-2 bg-green-50 rounded-lg p-3 text-sm">
                  Área = b × h<br />Perímetro = 2b + 2h
                </div>
              </div>

              <div className="border rounded-xl p-4">
                <h4 className="font-bold mb-2" style={{ color: TEAL }}>Cuadrado</h4>
                <SvgSquare />
                <div className="mt-2 bg-green-50 rounded-lg p-3 text-sm">
                  Área = l²<br />Perímetro = 4l
                </div>
              </div>

              <div className="border rounded-xl p-4">
                <h4 className="font-bold mb-2" style={{ color: TEAL }}>Triángulo</h4>
                <SvgTriangle />
                <div className="mt-2 bg-green-50 rounded-lg p-3 text-sm">
                  Área = (b × h) / 2<br />Perímetro = suma de sus 3 lados
                </div>
              </div>

              <div className="border rounded-xl p-4">
                <h4 className="font-bold mb-2" style={{ color: TEAL }}>Paralelogramo</h4>
                <SvgParallelogram />
                <div className="mt-2 bg-green-50 rounded-lg p-3 text-sm">
                  Área = b × h<br />Perímetro = 2(a + b)
                </div>
              </div>

              <div className="border rounded-xl p-4">
                <h4 className="font-bold mb-2" style={{ color: TEAL }}>Trapecio</h4>
                <SvgTrapezoid />
                <div className="mt-2 bg-green-50 rounded-lg p-3 text-sm">
                  Área = (B + b) × h / 2<br />Perímetro = suma de sus 4 lados
                </div>
              </div>

              <div className="border rounded-xl p-4">
                <h4 className="font-bold mb-2" style={{ color: TEAL }}>Círculo y circunferencia</h4>
                <SvgCircle />
                <div className="mt-2 bg-green-50 rounded-lg p-3 text-sm">
                  Área = πr²<br />Longitud de la circunferencia = 2πr
                </div>
              </div>
            </div>

            <TipBox>
              Recuerda: el perímetro se mide en unidades lineales (cm, m) y el área en unidades cuadradas (cm², m²).
            </TipBox>
          </Card>
        </section>

        {/* ════ SECCIÓN 9: Práctica guiada ════ */}
        <section id="s9">
          <SectionBadge n={9} label="Práctica guiada" />
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Responde y revisa de una vez</h2>
            <p className="text-sm text-gray-600 mb-6">
              Contesta las preguntas y luego oprime <strong>"Revisar respuestas"</strong>. Debajo de cada pregunta aparecerá la corrección con una explicación muy simple y las operaciones paso a paso.
            </p>
            <QuizSection questions={practicaQuestions} />
          </Card>
        </section>

        {/* ════ SECCIÓN 10: Modelos comunes ════ */}
        <section id="s10">
          <SectionBadge n={10} label="Ejercicios de modelos comunes" />
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Practica los formatos que más se repiten</h2>
            <p className="text-sm text-gray-600 mb-2">
              Estas preguntas están pensadas para que el estudiante practique los formatos más comunes: tablas, gráficas, descuentos, transporte, interpretación de conclusiones, perímetros y áreas en contexto.
            </p>
            <TipBox color={RED_TIP}>
              Recomendación: responde primero sin mirar la corrección. Luego oprime "Revisar ejercicios" y corrige de una vez con el procedimiento sencillo.
            </TipBox>
            <div className="mt-6">
              <QuizSection
                questions={modeloQuestions}
                checkLabel="Revisar ejercicios"
                resetLabel="Reiniciar ejercicios"
              />
            </div>
          </Card>
        </section>

        {/* ════ SECCIÓN 11: Tips ════ */}
        <section id="s11">
          <SectionBadge n={11} label="Tips para el día del examen" />
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Consejos para un estudiante que se bloquea fácil</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• No te asustes si ves mucho texto: primero busca los datos importantes.</li>
              <li>• Escribe al lado qué te piden: precio, tiempo, promedio, área, porcentaje o probabilidad.</li>
              <li>• Antes de operar, piensa: ¿esto es sumar, restar, multiplicar, dividir o comparar?</li>
              <li>• Si una respuesta sale absurda, revísala. Muchas veces el error está en entender mal la pregunta.</li>
              <li>• Si te atoras, sigue con la siguiente. Después vuelves.</li>
              <li>• Usa estimaciones para eliminar opciones imposibles.</li>
              <li>• Practica por bloques cortos para ganar confianza.</li>
            </ul>
            <TipBox>Meta realista: no intentar saberlo todo, sino resolver bien lo fundamental.</TipBox>
          </Card>
        </section>

        {/* ─── Footer ─── */}
        <footer className="text-center text-sm text-gray-500 py-8 border-t border-gray-200">
          Autoría: Astrid Torregroza Olivero · Lic. en Matemáticas y Física · Plataforma: Maryam Math
        </footer>
      </div>
    </div>
  )
}
