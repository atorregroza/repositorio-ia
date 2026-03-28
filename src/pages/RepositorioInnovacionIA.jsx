import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Sparkles,
  GraduationCap,
  Bot,
  Gamepad2,
  BookOpen,
  LayoutGrid,
  Users,
  ChevronRight,
  Link as LinkIcon,
  X,
  ArrowUpRight,
  Palette,
  Star,
  Lightbulb,
  ExternalLink,
  Trophy,
  Calendar,
  MapPin,
  Globe,
  Rocket,
  BookMarked,
  Cpu,
} from 'lucide-react'
import astridPhoto from '../assets/images/hero-astrid.png'

// ─── Google Fonts ──────────────────────────────────────────────────────────────

const fontImport = '@import url(\'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap\');'

// ─── Data ─────────────────────────────────────────────────────────────────────

const resources = [
  {
    id: 1,
    title: 'Método Singapur – Herramienta de repaso para docentes',
    type: 'App interactiva',
    line: 'Método Singapur',
    subline: 'Formación docente',
    audience: 'Docentes de preescolar y primaria',
    tool: 'Canva IA',
    status: 'Usado / funcional',
    url: 'https://maryammath.my.canva.site/c0hrjg6xbxncpwjs',
    shortDescription:
      'Recurso interactivo para revisar conocimientos sobre el Método Singapur mediante dinámicas y actividades autoformativas.',
    purpose:
      'Apoyar a docentes de preescolar y primaria en la revisión y fortalecimiento de sus conocimientos sobre el Método Singapur.',
    value:
      'Sirve como recurso de sensibilización, diagnóstico o refuerzo en procesos de formación docente.',
    tags: ['Singapur', 'formación docente', 'preescolar', 'primaria'],
  },
  {
    id: 2,
    title: 'Matemáticas de Singapur y enfoque curricular en espiral',
    type: 'App interactiva',
    line: 'Método Singapur',
    subline: 'Currículo y CPA',
    audience: 'Docentes de preescolar y primaria',
    tool: 'Canva IA',
    status: 'Usado / funcional',
    url: 'https://maryammath.my.canva.site/enfoque-cpa-espiral-singapur',
    shortDescription:
      'Explica cómo funciona el desarrollo curricular en espiral dentro del enfoque de Matemáticas de Singapur.',
    purpose:
      'Ayudar a comprender qué significa un desarrollo curricular en espiral articulado con el modelo CPA.',
    value:
      'Útil para capacitación, actualización pedagógica y reflexión sobre progresión de aprendizajes.',
    tags: ['espiral', 'CPA', 'currículo', 'Singapur'],
  },
  {
    id: 3,
    title: 'Currículo de Matemáticas Singapur PR1ME – Grado 1',
    type: 'Visualizador curricular',
    line: 'Método Singapur',
    subline: 'Currículo y planeación',
    audience: 'Docentes de preescolar y primaria',
    tool: 'Canva IA',
    status: 'Usado / funcional',
    url: 'https://maryammath.my.canva.site/grado-1-prime',
    shortDescription:
      'Organiza capítulos, unidades, lecciones y objetivos de aprendizaje de PR1ME para grado primero.',
    purpose:
      'Presentar de manera interactiva el despliegue curricular correspondiente a grado primero en Matemáticas Singapur PR1ME.',
    value:
      'Facilita la lectura curricular, la planeación y la comprensión de la progresión de aprendizajes.',
    tags: ['PR1ME', 'grado 1', 'currículo'],
  },
  {
    id: 4,
    title: 'PIAR Matemáticas para docentes de Método Singapur',
    type: 'App formativa',
    line: 'Método Singapur',
    subline: 'Inclusión y PIAR',
    audience: 'Docentes de preescolar y primaria',
    tool: 'Canva IA',
    status: 'Usado / funcional',
    url: 'https://maryammath.my.canva.site/piar-matematicas-singapur',
    shortDescription:
      'Recurso para aprender sobre PIAR y analizar casos hipotéticos en matemáticas desde una mirada inclusiva.',
    purpose:
      'Apoyar a docentes en la comprensión del PIAR y en el análisis de casos para proponer ajustes razonables.',
    value: 'Fortalece la formación docente en inclusión educativa y toma de decisiones pedagógicas.',
    tags: ['PIAR', 'inclusión', 'matemáticas'],
  },
  {
    id: 5,
    title: 'Método Singapur – Fundamentación pedagógica para docentes',
    type: 'Presentación formativa',
    line: 'Método Singapur',
    subline: 'Formación docente',
    audience: 'Docentes',
    tool: 'Canva IA',
    status: 'Usado / funcional',
    url: 'https://maryammath.my.canva.site/fundamento-metodo-singapure',
    shortDescription:
      'Presentación clara y estructurada sobre las bases pedagógicas del Método Singapur.',
    purpose: 'Ofrecer a docentes una visión organizada de la fundamentación del Método Singapur.',
    value: 'Puede utilizarse en capacitaciones, autoformación y procesos de actualización docente.',
    tags: ['fundamentación', 'Singapur', 'docentes'],
  },
  {
    id: 6,
    title: 'App para diseñar PIAR en suma y resta para primaria',
    type: 'App docente',
    line: 'Método Singapur',
    subline: 'Inclusión y PIAR',
    audience: 'Docentes de primaria',
    tool: 'Canva IA',
    status: 'Usado / funcional',
    url: 'https://maryammath.my.canva.site/copia-de-app-para-disenar-piar-en-suma-y-resta-para-primaria',
    shortDescription:
      'Ruta práctica para aprender, analizar casos y registrar observaciones pedagógicas sobre PIAR en suma y resta.',
    purpose:
      'Orientar a docentes en la aplicación práctica del PIAR en matemáticas, con foco en suma y resta.',
    value: 'Acompaña el paso de la comprensión conceptual a la implementación pedagógica.',
    tags: ['PIAR', 'suma', 'resta', 'primaria'],
  },
  {
    id: 7,
    title: 'Taller de reagrupación CPA: suma y resta con el enfoque Singapur',
    type: 'Taller interactivo',
    line: 'Método Singapur',
    subline: 'CPA y operaciones',
    audience: 'Docentes de preescolar y primaria',
    tool: 'Canva IA',
    status: 'Usado / funcional',
    url: 'https://maryammath.my.canva.site/taller-reagrupacion-en-suma-y-resta-cpa',
    shortDescription:
      'Taller para comprender y aplicar la reagrupación desde el enfoque Concreto–Pictórico–Abstracto.',
    purpose:
      'Apoyar a docentes en la comprensión y aplicación de la reagrupación en suma y resta usando el enfoque CPA.',
    value: 'Traduce un concepto clave en una experiencia formativa clara y accionable.',
    tags: ['CPA', 'reagrupación', 'suma', 'resta'],
  },
  {
    id: 8,
    title: 'Centro de Aprendizaje Docente: prerrequisitos para suma y resta con reagrupación',
    type: 'Centro de aprendizaje',
    line: 'Método Singapur',
    subline: 'CPA y operaciones',
    audience: 'Docentes de preescolar y primaria',
    tool: 'Canva IA',
    status: 'Usado / funcional',
    url: 'https://maryammath.my.canva.site/prerrequisitos-sumas-restas-reagrupacion',
    shortDescription:
      'Centro interactivo para revisar conocimientos previos indispensables antes de enseñar reagrupación.',
    purpose:
      'Ayudar a docentes a identificar y fortalecer los prerrequisitos de la suma y la resta con reagrupación.',
    value: 'Permite diseñar secuencias de enseñanza más sólidas en operaciones básicas.',
    tags: ['prerrequisitos', 'reagrupación', 'valor posicional'],
  },
  {
    id: 9,
    title: 'Planificador CPA – PYP Grade 1',
    type: 'App de planeación',
    line: 'Método Singapur',
    subline: 'Currículo y planeación',
    audience: 'Docentes de primaria',
    tool: 'Canva IA',
    status: 'Usado / funcional',
    url: 'https://maryammath.my.canva.site/planeacion-primero-singapur-pyp',
    shortDescription: 'Planeador pedagógico que articula Singapur, CPA y PYP para Grade 1.',
    purpose:
      'Apoyar la planeación de experiencias de aprendizaje articulando enfoque CPA con elementos del PYP.',
    value: 'Conecta currículo, indagación y evidencia de aprendizaje de forma visual y estructurada.',
    tags: ['PYP', 'CPA', 'planeación', 'grado 1'],
  },
  {
    id: 18,
    title: 'GPT Calificador de Exploraciones IB',
    type: 'GPT especializado',
    line: 'GPTs y asistentes',
    subline: 'IB · Evaluación',
    audience: 'Docentes de matemáticas y supervisores IB',
    tool: 'ChatGPT GPT personalizado',
    status: 'Usado / funcional',
    url: 'https://chatgpt.com/g/g-68eb0dd44b7081919ad3b4ce79a9d862-gpt-calificador-de-exploraciones-ib',
    shortDescription:
      'Asistente para apoyar la revisión, valoración y retroalimentación de exploraciones del IB.',
    purpose: 'Apoyar la revisión y valoración de exploraciones del IB.',
    value: 'Ayuda a organizar observaciones y ofrecer retroalimentación más estructurada.',
    tags: ['IB', 'exploraciones', 'evaluación'],
  },
  {
    id: 19,
    title: 'Curriculum Navigator Singapur 1°–6°',
    type: 'GPT especializado',
    line: 'GPTs y asistentes',
    subline: 'Singapur · Currículo',
    audience: 'Docentes de primaria y coordinadores',
    tool: 'ChatGPT GPT personalizado',
    status: 'Usado / funcional',
    url: 'https://chatgpt.com/g/g-6976aec1ec2c8191b0d53b7715d9fa5b-curriculum-navigator-singapur-1deg-6deg',
    shortDescription:
      'Asistente para navegar contenidos, progresiones y referentes curriculares de Singapur en primaria.',
    purpose: 'Facilitar la consulta y comprensión del currículo de Matemáticas Singapur de 1° a 6°.',
    value: 'Agiliza decisiones de planeación, nivelación y articulación curricular.',
    tags: ['GPT', 'Singapur', 'currículo'],
  },
  {
    id: 20,
    title: 'Ponencias 13EJM – revisado',
    type: 'GPT especializado',
    line: 'GPTs y asistentes',
    subline: 'Eventos académicos',
    audience: 'Docentes revisores y comité organizador',
    tool: 'ChatGPT GPT personalizado',
    status: 'Usado / funcional',
    url: 'https://chatgpt.com/g/g-68c4e2df6d1081918ca787dacdbf3e93-ponencias-13ejm-revisado',
    shortDescription:
      'Asistente para lectura, organización de observaciones y retroalimentación de ponencias del 13EJM.',
    purpose: 'Apoyar la revisión de ponencias del 13° Encuentro Juvenil de Matemáticas.',
    value: 'Favorece procesos de revisión más consistentes y homogéneos.',
    tags: ['EJM', 'ponencias', 'revisión'],
  },
  {
    id: 21,
    title: 'Asistente PR1ME – Bar Model Method',
    type: 'GPT especializado',
    line: 'GPTs y asistentes',
    subline: 'Singapur · Resolución de problemas',
    audience: 'Docentes de primaria',
    tool: 'ChatGPT GPT personalizado',
    status: 'Usado / funcional',
    url: 'https://chatgpt.com/g/g-68d9a37998388191b8dcd9c9eb407b8f-asistente-pr1me-bar-model-method',
    shortDescription: 'Asistente para comprender y aplicar el método de barras dentro de PR1ME.',
    purpose: 'Apoyar a docentes en la comprensión y aplicación del Bar Model Method.',
    value: 'Facilita la interpretación de problemas y la enseñanza de estrategias visuales.',
    tags: ['PR1ME', 'bar model', 'problemas'],
  },
  {
    id: 22,
    title: 'Asistente de Emprendimiento 10°',
    type: 'GPT especializado',
    line: 'GPTs y asistentes',
    subline: 'Emprendimiento escolar',
    audience: 'Estudiantes de grado 10° y docentes',
    tool: 'ChatGPT GPT personalizado',
    status: 'Usado / funcional',
    url: 'https://chatgpt.com/g/g-6812c1530b0c81918b877998f639e2db-asistente-de-emprendimiento-10deg',
    shortDescription:
      'Asistente para generación de ideas, exploración de posibilidades y organización de propuestas de emprendimiento.',
    purpose: 'Acompañar procesos de emprendimiento escolar en grado décimo.',
    value: 'Ayuda a aterrizar ideas y conectarlas con contextos reales.',
    tags: ['emprendimiento', 'grado 10', 'GPT'],
  },
  {
    id: 23,
    title: 'Evaluador Exploraciones IB',
    type: 'GPT especializado',
    line: 'GPTs y asistentes',
    subline: 'IB · Evaluación',
    audience: 'Docentes de matemáticas y supervisores IB',
    tool: 'ChatGPT GPT personalizado',
    status: 'Usado / funcional',
    url: 'https://chatgpt.com/g/g-680163827aa08191ac7a6e3b402ded16-evaluador-exploraciones-ib',
    shortDescription:
      'Asistente para revisar, valorar y estructurar retroalimentación académica de exploraciones del IB.',
    purpose: 'Apoyar la evaluación y revisión de exploraciones del IB.',
    value: 'Fortalece revisiones más ordenadas y consistentes.',
    tags: ['IB', 'evaluación', 'GPT'],
  },
  {
    id: 10,
    title: 'Pensamiento algebraico – tutoría interactiva para grado 7°',
    type: 'Tutoría interactiva',
    line: 'Nivelación y repaso',
    subline: 'Grado 7 · Álgebra',
    audience: 'Estudiantes de grado 7°',
    tool: 'Canva IA',
    status: 'Usado / funcional',
    url: 'https://maryammath.my.canva.site/tutoria-algebra-7',
    shortDescription:
      'Ruta de aprender, practicar, jugar y evaluarse para reforzar variables, expresiones y ecuaciones.',
    purpose: 'Apoyar a estudiantes de séptimo en el fortalecimiento del pensamiento algebraico.',
    value: 'Combina comprensión conceptual, práctica guiada y gamificación.',
    tags: ['grado 7', 'álgebra', 'nivelación'],
  },
  {
    id: 11,
    title: 'MathMaster 7° – centro de aprendizaje numérico',
    type: 'Centro de aprendizaje',
    line: 'Nivelación y repaso',
    subline: 'Grado 7 · Numérico',
    audience: 'Estudiantes de grado 7°',
    tool: 'Canva IA',
    status: 'Usado / funcional',
    url: 'https://maryammath.my.canva.site/tutoria-numerrico-z-7',
    shortDescription:
      'Centro de aprendizaje para repasar operaciones, enteros, estimación y propiedades de los números.',
    purpose: 'Apoyar procesos de repaso y fortalecimiento del pensamiento numérico en séptimo.',
    value: 'Ofrece una ruta clara para nivelación, trabajo autónomo y apoyo tutorial.',
    tags: ['grado 7', 'numérico', 'enteros'],
  },
  {
    id: 12,
    title: 'Tutoría de fracciones – grado 7°',
    type: 'Tutoría interactiva',
    line: 'Nivelación y repaso',
    subline: 'Grado 7 · Fracciones',
    audience: 'Estudiantes de grado 7°',
    tool: 'Canva IA',
    status: 'Usado / funcional',
    url: 'https://maryammath.my.canva.site/tutoria-fracciones-7',
    shortDescription:
      'Recurso para fortalecer conceptos, práctica y evaluación sobre fracciones en grado séptimo.',
    purpose:
      'Apoyar a estudiantes en la comprensión y repaso de conceptos fundamentales sobre fracciones.',
    value: 'Consolida bases necesarias para temas posteriores.',
    tags: ['fracciones', 'grado 7', 'nivelación'],
  },
  {
    id: 13,
    title: 'Pensamiento estadístico – tutoría interactiva para grado 7°',
    type: 'Tutoría interactiva',
    line: 'Nivelación y repaso',
    subline: 'Grado 7 · Estadística',
    audience: 'Estudiantes de grado 7°',
    tool: 'Canva IA',
    status: 'Usado / funcional',
    url: 'https://maryammath.my.canva.site/tutoria-estadistica-7',
    shortDescription:
      'Tutoría visual para organización de datos, tablas, gráficos de barras y promedio.',
    purpose: 'Fortalecer contenidos de pensamiento estadístico en grado séptimo.',
    value: 'Favorece lectura, análisis e interpretación de información.',
    tags: ['estadística', 'grado 7', 'datos'],
  },
  {
    id: 14,
    title: 'Potenciación de enteros – app interactiva para grado 8°',
    type: 'App interactiva',
    line: 'Nivelación y repaso',
    subline: 'Grado 8 · Potenciación',
    audience: 'Estudiantes de grado 8°',
    tool: 'Canva IA',
    status: 'Usado / funcional',
    url: 'https://maryammath.my.canva.site/app-interactiva-de-potenciaci-n-y-propiedades-para-8-grado',
    shortDescription:
      'App para comprender la potenciación de enteros, sus elementos y sus propiedades.',
    purpose: 'Apoyar a estudiantes de octavo en la comprensión de la potenciación de enteros.',
    value: 'Favorece una comprensión más sólida y visual del tema.',
    tags: ['grado 8', 'potenciación', 'enteros'],
  },
  {
    id: 19,
    title: 'Entrenamiento Saber 11 – Matemáticas',
    type: 'Tutoría interactiva',
    line: 'Nivelación y repaso',
    subline: 'Grado 11 · Preparación Saber 11',
    audience: 'Estudiantes de grado 11°',
    tool: 'Codex',
    status: 'Usado / funcional',
    url: '/entrenamiento-saber11-matematicas',
    shortDescription:
      'Entrenamiento interactivo para preparar la prueba Saber 11 de matemáticas, con ejercicios por componente y retroalimentación.',
    purpose:
      'Apoyar a los estudiantes de grado 11 en la preparación para la prueba Saber 11 de matemáticas.',
    value:
      'Permite repasar componentes clave de la prueba con ejercicios contextualizados y retroalimentación inmediata.',
    tags: ['Saber 11', 'grado 11', 'preparación', 'evaluación'],
  },
  {
    id: 15,
    title: 'Parking Puzzle – juego de salida del parqueadero infantil',
    type: 'Juego interactivo',
    line: 'Juegos interactivos',
    subline: 'Lógica y pensamiento espacial',
    audience: 'Estudiantes de primaria',
    tool: 'Canva IA',
    status: 'Usado / funcional',
    url: 'https://maryammath.my.canva.site/juego-salir-parqueadero-infantil',
    shortDescription:
      'Juego para planificar movimientos y liberar la salida del carro blanco en una cuadrícula.',
    purpose: 'Desarrollar observación, planificación de movimientos y resolución de problemas.',
    value: 'Promueve lógica, estrategia y pensamiento espacial.',
    tags: ['juego', 'lógica', 'espacial'],
  },
  {
    id: 16,
    title: 'Triqui – juego interactivo',
    type: 'Juego interactivo',
    line: 'Juegos interactivos',
    subline: 'Estrategia y patrones',
    audience: 'Estudiantes de primaria y secundaria básica',
    tool: 'Canva IA',
    status: 'Usado / funcional',
    url: 'https://maryammath.my.canva.site/juego-triqui',
    shortDescription:
      'Versión digital del triqui para fortalecer anticipación, patrones y toma de decisiones.',
    purpose: 'Promover anticipación, toma de decisiones y planeación de jugadas.',
    value: 'Puede usarse como pausa activa con intención pedagógica.',
    tags: ['triqui', 'estrategia', 'patrones'],
  },
  {
    id: 17,
    title: 'Ahorcado viajero – juego interactivo',
    type: 'Juego interactivo',
    line: 'Juegos interactivos',
    subline: 'Palabras y cultura general',
    audience: 'Estudiantes de primaria y secundaria básica',
    tool: 'Canva IA',
    status: 'Usado / funcional',
    url: 'https://maryammath.my.canva.site/juego-ahorcado-tema-viajes',
    shortDescription:
      'Juego de vocabulario e inferencia con temática de viajes y pistas por letras.',
    purpose: 'Fortalecer observación, inferencia, vocabulario y toma de decisiones.',
    value: 'Integra juego, lenguaje y cultura general en una dinámica atractiva.',
    tags: ['ahorcado', 'vocabulario', 'viajes'],
  },
]

// ─── Productos destacados ──────────────────────────────────────────────────────

const featuredProducts = [
  {
    id: 'fp1',
    title: 'Los 3 superpoderes de las matemáticas',
    badge: 'Experiencia web educativa',
    badgeColor: '#FFFFFF',
    badgeBg: 'rgba(255,255,255,0.18)',
    headerBg: 'linear-gradient(135deg, #1E6B4A 0%, #0C3A24 100%)',
    accentColor: '#1E6B4A',
    icon: Globe,
    tool: 'Codex',
    toolColor: '#1D4ED8',
    audience: 'Estudiantes',
    context: 'Día Internacional de las Matemáticas 2026',
    description:
      'Landing del taller diseñada para el IDM 2026. Presenta una narrativa visual sobre tres capacidades matemáticas fundamentales y su relación con el tema "Las matemáticas y la esperanza", con acceso a presentaciones y secciones conceptuales.',
    value:
      'No solo comunica una charla: organiza una entrada conceptual atractiva a ideas matemáticas profundas, conectando matemáticas y esperanza.',
    url: 'https://los3superpoderes.astridto.com',
  },
  {
    id: 'fp2',
    title: 'Kit Docente TI',
    badge: 'Producto bandera',
    badgeColor: '#FFFFFF',
    badgeBg: 'rgba(255,255,255,0.18)',
    headerBg: 'linear-gradient(135deg, #E8941A 0%, #7A4808 100%)',
    accentColor: '#E8941A',
    icon: Rocket,
    tools: ['Codex', 'Claude Code', 'Gravity'],
    audience: 'Docentes de Tecnología e Informática',
    context: 'Solución pedagógica con IA',
    description:
      'Producto digital orientado a docentes de Tecnología e Informática para planear con mayor intención pedagógica, integrar materiales, estructurar actividades y fortalecer el trabajo docente con ayuda de IA.',
    value:
      'Propuesta de valor clara, público definido y aplicación directa en el trabajo real de aula. Herramienta de asistencia pedagógica lista para usar.',
    url: 'https://copiloto.astridto.com',
  },
  {
    id: 'fp3',
    title: 'Guía de Supervisión y Evaluación Formativa · Monografía IB en Matemáticas (Marco 2027)',
    badge: 'Herramienta académica premium',
    badgeColor: '#FFFFFF',
    badgeBg: 'rgba(255,255,255,0.15)',
    headerBg: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    accentColor: '#64748b',
    icon: BookMarked,
    tool: 'Claude Code',
    toolColor: '#1D4ED8',
    audience: 'Docentes IB · supervisores · coordinadores académicos',
    context: 'IB · Monografía y supervisión',
    description:
      'Recurso web que organiza los criterios 2027, los dos itinerarios de la monografía, orientaciones para Matemáticas, marcos del itinerario interdisciplinario, banco de ejemplos, caso de práctica y herramienta de revisión formativa de borradores.',
    value:
      'Profundidad académica real y gran utilidad práctica para supervisores y docentes IB que acompañan el proceso de investigación.',
    url: 'https://laolibero.com/landing_monografia_ib_2027#criterios',
  },
]

// ─── Eventos y trayectoria ─────────────────────────────────────────────────────

const events = [
  {
    id: 'ev3',
    date: '13 mar 2026',
    institution: 'Colegio Próspero Pinzón IED',
    context: 'Charla a estudiantes',
    badge: 'Charla motivacional',
    badgeColor: '#E8941A',
    accentColor: '#E8941A',
    title: 'Tres superpoderes matemáticos: para tener esperanza sin humo',
    audience: 'Estudiantes',
    description:
      'Charla de matemáticas con enfoque motivacional, orientada a fortalecer la confianza y el significado del pensamiento matemático en la vida cotidiana.',
    impact:
      'Conexión entre las matemáticas y la esperanza, resignificando el aprendizaje más allá del aula.',
  },
  {
    id: 'ev1',
    date: '6 mar 2026',
    institution: 'Colegio Bilingüe Abraham Lincoln',
    context: 'Lincoln Challenge 2026',
    badge: 'Taller destacado',
    badgeColor: '#E8941A',
    accentColor: '#E8941A',
    title: 'La IA como copiloto docente',
    audience: 'Docentes de Tecnología e Informática',
    description:
      'Taller centrado en estrategias para potenciar el diseño de experiencias de Tecnología alineadas al MEN, integrando IA para definir criterios, probar con casos y mejorar actividades con enfoque activo y evaluable.',
    impact:
      'Fortalecimiento de la planeación, evaluación, diferenciación y construcción de recursos pedagógicos listos para usar en el aula.',
  },
  {
    id: 'ev2',
    date: '3 mar 2026',
    institution: 'Gimnasio Hontanar',
    context: 'Departamento de Matemáticas',
    badge: 'Formación docente',
    badgeColor: '#1E6B4A',
    accentColor: '#1E6B4A',
    title: 'La IA como copiloto docente',
    audience: 'Docentes de matemáticas y evaluación IB',
    description:
      'Taller orientado al uso de la IA como apoyo en procesos de evaluación formativa, con énfasis en criterios IB, feedback por criterio y verificación docente, sin requerir programación.',
    impact:
      'Foco en integridad académica, privacidad y juicio profesional docente. Retroalimentación clara y accionable en contextos de evaluación IB.',
  },
]

// ─── Config ───────────────────────────────────────────────────────────────────

const lineConfig = {
  'Método Singapur': {
    icon: BookOpen,
    accent: '#1E6B4A',
    accentLight: '#2E9E88',
    accentText: '#0C3A24',
    textOnWhite: '#1E6B4A',
    gradient: '',
    description: 'Formación docente, currículo, planeación, PIAR, CPA y operaciones.',
  },
  'GPTs y asistentes': {
    icon: Bot,
    accent: '#1E6B4A',
    accentLight: '#2E9E88',
    accentText: '#0C3A24',
    textOnWhite: '#1E6B4A',
    gradient: '',
    description: 'Asistentes especializados para currículo, evaluación, eventos y emprendimiento.',
  },
  'Nivelación y repaso': {
    icon: GraduationCap,
    accent: '#E8941A',
    accentLight: '#F0A020',
    accentText: '#7A4808',
    textOnWhite: '#7D4A00',
    gradient: '',
    description: 'Tutorías y recursos por grado para reforzar conocimientos matemáticos.',
  },
  'Juegos interactivos': {
    icon: Gamepad2,
    accent: '#E8941A',
    accentLight: '#F0A020',
    accentText: '#7A4808',
    textOnWhite: '#7D4A00',
    gradient: '',
    description: 'Recursos lúdicos para lógica, vocabulario, estrategia y pensamiento espacial.',
  },
}

function getLineConf(line) {
  return lineConfig[line] ?? lineConfig['Método Singapur']
}

function countByLine(line) {
  return resources.filter((r) => r.line === line).length
}

function getToolVisual(tool) {
  if (tool === 'Canva IA') {
    return {
      bg: '#FAFAFA',
      icon: Palette,
      badgeBg: '#6D28D9',
      badgeColor: '#FFFFFF',
      badgeText: 'Canva IA',
    }
  }
  if (tool && (tool.includes('ChatGPT') || tool.includes('GPT'))) {
    return {
      bg: '#FAFAFA',
      icon: Bot,
      badgeBg: '#1E6B4A',
      badgeColor: '#FFFFFF',
      badgeText: 'ChatGPT / GPT',
    }
  }
  if (tool === 'Claude Code') {
    return {
      bg: '#FAFAFA',
      icon: Cpu,
      badgeBg: '#1D4ED8',
      badgeColor: '#FFFFFF',
      badgeText: 'Claude Code',
    }
  }
  return {
    bg: '#FAFAFA',
    icon: Sparkles,
    badgeBg: '#334155',
    badgeColor: '#FFFFFF',
    badgeText: tool,
  }
}

// ─── Line card ─────────────────────────────────────────────────────────────────

function LineCard({ name, config, count, onClick }) {
  const Icon = config.icon
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -5, boxShadow: `0 20px 40px -12px ${config.accent}28` }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.22 }}
      className={`group relative w-full overflow-hidden rounded-3xl bg-gradient-to-br ${config.gradient} border p-6 text-left`}
      style={{ borderColor: '#C4C4BB', background: '#FFFFFF' }}
    >
      {/* top accent stripe */}
      <div
        className="absolute top-0 left-0 h-1 w-full rounded-t-3xl"
        style={{ background: `linear-gradient(90deg, ${config.accent}, ${config.accent}80)` }}
      />

      <div className="flex items-start justify-between gap-3">
        <div
          className="rounded-2xl p-3"
          style={{ background: config.textOnWhite + '18' }}
        >
          <Icon className="h-5 w-5" style={{ color: config.textOnWhite }} />
        </div>
        <span
          className="rounded-full px-3 py-1 text-xs font-bold"
          style={{ background: config.textOnWhite + '15', color: config.textOnWhite }}
        >
          {count} recursos
        </span>
      </div>

      <h3
        className="mt-4 text-base font-bold leading-snug"
        style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1a2e1a' }}
      >
        {name}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed" style={{ color: '#334155' }}>{config.description}</p>

      <span
        className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide opacity-0 transition-all duration-200 group-hover:opacity-100"
        style={{ color: config.textOnWhite }}
      >
        Explorar <ChevronRight className="h-3.5 w-3.5" />
      </span>
    </motion.button>
  )
}

// ─── Resource card ─────────────────────────────────────────────────────────────

function getTypeStyle(type) {
  if (type?.includes('GPT')) return { bg: '#f0fdf4', color: '#166534' }
  if (type?.includes('App')) return { bg: '#eff6ff', color: '#1d4ed8' }
  if (type?.includes('Taller')) return { bg: '#fef9c3', color: '#854d0e' }
  if (type?.includes('Centro')) return { bg: '#fdf4ff', color: '#7e22ce' }
  if (type?.includes('Tutoría')) return { bg: '#fff7ed', color: '#9a3412' }
  if (type?.includes('Presentación')) return { bg: '#f1f5f9', color: '#334155' }
  return { bg: '#f8fafc', color: '#475569' }
}

function ResourceCard({ resource, isSelected, onClick }) {
  const conf = getLineConf(resource.line)
  const toolVis = getToolVisual(resource.tool)
  const ToolIcon = toolVis.icon
  const ts = getTypeStyle(resource.type)

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.22 }}
      className="w-full text-left"
    >
      <div
        className={'group relative h-full overflow-hidden rounded-3xl transition-all duration-200 hover:-translate-y-0.5'}
        style={{
          background: '#FFFFFF',
          border: isSelected
            ? `2px solid ${conf.accent}`
            : '1px solid #64748b',
          boxShadow: isSelected
            ? `0 8px 24px -6px ${conf.accent}28`
            : '0 1px 4px rgba(0,0,0,0.04)',
        }}
      >
        {/* Tool visual header */}
        <div
          className="flex items-center justify-between px-4 pt-4 pb-3"
          style={{ background: toolVis.bg, borderBottom: '1px solid #E2E2DC' }}
        >
          <div className="flex items-center gap-2">
            <div
              className="rounded-xl p-1.5"
              style={{ background: toolVis.badgeBg }}
            >
              <ToolIcon className="h-4 w-4" style={{ color: toolVis.badgeColor }} />
            </div>
            <span
              className="rounded-full px-2.5 py-0.5 text-xs font-bold"
              style={{ background: toolVis.badgeBg, color: toolVis.badgeColor }}
            >
              {toolVis.badgeText}
            </span>
          </div>
          <span
            className="rounded-md px-2 py-0.5 text-xs font-semibold"
            style={{ background: ts.bg, color: ts.color }}
          >
            {resource.type}
          </span>
        </div>

        {/* Card body */}
        <div className="p-4">
          <h3
            className="text-sm font-bold leading-snug"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: '#1c1917',
              fontSize: '0.9375rem',
            }}
          >
            {resource.title}
          </h3>

          <p
            className="mt-1 text-xs font-semibold uppercase tracking-wider"
            style={{ color: conf.textOnWhite }}
          >
            {resource.subline}
          </p>

          <p className="mt-2 line-clamp-2 text-sm leading-relaxed" style={{ color: '#334155' }}>
            {resource.shortDescription}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {resource.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                style={{
                  border: `1px solid ${conf.textOnWhite}55`,
                  background: 'transparent',
                  color: conf.textOnWhite,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.button>
  )
}

// ─── Detail panel ──────────────────────────────────────────────────────────────

function DetailPanel({ resource, onClose }) {
  const conf = getLineConf(resource.line)

  return (
    <motion.div
      key={resource.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.28 }}
    >
      <div
        className="overflow-hidden rounded-3xl shadow-lg"
        style={{ border: '1px solid #64748b', background: '#FFFFFF' }}
      >
        {/* Header */}
        <div
          className="relative overflow-hidden px-6 pt-6 pb-7"
          style={{
            background: `linear-gradient(135deg, ${conf.accent} 0%, ${conf.accentText} 100%)`,
          }}
        >
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="ddots" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ddots)" />
          </svg>

          <div className="relative flex items-start justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              <span
                className="rounded-md px-2.5 py-0.5 text-xs font-bold"
                style={{ background: 'rgba(255,255,255,0.18)', color: 'white' }}
              >
                {resource.type}
              </span>
              <span
                className="rounded-md px-2.5 py-0.5 text-xs font-bold"
                style={{ background: 'rgba(232,148,26,0.25)', color: '#FFFFFF' }}
              >
                {resource.line}
              </span>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="rounded-full p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white xl:hidden"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <h2
            className="relative mt-4 text-lg font-bold leading-snug text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {resource.title}
          </h2>
          <p className="relative mt-1 text-sm font-medium text-white/60">{resource.subline}</p>

          <div
            className="relative mt-5 h-px w-12 rounded-full"
            style={{ background: '#E8941A' }}
          />
        </div>

        {/* Body */}
        <div className="space-y-5 p-6">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <MetaChip icon={LayoutGrid} label="Tipo" value={resource.type} accent={conf.accent} />
            <MetaChip
              icon={Users}
              label="Público"
              value={resource.audience}
              accent={conf.accent}
              className="sm:col-span-2"
            />
            <MetaChip
              icon={Sparkles}
              label="Herramienta"
              value={resource.tool}
              accent={conf.accent}
              className="sm:col-span-3"
            />
          </div>

          <Divider />

          <InfoBlock label="Propósito" text={resource.purpose} accent={conf.accent} />
          <InfoBlock label="Descripción breve" text={resource.shortDescription} accent={conf.accent} />
          <InfoBlock label="Valor pedagógico" text={resource.value} accent={conf.accent} />

          <Divider />

          <div>
            <Label>Palabras clave</Label>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {resource.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-3 py-0.5 text-xs font-medium"
                  style={{
                    border: `1px solid ${conf.textOnWhite}55`,
                    background: 'transparent',
                    color: conf.textOnWhite,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div
            className="flex items-center gap-3 rounded-2xl border p-3"
            style={{ borderColor: conf.accent + '25', background: conf.accent + '08' }}
          >
            <div
              className="shrink-0 rounded-xl p-2"
              style={{ background: conf.accent + '18' }}
            >
              <LinkIcon className="h-3.5 w-3.5" style={{ color: conf.accent }} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-800">Enlace</p>
              <a
                href={resource.url}
                target="_blank"
                rel="noreferrer"
                className="mt-0.5 block truncate text-xs font-medium hover:underline"
                style={{ color: conf.accent }}
              >
                {resource.url}
              </a>
            </div>
          </div>

          {/* CTA button — functional with window.open */}
          <button
            onClick={() => window.open(resource.url, '_blank', 'noreferrer')}
            className="flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-bold shadow-md transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #E8941A 0%, #B8720C 100%)',
              color: 'white',
            }}
          >
            <Star className="h-4 w-4" />
            Abrir recurso
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

function MetaChip({ icon: Icon, label, value, className = '' }) {
  return (
    <div className={`rounded-2xl bg-slate-100 px-3 py-2.5 ${className}`}>
      <div className="flex items-center gap-1.5">
        <Icon className="h-3 w-3 text-slate-800" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-800">{label}</span>
      </div>
      <p className="mt-0.5 text-xs font-semibold text-slate-700">{value}</p>
    </div>
  )
}

function InfoBlock({ label, text, accent }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center gap-2">
        <div className="h-3 w-0.5 rounded-full" style={{ background: accent }} />
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-800">{label}</span>
      </div>
      <p className="pl-2.5 text-sm leading-relaxed text-slate-800">{text}</p>
    </div>
  )
}

function Divider() {
  return <div className="h-px bg-slate-300" />
}

function Label({ children }) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-800">{children}</p>
  )
}

// ─── Filter chip ──────────────────────────────────────────────────────────────

function FilterChip({ label, isActive, onClick, accent }) {
  return (
    <button
      onClick={onClick}
      className="shrink-0 rounded-xl px-4 py-1.5 text-sm font-semibold transition-all duration-150"
      style={
        isActive
          ? {
            background: accent || '#1E6B4A',
            color: 'white',
            boxShadow: `0 2px 10px -2px ${accent || '#1E6B4A'}60`,
          }
          : {
            background: 'white',
            color: '#334155',
            border: '1px solid #64748b',
          }
      }
    >
      {label}
    </button>
  )
}

// ─── FeaturedProductCard ───────────────────────────────────────────────────────

function FeaturedProductCard({ product, index }) {
  const Icon = product.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col overflow-hidden rounded-3xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{ border: '1px solid #E2E2DC', background: '#FFFFFF' }}
    >
      {/* Header band */}
      <div
        className="relative flex flex-col justify-between px-6 py-6 sm:px-7"
        style={{ background: product.headerBg, minHeight: '140px' }}
      >
        {/* Subtle pattern overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.4) 0%, transparent 60%)',
          }}
        />
        <div className="relative flex items-start justify-between gap-3">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest"
            style={{
              color: product.badgeColor,
              background: product.badgeBg,
              border: '1px solid rgba(255,255,255,0.25)',
            }}
          >
            <Icon className="h-3 w-3" />
            {product.badge}
          </span>
          {/* Herramienta(s) con que fue construido */}
          {product.tool && (
            <span
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold"
              style={{ background: product.toolColor || '#1D4ED8', color: '#FFFFFF' }}
            >
              <Cpu className="h-2.5 w-2.5" />
              {product.tool}
            </span>
          )}
          {product.tools && (
            <div className="flex flex-wrap gap-1">
              {product.tools.map(t => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold"
                  style={{ background: 'rgba(255,255,255,0.18)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.3)' }}
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="relative mt-4">
          <h3
            className="text-lg font-bold leading-snug text-white sm:text-xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {product.title}
          </h3>
          <p className="mt-1 text-xs font-semibold text-white/70">{product.context}</p>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
        {/* Audience */}
        <div className="flex items-center gap-2">
          <div
            className="rounded-lg p-1.5"
            style={{ background: product.accentColor + '14' }}
          >
            <Users className="h-3.5 w-3.5" style={{ color: product.accentColor }} />
          </div>
          <span className="text-xs font-semibold text-slate-700">{product.audience}</span>
        </div>

        {/* Separator */}
        <div className="h-px w-full" style={{ background: '#EEEEE8' }} />

        {/* Description */}
        <p className="flex-1 text-sm leading-relaxed text-slate-700">{product.description}</p>

        {/* Value callout */}
        <div
          className="rounded-2xl px-4 py-3"
          style={{ background: product.accentColor + '0D', border: `1px solid ${product.accentColor}22` }}
        >
          <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: product.accentColor }}>
            Por qué importa
          </p>
          <p className="mt-1 text-xs leading-relaxed text-slate-700">{product.value}</p>
        </div>

        {/* CTA */}
        <button
          onClick={() => window.open(product.url, '_blank', 'noreferrer')}
          className="flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-bold shadow-sm transition-all duration-200 hover:opacity-90 hover:shadow-md active:scale-[0.98]"
          style={{ background: product.headerBg, color: '#FFFFFF' }}
        >
          Abrir recurso
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  )
}

// ─── EventCard ────────────────────────────────────────────────────────────────

function EventCard({ event, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.12 * index, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:shadow-md"
      style={{ border: '1px solid #E2E2DC' }}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
        style={{ background: event.accentColor }}
      />

      <div className="flex flex-col gap-4 py-6 pl-8 pr-6 sm:flex-row sm:items-start sm:gap-6">
        {/* Date column */}
        <div className="shrink-0 sm:w-32">
          <div
            className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold"
            style={{
              background: event.accentColor + '12',
              color: event.accentColor,
              border: `1px solid ${event.accentColor}25`,
            }}
          >
            <Calendar className="h-3 w-3" />
            {event.date}
          </div>
          <div className="mt-2 flex items-start gap-1.5">
            <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-slate-400" />
            <p className="text-[11px] leading-snug text-slate-500">{event.institution}</p>
          </div>
          <p className="mt-1 text-[11px] font-semibold text-slate-400">{event.context}</p>
        </div>

        {/* Divider vertical (desktop) */}
        <div className="hidden w-px self-stretch sm:block" style={{ background: '#EEEEE8' }} />

        {/* Content */}
        <div className="flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3
              className="text-base font-bold text-slate-900 sm:text-lg"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {event.title}
            </h3>
            <span
              className="shrink-0 rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest"
              style={{
                background: event.badgeColor + '14',
                color: event.badgeColor,
                border: `1px solid ${event.badgeColor}30`,
              }}
            >
              {event.badge}
            </span>
          </div>

          <div className="mt-1.5 flex items-center gap-1.5">
            <Users className="h-3 w-3 text-slate-400" />
            <p className="text-xs text-slate-500">{event.audience}</p>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-slate-700">{event.description}</p>

          {/* Impact */}
          <div
            className="mt-3 rounded-xl px-3.5 py-2.5"
            style={{ background: '#F7F7F4', border: '1px solid #E2E2DC' }}
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Impacto
            </p>
            <p className="mt-0.5 text-xs leading-relaxed text-slate-600">{event.impact}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function RepositorioInnovacionIA() {
  const [activeLine, setActiveLine] = useState('Todos')
  const [activeTool, setActiveTool] = useState('Todas')
  const [activeAudience, setActiveAudience] = useState('Todos')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(resources[0])
  const [profileOpen, setProfileOpen] = useState(false)

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      const lineMatch = activeLine === 'Todos' || r.line === activeLine

      let toolMatch = true
      if (activeTool === 'Canva IA') {
        toolMatch = r.tool === 'Canva IA'
      } else if (activeTool === 'ChatGPT GPT') {
        toolMatch = r.tool && (r.tool.includes('ChatGPT') || r.tool.includes('GPT'))
      } else if (activeTool === 'Claude Code') {
        toolMatch = r.tool === 'Claude Code'
      } else if (activeTool === 'Codex') {
        toolMatch = r.tool === 'Codex'
      }

      let audienceMatch = true
      if (activeAudience === 'Docentes') {
        audienceMatch = r.audience && r.audience.includes('ocente')
      } else if (activeAudience === 'Estudiantes') {
        audienceMatch = r.audience && r.audience.includes('studiante')
      }

      const q = query.trim().toLowerCase()
      const text = [
        r.title, r.type, r.line, r.subline, r.audience,
        r.shortDescription, r.purpose, r.value, ...(r.tags || []),
      ]
        .join(' ')
        .toLowerCase()

      return lineMatch && toolMatch && audienceMatch && (!q || text.includes(q))
    })
  }, [activeLine, activeTool, activeAudience, query])

  const lineOptions = ['Todos', ...Object.keys(lineConfig)]
  const toolOptions = ['Todas', 'Canva IA', 'ChatGPT GPT', 'Claude Code', 'Codex']
  const audienceOptions = ['Todos', 'Docentes', 'Estudiantes']

  return (
    <>
      <style>{fontImport}</style>
      <div
        className="min-h-screen text-slate-900"
        style={{ background: '#F7F7F4', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
      >

        {/* ═══════════════════════════════ HERO ═══════════════════════════════ */}
        <header className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FFF4E6 0%, #FFFFFF 50%, #FFFFFF 100%)' }}>
          {/* Decorative blobs */}
          <div
            className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-30 blur-3xl"
            style={{ background: '#E8941A' }}
          />
          <div
            className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full opacity-20 blur-3xl"
            style={{ background: '#1E6B4A' }}
          />

          <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-14 lg:grid-cols-[1.4fr_0.6fr] lg:items-center"
            >
              {/* Left copy */}
              <div>
                <motion.span
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
                  style={{
                    borderColor: '#B8720C',
                    color: '#7A4808',
                    background: '#F0A020',
                  }}
                >
                  <Sparkles className="h-3.5 w-3.5" /> Repositorio en construcción
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22, duration: 0.5 }}
                  className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.5rem]"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1c1917' }}
                >
                  Repositorio de{' '}
                  <span style={{ color: '#1E6B4A' }}>innovación educativa</span>
                  <br />
                  <span style={{ color: '#E8941A' }}>con Inteligencia Artificial</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.5 }}
                  className="mt-6 max-w-xl text-base leading-relaxed text-slate-800"
                >
                  Una vitrina organizada de aplicaciones, juegos, materiales y GPTs creados por{' '}
                  <strong className="font-bold text-slate-800">Astrid Torregroza</strong> para
                  formación docente, nivelación matemática, currículo y acompañamiento pedagógico.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.4 }}
                  className="mt-8"
                >
                  <a
                    href="#catalogo"
                    className="inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
                    style={{ background: 'linear-gradient(135deg, #1E6B4A 0%, #145C3C 100%)' }}
                  >
                    Explorar los {resources.length} recursos <ChevronRight className="h-4 w-4" />
                  </a>
                </motion.div>
              </div>

              {/* Right — profile card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div
                  className="overflow-hidden rounded-3xl shadow-xl"
                  style={{ border: '1px solid #64748b', background: '#FFFFFF' }}
                >
                  {/* Photo */}
                  <div
                    className="relative h-52 overflow-hidden"
                    style={{ background: 'linear-gradient(160deg, #0C3A24 0%, #1E6B4A 100%)' }}
                  >
                    <img
                      src={astridPhoto}
                      alt="Astrid Torregroza"
                      className="absolute bottom-0 left-1/2 h-full -translate-x-1/2 object-contain object-bottom"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <p
                      className="text-lg font-bold leading-tight"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1c1917' }}
                    >
                      Astrid Torregroza
                    </p>
                    <p className="mt-0.5 text-xs font-semibold uppercase tracking-widest" style={{ color: '#E8941A' }}>
                      Innovación educativa con IA
                    </p>

                    {/* Stats row */}
                    <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                      {[
                        { value: '23', label: 'Recursos' },
                        { value: '17', label: 'Canva IA' },
                        { value: '6', label: 'GPTs' },
                      ].map(({ value, label }) => (
                        <div
                          key={label}
                          className="rounded-2xl py-2"
                          style={{ background: '#e2e8f0', border: '1px solid #64748b' }}
                        >
                          <p
                            className="text-xl font-extrabold"
                            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1c1917' }}
                          >
                            {value}
                          </p>
                          <p className="text-[10px] font-semibold text-slate-800">{label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Platform links */}
                    <div className="mt-4 flex flex-col gap-2">
                      {[
                        { label: 'maryam.academy', url: 'https://maryam.academy/', color: '#E8941A' },
                        { label: 'laolibero.com', url: 'https://laolibero.com/', color: '#1E6B4A' },
                        { label: 'LinkedIn', url: 'https://www.linkedin.com/in/astrid-torregroza/', color: '#0077b5' },
                      ].map(({ label, url, color }) => (
                        <a
                          key={label}
                          href={url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-bold transition-all duration-150 hover:opacity-80"
                          style={{ background: color + '12', color, border: `1px solid ${color}25` }}
                        >
                          {label}
                          <ExternalLink className="h-3 w-3 opacity-60" />
                        </a>
                      ))}
                    </div>

                    {/* Toggle perfil */}
                    <button
                      onClick={() => setProfileOpen(v => !v)}
                      className="mt-4 flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold transition-all duration-200 hover:opacity-80"
                      style={{ background: '#0f172a', color: '#F0A020', border: '1px solid #1e293b' }}
                    >
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="h-3 w-3" />
                        {profileOpen ? 'Ocultar perfil de innovación' : 'Ver perfil de innovación'}
                      </span>
                      <ChevronRight
                        className="h-3.5 w-3.5 transition-transform duration-300"
                        style={{ transform: profileOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
                      />
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* wave divider */}
          <div className="relative h-10 overflow-hidden">
            <svg
              viewBox="0 0 1440 40"
              className="absolute bottom-0 w-full"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0,40 L1440,40 L1440,8 Q1200,40 960,20 Q720,0 480,20 Q240,40 0,8 Z"
                fill="#F7F7F4"
              />
            </svg>
          </div>
        </header>

        {/* ══════════════════════════ LINE CARDS ══════════════════════════════ */}
        <section className="mx-auto max-w-7xl px-5 pt-12 pb-4 sm:px-8 lg:px-12">
          <div className="mb-6 flex items-end justify-between">
            <h2
              className="text-xl font-bold"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1c1917' }}
            >
              Líneas del repositorio
            </h2>
            <span className="text-sm text-slate-800">4 categorías</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Object.entries(lineConfig).map(([name, config], i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i, duration: 0.38 }}
              >
                <LineCard
                  name={name}
                  config={config}
                  count={countByLine(name)}
                  onClick={() => {
                    setActiveLine(name)
                    document
                      .getElementById('catalogo')
                      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* ════════════════════════ TECH PROFILE ════════════════════════════ */}
        <AnimatePresence>
          {profileOpen && (
            <motion.section
              key="tech-profile"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: 'hidden' }}
              className="mx-auto max-w-7xl px-5 pb-10 sm:px-8 lg:px-12">
              <div className="relative overflow-hidden rounded-3xl" style={{ background: '#0f172a' }}>
                {/* Blobs decorativos */}
                <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full opacity-20 blur-3xl" style={{ background: '#1E6B4A' }} />
                <div className="pointer-events-none absolute -bottom-16 left-10 h-48 w-48 rounded-full opacity-15 blur-3xl" style={{ background: '#E8941A' }} />

                <div className="relative grid lg:grid-cols-[1fr_290px]">
                  {/* ── Izquierda: bio + competencias ── */}
                  <div className="p-8 lg:p-10">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest" style={{ color: '#F0A020' }}>
                      <Sparkles className="h-3 w-3" /> Perfil de innovación
                    </span>

                    <h2
                      className="mt-3 text-2xl font-bold text-white sm:text-3xl"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                  Tecnología e IA como{' '}
                      <span style={{ color: '#F0A020' }}>lenguaje pedagógico</span>
                    </h2>

                    <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-300">
                  Licenciada en Matemáticas y Física, Especialista en Gerencia Educativa y con más de{' '}
                      <strong className="text-white">25 años de experiencia</strong>. CEO y cofundadora
                  de Maryam Math Academy, lidera formación docente, currículo IB y la integración
                  estratégica de IA — usando tecnología de forma{' '}
                      <strong className="text-white">ética, crítica y creativa</strong> al servicio del
                  aprendizaje.
                    </p>

                    <blockquote
                      className="mt-5 border-l-2 pl-4 text-sm italic text-slate-400"
                      style={{ borderColor: '#E8941A' }}
                    >
                  &ldquo;Cada herramienta de IA en este repositorio responde a una intención pedagógica real.&rdquo;
                    </blockquote>

                    {/* Competencias tecnológicas */}
                    <div className="mt-6">
                      <p className="mb-2.5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    Herramientas y competencias tecnológicas
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { label: 'Canva IA', color: '#E8941A' },
                          { label: 'ChatGPT', color: '#2E9E88' },
                          { label: 'GPTs personalizados', color: '#2E9E88' },
                          { label: 'Claude Code', color: '#1D4ED8' },
                          { label: 'Codex', color: '#1D4ED8' },
                          { label: 'Prompt engineering', color: '#2E9E88' },
                          { label: 'Currículo con IA', color: '#F0A020' },
                          { label: 'Diseño de recursos digitales', color: '#F0A020' },
                          { label: 'Formación docente en IA', color: '#F0A020' },
                          { label: 'IB Matemáticas', color: '#2E9E88' },
                          { label: 'Método Singapur', color: '#2E9E88' },
                          { label: 'IA ética y crítica', color: '#F0A020' },
                        ].map(({ label, color }) => (
                          <span
                            key={label}
                            className="rounded-full px-3 py-1 text-xs font-semibold"
                            style={{ background: color + '18', color, border: `1px solid ${color}40` }}
                          >
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ── Derecha: KPIs + reconocimientos ── */}
                  <div
                    className="flex flex-col justify-between gap-6 p-8 lg:border-l lg:p-10"
                    style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                  >
                    {/* KPIs */}
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: '25+', label: 'Años de\nexperiencia' },
                        { value: 'CEO', label: 'Maryam\nMath Academy' },
                        { value: 'IB', label: 'Currículo\nMatemáticas' },
                        { value: 'INTL', label: 'Alcance\nInternacional' },
                      ].map(({ value, label }) => (
                        <div
                          key={value}
                          className="rounded-2xl p-3 text-center"
                          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                        >
                          <p
                            className="text-xl font-extrabold text-white"
                            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                          >
                            {value}
                          </p>
                          <p className="mt-0.5 whitespace-pre-line text-[10px] leading-tight text-slate-500">
                            {label}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Reconocimientos */}
                    <div className="space-y-2.5">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    Reconocimientos
                      </p>
                      {[
                        { year: '2013', award: 'Premio Telefónica', detail: 'Innovación en tecnología educativa' },
                        { year: '2013', award: 'Finalista Premio Compartir al Maestro', detail: '' },
                        { year: '2015', award: 'Finalista Premio Santillana', detail: '' },
                      ].map(({ year, award, detail }) => (
                        <div key={award} className="flex items-start gap-2.5">
                          <span
                            className="shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-bold"
                            style={{ background: 'rgba(217,119,6,0.25)', color: '#F0A020' }}
                          >
                            {year}
                          </span>
                          <div>
                            <p className="text-xs font-semibold text-white">{award}</p>
                            {detail && <p className="text-[10px] text-slate-500">{detail}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* ══════════════════════ PRODUCTOS DESTACADOS ═════════════════════════ */}
        <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-12">
          {/* Section header */}
          <div className="mb-8 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span
                className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest"
                style={{ color: '#E8941A' }}
              >
                <Trophy className="h-3.5 w-3.5" /> Colección especial
              </span>
              <h2
                className="mt-1 text-2xl font-bold sm:text-3xl"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1c1917' }}
              >
                Productos destacados
              </h2>
              <p className="mt-1 max-w-xl text-sm text-slate-600">
                Herramientas bandera, experiencias web y guías premium — recursos con mayor
                profundidad, propuesta de valor clara y aplicación directa en el aula.
              </p>
            </div>
            <span
              className="shrink-0 self-start rounded-full px-3 py-1.5 text-xs font-bold sm:self-auto"
              style={{ background: '#F0A020', color: '#7A4808', border: '1px solid #B8720C' }}
            >
              3 recursos premium
            </span>
          </div>

          {/* Cards grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product, i) => (
              <FeaturedProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          {/* Divider */}
          <div className="mt-12 h-px w-full" style={{ background: '#E2E2DC' }} />
        </section>

        {/* ═══════════════════════════ CATALOGUE ══════════════════════════════ */}
        <section id="catalogo" className="mx-auto max-w-7xl px-5 py-10 pb-16 sm:px-8 lg:px-12">

          {/* Header + search */}
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2
                className="text-2xl font-bold"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1c1917' }}
              >
                Catálogo de recursos
              </h2>
              <p className="mt-0.5 text-sm text-slate-700">
                {filtered.length} {filtered.length === 1 ? 'recurso' : 'recursos'} · selecciona
                una tarjeta para ver la ficha completa
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full max-w-xs">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-800" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por tema, grado, línea…"
                className="w-full rounded-2xl border py-2.5 pl-10 pr-9 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-800 focus:ring-2"
                style={{
                  borderColor: '#C4C4BB',
                  background: '#FFFFFF',
                  focusRingColor: '#1E6B4A',
                }}
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-0.5 text-slate-800 hover:text-slate-800"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Filter rows */}
          <div className="mb-6 space-y-3">
            {/* Row 1: line filter */}
            <div className="overflow-x-auto">
              <div className="flex gap-2 pb-1">
                {lineOptions.map((line) => (
                  <FilterChip
                    key={line}
                    label={line}
                    isActive={activeLine === line}
                    onClick={() => setActiveLine(line)}
                    accent={line !== 'Todos' ? lineConfig[line]?.accent : '#1c1917'}
                  />
                ))}
              </div>
            </div>

            {/* Row 2: tool filter */}
            <div className="overflow-x-auto">
              <div className="flex gap-2 pb-1">
                {toolOptions.map((tool) => (
                  <FilterChip
                    key={tool}
                    label={tool}
                    isActive={activeTool === tool}
                    onClick={() => setActiveTool(tool)}
                    accent={
                      tool === 'Canva IA'
                        ? '#7c3aed'
                        : tool === 'ChatGPT GPT'
                          ? '#1E6B4A'
                          : '#1c1917'
                    }
                  />
                ))}
              </div>
            </div>

            {/* Row 3: audience filter */}
            <div className="overflow-x-auto">
              <div className="flex gap-2 pb-1">
                {audienceOptions.map((aud) => (
                  <FilterChip
                    key={aud}
                    label={aud}
                    isActive={activeAudience === aud}
                    onClick={() => setActiveAudience(aud)}
                    accent={
                      aud === 'Docentes'
                        ? '#E8941A'
                        : aud === 'Estudiantes'
                          ? '#1E6B4A'
                          : '#1c1917'
                    }
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Grid + detail panel */}
          <div className="grid gap-6 xl:grid-cols-[1fr_390px]">
            {/* Cards grid */}
            <div>
              {filtered.length === 0 ? (
                <div
                  className="flex flex-col items-center justify-center rounded-3xl border border-dashed py-16 text-center"
                  style={{ borderColor: '#C4C4BB', background: '#FFFFFF' }}
                >
                  <Search className="mb-3 h-8 w-8 text-slate-300" />
                  <p className="font-medium text-slate-700">Sin resultados para tu búsqueda.</p>
                  <button
                    onClick={() => {
                      setQuery('')
                      setActiveLine('Todos')
                      setActiveTool('Todas')
                      setActiveAudience('Todos')
                    }}
                    className="mt-3 text-sm font-bold hover:underline"
                    style={{ color: '#1E6B4A' }}
                  >
                    Limpiar filtros
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <AnimatePresence mode="popLayout">
                    {filtered.map((resource) => (
                      <ResourceCard
                        key={resource.id}
                        resource={resource}
                        isSelected={selected?.id === resource.id}
                        onClick={() => setSelected(resource)}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Sticky detail — desktop */}
            <div className="hidden xl:block">
              <div className="sticky top-6">
                <AnimatePresence mode="wait">
                  {selected && <DetailPanel key={selected.id} resource={selected} />}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Mobile detail drawer */}
          <AnimatePresence>
            {selected && (
              <motion.div
                key="mob-drawer"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 32 }}
                transition={{ duration: 0.28 }}
                className="mt-6 xl:hidden"
              >
                <DetailPanel resource={selected} onClose={() => setSelected(null)} />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ═══════════════════════ EVENTOS Y TRAYECTORIA ═══════════════════════ */}
        <section
          className="mx-auto max-w-7xl px-5 py-12 pb-14 sm:px-8 lg:px-12"
        >
          {/* Section header */}
          <div className="mb-8 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span
                className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest"
                style={{ color: '#1E6B4A' }}
              >
                <Cpu className="h-3.5 w-3.5" /> Presencia académica
              </span>
              <h2
                className="mt-1 text-2xl font-bold sm:text-3xl"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1c1917' }}
              >
                Eventos y trayectoria
              </h2>
              <p className="mt-1 max-w-xl text-sm text-slate-600">
                Talleres, conferencias y participaciones académicas — evidencia de liderazgo
                educativo e impacto real en la formación docente con IA.
              </p>
            </div>
            <span
              className="shrink-0 self-start rounded-full px-3 py-1.5 text-xs font-bold sm:self-auto"
              style={{ background: '#2E9E88', color: '#0C3A24', border: '1px solid #1E6B4A44' }}
            >
              2 eventos recientes
            </span>
          </div>

          {/* Timeline-style event cards */}
          <div className="relative">
            {/* Vertical timeline line (desktop) */}
            <div
              className="pointer-events-none absolute left-[0.25rem] top-6 bottom-6 hidden w-px lg:block"
              style={{ background: 'linear-gradient(to bottom, #1E6B4A40, #E8941A40)' }}
            />
            <div className="flex flex-col gap-5 lg:pl-6">
              {events.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} />
              ))}
            </div>
          </div>

          {/* Invitation block */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="mt-10 flex flex-col items-center justify-between gap-4 rounded-3xl px-7 py-7 text-center sm:flex-row sm:text-left"
            style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF4E6 100%)',
              border: '1px solid #1E6B4A30',
            }}
          >
            <div>
              <p
                className="text-base font-bold text-slate-900 sm:text-lg"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                ¿Quieres a Astrid en tu institución?
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Talleres de formación docente, conferencias sobre IA educativa y acompañamiento
                pedagógico a la medida.
              </p>
            </div>
            <a
              href="https://www.linkedin.com/in/astrid-torregroza/"
              target="_blank"
              rel="noreferrer"
              className="shrink-0 inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:opacity-90 hover:shadow-md"
              style={{ background: 'linear-gradient(135deg, #1E6B4A 0%, #0C3A24 100%)' }}
            >
              Conectar
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </motion.div>
        </section>

        {/* ══════════════════════════════ FOOTER ══════════════════════════════ */}
        <footer style={{ background: '#0f172a' }}>
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12">
            <div className="text-center">
              <h2
                className="text-2xl font-bold text-white sm:text-3xl"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Innovación educativa con IA
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
                Cada recurso de este repositorio nace de una pregunta pedagógica real. Astrid
                Torregroza diseña experiencias de aprendizaje que combinan tecnología, creatividad y
                propósito educativo — convirtiendo la IA en una aliada del aula, no en un sustituto
                del docente.
              </p>
            </div>

            {/* Three pillars */}
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <div
                className="rounded-3xl p-6 text-center"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="mb-3 flex justify-center">
                  <div
                    className="rounded-2xl p-3"
                    style={{ background: 'rgba(217,119,6,0.15)' }}
                  >
                    <GraduationCap className="h-6 w-6" style={{ color: '#E8941A' }} />
                  </div>
                </div>
                <h3
                  className="font-bold text-white"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Formación docente
                </h3>
                <p className="mt-1.5 text-sm text-slate-300">
                  Recursos diseñados para acompañar el crecimiento profesional de maestros.
                </p>
              </div>

              <div
                className="rounded-3xl p-6 text-center"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="mb-3 flex justify-center">
                  <div
                    className="rounded-2xl p-3"
                    style={{ background: 'rgba(5,150,105,0.15)' }}
                  >
                    <Lightbulb className="h-6 w-6" style={{ color: '#1E6B4A' }} />
                  </div>
                </div>
                <h3
                  className="font-bold text-white"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Diseño pedagógico
                </h3>
                <p className="mt-1.5 text-sm text-slate-300">
                  Cada herramienta responde a una intención didáctica clara y fundamentada.
                </p>
              </div>

              <div
                className="rounded-3xl p-6 text-center"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="mb-3 flex justify-center">
                  <div
                    className="rounded-2xl p-3"
                    style={{ background: 'rgba(124,58,237,0.15)' }}
                  >
                    <Sparkles className="h-6 w-6" style={{ color: '#a78bfa' }} />
                  </div>
                </div>
                <h3
                  className="font-bold text-white"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  IA con propósito
                </h3>
                <p className="mt-1.5 text-sm text-slate-300">
                  La tecnología al servicio del aprendizaje, no al revés.
                </p>
              </div>
            </div>

            {/* Footer platform links */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {[
                { label: 'maryam.academy', url: 'https://maryam.academy/', color: '#a78bfa' },
                { label: 'laolibero.com', url: 'https://laolibero.com/', color: '#1E6B4A' },
                { label: 'LinkedIn', url: 'https://www.linkedin.com/in/astrid-torregroza/', color: '#60a5fa' },
              ].map(({ label, url, color }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-70"
                  style={{ color }}
                >
                  {label} <ExternalLink className="h-3 w-3" />
                </a>
              ))}
            </div>
            <p className="mt-4 text-center text-xs text-slate-400">
              Creado por Astrid Torregroza · Repositorio de innovación educativa con IA
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}
