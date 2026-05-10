import React, { useMemo, useState } from "react";

const missionData = [
  {
    id: "M01",
    title: "Punto de Partida",
    status: "completed",
    icon: "check",
    description: "Define dónde estás ahora antes de avanzar.",
  },
  {
    id: "M02",
    title: "Diagnóstico",
    status: "current",
    icon: "target",
    description: "Completa esta misión para desbloquear tu ruta personalizada.",
  },
  {
    id: "M03",
    title: "Riesgos y Límites",
    status: "locked",
    icon: "alert",
    description: "Identifica riesgos de presupuesto, tiempo, documentos y visa.",
  },
  {
    id: "M04",
    title: "Rutas de Escape",
    status: "locked",
    icon: "route",
    description: "Compara rutas posibles usando fuentes oficiales.",
  },
  {
    id: "M05",
    title: "Recursos de Supervivencia",
    status: "locked",
    icon: "wallet",
    description: "Calcula presupuesto, llegada y margen de emergencia.",
  },
  {
    id: "M06",
    title: "Inventario",
    status: "locked",
    icon: "backpack",
    description: "Organiza documentos, evidencia y requisitos clave.",
  },
  {
    id: "M07",
    title: "Plan de Escape",
    status: "locked",
    icon: "file",
    description: "Convierte tu ruta en un plan paso a paso.",
  },
  {
    id: "M08",
    title: "Fuentes Oficiales",
    status: "locked",
    icon: "info",
    description: "Reúne referencias oficiales según tu ruta seleccionada.",
  },
];

function getSimulatorMissions(selectedRoute) {
  const routeId = selectedRoute?.id || "generic";
  const generic = [
    {
      id: "S01",
      title: "Escenario Actual",
      status: "current",
      icon: "target",
      description: "Resume tu situación actual y la ruta que quieres simular.",
    },
    {
      id: "S02",
      title: "Comparar Ruta Base",
      status: "current",
      icon: "route",
      description: "Compara tu ruta seleccionada contra una alternativa antes de tomar decisiones grandes.",
    },
    {
      id: "S03",
      title: "Estrés Financiero",
      status: "locked",
      icon: "wallet",
      description: "Prueba escenarios con menos dinero, más renta, vuelos caros o retraso para encontrar trabajo.",
    },
  ];

  const routeMissions = {
    skilled: [
      { id: "S01", title: "Escenario Skilled", status: "current", icon: "target", description: "Resume ocupación, edad, inglés, experiencia y ruta skilled que quieres simular." },
      { id: "S02", title: "Puntos Skilled", status: "current", icon: "star", description: "Calcula puntos aproximados para rutas Skilled como 189, 190 y 491." },
      { id: "S03", title: "Ocupación y ANZSCO", status: "locked", icon: "file", description: "Simula si tu experiencia podría alinearse con una ocupación concreta y lista aplicable." },
      { id: "S04", title: "Skills Assessment", status: "locked", icon: "checklist", description: "Organiza autoridad evaluadora, evidencia laboral, estudios y documentos críticos." },
      { id: "S05", title: "EOI e Invitación", status: "locked", icon: "route", description: "Simula un escenario de EOI, nominación estatal y posibilidad de invitación." },
      { id: "S06", title: "Plan de Mejora", status: "locked", icon: "star", description: "Calcula qué tendría más impacto: inglés, experiencia, nominación, estudios o pareja." },
    ],
    student: [
      { id: "S01", title: "Escenario Student", status: "current", icon: "target", description: "Resume curso, ciudad, presupuesto, nivel de inglés y propósito de estudio." },
      { id: "S02_STUDENT", title: "Costo Total Student", status: "current", icon: "wallet", description: "Simula matrícula, OSHC, visa, renta, comida y fondo de emergencia." },
      { id: "S03_STUDENT", title: "CRICOS y Curso", status: "locked", icon: "file", description: "Compara proveedor, curso, duración, campus y coherencia con tu perfil." },
      { id: "S04_STUDENT", title: "Evidencia Financiera", status: "locked", icon: "checklist", description: "Simula si tus fondos y soportes son suficientes para una aplicación ordenada." },
      { id: "S05_STUDENT", title: "Genuine Student", status: "locked", icon: "alert", description: "Revisa riesgos de propósito de estudio, historial, cambios de carrera y vínculos." },
      { id: "S06_STUDENT", title: "Trabajo Permitido", status: "locked", icon: "route", description: "Simula horas de trabajo, presupuesto mensual y riesgo de depender demasiado del empleo." },
    ],
    working_holiday: [
      { id: "S01", title: "Escenario WHM", status: "current", icon: "target", description: "Resume pasaporte, edad, fondos, objetivo de viaje y subclass probable." },
      { id: "S02_WHM", title: "Elegibilidad WHM", status: "current", icon: "passport", description: "Simula edad, pasaporte, subclass 417/462, cupo, ballot y requisitos adicionales." },
      { id: "S03_WHM", title: "Presupuesto de Llegada", status: "locked", icon: "wallet", description: "Simula vuelo, hostel, comida, transporte y semanas sin trabajo." },
      { id: "S04_WHM", title: "Trabajo Inicial", status: "locked", icon: "file", description: "Simula opciones de trabajo casual, RSA, White Card, CV y ciudades probables." },
      { id: "S05_WHM", title: "Segundo Año", status: "locked", icon: "map", description: "Simula specified work, zonas regionales y estrategia para extender estadía." },
      { id: "S06_WHM", title: "Riesgos WHM", status: "locked", icon: "alert", description: "Revisa cupos, condiciones de trabajo, fondos bajos y planes de salida." },
    ],
    working_holiday_check: [
      { id: "S01", title: "Escenario WHM", status: "current", icon: "target", description: "Resume pasaporte, edad, fondos, objetivo de viaje y subclass probable." },
      { id: "S02_WHM", title: "Elegibilidad WHM", status: "current", icon: "passport", description: "Simula edad, pasaporte, subclass 417/462, cupo, ballot y requisitos adicionales." },
      { id: "S03_WHM", title: "Presupuesto de Llegada", status: "locked", icon: "wallet", description: "Simula vuelo, hostel, comida, transporte y semanas sin trabajo." },
      { id: "S04_WHM", title: "Trabajo Inicial", status: "locked", icon: "file", description: "Simula opciones de trabajo casual, RSA, White Card, CV y ciudades probables." },
      { id: "S05_WHM", title: "Segundo Año", status: "locked", icon: "map", description: "Simula specified work, zonas regionales y estrategia para extender estadía." },
      { id: "S06_WHM", title: "Riesgos WHM", status: "locked", icon: "alert", description: "Revisa cupos, condiciones de trabajo, fondos bajos y planes de salida." },
    ],
    visitor: [
      { id: "S01", title: "Escenario Visitor", status: "current", icon: "target", description: "Resume propósito de visita, fechas, fondos, alojamiento y plan de salida." },
      { id: "S02_VISITOR", title: "Presupuesto de Visita", status: "current", icon: "wallet", description: "Simula alojamiento, comida, transporte, seguro, actividades y margen de salida." },
      { id: "S03_VISITOR", title: "Propósito y Vínculos", status: "locked", icon: "file", description: "Revisa propósito de visita, vínculos de retorno y documentos de soporte." },
      { id: "S04_VISITOR", title: "Condiciones de No Trabajo", status: "locked", icon: "alert", description: "Simula riesgos si el usuario planea trabajar o depender de ingresos en Australia." },
    ],
    employer_sponsored: [
      { id: "S01", title: "Escenario Employer", status: "current", icon: "target", description: "Resume empleador, ocupación, salario, experiencia y ruta de sponsorship." },
      { id: "S02_EMPLOYER", title: "Sponsor Readiness", status: "current", icon: "file", description: "Simula si el empleador, puesto, salario y ocupación parecen listos para revisión." },
      { id: "S03_EMPLOYER", title: "Evidencia Laboral", status: "locked", icon: "checklist", description: "Ordena contrato, funciones, experiencia, payslips y documentos de soporte." },
      { id: "S04_EMPLOYER", title: "Riesgo de Patrocinio", status: "locked", icon: "alert", description: "Revisa riesgos de negocio pequeño, salario, rol creado para visa o falta de historial." },
    ],
    partner: [
      { id: "S01", title: "Escenario Partner", status: "current", icon: "target", description: "Resume relación, sponsor, convivencia, fechas y evidencia disponible." },
      { id: "S02_PARTNER", title: "Fuerza de Evidencia", status: "current", icon: "checklist", description: "Simula evidencia financiera, social, doméstica y compromiso de la relación." },
      { id: "S03_PARTNER", title: "Línea de Tiempo", status: "locked", icon: "route", description: "Ordena fechas, convivencia, viajes, separación temporal y eventos clave." },
      { id: "S04_PARTNER", title: "Riesgos Partner", status: "locked", icon: "alert", description: "Revisa relación corta, poca evidencia, sponsor complejo o historial migratorio difícil." },
    ],
    graduate: [
      { id: "S01", title: "Escenario Graduate", status: "current", icon: "target", description: "Resume estudios australianos, fechas, stream probable, inglés y seguro." },
      { id: "S02_GRAD", title: "Elegibilidad 485", status: "current", icon: "file", description: "Simula requisitos base, fechas, curso, inglés y documentos críticos." },
      { id: "S03_GRAD", title: "Plan Post-Estudio", status: "locked", icon: "route", description: "Compara trabajo, skilled, employer sponsored o estudio adicional después del 485." },
      { id: "S04_GRAD", title: "Riesgos de Fecha", status: "locked", icon: "alert", description: "Revisa expiración de visa, fecha de completion, AFP, inglés y cobertura de salud." },
    ],
    current_visa_review: [
      { id: "S01", title: "Escenario Visa Actual", status: "current", icon: "target", description: "Resume visa actual, vencimiento, condiciones, restricciones y solicitud pendiente." },
      { id: "S02_CURRENT", title: "Condiciones y Fechas", status: "current", icon: "alert", description: "Simula riesgo por vencimiento, work limitations, study limitations o condiciones críticas." },
      { id: "S03_CURRENT", title: "Siguiente Visa", status: "locked", icon: "route", description: "Compara si conviene cambiar a Student, WHM, Skilled, Employer o Visitor según tu caso." },
      { id: "S04_CURRENT", title: "Plan de Contingencia", status: "locked", icon: "checklist", description: "Ordena acciones si hay poco tiempo, documentos faltantes o riesgo de error." },
    ],
  };

  return routeMissions[routeId] || generic;
}

function getSimulatorDefaultMissionId(selectedRoute) {
  const routeId = selectedRoute?.id || "generic";
  if (routeId === "skilled") return "S02";
  if (routeId === "student") return "S02_STUDENT";
  if (routeId === "working_holiday" || routeId === "working_holiday_check") return "S02_WHM";
  if (routeId === "visitor") return "S02_VISITOR";
  if (routeId === "employer_sponsored") return "S02_EMPLOYER";
  if (routeId === "partner") return "S02_PARTNER";
  if (routeId === "graduate") return "S02_GRAD";
  if (routeId === "current_visa_review") return "S02_CURRENT";
  return "S01";
}

const arrivalMissionData = [
  {
    id: "A01",
    title: "Boletos y Fechas",
    status: "current",
    icon: "plane",
    description: "Compara fechas, aeropuertos y reglas básicas para encontrar vuelos más convenientes.",
  },
  {
    id: "A02",
    title: "Equipaje Inteligente",
    status: "locked",
    icon: "backpack",
    description: "Define qué llevar, qué no llevar y cómo preparar documentos para el viaje.",
  },
  {
    id: "A03",
    title: "Llegada al Aeropuerto",
    status: "locked",
    icon: "map",
    description: "Prepara migración, transporte inicial y primeras decisiones al aterrizar.",
  },
  {
    id: "A04",
    title: "SIM, Apps y Banco",
    status: "locked",
    icon: "wallet",
    description: "Configura internet, herramientas básicas, banco y pagos iniciales.",
  },
  {
    id: "A05",
    title: "TFN / ABN",
    status: "locked",
    icon: "file",
    description: "Ordena trámites básicos de trabajo según tu situación y ruta.",
  },
  {
    id: "A06",
    title: "Primera Semana",
    status: "locked",
    icon: "checklist",
    description: "Plan de supervivencia para alojamiento, transporte, comida y búsqueda inicial.",
  },
];

const officialSources = {
  skilledOccupationList: {
    label: "Department of Home Affairs · Skilled Occupation List",
    url: "https://immi.homeaffairs.gov.au/visas/working-in-australia/skill-occupation-list",
  },
  coreSkillsOccupationList: {
    label: "Department of Home Affairs · Core Skills Occupation List",
    url: "https://immi.homeaffairs.gov.au/Documents/core-sol.pdf",
  },
  studentVisa: {
    label: "Department of Home Affairs · Student visa subclass 500",
    url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500",
  },
  visitorVisa: {
    label: "Department of Home Affairs · Visitor visa subclass 600",
    url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/visitor-600",
  },
  workingHolidayVisa: {
    label: "Department of Home Affairs · Working Holiday Maker visas",
    url: "https://immi.homeaffairs.gov.au/what-we-do/whm-program",
  },
  workingHoliday417: {
    label: "Department of Home Affairs · Working Holiday visa subclass 417",
    url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/work-holiday-417/first-working-holiday-417",
  },
  workHoliday462: {
    label: "Department of Home Affairs · Work and Holiday visa subclass 462",
    url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/work-holiday-462/first-work-holiday-462",
  },
  whmCountryCaps: {
    label: "Department of Home Affairs · WHM country caps status",
    url: "https://immi.homeaffairs.gov.au/what-we-do/whm-program/status-of-country-caps",
  },
  skilledVisas: {
    label: "Department of Home Affairs · Skilled visas",
    url: "https://immi.homeaffairs.gov.au/visas/working-in-australia/skillselect",
  },
  employerSponsored: {
    label: "Department of Home Affairs · Employer sponsored visas",
    url: "https://immi.homeaffairs.gov.au/visas/working-in-australia/visas-for-workers/employer-sponsored-visas",
  },
  partnerVisa: {
    label: "Department of Home Affairs · Partner visas",
    url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/partner-onshore",
  },
  graduateVisa: {
    label: "Department of Home Affairs · Temporary Graduate visa subclass 485",
    url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/temporary-graduate-485",
  },
  visaFinder: {
    label: "Department of Home Affairs · Visa Finder",
    url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-finder",
  },
  visaPricing: {
    label: "Department of Home Affairs · Visa Pricing Estimator",
    url: "https://immi.homeaffairs.gov.au/visas/visa-pricing-estimator",
  },
  studyAustraliaCost: {
    label: "Study Australia · Living and education costs",
    url: "https://www.studyaustralia.gov.au/en/life-in-australia/living-and-education-costs",
  },
  documentChecklist: {
    label: "Department of Home Affairs · Document Checklist Tool",
    url: "https://immi.homeaffairs.gov.au/visas/web-evidentiary-tool",
  },
  cricos: {
    label: "Australian Government · CRICOS official provider and course search",
    url: "https://cricos.education.gov.au/",
  },
  omara: {
    label: "Office of the Migration Agents Registration Authority · Find a registered migration agent",
    url: "https://www.mara.gov.au/",
  },
};

const passportOptions = [
  "México",
  "Argentina",
  "Chile",
  "Colombia",
  "Perú",
  "Uruguay",
  "España",
  "Italia",
  "Francia",
  "Alemania",
  "Reino Unido",
  "Estados Unidos",
  "Canadá",
  "Japón",
  "Corea del Sur",
  "Taiwán",
  "Hong Kong",
  "Brasil",
  "Ecuador",
  "Bolivia",
  "Paraguay",
  "Costa Rica",
  "Otro / no aparece en la lista",
];

const whmPassportData = {
  "Argentina": { subclass: "462", ageLimit: "18 a 30", capStatus: "open", cap: "3,400" },
  "Austria": { subclass: "462", ageLimit: "18 a 30", capStatus: "open", cap: "500" },
  "Brasil": { subclass: "462", ageLimit: "18 a 30", capStatus: "paused", cap: "500" },
  "Chile": { subclass: "462", ageLimit: "18 a 30", capStatus: "open", cap: "3,400" },
  "China": { subclass: "462", ageLimit: "18 a 30", capStatus: "ballot", cap: "5,000" },
  "República Checa": { subclass: "462", ageLimit: "18 a 30", capStatus: "open", cap: "500" },
  "Ecuador": { subclass: "462", ageLimit: "18 a 30", capStatus: "open", cap: "100" },
  "Grecia": { subclass: "462", ageLimit: "18 a 30", capStatus: "open", cap: "500" },
  "Hungría": { subclass: "462", ageLimit: "18 a 30", capStatus: "open", cap: "500" },
  "India": { subclass: "462", ageLimit: "18 a 30", capStatus: "ballot", cap: "1,000" },
  "Indonesia": { subclass: "462", ageLimit: "18 a 30", capStatus: "open", cap: "5,000" },
  "Israel": { subclass: "462", ageLimit: "18 a 30", capStatus: "open", cap: "2,500" },
  "Luxemburgo": { subclass: "462", ageLimit: "18 a 30", capStatus: "open", cap: "100" },
  "Malasia": { subclass: "462", ageLimit: "18 a 30", capStatus: "closed", cap: "1,100" },
  "Mongolia": { subclass: "462", ageLimit: "18 a 30", capStatus: "closed", cap: "100" },
  "Papúa Nueva Guinea": { subclass: "462", ageLimit: "18 a 30", capStatus: "open", cap: "100" },
  "Perú": { subclass: "462", ageLimit: "18 a 30", capStatus: "open", cap: "1,500" },
  "Polonia": { subclass: "462", ageLimit: "18 a 30", capStatus: "open", cap: "1,500" },
  "Portugal": { subclass: "462", ageLimit: "18 a 30", capStatus: "closed", cap: "500" },
  "San Marino": { subclass: "462", ageLimit: "18 a 30", capStatus: "open", cap: "100" },
  "Singapur": { subclass: "462", ageLimit: "18 a 30", capStatus: "open", cap: "2,500" },
  "República Eslovaca": { subclass: "462", ageLimit: "18 a 30", capStatus: "open", cap: "1,000" },
  "Eslovenia": { subclass: "462", ageLimit: "18 a 30", capStatus: "open", cap: "200" },
  "España": { subclass: "462", ageLimit: "18 a 30", capStatus: "open", cap: "3,400" },
  "Suiza": { subclass: "462", ageLimit: "18 a 30", capStatus: "paused", cap: "200" },
  "Tailandia": { subclass: "462", ageLimit: "18 a 30", capStatus: "open", cap: "2,000" },
  "Türkiye": { subclass: "462", ageLimit: "18 a 30", capStatus: "open", cap: "100" },
  "Uruguay": { subclass: "462", ageLimit: "18 a 30", capStatus: "paused", cap: "200" },
  "Vietnam": { subclass: "462", ageLimit: "18 a 30", capStatus: "ballot", cap: "1,500" },
  "Estados Unidos": { subclass: "462", ageLimit: "18 a 30", capStatus: "not_capped", cap: "Sin cupo publicado en tabla de caps" },
  "Bélgica": { subclass: "417", ageLimit: "18 a 30", capStatus: "not_capped", cap: "Sin cupo" },
  "Canadá": { subclass: "417", ageLimit: "18 a 35", capStatus: "not_capped", cap: "Sin cupo" },
  "Chipre": { subclass: "417", ageLimit: "18 a 30", capStatus: "not_capped", cap: "Sin cupo" },
  "Dinamarca": { subclass: "417", ageLimit: "18 a 30", capStatus: "not_capped", cap: "Sin cupo" },
  "Estonia": { subclass: "417", ageLimit: "18 a 30", capStatus: "not_capped", cap: "Sin cupo" },
  "Finlandia": { subclass: "417", ageLimit: "18 a 30", capStatus: "not_capped", cap: "Sin cupo" },
  "Francia": { subclass: "417", ageLimit: "18 a 35", capStatus: "not_capped", cap: "Sin cupo" },
  "Alemania": { subclass: "417", ageLimit: "18 a 30", capStatus: "not_capped", cap: "Sin cupo" },
  "Hong Kong": { subclass: "417", ageLimit: "18 a 30", capStatus: "not_capped", cap: "Sin cupo" },
  "Irlanda": { subclass: "417", ageLimit: "18 a 35", capStatus: "not_capped", cap: "Sin cupo" },
  "Italia": { subclass: "417", ageLimit: "18 a 35", capStatus: "not_capped", cap: "Sin cupo" },
  "Japón": { subclass: "417", ageLimit: "18 a 30", capStatus: "not_capped", cap: "Sin cupo" },
  "Corea del Sur": { subclass: "417", ageLimit: "18 a 30", capStatus: "not_capped", cap: "Sin cupo" },
  "Malta": { subclass: "417", ageLimit: "18 a 30", capStatus: "not_capped", cap: "Sin cupo" },
  "Países Bajos": { subclass: "417", ageLimit: "18 a 30", capStatus: "not_capped", cap: "Sin cupo" },
  "Noruega": { subclass: "417", ageLimit: "18 a 30", capStatus: "not_capped", cap: "Sin cupo" },
  "Suecia": { subclass: "417", ageLimit: "18 a 30", capStatus: "not_capped", cap: "Sin cupo" },
  "Taiwán": { subclass: "417", ageLimit: "18 a 30", capStatus: "not_capped", cap: "Sin cupo" },
  "Reino Unido": { subclass: "417", ageLimit: "18 a 35", capStatus: "not_capped", cap: "Sin cupo" },
};

const countryAliases = {
  "Mexico": "México",
  "México": "México",
  "USA": "Estados Unidos",
  "United States": "Estados Unidos",
  "Estados Unidos": "Estados Unidos",
  "UK": "Reino Unido",
  "United Kingdom": "Reino Unido",
  "Reino Unido": "Reino Unido",
  "South Korea": "Corea del Sur",
  "Corea del Sur": "Corea del Sur",
  "Taiwan": "Taiwán",
  "Taiwán": "Taiwán",
  "Hong Kong": "Hong Kong",
  "Turkey": "Türkiye",
  "Turquía": "Türkiye",
  "Türkiye": "Türkiye",
  "Brazil": "Brasil",
  "Brasil": "Brasil",
  "Peru": "Perú",
  "Perú": "Perú",
  "Spain": "España",
  "España": "España",
  "France": "Francia",
  "Francia": "Francia",
  "Germany": "Alemania",
  "Alemania": "Alemania",
  "Italy": "Italia",
  "Italia": "Italia",
  "Canada": "Canadá",
  "Canadá": "Canadá",
  "Japan": "Japón",
  "Japón": "Japón",
  "Uruguay": "Uruguay",
  "Chile": "Chile",
  "Argentina": "Argentina",
  "Ecuador": "Ecuador",
};

const documentOptions = [
  "Pasaporte vigente",
  "CV / Resume",
  "Certificados de estudio",
  "Evidencia laboral",
  "Evidencia financiera",
  "Examen de inglés",
  "Traducciones oficiales",
  "Seguro / OSHC",
  "Ninguno todavía",
];

const inventoryItems = [
  { id: "passport", label: "Pasaporte vigente", category: "Identidad", recommendedFor: ["all"], sourceKey: "Pasaporte vigente" },
  { id: "cv", label: "CV / Resume actualizado", category: "Trabajo", recommendedFor: ["work", "migrate_long_term"], sourceKey: "CV / Resume" },
  { id: "education", label: "Certificados de estudio", category: "Estudios", recommendedFor: ["study", "migrate_long_term"], sourceKey: "Certificados de estudio" },
  { id: "employment", label: "Evidencia laboral", category: "Trabajo", recommendedFor: ["work", "migrate_long_term"], sourceKey: "Evidencia laboral" },
  { id: "financial", label: "Evidencia financiera", category: "Recursos", recommendedFor: ["all"], sourceKey: "Evidencia financiera" },
  { id: "english_test", label: "Examen de inglés", category: "Idioma", recommendedFor: ["study", "work", "migrate_long_term"], sourceKey: "Examen de inglés" },
  { id: "translations", label: "Traducciones oficiales", category: "Documentos", recommendedFor: ["study", "work", "migrate_long_term"], sourceKey: "Traducciones oficiales" },
  { id: "insurance", label: "Seguro / OSHC", category: "Salud", recommendedFor: ["study", "travel"], sourceKey: "Seguro / OSHC" },
  { id: "visa_status", label: "Estado migratorio / ImmiAccount / VEVO", category: "Visa", recommendedFor: ["inside", "extend_stay"] },
  { id: "route_notes", label: "Notas de ruta elegida", category: "Plan", recommendedFor: ["all"] },
];

const routeRequirementProfiles = {
  student: {
    title: "Student visa subclass 500",
    source: officialSources.studentVisa,
    note: "Home Affairs recomienda usar el Document Checklist Tool y revisar la lista de documentos generada en ImmiAccount.",
    items: [
      { id: "passport", label: "Pasaporte vigente", category: "Identidad", sourceKey: "Pasaporte vigente", detail: "Identidad y datos del solicitante." },
      { id: "coe", label: "Confirmation of Enrolment (CoE)", category: "Estudio", detail: "Evidencia de inscripción en un curso registrado." },
      { id: "gs_statement", label: "Evidencia Genuine Student", category: "Motivo", detail: "Explica intención de estudiar, circunstancias, historial y vínculos." },
      { id: "financial", label: "Evidencia financiera", category: "Recursos", sourceKey: "Evidencia financiera", detail: "Fondos para estudios, estadía y costos asociados." },
      { id: "english_test", label: "Evidencia de inglés si aplica", category: "Idioma", sourceKey: "Examen de inglés", detail: "Puede depender del proveedor, país y checklist oficial." },
      { id: "education", label: "Historial académico", category: "Estudios", sourceKey: "Certificados de estudio", detail: "Certificados, transcripts o evidencia de estudios previos." },
      { id: "insurance", label: "OSHC / seguro de salud", category: "Salud", sourceKey: "Seguro / OSHC", detail: "Seguro médico para estudiantes cuando corresponda." },
      { id: "translations", label: "Traducciones oficiales", category: "Documentos", sourceKey: "Traducciones oficiales", detail: "Para documentos que no estén en inglés, si aplica." },
    ],
  },
  visitor: {
    title: "Visitor visa subclass 600",
    source: officialSources.visitorVisa,
    note: "Los documentos dependen del stream, ubicación y situación personal.",
    items: [
      { id: "passport", label: "Pasaporte vigente", category: "Identidad", sourceKey: "Pasaporte vigente", detail: "Documento de identidad principal." },
      { id: "financial", label: "Fondos para la visita", category: "Recursos", sourceKey: "Evidencia financiera", detail: "Ejemplo: estados de cuenta recientes u otra evidencia de fondos." },
      { id: "visit_purpose", label: "Propósito de visita", category: "Motivo", detail: "Turismo, familia, crucero u otra razón de visita." },
      { id: "itinerary", label: "Itinerario o plan de viaje", category: "Plan", detail: "Fechas, alojamiento tentativo y actividades si aplica." },
      { id: "home_ties", label: "Vínculos con país de residencia", category: "Retorno", detail: "Trabajo, estudios, familia, bienes u otros vínculos." },
      { id: "invitation", label: "Carta de invitación si aplica", category: "Soporte", detail: "Útil si visitas familiares o amigos." },
    ],
  },
  working_holiday_417: {
    title: "Working Holiday visa subclass 417",
    source: officialSources.workingHoliday417,
    note: "La elegibilidad depende de pasaporte, edad y condiciones vigentes.",
    items: [
      { id: "passport", label: "Pasaporte elegible subclass 417", category: "Identidad", sourceKey: "Pasaporte vigente", detail: "Pasaporte de país o jurisdicción elegible." },
      { id: "age", label: "Edad dentro del rango permitido", category: "Elegibilidad", detail: "18 a 30, o hasta 35 para algunos pasaportes." },
      { id: "financial", label: "Fondos suficientes", category: "Recursos", sourceKey: "Evidencia financiera", detail: "Fondos para mantenerte inicialmente y salir de Australia si aplica." },
      { id: "health_character", label: "Salud y carácter si lo solicitan", category: "Revisión", detail: "Puede incluir exámenes, antecedentes u otra evidencia." },
      { id: "previous_whm", label: "Historial de WHM previo", category: "Visa", detail: "Importa si no es primera WHM." },
      { id: "route_notes", label: "Notas de condiciones WHM", category: "Plan", detail: "Incluye límite de trabajo por empleador y condiciones vigentes." },
    ],
  },
  working_holiday_462: {
    title: "Work and Holiday visa subclass 462",
    source: officialSources.workHoliday462,
    note: "Subclass 462 puede tener requisitos extra como educación, inglés, carta de apoyo o ballot según país.",
    items: [
      { id: "passport", label: "Pasaporte elegible subclass 462", category: "Identidad", sourceKey: "Pasaporte vigente", detail: "Pasaporte de país elegible para subclass 462." },
      { id: "age", label: "Edad 18 a 30", category: "Elegibilidad", detail: "Rango general de edad para primera Work and Holiday 462." },
      { id: "financial", label: "Fondos suficientes", category: "Recursos", sourceKey: "Evidencia financiera", detail: "Fondos iniciales y posible evidencia para salida de Australia." },
      { id: "education", label: "Evidencia de estudios si aplica", category: "Estudios", sourceKey: "Certificados de estudio", detail: "Algunos países requieren cierto nivel educativo." },
      { id: "english_test", label: "Inglés funcional si aplica", category: "Idioma", sourceKey: "Examen de inglés", detail: "Puede requerirse evidencia de inglés para algunos pasaportes." },
      { id: "support_letter", label: "Carta de apoyo gubernamental si aplica", category: "Soporte", detail: "Algunos países pueden requerir carta de apoyo." },
      { id: "ballot", label: "Ballot / pre-aplicación si aplica", category: "Cupo", detail: "Algunos países usan proceso de ballot antes de aplicar." },
      { id: "health_character", label: "Salud y carácter si lo solicitan", category: "Revisión", detail: "Puede incluir exámenes, antecedentes u otra evidencia." },
    ],
  },
  skilled: {
    title: "Skilled pathway",
    source: officialSources.skilledVisas,
    note: "Las rutas skilled dependen de ocupación, SkillSelect, puntos, inglés y evaluación de habilidades.",
    items: [
      { id: "passport", label: "Pasaporte vigente", category: "Identidad", sourceKey: "Pasaporte vigente", detail: "Identidad del aplicante." },
      { id: "occupation", label: "Ocupación y código ANZSCO", category: "Ocupación", detail: "Debe relacionarse con una lista aplicable." },
      { id: "skills_assessment", label: "Skills assessment", category: "Evaluación", detail: "Evaluación de habilidades por autoridad correspondiente." },
      { id: "english_test", label: "Examen de inglés", category: "Idioma", sourceKey: "Examen de inglés", detail: "Evidencia de nivel de inglés según ruta." },
      { id: "employment", label: "Evidencia laboral", category: "Trabajo", sourceKey: "Evidencia laboral", detail: "Cartas, contratos, funciones, payslips u otra evidencia." },
      { id: "education", label: "Títulos y certificados", category: "Estudios", sourceKey: "Certificados de estudio", detail: "Evidencia académica relevante." },
      { id: "eoi", label: "EOI / SkillSelect", category: "Proceso", detail: "Expression of Interest si aplica." },
      { id: "translations", label: "Traducciones oficiales", category: "Documentos", sourceKey: "Traducciones oficiales", detail: "Para documentos que no estén en inglés." },
    ],
  },
  employer_sponsored: {
    title: "Employer Sponsored",
    source: officialSources.employerSponsored,
    note: "Esta ruta depende de empleador, nominación, ocupación y requisitos de visa específicos.",
    items: [
      { id: "passport", label: "Pasaporte vigente", category: "Identidad", sourceKey: "Pasaporte vigente", detail: "Identidad del aplicante." },
      { id: "employer", label: "Empleador dispuesto a patrocinar", category: "Empleador", detail: "Elemento central de esta ruta." },
      { id: "nomination", label: "Nominación del empleador", category: "Proceso", detail: "Puede requerirse según la visa." },
      { id: "employment", label: "Evidencia laboral", category: "Trabajo", sourceKey: "Evidencia laboral", detail: "Experiencia, funciones y trayectoria." },
      { id: "cv", label: "CV / Resume actualizado", category: "Trabajo", sourceKey: "CV / Resume", detail: "Perfil laboral para empleador y solicitud." },
      { id: "english_test", label: "Inglés si aplica", category: "Idioma", sourceKey: "Examen de inglés", detail: "Depende de la visa y ocupación." },
      { id: "qualifications", label: "Calificaciones / licencias", category: "Ocupación", detail: "Títulos, licencias o registros profesionales si aplican." },
    ],
  },
  partner: {
    title: "Partner visa",
    source: officialSources.partnerVisa,
    note: "La evidencia se centra en la relación, sponsor e identidad de las partes.",
    items: [
      { id: "passport", label: "Pasaporte vigente", category: "Identidad", sourceKey: "Pasaporte vigente", detail: "Identidad del aplicante." },
      { id: "sponsor", label: "Documentos del sponsor", category: "Sponsor", detail: "Identidad, estatus y elegibilidad del sponsor." },
      { id: "relationship", label: "Evidencia de relación", category: "Relación", detail: "Evidencia financiera, social, doméstica y compromiso." },
      { id: "statements", label: "Declaraciones personales", category: "Relación", detail: "Historia de la relación y contexto." },
      { id: "character", label: "Documentos de carácter", category: "Revisión", detail: "Antecedentes u otra evidencia si se solicita." },
      { id: "translations", label: "Traducciones oficiales", category: "Documentos", sourceKey: "Traducciones oficiales", detail: "Para documentos que no estén en inglés." },
    ],
  },
  graduate: {
    title: "Temporary Graduate visa subclass 485",
    source: officialSources.graduateVisa,
    note: "Esta ruta depende de estudios australianos, fechas, stream, inglés y requisitos vigentes.",
    items: [
      { id: "passport", label: "Pasaporte vigente", category: "Identidad", sourceKey: "Pasaporte vigente", detail: "Identidad del aplicante." },
      { id: "australian_study", label: "Evidencia de estudios en Australia", category: "Estudios", sourceKey: "Certificados de estudio", detail: "Finalización y detalles del curso." },
      { id: "english_test", label: "Examen de inglés", category: "Idioma", sourceKey: "Examen de inglés", detail: "Evidencia de inglés según requisitos vigentes." },
      { id: "afp", label: "AFP check si aplica", category: "Carácter", detail: "Requisito común en esta ruta; confirmar vigencia." },
      { id: "insurance", label: "Seguro de salud", category: "Salud", sourceKey: "Seguro / OSHC", detail: "Cobertura de salud adecuada." },
      { id: "visa_status", label: "Visa actual y fechas", category: "Visa", detail: "Condiciones, expiración y elegibilidad temporal." },
    ],
  },
  current_visa_review: {
    title: "Revisión de visa actual",
    source: officialSources.visaFinder,
    note: "Antes de cambiar de ruta, conviene entender condiciones, expiración y restricciones de la visa actual.",
    items: [
      { id: "passport", label: "Pasaporte vigente", category: "Identidad", sourceKey: "Pasaporte vigente", detail: "Identidad del aplicante." },
      { id: "grant_notice", label: "Visa grant notice", category: "Visa", detail: "Documento de concesión de visa." },
      { id: "vevo", label: "VEVO / condiciones actuales", category: "Visa", detail: "Condiciones, expiración y derechos actuales." },
      { id: "immiaccount", label: "ImmiAccount / solicitudes pendientes", category: "Proceso", detail: "Estado de trámites y comunicaciones oficiales." },
      { id: "route_notes", label: "Notas de condiciones críticas", category: "Plan", detail: "Fechas, restricciones y alertas." },
    ],
  },
};

const studentStudyAreas = [
  { id: "english", label: "Inglés / ELICOS", search: "English language", note: "Útil si la prioridad inicial es mejorar inglés antes de estudiar otra cosa." },
  { id: "vet", label: "VET / cursos vocacionales", search: "Certificate Diploma", note: "Puede incluir certificados, diplomas y áreas prácticas como hospitality, business, trades o community services." },
  { id: "higher_ed", label: "Higher Education", search: "Bachelor Master", note: "Universidades y proveedores de educación superior." },
  { id: "business", label: "Business / Management", search: "Business Management", note: "Área común para estudiantes que buscan una ruta académica general." },
  { id: "it", label: "IT / Technology", search: "Information Technology", note: "Útil si el usuario quiere conectar estudio con perfil técnico." },
  { id: "health", label: "Health / Community", search: "Health Community Services", note: "Área sensible: revisar requisitos, prácticas, registro profesional e inglés." },
  { id: "hospitality", label: "Hospitality / Cookery", search: "Hospitality Commercial Cookery", note: "Área práctica; revisar campus, duración, costos y calidad del proveedor." },
];

const skilledWorkCategories = [
  { id: "health_care", label: "Salud y cuidado", examples: "Nursing, medicina, fisioterapia, aged care", priority: ["work", "migrate_long_term"] },
  { id: "education", label: "Educación", examples: "Early childhood, secondary teacher, special needs", priority: ["study", "migrate_long_term"] },
  { id: "engineering", label: "Ingeniería", examples: "Civil, mechanical, electrical, technologist", priority: ["work", "migrate_long_term"] },
  { id: "technology_it", label: "Tecnología / IT", examples: "Software, cybersecurity, ICT business analyst", priority: ["work", "migrate_long_term", "study"] },
  { id: "construction_trades", label: "Construcción y trades", examples: "Carpentry, plumbing, welding, electrician", priority: ["work", "migrate_long_term"] },
  { id: "hospitality_tourism", label: "Hospitalidad y turismo", examples: "Chef, cook, hotel manager, tourism", priority: ["work", "study", "travel"] },
  { id: "agriculture_animals", label: "Agricultura y animales", examples: "Farm, dairy, aquaculture, livestock", priority: ["work", "travel"] },
  { id: "business_finance", label: "Negocios, administración y finanzas", examples: "Accounting, finance, HR, corporate services", priority: ["work", "migrate_long_term", "study"] },
  { id: "marketing_comms", label: "Marketing, ventas y comunicación", examples: "Marketing, advertising, PR, sales", priority: ["work", "study"] },
  { id: "community_social", label: "Comunidad y servicios sociales", examples: "Social work, welfare, counselling, youth work", priority: ["work", "migrate_long_term", "study"] },
  { id: "science_environment", label: "Ciencia y medio ambiente", examples: "Laboratory, environmental, life sciences", priority: ["work", "migrate_long_term", "study"] },
  { id: "transport_logistics", label: "Transporte y logística", examples: "Supply, distribution, transport operations", priority: ["work"] },
  { id: "legal_government", label: "Legal y gobierno", examples: "Solicitor, legal roles, policy roles", priority: ["work", "migrate_long_term"] },
  { id: "design_architecture", label: "Diseño, arquitectura y creatividad", examples: "Architecture, landscape, design, multimedia", priority: ["work", "study"] },
  { id: "other", label: "Otro", examples: "Escribe tu ocupación o área", priority: ["work", "study", "travel", "migrate_long_term", "extend_stay", "explore"] },
];

function Icon({ type, className = "", size = 22 }) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    "aria-hidden": "true",
  };

  const icons = {
    home: (
      <svg {...props}>
        <path d="M3 11 12 3l9 8" />
        <path d="M5 10v10h14V10" />
        <path d="M9 20v-6h6v6" />
      </svg>
    ),
    map: (
      <svg {...props}>
        <path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2Z" />
        <path d="M9 4v14" />
        <path d="M15 6v14" />
      </svg>
    ),
    route: (
      <svg {...props}>
        <circle cx="6" cy="6" r="2" />
        <circle cx="18" cy="18" r="2" />
        <path d="M8 6h5a3 3 0 0 1 0 6h-2a3 3 0 0 0 0 6h5" />
      </svg>
    ),
    checklist: (
      <svg {...props}>
        <path d="M8 6h13" />
        <path d="M8 12h13" />
        <path d="M8 18h13" />
        <path d="m3 6 1 1 2-2" />
        <path d="m3 12 1 1 2-2" />
        <path d="m3 18 1 1 2-2" />
      </svg>
    ),
    user: (
      <svg {...props}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </svg>
    ),
    lock: (
      <svg {...props}>
        <rect x="5" y="10" width="14" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </svg>
    ),
    check: (
      <svg {...props}>
        <path d="M20 6 9 17l-5-5" />
      </svg>
    ),
    alert: (
      <svg {...props}>
        <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
    ),
    info: (
      <svg {...props}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
    ),
    star: (
      <svg {...props} fill="currentColor" stroke="none">
        <path d="m12 2 2.9 6.1 6.7.9-4.9 4.7 1.2 6.6L12 17.1l-5.9 3.2 1.2-6.6L2.4 9l6.7-.9Z" />
      </svg>
    ),
    menu: (
      <svg {...props}>
        <path d="M4 6h16" />
        <path d="M4 12h16" />
        <path d="M4 18h16" />
      </svg>
    ),
    compass: (
      <svg {...props}>
        <circle cx="12" cy="12" r="10" />
        <path d="m16 8-3 7-5 1 3-7Z" />
      </svg>
    ),
    target: (
      <svg {...props}>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4" />
        <path d="M12 18v4" />
        <path d="M2 12h4" />
        <path d="M18 12h4" />
      </svg>
    ),
    plane: (
      <svg {...props}>
        <path d="M22 2 11 13" />
        <path d="m22 2-7 20-4-9-9-4Z" />
      </svg>
    ),
    backpack: (
      <svg {...props}>
        <path d="M8 7V5a4 4 0 0 1 8 0v2" />
        <rect x="5" y="7" width="14" height="14" rx="2" />
        <path d="M9 13h6" />
        <path d="M9 17h6" />
      </svg>
    ),
    file: (
      <svg {...props}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6" />
        <path d="M8 13h8" />
        <path d="M8 17h5" />
      </svg>
    ),
    wallet: (
      <svg {...props}>
        <rect x="3" y="6" width="18" height="14" rx="2" />
        <path d="M16 10h5v6h-5a3 3 0 0 1 0-6Z" />
        <path d="M7 6V4h10v2" />
      </svg>
    ),
    passport: (
      <svg {...props}>
        <rect x="6" y="3" width="12" height="18" rx="1" />
        <circle cx="12" cy="12" r="3" />
        <path d="M9 16h6" />
        <path d="M9 8h6" />
      </svg>
    ),
  };

  return icons[type] || icons.info;
}

function getMissionProgressState(answers = {}, missionProgress = {}) {
  const diagnosisCompleted = Boolean(answers.mainRisk);
  const m03Completed = Boolean(missionProgress.m03Completed);
  const m04Completed = Boolean(missionProgress.m04Completed);
  const m05Completed = Boolean(missionProgress.m05Completed);
  const m06Completed = Boolean(missionProgress.m06Completed);
  const m07Completed = Boolean(missionProgress.m07Completed);
  const m08Completed = Boolean(missionProgress.m08Completed);

  return missionData.map((mission) => {
    if (mission.id === "M01") {
      return { ...mission, status: "completed" };
    }

    if (mission.id === "M02") {
      return {
        ...mission,
        status: diagnosisCompleted ? "completed" : "current",
        description: diagnosisCompleted
          ? "Diagnóstico guardado. Puedes revisar riesgos y límites."
          : mission.description,
      };
    }

    if (mission.id === "M03") {
      return {
        ...mission,
        status: m03Completed ? "completed" : diagnosisCompleted ? "current" : "locked",
        description: m03Completed
          ? "Misión completada. Riesgos principales revisados."
          : diagnosisCompleted
            ? "Misión desbloqueada. Revisa riesgos antes de comparar rutas."
            : mission.description,
      };
    }

    if (mission.id === "M04") {
      return {
        ...mission,
        status: m04Completed ? "completed" : m03Completed || diagnosisCompleted ? "current" : "locked",
        description: m04Completed
          ? "Misión completada. Rutas iniciales exploradas."
          : m03Completed || diagnosisCompleted
            ? "Misión disponible. Compara rutas filtradas por tu diagnóstico."
            : mission.description,
      };
    }

    if (mission.id === "M05") {
      return {
        ...mission,
        status: m05Completed ? "completed" : m04Completed || diagnosisCompleted ? "current" : "locked",
        description: m05Completed
          ? "Misión completada. Caja inicial calculada."
          : m04Completed || diagnosisCompleted
            ? "Misión disponible. Calcula tu caja inicial y margen de supervivencia."
            : mission.description,
      };
    }

    if (mission.id === "M06") {
      return {
        ...mission,
        status: m06Completed ? "completed" : m05Completed ? "current" : "locked",
        description: m06Completed
          ? "Misión completada. Inventario base organizado."
          : m05Completed
            ? "Misión disponible. Organiza documentos y evidencias clave."
            : mission.description,
      };
    }

    if (mission.id === "M07") {
      return {
        ...mission,
        status: m07Completed ? "completed" : m06Completed ? "current" : "locked",
        description: m07Completed
          ? "Misión completada. Plan de acción generado."
          : m06Completed
            ? "Misión disponible. Convierte tu diagnóstico en próximos pasos."
            : mission.description,
      };
    }

    if (mission.id === "M08") {
      return {
        ...mission,
        status: m08Completed ? "completed" : m07Completed ? "current" : "locked",
        description: m08Completed
          ? "Misión completada. Fuentes oficiales revisadas."
          : m07Completed
            ? "Misión disponible. Revisa las fuentes oficiales de tu ruta."
            : mission.description,
      };
    }

    return mission;
  });
}

function getPreparationProgress(missions) {
  const completed = missions.filter((mission) => mission.status === "completed").length;
  const currentBonus = missions.some((mission) => mission.status === "current") ? 0.5 : 0;
  return Math.round(((completed + currentBonus) / missions.length) * 100);
}

function getSelectedGoals(answers) {
  if (Array.isArray(answers.goals)) return answers.goals;
  if (answers.goal) return [answers.goal];
  return [];
}

const goalLabels = {
  study: "Estudiar",
  work: "Trabajar",
  travel: "Viajar",
  migrate_long_term: "Migrar a largo plazo",
  extend_stay: "Extender estadía",
  explore: "Explorar opciones",
  unsure: "No lo sé todavía",
};

const workExperienceLabels = {
  none: "No",
  less_1_year: "Menos de 1 año",
  "1_3_years": "1 a 3 años",
  "3_5_years": "3 a 5 años",
  more_5_years: "Más de 5 años",
};

const locationLabels = {
  outside: "Fuera de Australia",
  inside: "Dentro de Australia",
  soon: "Estoy por viajar",
  unsure: "Aún no lo tengo claro",
};

const visaStatusLabels = {
  yes: "Sí, tengo visa activa",
  no: "No tengo visa australiana activa",
  pending: "Estoy esperando respuesta",
  unsure: "No estoy seguro",
};

function getWorkCategoryLabel(categoryId, customValue = "") {
  if (customValue) return customValue;
  const category = skilledWorkCategories.find((item) => item.id === categoryId);
  return category?.label || categoryId || "No registrada";
}

function getGoalLabel(goal) {
  return goalLabels[goal] || goal;
}

function getWorkExperienceLabel(value) {
  return workExperienceLabels[value] || value || "No registrada";
}

function getLocationLabel(value) {
  return locationLabels[value] || value || "No registrada";
}

function getVisaStatusLabel(value) {
  return visaStatusLabels[value] || value || "No registrada";
}

function hasGoal(answers, goal) {
  return getSelectedGoals(answers).includes(goal);
}

function hasAnyGoal(answers, goals) {
  return goals.some((goal) => hasGoal(answers, goal));
}

function getDynamicWorkCategories(answers) {
  const goals = getSelectedGoals(answers);
  const goal = goals[0] || "explore";
  const experience = answers.workExperience || "";
  const lowExperience = experience === "none" || experience === "less_1_year";

  if (lowExperience || hasGoal(answers, "study")) {
    const studyFriendly = skilledWorkCategories.filter((category) => category.priority.includes("study") || category.id === "other");
    return studyFriendly.slice(0, 9);
  }

  if (hasAnyGoal(answers, ["work", "migrate_long_term"]) || experience === "more_5_years" || experience === "3_5_years") {
    const highIntent = skilledWorkCategories.filter((category) => category.priority.includes("work") || category.priority.includes("migrate_long_term") || category.id === "other");
    return highIntent;
  }

  return skilledWorkCategories.filter((category) => ["health_care", "education", "engineering", "technology_it", "construction_trades", "hospitality_tourism", "business_finance", "community_social", "other"].includes(category.id));
}

function getDiagnosisSummary(answers) {
  const locationMap = {
    outside: "fuera de Australia",
    inside: "dentro de Australia",
    soon: "por viajar",
    unsure: "sin ubicación definida",
  };

  const goalMap = {
    study: "estudiar",
    work: "trabajar",
    travel: "viajar",
    migrate_long_term: "migrar a largo plazo",
    extend_stay: "extender estadía",
    explore: "explorar opciones",
    unsure: "aclarar su objetivo",
  };
  const selectedGoals = getSelectedGoals(answers);
  const goalText = selectedGoals.length > 0 ? selectedGoals.map((goal) => goalMap[goal] || goal).join(" + ") : goalMap[answers.goal] || "entender tus opciones";

  const riskMap = {
    visa_confusion: "no saber qué visa revisar",
    budget: "presupuesto limitado",
    english: "nivel de inglés",
    documents: "documentos incompletos",
    mistake: "miedo a equivocarse",
    work: "conseguir trabajo",
    profile: "no saber si su perfil sirve",
    starting_point: "no saber por dónde empezar",
  };

  return {
    point: hasAnyGoal(answers, ["migrate_long_term", "work"]) ? "Explorador con intención laboral" : "Explorador inicial",
    situation: `Estás ${locationMap[answers.location] || "en etapa de exploración"} y tus objetivos son ${goalText}.`,
    risk: riskMap[answers.mainRisk] || "falta de claridad inicial",
    next: "M03 · Riesgos y Límites",
  };
}

function hasActiveAustralianVisa(answers) {
  return answers.hasVisa === "yes";
}

function functionallyHasVisaExpiryRisk(answers) {
  return hasActiveAustralianVisa(answers) && (answers.visaExpiry === "Menos de 30 días" || answers.visaExpiry === "1 a 3 meses");
}

function normalizeCountryName(country) {
  if (!country) return "";
  return countryAliases[country] || country;
}

function getPassportCandidates(answers) {
  const passports = [];
  const primary = answers.passport === "Otro / no aparece en la lista" ? answers.passportOther : answers.passport;
  const secondary = answers.secondPassportCountry === "Otro / no aparece en la lista" ? answers.secondPassportOther : answers.secondPassportCountry;

  if (primary) passports.push(normalizeCountryName(primary));
  if (answers.secondPassport === "yes" && secondary) passports.push(normalizeCountryName(secondary));

  return [...new Set(passports.filter(Boolean))];
}

function getWhmPassportMatches(answers) {
  return getPassportCandidates(answers).map((country) => ({
    country,
    eligible: Boolean(whmPassportData[country]),
    ...(whmPassportData[country] || {}),
  }));
}

function getBestWhmMatch(answers) {
  const matches = getWhmPassportMatches(answers).filter((match) => match.eligible);
  const priority = { open: 0, not_capped: 1, ballot: 2, paused: 3, closed: 4 };
  return matches.sort((a, b) => (priority[a.capStatus] ?? 9) - (priority[b.capStatus] ?? 9))[0] || null;
}

function getCapStatusLabel(status) {
  const labels = {
    open: "Abierto",
    paused: "Pausado",
    closed: "Cerrado",
    ballot: "Ballot / pre-aplicación",
    not_capped: "Sin cupo publicado",
  };
  return labels[status] || "Por verificar";
}

function getRouteRecommendation(routeId, answers = {}) {
  const recommendations = {
    current_visa_review: "personas que ya están en Australia y necesitan entender su situación antes de moverse a otra ruta.",
    student: "personas que quieren estudiar, ordenar su perfil y usar el estudio como ruta de preparación.",
    visitor: "personas que quieren explorar Australia, visitar o hacer reconocimiento inicial sin trabajar.",
    working_holiday: "personas jóvenes con pasaporte elegible que quieren viajar y trabajar temporalmente.",
    working_holiday_check: "personas con edad compatible que necesitan confirmar si su pasaporte tiene acuerdo WHM vigente.",
    skilled: "personas con experiencia comprobable, ocupación potencialmente evaluable e intención de migrar o trabajar a largo plazo.",
    employer_sponsored: "personas con experiencia laboral que podrían buscar un empleador dispuesto a patrocinar.",
    partner: "personas con una relación elegible que necesitan revisar una ruta familiar o de pareja.",
    graduate: "personas que estudiaron o estudian en Australia y quieren revisar opciones posteriores a sus estudios.",
    visa_finder: "personas que aún no tienen datos suficientes para priorizar una ruta específica.",
  };

  return recommendations[routeId] || "personas que necesitan explorar esta opción con más información oficial antes de decidir.";
}

function getRouteComparison(route) {
  const comparisons = {
    current_visa_review: {
      bestFor: "entender condiciones actuales antes de cambiar de estrategia.",
      advantages: ["Reduce errores por condiciones de visa", "Ayuda si ya estás dentro de Australia"],
      disadvantages: ["No es una ruta nueva por sí sola", "Depende de tu grant notice y fechas reales"],
    },
    student: {
      bestFor: "estudiar, mejorar perfil y construir una ruta con más estructura.",
      advantages: ["Ruta clara para estudiar", "Puede ordenar inglés, carrera y documentos"],
      disadvantages: ["Puede ser costosa", "Requiere propósito real, curso y evidencia financiera"],
    },
    visitor: {
      bestFor: "visitar, explorar o hacer reconocimiento sin intención de trabajar.",
      advantages: ["Más simple para visitas", "Útil para explorar antes de decidir"],
      disadvantages: ["No está pensada para trabajar", "No resuelve una estrategia laboral o migratoria"],
    },
    working_holiday: {
      bestFor: "viajar y trabajar temporalmente si edad y pasaporte encajan.",
      advantages: ["Permite experiencia inicial en Australia", "Flexible para viaje y trabajo temporal"],
      disadvantages: ["Depende mucho del pasaporte, edad, cupos y condiciones", "No todos los países aplican"],
    },
    working_holiday_check: {
      bestFor: "verificar si el pasaporte tiene acuerdo WHM antes de descartarlo.",
      advantages: ["Evita asumir elegibilidad incorrecta", "Sirve como revisión rápida"],
      disadvantages: ["No confirma ruta viable", "Necesita verificación oficial"],
    },
    skilled: {
      bestFor: "perfiles con ocupación, experiencia, inglés y posible evaluación de habilidades.",
      advantages: ["Puede conectar con migración a largo plazo", "Más fuerte si el perfil profesional encaja"],
      disadvantages: ["Compleja y exigente", "Requiere ocupación, puntos, inglés y skills assessment"],
    },
    employer_sponsored: {
      bestFor: "personas con experiencia que pueden conseguir empleador patrocinador.",
      advantages: ["Conecta directamente con empleo", "Puede ser fuerte si hay sponsor real"],
      disadvantages: ["Depende de un empleador", "La ocupación, salario y nominación importan mucho"],
    },
    partner: {
      bestFor: "personas con relación elegible y evidencia sólida.",
      advantages: ["Ruta familiar si la situación aplica", "Se centra en evidencia de relación"],
      disadvantages: ["No aplica sin relación elegible", "Puede requerir mucha evidencia personal"],
    },
    graduate: {
      bestFor: "personas que terminaron estudios elegibles en Australia.",
      advantages: ["Puede servir después de estudiar", "Conecta con experiencia australiana"],
      disadvantages: ["Depende del curso, fechas, stream y requisitos vigentes", "No aplica a todos los estudiantes"],
    },
    visa_finder: {
      bestFor: "casos donde todavía faltan datos para elegir ruta.",
      advantages: ["Evita forzar una ruta", "Sirve como punto de revisión"],
      disadvantages: ["Todavía no da plan específico", "Requiere completar más datos"],
    },
  };

  return comparisons[route.id] || {
    bestFor: "explorar una opción con más información oficial.",
    advantages: ["Puede servir como alternativa"],
    disadvantages: ["Requiere validación oficial"],
  };
}

function getProfessionalAdviceAssessment(route, answers = {}) {
  const routeId = route?.id || "";
  const reasons = [];
  let score = 0;

  if (!route) {
    return {
      level: "Medio",
      title: "Primero elige una ruta",
      summary: "Todavía no hay una visa o ruta seleccionada. Conviene elegir una ruta antes de decidir si necesitas asesoría profesional.",
      reasons: ["Sin ruta seleccionada no se puede evaluar complejidad."],
      action: "Selecciona una ruta en M04 y vuelve a revisar este bloque.",
    };
  }

  if (["partner", "skilled", "employer_sponsored"].includes(routeId)) {
    score += 3;
    reasons.push("La ruta depende de evidencia técnica, interpretación de requisitos o terceros como sponsor, empleador o autoridad evaluadora.");
  }

  if (routeId === "current_visa_review" && functionallyHasVisaExpiryRisk(answers)) {
    score += 3;
    reasons.push("Tu visa actual parece tener presión de tiempo; los errores por fechas o condiciones pueden ser costosos.");
  }

  if (routeId === "student") {
    if (answers.budget === "Menos de 2,000 AUD" || answers.budget === "2,000 a 5,000 AUD") {
      score += 2;
      reasons.push("La ruta Student puede volverse sensible si el presupuesto es ajustado o la evidencia financiera no es clara.");
    }
    if (answers.age && Number(answers.age) >= 35) {
      score += 1;
      reasons.push("Una edad mayor no bloquea por sí sola, pero puede exigir una explicación más coherente del propósito de estudio.");
    }
    if (answers.englishLevel === "Básico" || answers.englishLevel === "No lo sé") {
      score += 1;
      reasons.push("El inglés o la evidencia de idioma pueden afectar admisión, preparación y documentación.");
    }
  }

  if (routeId === "working_holiday_check") {
    score += 2;
    reasons.push("El pasaporte o la elegibilidad WHM no están claros; conviene confirmar antes de avanzar.");
  }

  if (routeId === "graduate") {
    score += 2;
    reasons.push("Temporary Graduate depende de estudios australianos, fechas, stream y requisitos vigentes.");
  }

  if (answers.hasVisa === "pending" || answers.hasVisa === "unsure") {
    score += 1;
    reasons.push("Tu estado migratorio actual no está completamente claro o depende de una solicitud en curso.");
  }

  if (answers.mainRisk === "mistake" || answers.mainRisk === "visa_confusion") {
    score += 1;
    reasons.push("Tu riesgo declarado indica confusión o miedo a equivocarte en el proceso.");
  }

  if (reasons.length === 0) {
    reasons.push("La ruta parece más manejable si tu caso es limpio, tus documentos son claros y verificas todo en fuentes oficiales.");
  }

  if (score >= 4) {
    return {
      level: "Alto",
      title: "Recomendable buscar apoyo profesional",
      summary: "Esta ruta puede ser compleja para tramitarla sin revisión profesional, especialmente si hay evidencia difícil, tiempos cortos o requisitos técnicos.",
      reasons,
      action: "Antes de pagar, aplicar o comprometerte, busca un abogado migratorio o agente migratorio registrado y verifica su registro.",
    };
  }

  if (score >= 2) {
    return {
      level: "Medio",
      title: "Considera una revisión profesional puntual",
      summary: "Podrías avanzar investigando por tu cuenta, pero conviene pedir revisión si algún requisito no está claro.",
      reasons,
      action: "Prepara preguntas concretas y considera una consulta puntual antes de aplicar.",
    };
  }

  return {
    level: "Bajo",
    title: "Podría ser manejable si el caso es limpio",
    summary: "La ruta puede ser más apta para revisión propia si cumples requisitos, tienes documentos claros y no hay historial migratorio complejo.",
    reasons,
    action: "Sigue fuentes oficiales, revisa checklist y no apliques si aparece una alerta nueva.",
  };
}

function getRouteSpecificCostAdjustments(routeId) {
  const profiles = {
    student: {
      course: 3500,
      insurance: 700,
      visa: 710,
      emergency: 1500,
    },
    visitor: {
      course: 0,
      insurance: 300,
      visa: 200,
      emergency: 1200,
    },
    working_holiday: {
      course: 0,
      insurance: 350,
      visa: 650,
      emergency: 1800,
    },
    working_holiday_check: {
      course: 0,
      insurance: 350,
      visa: 650,
      emergency: 1800,
    },
    skilled: {
      course: 0,
      insurance: 500,
      visa: 4500,
      emergency: 2500,
    },
    employer_sponsored: {
      course: 0,
      insurance: 500,
      visa: 3000,
      emergency: 2200,
    },
    partner: {
      course: 0,
      insurance: 500,
      visa: 9000,
      emergency: 2500,
    },
    graduate: {
      course: 0,
      insurance: 500,
      visa: 2000,
      emergency: 1800,
    },
    current_visa_review: {
      course: 0,
      insurance: 300,
      visa: 500,
      emergency: 1500,
    },
  };

  return profiles[routeId] || {};
}

function getInventoryProfileKey(selectedRoute) {
  const routeId = typeof selectedRoute === "string" ? selectedRoute : selectedRoute?.id || "";
  const routeTitle = typeof selectedRoute === "string" ? "" : selectedRoute?.title || "";

  if (routeId === "working_holiday") {
    if (routeTitle.includes("462")) return "working_holiday_462";
    if (routeTitle.includes("417")) return "working_holiday_417";
    return "working_holiday_462";
  }

  if (routeId === "working_holiday_check") return "working_holiday_462";
  return routeId;
}

function getRouteRequirementProfile(selectedRoute) {
  const key = getInventoryProfileKey(selectedRoute);
  return routeRequirementProfiles[key] || null;
}

function getRouteSpecificInventoryTags(selectedRoute) {
  const profile = getRouteRequirementProfile(selectedRoute);
  return profile ? profile.items.map((item) => item.id) : [];
}

function getFilteredRoutes(answers) {
  const age = Number(answers.age || 0);
  const hasExperience = ["1_3_years", "3_5_years", "more_5_years"].includes(answers.workExperience);
  const strongExperience = ["3_5_years", "more_5_years"].includes(answers.workExperience);
  const lowBudget = answers.budget === "Menos de 2,000 AUD" || answers.budget === "2,000 a 5,000 AUD" || answers.budget === "No lo sé";
  const insideAustralia = answers.location === "inside";
  const visaUrgent = functionallyHasVisaExpiryRisk(answers);
  const routes = [];

  if (insideAustralia && answers.hasVisa === "yes") {
    routes.push({
      id: "current_visa_review",
      title: "Revisión de visa actual",
      level: visaUrgent ? "Explorar ahora" : "Revisar con cuidado",
      reason: "Aparece porque ya indicaste que tienes una visa australiana activa.",
      missing: "Confirmar condiciones, fecha exacta de vencimiento y restricciones antes de pensar en otra ruta.",
      risk: visaUrgent ? "Tiempo limitado" : "Condiciones de visa actual",
      recommendedFor: getRouteRecommendation("current_visa_review", answers),
      source: officialSources.visaFinder,
    });
  }

  if (hasAnyGoal(answers, ["study", "migrate_long_term", "explore"])) {
    routes.push({
      id: "student",
      title: "Student visa",
      level: hasGoal(answers, "study") ? "Explorar ahora" : "Revisar con cuidado",
      reason: hasGoal(answers, "study") ? "Coincide con uno de tus objetivos: estudiar." : "Puede ser una ruta de entrada o preparación, pero requiere revisar costos y propósito real.",
      missing: "Curso, proveedor, presupuesto, evidencia financiera, requisitos GTE/GS y condiciones vigentes.",
      risk: lowBudget ? "Presupuesto" : "Costo y elección de curso",
      recommendedFor: getRouteRecommendation("student", answers),
      source: officialSources.studentVisa,
    });
  }

  if (hasAnyGoal(answers, ["travel", "explore"]) || answers.location === "outside") {
    routes.push({
      id: "visitor",
      title: "Visitor visa",
      level: hasGoal(answers, "travel") ? "Explorar ahora" : "Revisar con cuidado",
      reason: "Aparece como ruta de exploración o visita, especialmente si aún no hay una ruta principal definida.",
      missing: "Propósito de visita, fondos, vínculos con país de residencia y condiciones de estadía.",
      risk: "No es ruta para trabajar",
      recommendedFor: getRouteRecommendation("visitor", answers),
      source: officialSources.visitorVisa,
    });
  }

  if ((age >= 18 && age <= 35) && (hasAnyGoal(answers, ["travel", "work", "explore"]) || answers.location === "outside")) {
    const whmMatches = getWhmPassportMatches(answers);
    const bestWhmMatch = getBestWhmMatch(answers);
    const hasPassports = whmMatches.length > 0;

    if (bestWhmMatch) {
      const isAgeCompatible = bestWhmMatch.ageLimit.includes("35") ? age <= 35 : age <= 30;
      routes.push({
        id: "working_holiday",
        title: bestWhmMatch.subclass === "417" ? "Working Holiday visa subclass 417" : "Work and Holiday visa subclass 462",
        level: isAgeCompatible && ["open", "not_capped"].includes(bestWhmMatch.capStatus) ? "Explorar ahora" : "Revisar con cuidado",
        reason: `Aparece porque tu pasaporte ${bestWhmMatch.country} figura como compatible con WHM subclass ${bestWhmMatch.subclass}. Estado actual: ${getCapStatusLabel(bestWhmMatch.capStatus)}.`,
        missing: bestWhmMatch.subclass === "462"
          ? "Confirmar requisitos de educación, inglés, documentos, cupo/ballot si aplica y condiciones vigentes."
          : "Confirmar edad exacta, condiciones, documentos y requisitos vigentes de subclass 417.",
        risk: isAgeCompatible ? `Pasaporte ${bestWhmMatch.country}` : "Edad fuera de rango",
        source: bestWhmMatch.subclass === "417" ? officialSources.workingHoliday417 : officialSources.workHoliday462,
        secondarySource: bestWhmMatch.subclass === "462" ? officialSources.whmCountryCaps : officialSources.workingHolidayVisa,
        recommendedFor: getRouteRecommendation("working_holiday", answers),
        whmMatches,
      });
    } else if (hasPassports) {
      routes.push({
        id: "working_holiday_check",
        title: "Working Holiday Maker: pasaporte por verificar",
        level: "Ruta futura",
        reason: "Aparece por edad y objetivo de viaje/trabajo, pero el pasaporte seleccionado no aparece en el listado WHM cargado en la app.",
        missing: "Confirmar directamente en Home Affairs si tu pasaporte tiene acuerdo WHM vigente o si debes explorar otra ruta.",
        risk: "Pasaporte no encontrado",
        source: officialSources.workingHolidayVisa,
        recommendedFor: getRouteRecommendation("working_holiday_check", answers),
        whmMatches,
      });
    } else {
      routes.push({
        id: "working_holiday_check",
        title: "Working Holiday Maker: falta pasaporte",
        level: "Revisar con cuidado",
        reason: "Aparece por edad y objetivo de viaje/trabajo, pero falta seleccionar pasaporte para filtrar subclass 417 o 462.",
        missing: "Seleccionar pasaporte principal o segundo pasaporte en M02.",
        risk: "Falta pasaporte",
        source: officialSources.workingHolidayVisa,
        recommendedFor: getRouteRecommendation("working_holiday_check", answers),
        whmMatches,
      });
    }
  }

  if (hasAnyGoal(answers, ["work", "migrate_long_term"]) || strongExperience) {
    routes.push({
      id: "skilled",
      title: "Skilled pathway",
      level: strongExperience ? "Explorar ahora" : "Ruta futura",
      reason: strongExperience ? "Aparece porque indicaste experiencia laboral comprobable relevante." : "Puede servir a futuro si se confirma ocupación, experiencia, inglés y puntos.",
      missing: "Ocupación exacta, código ANZSCO, lista aplicable, autoridad evaluadora, inglés y puntos.",
      risk: answers.englishLevel === "Básico" ? "Inglés y ocupación" : "Ocupación y evaluación",
      recommendedFor: getRouteRecommendation("skilled", answers),
      source: officialSources.skilledVisas,
    });
  }

  if (hasGoal(answers, "work") || hasExperience || insideAustralia) {
    routes.push({
      id: "employer_sponsored",
      title: "Employer Sponsored",
      level: hasExperience ? "Revisar con cuidado" : "Ruta futura",
      reason: hasExperience ? "Aparece porque tienes experiencia laboral que podría ser relevante para un empleador." : "Puede ser ruta futura si existe empleador y ocupación compatible.",
      missing: "Empleador, ocupación, experiencia, salario, condiciones y requisitos específicos de la visa.",
      risk: "Necesita empleador",
      recommendedFor: getRouteRecommendation("employer_sponsored", answers),
      source: officialSources.employerSponsored,
    });
  }

  if (hasAnyGoal(answers, ["migrate_long_term", "extend_stay"])) {
    routes.push({
      id: "partner",
      title: "Partner visa",
      level: "Ruta futura",
      reason: "Aparece solo como ruta a considerar si existe una relación elegible. No se evalúa en este diagnóstico.",
      missing: "Relación elegible, evidencia, ubicación de aplicación y requisitos específicos.",
      risk: "Requiere situación personal específica",
      recommendedFor: getRouteRecommendation("partner", answers),
      source: officialSources.partnerVisa,
    });
  }

  if (insideAustralia && answers.currentVisa === "Student") {
    routes.push({
      id: "graduate",
      title: "Temporary Graduate visa",
      level: "Revisar con cuidado",
      reason: "Aparece porque indicaste Student visa activa. Puede ser relevante después de estudios elegibles.",
      missing: "Curso terminado, elegibilidad, edad, inglés, fechas y stream aplicable.",
      risk: "Depende del curso y reglas vigentes",
      recommendedFor: getRouteRecommendation("graduate", answers),
      source: officialSources.graduateVisa,
    });
  }

  if (routes.length === 0) {
    routes.push({
      id: "visa_finder",
      title: "Exploración general de visas",
      level: "Explorar ahora",
      reason: "Aparece porque aún faltan datos para priorizar rutas específicas.",
      missing: "Completar diagnóstico, objetivo, presupuesto, pasaporte, experiencia y ubicación.",
      risk: "Falta de información",
      recommendedFor: getRouteRecommendation("visa_finder", answers),
      source: officialSources.visaFinder,
    });
  }

  const priority = { "Explorar ahora": 0, "Revisar con cuidado": 1, "Ruta futura": 2 };
  return routes.sort((a, b) => priority[a.level] - priority[b.level]);
}

function parseAud(value) {
  const parsed = Number(String(value ?? "").replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatAud(value) {
  return `${Math.round(value).toLocaleString("en-AU")} AUD`;
}

function getBudgetNumberFromRange(budget) {
  const map = {
    "Menos de 2,000 AUD": 1500,
    "2,000 a 5,000 AUD": 3500,
    "5,000 a 10,000 AUD": 7500,
    "10,000 a 20,000 AUD": 15000,
    "Más de 20,000 AUD": 22000,
  };
  return map[budget] || 0;
}

function getDefaultInventory(answers = {}, selectedRoute = null) {
  const selectedDocs = Array.isArray(answers.documentsReady) ? answers.documentsReady : [];
  const profile = getRouteRequirementProfile(selectedRoute);

  if (profile) {
    return profile.items.map((item) => {
      const alreadySelected = item.sourceKey && selectedDocs.includes(item.sourceKey);
      return {
        ...item,
        needed: true,
        status: alreadySelected ? "ready" : "missing",
        notes: "",
        sourceLabel: profile.source?.label || "Fuente oficial",
        sourceUrl: profile.source?.url || "",
        profileTitle: profile.title,
        profileNote: profile.note,
      };
    });
  }

  const goals = getSelectedGoals(answers);

  return inventoryItems.map((item) => {
    const matchesGoal = item.recommendedFor.includes("all") || item.recommendedFor.some((tag) => goals.includes(tag)) || (item.recommendedFor.includes("inside") && answers.location === "inside");
    const alreadySelected = item.sourceKey && selectedDocs.includes(item.sourceKey);

    return {
      ...item,
      needed: Boolean(matchesGoal || alreadySelected),
      status: alreadySelected ? "ready" : matchesGoal ? "missing" : "optional",
      notes: "",
      detail: "Elemento base para organizar tu evidencia antes de revisar una ruta específica.",
    };
  });
}

function getInventoryProgress(inventory = []) {
  const needed = inventory.filter((item) => item.needed);
  if (needed.length === 0) return 0;
  const ready = needed.filter((item) => item.status === "ready").length;
  return Math.round((ready / needed.length) * 100);
}

function getInventoryStatusLabel(status) {
  const labels = {
    ready: "Listo",
    missing: "Falta",
    review: "Revisar",
    optional: "Opcional",
  };
  return labels[status] || "Revisar";
}

function getDefaultSurvivalCosts(answers = {}, selectedRouteId = "") {
  const wantsStudy = hasGoal(answers, "study");
  const wantsTravel = hasGoal(answers, "travel");
  const wantsWork = hasGoal(answers, "work");
  const routeCosts = getRouteSpecificCostAdjustments(selectedRouteId);

  return [
    { id: "visa", label: "Visa / aplicación", amount: routeCosts.visa ?? (wantsStudy ? 710 : 500), note: "Editable. Verifica tarifa oficial antes de aplicar." },
    { id: "flight", label: "Vuelo", amount: 1200, note: "Estimación inicial. Cambia según país y temporada." },
    { id: "rent", label: "Renta inicial", amount: 1200, note: "Primeras semanas de alojamiento." },
    { id: "bond", label: "Bond / depósito", amount: 1200, note: "Puede aplicar al rentar habitación o vivienda." },
    { id: "food", label: "Comida inicial", amount: 500, note: "Primeras semanas." },
    { id: "transport", label: "Transporte", amount: 250, note: "Movilidad inicial." },
    { id: "insurance", label: wantsStudy || selectedRouteId === "student" ? "OSHC / seguro" : "Seguro / salud", amount: routeCosts.insurance ?? (wantsStudy ? 650 : 250), note: "Depende de ruta y duración." },
    { id: "course", label: "Curso / matrícula inicial", amount: routeCosts.course ?? (wantsStudy ? 2500 : 0), note: selectedRouteId === "student" || wantsStudy ? "Visible porque estás explorando una ruta de estudio." : "Opcional si no estudiarás." },
    { id: "emergency", label: "Fondo de emergencia", amount: routeCosts.emergency ?? (wantsTravel || wantsWork ? 1500 : 1000), note: "Margen para imprevistos." },
  ];
}

function calculateSurvivalTotals(resources) {
  const available = parseAud(resources.availableBudget);
  const costs = Array.isArray(resources.costs) ? resources.costs : [];
  const total = costs.reduce((sum, item) => sum + parseAud(item.amount), 0);
  const difference = available - total;
  const ratio = total > 0 ? available / total : 0;

  let status = "Pendiente";
  let message = "Agrega tu presupuesto disponible para calcular tu margen.";

  if (available > 0 && total > 0) {
    if (ratio >= 1.15) {
      status = "Suficiente";
      message = "Tu presupuesto cubre el estimado inicial y deja algo de margen.";
    } else if (ratio >= 0.9) {
      status = "Justo";
      message = "Tu presupuesto está cerca del estimado. Conviene revisar costos reales y margen de emergencia.";
    } else {
      status = "Zona de riesgo";
      message = "Tu presupuesto queda por debajo del estimado. Ajusta ruta, costos o fecha objetivo.";
    }
  }

  return { available, total, difference, status, message };
}

function getStatusStyles(status) {
  if (status === "completed") {
    return {
      shell: "border-[#74f24d] bg-[#092414] text-[#dfffd7] shadow-[0_0_20px_rgba(116,242,77,0.26)]",
      badge: "border-[#74f24d] bg-[#153c19] text-[#74f24d] shadow-[0_0_18px_rgba(116,242,77,0.28)]",
      text: "text-[#74f24d]",
      dot: "bg-[#74f24d] shadow-[0_0_12px_rgba(116,242,77,0.95)]",
      label: "COMPLETADO ✦",
      statusIcon: "check",
    };
  }

  if (status === "current") {
    return {
      shell: "border-[#ffd15a] bg-[#150f05] text-[#fff1bd] shadow-[0_0_28px_rgba(255,209,90,0.42)]",
      badge: "border-[#ffd15a] bg-[#3a2505] text-[#ffd15a] shadow-[0_0_20px_rgba(255,209,90,0.44)]",
      text: "text-[#ff9f1c]",
      dot: "bg-[#ffb52e] shadow-[0_0_16px_rgba(255,181,46,1)]",
      label: "▶ EN CURSO ✦",
      statusIcon: "target",
    };
  }

  return {
    shell: "border-[#4a5568] bg-[#0b1422] text-[#d6d3ca] shadow-[0_5px_0_rgba(0,0,0,0.35)]",
    badge: "border-[#656f80] bg-[#111827] text-[#c9c3b5]",
    text: "text-[#b9b5aa]",
    dot: "bg-[#9ca3af]",
    label: "BLOQUEADO",
    statusIcon: "lock",
  };
}

function runSmokeTests() {
  const validStatuses = ["completed", "current", "locked"];
  const progress = getPreparationProgress(missionData);
  console.assert(missionData.length === 8, "Expected exactly 8 missions in the escape map.");
  console.assert(getSimulatorMissions({ id: "skilled" }).length === 6, "Expected exactly 6 missions in the skilled simulator map.");
  console.assert(getSimulatorMissions({ id: "student" }).some((mission) => mission.id === "S02_STUDENT"), "Student simulator must include Student-specific missions.");
  console.assert(getSimulatorMissions({ id: "working_holiday" }).some((mission) => mission.id === "S02_WHM"), "WHM simulator must include WHM-specific missions.");
  console.assert(getApplicationSimulationProfile({ id: "student" }).title.includes("Student"), "Student application simulator must load Student profile.");
  console.assert(getApplicationSimulationProfile({ id: "student" }).questions.some((question) => question.id === "genuine_student" && Array.isArray(question.help)), "Student simulator must include Genuine Student help text.");
  console.assert(getApplicationQuestionHelp({ id: "passport" }, { title: "Student visa" }).length > 0, "Every application question must have help text.");
  console.assert(getApplicationQuestionHelp({ id: "no_work" }, { id: "visitor", title: "Visitor visa" }).some((item) => item.includes("Visitor")), "Visitor no-work help must explain the condition clearly.");
  console.assert(getApplicationQuestionSource({ id: "passport" }, { id: "student", title: "Student visa" }).url.includes("student-500"), "Student simulator help must link to the official Student visa source.");
  console.assert(getApplicationHelpSummary({ id: "passport" }, { id: "student", title: "Student visa" }).length > 0, "Application help must show a short summary.");
  console.assert(getApplicationDeliverable({ id: "coe" }, { id: "student", title: "Student visa" }).includes("CoE"), "Student CoE help must show a concrete deliverable.");
  console.assert(getScenarioAlerts({ budget: "Menos de 2,000 AUD" }, { id: "student" }).some((alert) => alert.includes("presupuesto")), "Student S01 scenario must flag low budget.");
  console.assert(calculateStudentCostSimulation({ availableBudget: 10000, applicationFee: 700, initialTuition: 3000, oshc: 700, medical: 0, biometrics: 0, translations: 0, flight: 1000, rentWeeks: 4, weeklyRent: 300, bond: 1200, foodWeeks: 4, weeklyFood: 150, transport: 200, emergency: 1000 }).total === 7600, "Student cost simulator must calculate total costs correctly.");
  console.assert(getSimulatorDefaultMissionId({ id: "skilled" }) === "S02", "Skilled simulator should default to the points tool when needed.");
  console.assert(calculateApplicationSimulation(getApplicationSimulationProfile({ id: "visitor" }), {}).percent === 0, "Empty application simulation must start at 0 percent.");
  console.assert(arrivalMissionData.length === 6, "Expected exactly 6 missions in the arrival map.");
  console.assert(missionData.every((mission) => validStatuses.includes(mission.status)), "Every mission must use a valid status.");
  console.assert(missionData.filter((mission) => mission.status === "current").length === 1, "Expected exactly one current mission.");
  console.assert(Number.isInteger(progress) && progress >= 0 && progress <= 100, "Progress must be an integer between 0 and 100.");
  console.assert(missionData[0].id === "M01" && missionData[1].id === "M02", "M01 and M02 must stay in order.");
  console.assert(getStatusStyles("locked").statusIcon === "lock", "Locked missions must use the lock icon.");
  console.assert(getDynamicWorkCategories({ goals: ["study"], workExperience: "none" }).some((category) => category.id === "other"), "Dynamic categories must always include Other.");
  console.assert(officialSources.skilledOccupationList.url.includes("immi.homeaffairs.gov.au"), "Official references must point to Home Affairs.");
  console.assert(officialSources.cricos.url.includes("cricos.education.gov.au"), "Student provider search must point to official CRICOS.");
  console.assert(getFilteredRoutes({ goals: ["study"] }).some((route) => route.id === "student"), "Study goal must surface Student route.");
  console.assert(getFilteredRoutes({ goals: ["work"], workExperience: "3_5_years" }).some((route) => route.id === "skilled"), "Experienced work profile must surface Skilled route.");
  console.assert(getFilteredRoutes({ goals: ["study", "work"], workExperience: "3_5_years" }).some((route) => route.id === "student"), "Multiple goals must surface Student route when study is selected.");
  console.assert(getFilteredRoutes({ goals: ["study", "work"], workExperience: "3_5_years" }).some((route) => route.id === "skilled"), "Multiple goals must surface Skilled route when work and experience are selected.");
  console.assert(passportOptions.includes("México"), "Passport dropdown must include México.");
  console.assert(passportOptions.includes("Otro / no aparece en la lista"), "Passport dropdown must include an Other option.");
  console.assert(functionallyHasVisaExpiryRisk({ hasVisa: "no", visaExpiry: "Menos de 30 días" }) === false, "Visa expiry risk must not apply without an active visa.");
  console.assert(functionallyHasVisaExpiryRisk({ hasVisa: "yes", visaExpiry: "Menos de 30 días" }) === true, "Visa expiry risk must apply when active visa expires soon.");
  console.assert(documentOptions.includes("Pasaporte vigente"), "Document checklist must include passport.");
  console.assert(documentOptions.includes("Ninguno todavía"), "Document checklist must include none option.");
  console.assert(getMissionProgressState({}).find((mission) => mission.id === "M03").status === "locked", "M03 must stay locked before diagnosis is complete.");
  console.assert(getMissionProgressState({ mainRisk: "budget" }).find((mission) => mission.id === "M03").status === "current", "M03 must unlock after diagnosis is complete.");
  console.assert(getMissionProgressState({ mainRisk: "budget" }).find((mission) => mission.id === "M05").status === "current", "M05 must unlock after diagnosis is complete.");
  console.assert(getMissionProgressState({ mainRisk: "budget" }, { m03Completed: true }).find((mission) => mission.id === "M03").status === "completed", "M03 must be completed when progress says so.");
  console.assert(getMissionProgressState({ mainRisk: "budget" }, { m04Completed: true }).find((mission) => mission.id === "M04").status === "completed", "M04 must be completed when progress says so.");
  console.assert(getMissionProgressState({ mainRisk: "budget" }, { m05Completed: true }).find((mission) => mission.id === "M05").status === "completed", "M05 must be completed when progress says so.");
  console.assert(calculateSurvivalTotals({ availableBudget: 1000, costs: [{ amount: 500 }, { amount: 250 }] }).total === 750, "Survival calculator must sum costs correctly.");
  console.assert(getBestWhmMatch({ passport: "Chile" }).subclass === "462", "Chile must map to WHM subclass 462.");
  console.assert(getBestWhmMatch({ passport: "Canadá" }).subclass === "417", "Canada must map to WHM subclass 417.");
  console.assert(getFilteredRoutes({ passport: "México", age: 30, goals: ["work"] }).some((route) => route.id === "working_holiday_check"), "Unsupported WHM passport must surface a check route.");
  console.assert(getMissionProgressState({ mainRisk: "budget" }, { m05Completed: true }).find((mission) => mission.id === "M06").status === "current", "M06 must unlock after M05 is complete.");
  console.assert(getInventoryProgress([{ needed: true, status: "ready" }, { needed: true, status: "missing" }]) === 50, "Inventory progress must calculate readiness percentage.");
  console.assert(getMissionProgressState({ mainRisk: "budget" }, { m06Completed: true }).find((mission) => mission.id === "M07").status === "current", "M07 must unlock after M06 is complete.");
  console.assert(getMissionProgressState({ mainRisk: "budget" }, { m07Completed: true }).find((mission) => mission.id === "M08").status === "current", "M08 must unlock after M07 is complete.");
  console.assert(getMissionProgressState({ mainRisk: "budget" }, { m03Completed: true, m04Completed: true, m05Completed: true, m06Completed: true, m07Completed: true, m08Completed: true }).every((mission) => mission.status === "completed"), "All missions must be completed after M08 is marked reviewed.");
  console.assert(getSourceContext(officialSources.cricos, { id: "student", title: "Student visa" }).title === "Escuelas y cursos CRICOS", "M08 CRICOS source must have a clear title.");
  console.assert(getProfessionalAdviceAssessment({ id: "skilled", title: "Skilled pathway" }, {}).level === "Alto", "Skilled routes should flag high professional complexity.");
  console.assert(getProfessionalAdviceAssessment({ id: "student", title: "Student visa" }, { budget: "Menos de 2,000 AUD" }).level !== "Bajo", "Student with low budget should not be low complexity.");
  console.assert(getPreparationProgress(getMissionProgressState({ mainRisk: "budget" }, { m03Completed: true, m04Completed: true, m05Completed: true, m06Completed: true, m07Completed: true, m08Completed: true })) === 100, "Completed operation must show 100 percent progress.");
  console.assert(getWorkExperienceLabel("more_5_years") === "Más de 5 años", "Profile must show readable work experience labels.");
  console.assert(getWorkCategoryLabel("science_environment") === "Ciencia y medio ambiente", "Profile must show readable work category labels.");
  console.assert(getMissionVisualIcon({ id: "M04", icon: "route" }) === "route", "M04 should use route/signpost visual identity.");
  console.assert(getMissionVisualIcon({ id: "M06", icon: "backpack" }) === "checklist", "M06 should use checklist visual identity.");
  console.assert(" VICA ".trim().toLowerCase() === "vica", "Access gate username check must be case-normalized.");
}

if (typeof window !== "undefined") {
  runSmokeTests();
}

function PixelShell({ children, className = "", glow = false }) {
  return (
    <div
      className={`relative border-2 ${glow ? "border-[#ffd15a]" : "border-[#314258]"} bg-[#07111f]/90 ${className}`}
      style={{
        clipPath:
          "polygon(0 9px, 9px 9px, 9px 0, calc(100% - 9px) 0, calc(100% - 9px) 9px, 100% 9px, 100% calc(100% - 9px), calc(100% - 9px) calc(100% - 9px), calc(100% - 9px) 100%, 9px 100%, 9px calc(100% - 9px), 0 calc(100% - 9px))",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:12px_12px] opacity-40" />
      {children}
    </div>
  );
}

function ProgressBlocks({ value }) {
  const blocks = 22;
  const filled = Math.round((value / 100) * blocks);

  return (
    <div className="flex gap-[3px]" aria-label={`Progreso ${value}%`}>
      {Array.from({ length: blocks }).map((_, index) => (
        <div
          key={index}
          className={`h-[15px] flex-1 border border-black/70 ${index < filled ? "bg-[#74f24d] shadow-[0_0_7px_rgba(116,242,77,0.65)]" : "bg-[#101927]"}`}
        />
      ))}
    </div>
  );
}

function SydneyOperaBadge() {
  return (
    <div className="relative mx-auto h-[86px] w-[224px]">
      <div className="absolute inset-0 rounded-full bg-[#ffd15a]/10 blur-2xl" />
      <div className="absolute inset-x-8 bottom-0 h-3 border-2 border-[#d39a2f] bg-[#7b4a10] shadow-[0_0_18px_rgba(255,209,90,0.28)]" />
      <div className="absolute inset-x-11 bottom-3 h-3 border-2 border-[#d39a2f] bg-[#a66a1f]" />
      <div className="absolute inset-x-16 bottom-6 h-2 border-2 border-[#d39a2f] bg-[#c78a2d]" />

      <div className="absolute left-[24px] top-[28px] h-[9px] w-[9px] bg-[#ffd15a] shadow-[0_0_10px_rgba(255,209,90,0.55)]" />
      <div className="absolute right-[32px] top-[18px] h-[8px] w-[8px] bg-[#ffd15a] shadow-[0_0_10px_rgba(255,209,90,0.55)]" />
      <div className="absolute right-[74px] top-[8px] text-[#ffd15a]">✦</div>

      <div
        className="absolute left-[35px] bottom-[29px] h-[38px] w-[44px] border-2 border-[#e6d7a8] bg-[#f3e7bb] shadow-[0_0_18px_rgba(255,209,90,0.18)]"
        style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
      />
      <div
        className="absolute left-[65px] bottom-[29px] h-[53px] w-[60px] border-2 border-[#e6d7a8] bg-[#fff0bd] shadow-[0_0_18px_rgba(255,209,90,0.22)]"
        style={{ clipPath: "polygon(52% 0%, 0% 100%, 100% 100%)" }}
      />
      <div
        className="absolute left-[110px] bottom-[29px] h-[36px] w-[42px] border-2 border-[#e6d7a8] bg-[#f3e7bb] shadow-[0_0_18px_rgba(255,209,90,0.18)]"
        style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
      />
      <div
        className="absolute left-[137px] bottom-[29px] h-[45px] w-[50px] border-2 border-[#e6d7a8] bg-[#fff0bd] shadow-[0_0_18px_rgba(255,209,90,0.22)]"
        style={{ clipPath: "polygon(52% 0%, 0% 100%, 100% 100%)" }}
      />

      <div className="absolute left-[62px] bottom-[29px] h-[4px] w-[8px] bg-[#7b5a18]" />
      <div className="absolute left-[108px] bottom-[29px] h-[4px] w-[8px] bg-[#7b5a18]" />
      <div className="absolute left-[146px] bottom-[29px] h-[4px] w-[8px] bg-[#7b5a18]" />
    </div>
  );
}

function AustraliaPixelArt({ onClick, unlocked = false }) {
  const content = (
    <div className="relative flex flex-col items-center" style={{ animation: "floatingPanelSoft 3s ease-in-out infinite" }}>
      <SydneyOperaBadge />
      <div className={`relative -mt-1 border-2 px-10 py-2 font-mono text-2xl font-black uppercase tracking-[0.16em] shadow-[0_0_24px_rgba(255,209,90,0.28)] ${unlocked ? "border-[#74f24d] bg-[#092414] text-[#74f24d]" : "border-[#ffd15a] bg-[#17110a] text-[#ffd15a]"}`}>
        Australia
      </div>
      {unlocked && (
        <div className="mt-2 border-2 border-[#74f24d] bg-[#092414] px-3 py-1 font-mono text-[10px] font-black uppercase tracking-widest text-[#74f24d] shadow-[0_4px_0_rgba(0,0,0,0.45)]">
          Segundo mapa desbloqueado
        </div>
      )}
    </div>
  );

  if (!onClick) return content;

  return (
    <button type="button" onClick={onClick} className="cursor-pointer transition-transform hover:scale-[1.02] focus:outline-none" aria-label="Abrir mapa de Australia">
      {content}
    </button>
  );
}

function Stamp({ side }) {
  const isLeft = side === "left";
  return (
    <div
      className={`absolute bottom-16 ${isLeft ? "left-1 -rotate-12" : "right-1 rotate-12"} hidden h-24 w-28 border-2 border-[#31516d]/70 p-2 text-center font-mono text-[10px] font-black uppercase leading-tight text-[#31516d] sm:block`}
      style={{ borderRadius: "10px" }}
    >
      <div>{isLeft ? "Departure" : "Visa"}</div>
      <div className="mt-1 text-[15px]">{isLeft ? "Confusión" : "Nuevo Futuro"}</div>
      <div className="mt-1 text-[9px]">{isLeft ? "Día 0" : "Aprobado"}</div>
      <div className="mt-1">✦ ✦ ✦</div>
    </div>
  );
}

function CompassRose() {
  return (
    <div className="absolute left-3 top-28 hidden h-24 w-24 text-[#6f7f8d] sm:block">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 font-mono text-xs">N</div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 font-mono text-xs">S</div>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 font-mono text-xs">W</div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 font-mono text-xs">E</div>
      <div className="absolute left-1/2 top-1/2 h-16 w-1 -translate-x-1/2 -translate-y-1/2 bg-[#6f7f8d]" />
      <div className="absolute left-1/2 top-1/2 h-1 w-16 -translate-x-1/2 -translate-y-1/2 bg-[#6f7f8d]" />
      <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-[#6f7f8d]" />
    </div>
  );
}

function getMissionVisualIcon(mission) {
  if (mission.id === "M04") return "route";
  if (mission.id === "M06") return "checklist";
  if (mission.id === "M08") return "passport";
  return mission.icon;
}

function MissionCard({ mission, index, selected, onSelect, onLockedAttempt }) {
  const styles = getStatusStyles(mission.status);
  const isLocked = mission.status === "locked";
  const isCurrent = mission.status === "current";
  const visualIcon = getMissionVisualIcon(mission);

  const animation = isCurrent
    ? `fadeInUp 340ms ease both ${index * 40}ms, floatingPanel 2.4s ease-in-out ${index * 40 + 340}ms infinite, glowPulse 2.4s ease-in-out ${index * 40 + 340}ms infinite`
    : `fadeInUp 340ms ease both ${index * 40}ms`;

  return (
    <button
      type="button"
      aria-disabled={isLocked}
      onClick={() => {
        if (isLocked) {
          onLockedAttempt?.(mission);
          return;
        }
        onSelect(mission);
      }}
      className={`relative w-full max-w-full text-left transition-transform duration-200 ${isLocked ? "cursor-not-allowed" : "cursor-pointer hover:scale-[1.01]"}`}
      style={{ animation }}
    >
      <div
        className={`relative overflow-hidden border-2 ${styles.shell} ${isCurrent ? "p-2.5" : "p-2"}`}
        style={{
          clipPath:
            "polygon(0 7px, 7px 7px, 7px 0, calc(100% - 7px) 0, calc(100% - 7px) 7px, 100% 7px, 100% calc(100% - 7px), calc(100% - 7px) calc(100% - 7px), calc(100% - 7px) 100%, 7px 100%, 7px calc(100% - 7px), 0 calc(100% - 7px))",
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:10px_10px] opacity-45" />
        <div className="relative flex min-w-0 items-center gap-2.5">
          <div className={`flex ${isCurrent ? "h-11 w-11" : "h-9 w-9"} shrink-0 items-center justify-center border-2 ${styles.badge}`}>
            <Icon type={isLocked ? "lock" : visualIcon} size={isCurrent ? 20 : 17} />
          </div>
          <div className="min-w-0 flex-1 overflow-hidden">
            <div className="flex items-center justify-between gap-2">
              <h3
                className={`${isCurrent ? "text-[15px]" : "text-[13px]"} truncate font-mono font-black tracking-wide text-[#f5ecd8]`}
                title={`${mission.id} · ${mission.title}`}
              >
                {mission.id} · {mission.title}
              </h3>
              {!isCurrent && <Icon type={styles.statusIcon} className={`${styles.text} shrink-0`} size={15} />}
            </div>
            <p className={`mt-1 truncate font-mono ${isCurrent ? "text-[11px]" : "text-[9px]"} font-black tracking-widest ${styles.text}`}>{styles.label}</p>
          </div>
        </div>
      </div>
    </button>
  );
}

function MissionPath({ missions, selectedMission, onMissionSelect, onLockedAttempt }) {
  return (
    <div className="relative mt-2 flex flex-col-reverse gap-3 px-0 sm:px-4">
      <div className="absolute bottom-12 left-[20px] top-8 w-[4px] bg-gradient-to-t from-[#74f24d] via-[#ff9f1c] to-[#ff9f1c] sm:left-[34px]" />
      <div className="absolute bottom-12 left-[16px] top-8 w-[12px] bg-[radial-gradient(circle,#ff9f1c_2px,transparent_3px)] bg-[length:8px_11px] sm:left-[30px]" />
      {missions.map((mission, index) => {
        const styles = getStatusStyles(mission.status);
        return (
          <div key={mission.id} className="relative grid grid-cols-[32px_1fr] items-center gap-2 sm:grid-cols-[40px_1fr]">
            <div className="relative z-10 flex items-center justify-center">
              <div className={`h-5 w-5 border-2 border-[#0b1220] ${styles.dot}`} />
            </div>
            <MissionCard mission={mission} index={index} selected={selectedMission.id === mission.id} onSelect={onMissionSelect} onLockedAttempt={onLockedAttempt} />
          </div>
        );
      })}
    </div>
  );
}

function MissionIntroScreen({ onBack, onStartDiagnosis, onOpenCurrentMission, onOpenRoutes, onOpenRouteComparator, progress, currentMission, hasCompletedDiagnosis, allMissionsCompleted }) {
  const [showLevelOpening, setShowLevelOpening] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.localStorage.getItem("oea_m01_opening_seen") !== "true";
  });
  const neededItems = [
    "Pasaporte o nacionalidad principal",
    "Edad",
    "Objetivo principal",
    "Presupuesto aproximado",
    "Nivel de inglés",
    "Estudios y experiencia",
    "Visa actual, si ya tienes una",
  ];

  const missionHomeContent = {
    M02: {
      eyebrow: "Misión actual",
      title: "Diagnóstico pendiente",
      description: "Completa el escáner para que la app pueda desbloquear riesgos, rutas y recursos.",
      items: neededItems,
      action: "Iniciar diagnóstico",
      onAction: onStartDiagnosis,
    },
    M03: {
      eyebrow: "Misión actual",
      title: "Revisar riesgos y límites",
      description: "Tu diagnóstico ya existe. Ahora toca entender qué puede bloquear o retrasar tu ruta.",
      items: ["Presupuesto", "Tiempo y urgencia", "Documentos", "Inglés", "Experiencia", "Situación migratoria"],
      action: "Abrir M03",
      onAction: onOpenCurrentMission,
    },
    M04: {
      eyebrow: "Misión actual",
      title: "Comparar rutas de escape",
      description: "Ya puedes revisar rutas filtradas por tu diagnóstico y elegir una para explorar.",
      items: ["Rutas disponibles", "Recomendable para...", "Ventajas y desventajas", "Fuentes oficiales", "Selección de ruta"],
      action: "Abrir M04",
      onAction: onOpenCurrentMission,
    },
    M05: {
      eyebrow: "Misión actual",
      title: "Calcular caja inicial",
      description: "Con una ruta elegida, revisa si tu presupuesto alcanza para costos iniciales y margen de emergencia.",
      items: ["Presupuesto disponible", "Costos estimados en AUD", "Diferencia", "Estado de riesgo financiero", "Fuentes de costos"],
      action: "Abrir M05",
      onAction: onOpenCurrentMission,
    },
    M06: {
      eyebrow: "Misión actual",
      title: "Organizar inventario",
      description: "Ordena documentos y evidencia según la ruta o visa que seleccionaste.",
      items: ["Requisitos por ruta", "Documentos listos", "Documentos faltantes", "Notas por evidencia", "Checklist oficial"],
      action: "Abrir M06",
      onAction: onOpenCurrentMission,
    },
    M07: {
      eyebrow: "Misión actual",
      title: "Construir plan de escape",
      description: "Convierte ruta, caja inicial e inventario en próximos pasos priorizados.",
      items: ["Ruta seleccionada", "Riesgo principal de la ruta", "Acciones urgentes", "Acciones importantes", "Qué no hacer todavía"],
      action: "Abrir M07",
      onAction: onOpenCurrentMission,
    },
    M08: {
      eyebrow: "Misión actual",
      title: "Revisar fuentes oficiales",
      description: "Antes de decidir, revisa las páginas oficiales asociadas a tu ruta seleccionada.",
      items: ["Visa seleccionada", "Checklist oficial", "Precios oficiales", "Condiciones vigentes", "Fuentes de respaldo"],
      action: "Abrir M08",
      onAction: onOpenCurrentMission,
    },
  };

  const completionContent = {
    eyebrow: "Subniveles desbloqueados",
    title: "Revisar rutas y comparador",
    description: "Ya completaste la ruta base. Ahora puedes volver a revisar las rutas, comparar opciones o actualizar tu información cuando cambie tu situación.",
    items: ["Rutas disponibles", "Comparador de rutas", "Ruta seleccionada", "Plan de acción", "Fuentes oficiales"],
    action: "Ver mapa completo",
    onAction: onBack,
  };

  const dashboardMission = allMissionsCompleted ? { id: "DONE", title: "Operación completada", description: "Todas las misiones principales están completas." } : currentMission || { id: "M02", title: "Diagnóstico", description: "Completa esta misión para desbloquear tu ruta personalizada." };
  const dashboardContent = allMissionsCompleted ? completionContent : missionHomeContent[dashboardMission.id] || missionHomeContent.M02;

  if (showLevelOpening) {
    return (
      <div className="relative px-4 pb-28 pt-4">
        <PixelShell glow className="p-4 shadow-[0_0_24px_rgba(255,209,90,0.18)]">
          <div className="relative flex items-start gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-[#74f24d] bg-[#092414] text-[#74f24d]">
              <Icon type="check" size={30} />
            </div>
            <div>
              <p className="font-mono text-xs font-black uppercase tracking-[0.24em] text-[#ff9f1c]">M01 · Punto de Partida</p>
              <h2 className="mt-1 font-mono text-2xl font-black uppercase leading-none text-[#fff1d0]">Antes de elegir ruta</h2>
              <p className="mt-3 font-mono text-sm font-bold leading-relaxed text-[#cfc7b8]">
                Primero vamos a ubicar tu situación actual. No necesitas resolverlo todo ahora; solo necesitas saber dónde estás y cuál es tu siguiente paso.
              </p>
            </div>
          </div>
        </PixelShell>

        <div className="mt-4 grid grid-cols-[1fr_1.5fr] gap-3">
          <button type="button" onClick={onBack} className="border-2 border-[#314258] bg-[#07111f] px-3 py-3 font-mono text-xs font-black uppercase tracking-widest text-[#cfc7b8] shadow-[0_5px_0_rgba(0,0,0,0.45)]">
            Volver mapa
          </button>
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.localStorage.setItem("oea_m01_opening_seen", "true");
              }
              setShowLevelOpening(false);
            }}
            className="border-2 border-[#ffd15a] bg-[#a8621f] px-3 py-3 font-mono text-xs font-black uppercase tracking-widest text-[#1b1208] shadow-[0_5px_0_rgba(0,0,0,0.55)]"
          >
            Continuar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative px-4 pb-28 pt-4">
      <div className="mt-4 grid gap-4">
        <PixelShell className="p-4 shadow-[0_0_20px_rgba(2,6,23,0.85)]">
          <div className="relative flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center text-[#ff9f1c]">
              <Icon type="target" size={42} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex items-center justify-between font-mono text-[14px] font-black text-[#ddd6c8]">
                <span>Nivel de preparación:</span>
                <span className="text-[#ffd15a]">{progress}%</span>
              </div>
              <ProgressBlocks value={progress} />
              <div className="mt-3 flex items-center justify-between gap-2 font-mono text-[12px] font-black text-[#cfc7b8]">
                <span>
                  ➜ {allMissionsCompleted ? "Panel:" : "Misión actual:"} <span className="text-[#ffd15a]">{allMissionsCompleted ? "Subniveles desbloqueados" : dashboardMission.title}</span>
                </span>
                <span>{progress}%</span>
              </div>
            </div>
          </div>
        </PixelShell>
        <PixelShell className="p-4">
          <div className="relative">
            <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-[#ffd15a]">Regla de avance</p>
            <p className="mt-2 font-mono text-sm font-bold leading-relaxed text-[#e8dcc8]">
              Algunas misiones están bloqueadas porque dependen de información previa. Esto evita recomendaciones incompletas, confusas o fuera de contexto.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2 font-mono text-[11px] font-black uppercase tracking-wider">
              <div className="border-2 border-[#74f24d] bg-[#092414] p-2 text-[#74f24d]">Verde · Completado</div>
              <div className="border-2 border-[#ffd15a] bg-[#150f05] p-2 text-[#ffd15a]">Dorado · Actual</div>
              <div className="border-2 border-[#4a5568] bg-[#0b1422] p-2 text-[#c9c3b5]">Gris · Bloqueado</div>
              <div className="border-2 border-[#4a5568] bg-[#111827] p-2 text-[#c9c3b5]">Candado · Falta info</div>
            </div>
          </div>
        </PixelShell>

        <PixelShell className="p-4">
          <div className="relative flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-[#ff9f1c] bg-[#2b1604] text-[#ff9f1c]">
              <Icon type="alert" size={22} />
            </div>
            <div>
              <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-[#ff9f1c]">Aviso responsable</p>
              <p className="mt-2 font-mono text-sm font-bold leading-relaxed text-[#e8dcc8]">
                La app puede mostrar rutas posibles según tus respuestas, pero no decide por ti ni garantiza elegibilidad. Siempre verifica los requisitos en fuentes oficiales antes de tomar decisiones.
              </p>
            </div>
          </div>
        </PixelShell>

        <PixelShell className="p-4">
          <div className="relative">
            <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-[#ffd15a]">{dashboardContent.eyebrow}</p>
            <h3 className="mt-2 font-mono text-xl font-black uppercase leading-tight text-[#fff1d0]">{dashboardContent.title}</h3>
            <p className="mt-2 font-mono text-sm font-bold leading-relaxed text-[#cfc7b8]">{dashboardContent.description}</p>
            <div className="mt-3 grid gap-2">
              {dashboardContent.items.map((item) => (
                <div key={item} className="flex items-center gap-2 border border-[#263a50] bg-[#08182b] px-3 py-2 font-mono text-xs font-bold text-[#d8d0c0]">
                  <span className="text-[#74f24d]">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </PixelShell>

        {allMissionsCompleted && (
          <PixelShell glow className="p-4">
            <div className="relative grid gap-3 font-mono">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#ffd15a]">Subniveles desbloqueados</p>
              <p className="text-[11px] font-bold leading-relaxed text-[#e8dcc8]">Elige cómo quieres revisar tus rutas antes de ajustar tu plan.</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={onOpenRoutes}
                  className="border-2 border-[#ffd15a] bg-[#3a2505] px-3 py-3 text-left text-[10px] font-black uppercase tracking-widest text-[#ffd15a] shadow-[0_4px_0_rgba(0,0,0,0.45)]"
                >
                  Rutas
                </button>
                <button
                  type="button"
                  onClick={onOpenRouteComparator}
                  className="border-2 border-[#74f24d] bg-[#092414] px-3 py-3 text-left text-[10px] font-black uppercase tracking-widest text-[#74f24d] shadow-[0_4px_0_rgba(0,0,0,0.45)]"
                >
                  Comparador
                </button>
              </div>
            </div>
          </PixelShell>
        )}
        {!allMissionsCompleted && (
          <div className="grid grid-cols-[1fr_1.5fr] gap-3">
            <button type="button" onClick={onBack} className="border-2 border-[#314258] bg-[#07111f] px-3 py-3 font-mono text-xs font-black uppercase tracking-widest text-[#cfc7b8] shadow-[0_5px_0_rgba(0,0,0,0.45)]">
              Volver mapa
            </button>
            <button type="button" onClick={dashboardContent.onAction} className="border-2 border-[#ffd15a] bg-[#a8621f] px-3 py-3 font-mono text-xs font-black uppercase tracking-widest text-[#1b1208] shadow-[0_5px_0_rgba(0,0,0,0.55)]">
              {dashboardContent.action}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function OptionButton({ label, description, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative border-2 p-3 text-left font-mono shadow-[0_4px_0_rgba(0,0,0,0.4)] transition ${
        selected ? "border-[#ffd15a] bg-[#231706] text-[#fff1d0]" : "border-[#314258] bg-[#07111f] text-[#d8d0c0]"
      }`}
    >
      <div className="relative flex items-start gap-2">
        <span className={selected ? "text-[#ffd15a]" : "text-[#6f7f8d]"}>{selected ? "◆" : "◇"}</span>
        <div>
          <p className="text-xs font-black uppercase tracking-wider">{label}</p>
          {description && <p className="mt-1 text-[11px] font-bold leading-snug text-[#aeb7c2]">{description}</p>}
        </div>
      </div>
    </button>
  );
}

function ExpandableSection({ title, accent = "gold", defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  const accentStyles = {
    gold: {
      border: "border-[#ffd15a]",
      bg: "bg-[#17110a]",
      text: "text-[#ffd15a]",
      panel: "border-[#263a50] bg-[#08182b]",
    },
    green: {
      border: "border-[#74f24d]",
      bg: "bg-[#092414]",
      text: "text-[#74f24d]",
      panel: "border-[#263a50] bg-[#08182b]",
    },
    orange: {
      border: "border-[#ff9f1c]",
      bg: "bg-[#150f05]",
      text: "text-[#ff9f1c]",
      panel: "border-[#3b2a14] bg-[#08182b]",
    },
  };
  const styles = accentStyles[accent] || accentStyles.gold;

  return (
    <div className="grid gap-2">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={`flex items-center justify-between border-2 px-4 py-3 font-mono text-left shadow-[0_4px_0_rgba(0,0,0,0.35)] ${styles.border} ${styles.bg}`}
      >
        <span className={`text-xs font-black uppercase tracking-[0.2em] ${styles.text}`}>{title}</span>
        <span className={`text-lg font-black ${styles.text}`}>{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className={`border p-4 ${styles.panel}`} style={{ animation: "fadeInUp 180ms ease both" }}>
          {children}
        </div>
      )}
    </div>
  );
}

function SourceCard({ source, title = "Fuente oficial", description = "Referencia oficial para verificar requisitos, condiciones o información vigente." }) {
  return (
    <PixelShell className="p-3">
      <div className="relative flex items-start gap-2">
        <Icon type="info" className="mt-0.5 shrink-0 text-[#ffd15a]" size={18} />
        <div>
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-[#ffd15a]">{title}</p>
          <p className="mt-1 font-mono text-xs font-bold leading-snug text-[#e8dcc8]">{source.label}</p>
          {description && <p className="mt-2 font-mono text-[11px] font-bold leading-relaxed text-[#aeb7c2]">{description}</p>}
          <a className="mt-2 inline-block font-mono text-[11px] font-black uppercase tracking-wider text-[#74f24d] underline" href={source.url} target="_blank" rel="noreferrer">
            Ver referencia oficial →
          </a>
        </div>
      </div>
    </PixelShell>
  );
}

function DiagnosisScreen({ answers, setAnswers, onBack, onComplete }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const categories = getDynamicWorkCategories(answers);

  const updateAnswer = (key, value) => {
    setAnswers((current) => {
      const next = { ...current, [key]: value };

      if (key === "hasVisa" && value !== "yes") {
        delete next.currentVisa;
        delete next.visaExpiry;
      }

      if (key === "secondPassport" && value !== "yes") {
        delete next.secondPassportCountry;
        delete next.secondPassportOther;
      }

      if (key === "passport" && value !== "Otro / no aparece en la lista") {
        delete next.passportOther;
      }

      if (key === "workCategory" && value !== "other") {
        delete next.workCategoryOther;
      }

      return next;
    });
  };

  const toggleGoal = (goal) => {
    setAnswers((current) => {
      const currentGoals = getSelectedGoals(current);
      const exists = currentGoals.includes(goal);
      const nextGoals = exists ? currentGoals.filter((item) => item !== goal) : [...currentGoals, goal];
      return { ...current, goals: nextGoals, goal: nextGoals[0] || "" };
    });
  };

  const toggleDocument = (documentName) => {
    setAnswers((current) => {
      const currentDocs = Array.isArray(current.documentsReady) ? current.documentsReady : [];

      if (documentName === "Ninguno todavía") {
        return { ...current, documentsReady: currentDocs.includes(documentName) ? [] : [documentName] };
      }

      const withoutNone = currentDocs.filter((item) => item !== "Ninguno todavía");
      const exists = withoutNone.includes(documentName);
      const nextDocs = exists ? withoutNone.filter((item) => item !== documentName) : [...withoutNone, documentName];
      return { ...current, documentsReady: nextDocs };
    });
  };

  const selectedCategory = categories.find((category) => category.id === answers.workCategory);

  const questions = [
    {
      block: "Bloque 1 de 6",
      title: "¿Dónde estás actualmente?",
      description: "Primero necesitamos ubicar desde dónde parte tu operación.",
      content: (
        <div className="grid gap-2">
          {[
            ["outside", "Fuera de Australia"],
            ["inside", "Dentro de Australia"],
            ["soon", "Estoy por viajar"],
            ["unsure", "Aún no lo tengo claro"],
          ].map(([value, label]) => (
            <OptionButton key={value} label={label} selected={answers.location === value} onClick={() => updateAnswer("location", value)} />
          ))}
        </div>
      ),
    },
    {
      block: "Bloque 1 de 6",
      title: "¿Cuál es tu pasaporte principal?",
      description: "El pasaporte puede cambiar qué rutas se deben revisar después.",
      content: (
        <div className="grid gap-3">
          <select
            className="border-2 border-[#314258] bg-[#08182b] px-3 py-3 font-mono text-sm font-bold text-[#fff1d0] outline-none focus:border-[#ffd15a]"
            value={answers.passport || ""}
            onChange={(event) => updateAnswer("passport", event.target.value)}
          >
            <option value="">Selecciona tu pasaporte</option>
            {passportOptions.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {answers.passport === "Otro / no aparece en la lista" && (
            <input
              className="border-2 border-[#314258] bg-[#08182b] px-3 py-3 font-mono text-sm font-bold text-[#fff1d0] outline-none focus:border-[#ffd15a]"
              value={answers.passportOther || ""}
              onChange={(event) => updateAnswer("passportOther", event.target.value)}
              placeholder="Escribe tu pasaporte o nacionalidad"
            />
          )}
        </div>
      ),
    },
    {
      block: "Bloque 1 de 6",
      title: "¿Tienes otro pasaporte?",
      description: "Si tienes doble nacionalidad, puede cambiar las rutas que conviene revisar.",
      content: (
        <div className="grid gap-3">
          <div className="grid gap-2">
            {[["yes", "Sí"], ["no", "No"], ["unsure", "No estoy seguro"]].map(([value, label]) => (
              <OptionButton key={value} label={label} selected={answers.secondPassport === value} onClick={() => updateAnswer("secondPassport", value)} />
            ))}
          </div>
          {answers.secondPassport === "yes" && (
            <select
              className="border-2 border-[#314258] bg-[#08182b] px-3 py-3 font-mono text-sm font-bold text-[#fff1d0] outline-none focus:border-[#ffd15a]"
              value={answers.secondPassportCountry || ""}
              onChange={(event) => updateAnswer("secondPassportCountry", event.target.value)}
            >
              <option value="">Selecciona tu segundo pasaporte</option>
              {passportOptions.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          )}
          {answers.secondPassport === "yes" && answers.secondPassportCountry === "Otro / no aparece en la lista" && (
            <input
              className="border-2 border-[#314258] bg-[#08182b] px-3 py-3 font-mono text-sm font-bold text-[#fff1d0] outline-none focus:border-[#ffd15a]"
              value={answers.secondPassportOther || ""}
              onChange={(event) => updateAnswer("secondPassportOther", event.target.value)}
              placeholder="Escribe tu segundo pasaporte"
            />
          )}
        </div>
      ),
    },
    {
      block: "Bloque 2 de 6",
      title: "¿Cuántos años tienes?",
      description: "La edad puede afectar algunas rutas, por ejemplo programas temporales de viaje y trabajo.",
      content: (
        <input
          type="number"
          min="16"
          max="80"
          className="w-full border-2 border-[#314258] bg-[#08182b] px-3 py-3 font-mono text-sm font-bold text-[#fff1d0] outline-none focus:border-[#ffd15a]"
          value={answers.age || ""}
          onChange={(event) => updateAnswer("age", event.target.value)}
          placeholder="Ej. 30"
        />
      ),
    },
    {
      block: "Bloque 2 de 6",
      title: "¿Cuáles son tus objetivos?",
      description: "Puedes seleccionar más de uno. Por ejemplo: estudiar + trabajar.",
      content: (
        <div className="grid gap-2">
          {[
            ["study", "Estudiar"],
            ["work", "Trabajar"],
            ["travel", "Viajar"],
            ["migrate_long_term", "Migrar a largo plazo"],
            ["extend_stay", "Extender mi estadía"],
            ["explore", "Explorar opciones"],
            ["unsure", "No lo sé todavía"],
          ].map(([value, label]) => (
            <OptionButton key={value} label={label} selected={getSelectedGoals(answers).includes(value)} onClick={() => toggleGoal(value)} />
          ))}
        </div>
      ),
    },
    {
      block: "Bloque 3 de 6",
      title: "¿Tienes visa australiana activa?",
      description: "Esta respuesta cambia las siguientes preguntas del escáner.",
      content: (
        <div className="grid gap-2">
          {[["yes", "Sí"], ["no", "No"], ["pending", "Estoy esperando respuesta"], ["unsure", "No estoy seguro"]].map(([value, label]) => (
            <OptionButton key={value} label={label} selected={answers.hasVisa === value} onClick={() => updateAnswer("hasVisa", value)} />
          ))}
          {answers.hasVisa === "no" && (
            <div className="border border-[#263a50] bg-[#08182b] p-3 font-mono text-[11px] font-bold leading-relaxed text-[#cfc7b8]">
              No tienes visa australiana activa. Omitiremos preguntas de vencimiento y revisaremos rutas de entrada.
            </div>
          )}
          {answers.hasVisa === "pending" && (
            <div className="border border-[#ffd15a] bg-[#150f05] p-3 font-mono text-[11px] font-bold leading-relaxed text-[#ffe0a3]">
              Como estás esperando respuesta, no preguntaremos vencimiento. Guarda el estado de tu solicitud y revisa cualquier comunicación oficial.
            </div>
          )}
          {answers.hasVisa === "unsure" && (
            <div className="border border-[#4a5568] bg-[#0b1422] p-3 font-mono text-[11px] font-bold leading-relaxed text-[#c9c3b5]">
              Si no estás seguro, primero confirma tu estado migratorio antes de tomar decisiones.
            </div>
          )}
        </div>
      ),
    },
  ];

  if (answers.hasVisa === "yes") {
    questions.push(
      {
        block: "Bloque 3 de 6",
        title: "¿Qué tipo de visa tienes?",
        description: "Esto ayuda a revisar condiciones y posibles siguientes pasos.",
        content: (
          <div className="grid gap-2">
            {["Student", "Visitor", "Working Holiday", "Graduate", "Partner", "Skilled", "Otra", "No estoy seguro"].map((label) => (
              <OptionButton key={label} label={label} selected={answers.currentVisa === label} onClick={() => updateAnswer("currentVisa", label)} />
            ))}
          </div>
        ),
      },
      {
        block: "Bloque 3 de 6",
        title: "¿Tu visa vence pronto?",
        description: "Si el vencimiento está cerca, el riesgo de tiempo sube.",
        content: (
          <div className="grid gap-2">
            {["Menos de 30 días", "1 a 3 meses", "3 a 6 meses", "Más de 6 meses", "No sé"].map((label) => (
              <OptionButton key={label} label={label} selected={answers.visaExpiry === label} onClick={() => updateAnswer("visaExpiry", label)} />
            ))}
          </div>
        ),
      }
    );
  }

  questions.push(
    {
      block: "Bloque 4 de 6",
      title: "¿Cuál es tu nivel de inglés?",
      description: "El inglés puede afectar estudio, trabajo, empleabilidad y algunas rutas migratorias.",
      content: (
        <div className="grid gap-2">
          {["Básico", "Intermedio", "Avanzado", "Tengo examen oficial", "No lo sé"].map((label) => (
            <OptionButton key={label} label={label} selected={answers.englishLevel === label} onClick={() => updateAnswer("englishLevel", label)} />
          ))}
        </div>
      ),
    },
    {
      block: "Bloque 4 de 6",
      title: "¿Cuál es tu nivel máximo de estudios?",
      description: "Esto ayuda a ubicar rutas de estudio, trabajo o preparación.",
      content: (
        <div className="grid gap-2">
          {["Secundaria/preparatoria", "Carrera técnica", "Licenciatura", "Maestría", "Doctorado", "Otro"].map((label) => (
            <OptionButton key={label} label={label} selected={answers.education === label} onClick={() => updateAnswer("education", label)} />
          ))}
        </div>
      ),
    },
    {
      block: "Bloque 4 de 6",
      title: "¿Tienes experiencia laboral comprobable?",
      description: "La experiencia importa si después exploramos rutas laborales o skilled.",
      content: (
        <div className="grid gap-2">
          {[["none", "No"], ["less_1_year", "Menos de 1 año"], ["1_3_years", "1 a 3 años"], ["3_5_years", "3 a 5 años"], ["more_5_years", "Más de 5 años"]].map(([value, label]) => (
            <OptionButton key={value} label={label} selected={answers.workExperience === value} onClick={() => updateAnswer("workExperience", value)} />
          ))}
        </div>
      ),
    },
    {
      block: "Bloque 4 de 6",
      title: "¿Cuál es tu área laboral principal?",
      description: "Este listado se ajusta según tus respuestas anteriores. En M04 se revisan ocupaciones oficiales relacionadas.",
      content: (
        <div className="grid gap-3">
          <div className="grid gap-2">
            {categories.map((category) => (
              <OptionButton key={category.id} label={category.label} description={category.examples} selected={answers.workCategory === category.id} onClick={() => updateAnswer("workCategory", category.id)} />
            ))}
          </div>
          {answers.workCategory === "other" && (
            <input
              className="border-2 border-[#314258] bg-[#08182b] px-3 py-3 font-mono text-sm font-bold text-[#fff1d0] outline-none focus:border-[#ffd15a]"
              value={answers.workCategoryOther || ""}
              onChange={(event) => updateAnswer("workCategoryOther", event.target.value)}
              placeholder="Ej. fotógrafo, barista, editor de video"
            />
          )}
          {selectedCategory && selectedCategory.id !== "other" && (
            <div className="border border-[#263a50] bg-[#08182b] p-3 font-mono text-[11px] font-bold leading-relaxed text-[#cfc7b8]">
              Categoría elegida: <span className="text-[#ffd15a]">{selectedCategory.label}</span>. En M04 se revisará si existe una ocupación oficial relacionada.
            </div>
          )}
          <SourceCard source={officialSources.skilledOccupationList} />
          <SourceCard source={officialSources.coreSkillsOccupationList} />
        </div>
      ),
    },
    {
      block: "Bloque 5 de 6",
      title: "¿Cuál es tu presupuesto aproximado para empezar?",
      description: "Esto no juzga tu situación. Solo ayuda a detectar si una ruta puede ser realista.",
      content: (
        <div className="grid gap-2">
          {["Menos de 2,000 AUD", "2,000 a 5,000 AUD", "5,000 a 10,000 AUD", "10,000 a 20,000 AUD", "Más de 20,000 AUD", "No lo sé"].map((label) => (
            <OptionButton key={label} label={label} selected={answers.budget === label} onClick={() => updateAnswer("budget", label)} />
          ))}
        </div>
      ),
    },
    {
      block: "Bloque 5 de 6",
      title: "¿Cuándo quieres avanzar?",
      description: "La urgencia cambia el nivel de riesgo y el orden de las siguientes misiones.",
      content: (
        <div className="grid gap-2">
          {["Lo antes posible", "1 a 3 meses", "3 a 6 meses", "6 a 12 meses", "Solo estoy explorando"].map((label) => (
            <OptionButton key={label} label={label} selected={answers.urgency === label} onClick={() => updateAnswer("urgency", label)} />
          ))}
        </div>
      ),
    },
    {
      block: "Bloque 5 de 6",
      title: "¿Qué documentos básicos tienes listos?",
      description: "Puedes seleccionar más de uno. Si eliges Ninguno todavía, se limpian las demás opciones.",
      content: (
        <div className="grid gap-2">
          {documentOptions.map((label) => (
            <OptionButton key={label} label={label} selected={Array.isArray(answers.documentsReady) && answers.documentsReady.includes(label)} onClick={() => toggleDocument(label)} />
          ))}
        </div>
      ),
    },
    {
      block: "Bloque 6 de 6",
      title: "¿Qué es lo que más te preocupa ahora?",
      description: "Esta respuesta ayuda a personalizar el siguiente paso.",
      content: (
        <div className="grid gap-2">
          {[
            ["visa_confusion", "No saber qué visa revisar"],
            ["budget", "No tener suficiente dinero"],
            ["english", "No saber inglés"],
            ["documents", "No tener documentos"],
            ["mistake", "Equivocarme en el proceso"],
            ["work", "No conseguir trabajo"],
            ["profile", "No saber si mi perfil sirve"],
            ["starting_point", "No saber por dónde empezar"],
          ].map(([value, label]) => (
            <OptionButton key={value} label={label} selected={answers.mainRisk === value} onClick={() => updateAnswer("mainRisk", value)} />
          ))}
        </div>
      ),
    }
  );

  const safeQuestionIndex = Math.min(questionIndex, questions.length - 1);
  const currentQuestion = questions[safeQuestionIndex];
  const questionProgress = Math.round(((safeQuestionIndex + 1) / questions.length) * 100);
  const isLastQuestion = safeQuestionIndex === questions.length - 1;

  return (
    <div className="relative px-4 pb-28 pt-4">
      <PixelShell glow className="p-4 shadow-[0_0_24px_rgba(255,209,90,0.18)]">
        <div className="relative flex items-start gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-[#ffd15a] bg-[#3a2505] text-[#ffd15a]">
            <Icon type="target" size={30} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-xs font-black uppercase tracking-[0.24em] text-[#ff9f1c]">M02 · Diagnóstico</p>
            <h2 className="mt-1 font-mono text-2xl font-black uppercase leading-none text-[#fff1d0]">Escáner de situación</h2>
            <p className="mt-3 font-mono text-sm font-bold leading-relaxed text-[#cfc7b8]">Pregunta por pregunta. Sin saltarte pasos clave.</p>
          </div>
        </div>
      </PixelShell>

      <div className="mt-4 grid gap-4">
        <PixelShell className="p-4">
          <div className="relative">
            <div className="mb-2 flex items-center justify-between font-mono text-xs font-black uppercase tracking-widest text-[#ffd15a]">
              <span>{currentQuestion.block}</span>
              <span>{safeQuestionIndex + 1}/{questions.length} · {questionProgress}%</span>
            </div>
            <ProgressBlocks value={questionProgress} />
            <h3 className="mt-4 font-mono text-xl font-black uppercase text-[#fff1d0]">{currentQuestion.title}</h3>
            {currentQuestion.description && <p className="mt-2 font-mono text-sm font-bold leading-relaxed text-[#cfc7b8]">{currentQuestion.description}</p>}
          </div>
        </PixelShell>

        <PixelShell className="p-4">
          <div className="relative">{currentQuestion.content}</div>
        </PixelShell>

        <div className="grid grid-cols-[1fr_1fr] gap-3">
          <button
            type="button"
            onClick={() => {
              if (safeQuestionIndex === 0) onBack();
              else setQuestionIndex((current) => Math.max(0, current - 1));
            }}
            className="border-2 border-[#314258] bg-[#07111f] px-3 py-3 font-mono text-xs font-black uppercase tracking-widest text-[#cfc7b8] shadow-[0_5px_0_rgba(0,0,0,0.45)]"
          >
            {safeQuestionIndex === 0 ? "Volver mapa" : "Atrás"}
          </button>
          <button
            type="button"
            onClick={() => {
              if (isLastQuestion) onComplete();
              else setQuestionIndex((current) => Math.min(questions.length - 1, current + 1));
            }}
            className="border-2 border-[#ffd15a] bg-[#a8621f] px-3 py-3 font-mono text-xs font-black uppercase tracking-widest text-[#1b1208] shadow-[0_5px_0_rgba(0,0,0,0.55)]"
          >
            {isLastQuestion ? "Completar diagnóstico" : "Siguiente"}
          </button>
        </div>
      </div>
    </div>
  );
}

function DiagnosisSummaryScreen({ answers, onBackToMap, onOpenRiskMission }) {
  const summary = getDiagnosisSummary(answers);

  return (
    <div className="relative px-4 pb-28 pt-4">
      <PixelShell glow className="p-4 shadow-[0_0_24px_rgba(116,242,77,0.18)]">
        <div className="relative flex items-start gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-[#74f24d] bg-[#092414] text-[#74f24d]">
            <Icon type="check" size={30} />
          </div>
          <div>
            <p className="font-mono text-xs font-black uppercase tracking-[0.24em] text-[#74f24d]">Escáner completado</p>
            <h2 className="mt-1 font-mono text-2xl font-black uppercase leading-none text-[#fff1d0]">Tu punto de partida</h2>
          </div>
        </div>
      </PixelShell>

      <div className="mt-4 grid gap-4">
        <PixelShell className="p-4">
          <div className="relative grid gap-3 font-mono">
            <div className="border border-[#263a50] bg-[#08182b] p-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">Clasificación inicial</p>
              <p className="mt-1 text-lg font-black text-[#fff1d0]">{summary.point}</p>
            </div>
            <div className="border border-[#263a50] bg-[#08182b] p-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">Situación</p>
              <p className="mt-1 text-sm font-bold leading-relaxed text-[#cfc7b8]">{summary.situation}</p>
            </div>
            <div className="border border-[#263a50] bg-[#08182b] p-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">Riesgo principal</p>
              <p className="mt-1 text-sm font-bold leading-relaxed text-[#cfc7b8]">{summary.risk}</p>
            </div>
            <div className="border border-[#ffd15a] bg-[#150f05] p-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">Siguiente misión desbloqueada</p>
              <p className="mt-1 text-sm font-black text-[#fff1d0]">{summary.next}</p>
            </div>
          </div>
        </PixelShell>

        <div className="grid grid-cols-[1fr_1.4fr] gap-3">
          <button type="button" onClick={onBackToMap} className="border-2 border-[#314258] bg-[#07111f] px-3 py-3 font-mono text-xs font-black uppercase tracking-widest text-[#cfc7b8] shadow-[0_5px_0_rgba(0,0,0,0.45)]">
            Volver al mapa
          </button>
          <button type="button" onClick={onOpenRiskMission} className="border-2 border-[#ffd15a] bg-[#a8621f] px-3 py-3 font-mono text-xs font-black uppercase tracking-widest text-[#1b1208] shadow-[0_5px_0_rgba(0,0,0,0.55)]">
            Abrir M03
          </button>
        </div>
      </div>
    </div>
  );
}

function formatDocuments(documentsReady) {
  if (Array.isArray(documentsReady)) {
    return documentsReady.length > 0 ? documentsReady.join(", ") : "No registrado";
  }
  return documentsReady || "No registrado";
}

function getRiskComparisonData(answers) {
  const documentCount = Array.isArray(answers.documentsReady) ? answers.documentsReady.filter((item) => item !== "Ninguno todavía").length : 0;
  const hasNoDocuments = Array.isArray(answers.documentsReady) && answers.documentsReady.includes("Ninguno todavía");
  const workArea = getWorkCategoryLabel(answers.workCategory, answers.workCategoryOther);

  const budgetGap = (() => {
    if (!answers.budget || answers.budget === "No lo sé") return "Aún no tienes claridad financiera suficiente para comparar rutas con seguridad.";
    if (answers.budget === "Menos de 2,000 AUD") return "Tu presupuesto puede ser demasiado ajustado para varias rutas y podría aumentar el riesgo financiero.";
    if (answers.budget === "2,000 a 5,000 AUD") return "Tienes una base inicial, pero algunas rutas podrían exigir más respaldo económico.";
    return "Tienes una base más sólida, pero aún falta contrastarla con costos reales de la ruta que elijas.";
  })();

  const timeGap = (() => {
    if (functionallyHasVisaExpiryRisk(answers)) return "El tiempo disponible es corto y eso aumenta el riesgo de errores o decisiones apresuradas.";
    if (answers.urgency === "Lo antes posible") return "Tu urgencia puede empujarte a decidir sin suficiente claridad.";
    if (answers.urgency === "3 a 6 meses" || answers.urgency === "6 a 12 meses") return "Tienes mejor margen para planear, pero aún debes usarlo estratégicamente.";
    return "Falta definir una línea de tiempo clara para ordenar tus siguientes pasos.";
  })();

  const documentsGap = (() => {
    if (!answers.documentsReady || hasNoDocuments) return "Aún no tienes base documental para comparar rutas con suficiente claridad.";
    if (documentCount <= 2) return "Tienes un inicio, pero aún faltan piezas clave para avanzar con seguridad.";
    return "Vas bien encaminado, pero todavía hay que revisar si tus documentos son suficientes para la ruta específica.";
  })();

  const englishGap = (() => {
    if (!answers.englishLevel || answers.englishLevel === "No lo sé") return "Aún no tienes claridad sobre tu nivel real y eso puede dificultar la planificación.";
    if (answers.englishLevel === "Básico") return "El inglés podría limitar varias rutas o hacer más difícil el proceso.";
    if (answers.englishLevel === "Intermedio") return "Tienes una base útil, pero algunas rutas podrían exigir mejor nivel o evidencia formal.";
    return "Tienes una base más sólida, aunque igual debe revisarse según la ruta específica.";
  })();

  const experienceGap = (() => {
    if (!answers.workExperience || answers.workExperience === "none" || answers.workExperience === "less_1_year") return "Tu experiencia todavía puede ser limitada para ciertas rutas laborales o skilled.";
    if (answers.workExperience === "1_3_years") return "Tienes una base útil, pero puede que aún falte fortalecer perfil o evidencia.";
    if (answers.workCategory === "other") return "Falta aterrizar tu experiencia en una categoría u ocupación más concreta.";
    return "Tienes una base más competitiva, aunque todavía hay que validar ocupación y evidencia.";
  })();

  const visaGap = (() => {
    if (answers.hasVisa === "no") return "No tienes visa activa, así que el enfoque debe estar en revisar rutas de entrada.";
    if (answers.hasVisa === "pending") return "Tu situación depende del resultado de una solicitud en curso, por lo que conviene actuar con cautela.";
    if (answers.hasVisa === "unsure") return "Falta claridad básica sobre tu situación migratoria, y eso es un bloqueo importante.";
    if (functionallyHasVisaExpiryRisk(answers)) return "Tu margen de maniobra puede ser corto y eso aumenta el riesgo de decisiones apresuradas.";
    return "Tienes una situación migratoria identificada, pero aún hay que revisar condiciones reales y restricciones.";
  })();

  return [
    {
      id: "budget",
      title: "Presupuesto",
      level: answers.budget === "Menos de 2,000 AUD" || answers.budget === "No lo sé" ? "Alto" : answers.budget ? "Medio" : "Pendiente",
      current: answers.budget || "No registrado",
      ideal: "Presupuesto claro, realista y alineado con la ruta que quieres explorar, incluyendo costos iniciales y margen de emergencia.",
      gap: budgetGap,
      nextStep: "Calcular costos base de la ruta que más te interese antes de tomar decisiones.",
      note: "Antes de elegir ruta necesitas saber si el presupuesto alcanza para aplicar, moverte y sobrevivir las primeras semanas.",
    },
    {
      id: "time",
      title: "Tiempo y urgencia",
      level: answers.urgency === "Lo antes posible" || functionallyHasVisaExpiryRisk(answers) ? "Alto" : answers.urgency ? "Medio" : "Pendiente",
      current: functionallyHasVisaExpiryRisk(answers) ? `Visa vence: ${answers.visaExpiry}` : answers.urgency || answers.visaExpiry || "No registrado",
      ideal: "Tiempo suficiente para revisar opciones, reunir documentos y validar requisitos antes de avanzar.",
      gap: timeGap,
      nextStep: "Definir una línea de tiempo realista y priorizar lo más urgente primero.",
      note: "Entre menos tiempo tengas, más importante es verificar condiciones oficiales antes de tomar decisiones.",
    },
    {
      id: "documents",
      title: "Documentos",
      level: !answers.documentsReady || hasNoDocuments ? "Pendiente" : documentCount <= 2 ? "Medio" : "Bajo",
      current: formatDocuments(answers.documentsReady),
      ideal: "Documentos base reunidos para la ruta que quieres explorar, al menos en versión preliminar.",
      gap: documentsGap,
      nextStep: "Hacer un inventario de documentos y completar primero los que más impacto tengan.",
      note: "Documentos incompletos pueden retrasar cualquier ruta, incluso si el perfil parece prometedor.",
    },
    {
      id: "english",
      title: "Inglés",
      level: answers.englishLevel === "Básico" || answers.englishLevel === "No lo sé" ? "Medio" : answers.englishLevel ? "Bajo" : "Pendiente",
      current: answers.englishLevel || "No registrado",
      ideal: "Nivel de inglés funcional y, si la ruta lo requiere, evidencia oficial válida.",
      gap: englishGap,
      nextStep: "Definir tu nivel real y revisar si necesitas mejorar inglés o presentar examen oficial.",
      note: "El inglés puede afectar estudio, trabajo, empleabilidad y algunas rutas migratorias.",
    },
    {
      id: "experience",
      title: "Experiencia laboral",
      level: answers.workExperience === "none" || answers.workExperience === "less_1_year" ? "Medio" : answers.workExperience ? "Bajo" : "Pendiente",
      current: `${getWorkExperienceLabel(answers.workExperience)} · ${workArea}`,
      ideal: "Experiencia laboral clara, relacionada con un área identificable y preferentemente comprobable.",
      gap: experienceGap,
      nextStep: "Ordenar tu experiencia laboral y revisar cómo se alinea con ocupaciones o rutas posibles.",
      note: "La experiencia debe poder explicarse y comprobarse si después se exploran rutas laborales o skilled.",
    },
    {
      id: "visa",
      title: "Situación migratoria",
      level: functionallyHasVisaExpiryRisk(answers) ? "Alto" : answers.hasVisa ? "Medio" : "Pendiente",
      current: answers.currentVisa || answers.hasVisa || "No registrado",
      ideal: "Estado migratorio claro, entendido y alineado con el siguiente paso que quieres tomar.",
      gap: visaGap,
      nextStep: "Confirmar tu estado migratorio y revisar primero las condiciones reales de tu situación actual.",
      note: "Si ya estás dentro de Australia, las condiciones de tu visa actual importan antes de planear el siguiente paso.",
    },
  ];
}

function RiskLimitsScreen({ answers, onBackToMap, onOpenRoutes, onCompleteMission }) {
  const summary = getDiagnosisSummary(answers);
  const [expandedRiskId, setExpandedRiskId] = useState(null);
  const riskChecks = getRiskComparisonData(answers);

  const levelStyles = {
    Alto: "border-[#ff6b35] bg-[#2b1208] text-[#ffb089]",
    Medio: "border-[#ffd15a] bg-[#211704] text-[#ffe0a3]",
    Bajo: "border-[#74f24d] bg-[#092414] text-[#caffbd]",
    Pendiente: "border-[#4a5568] bg-[#0b1422] text-[#c9c3b5]",
  };

  return (
    <div className="relative px-4 pb-28 pt-4">
      <PixelShell glow className="p-4 shadow-[0_0_24px_rgba(255,159,28,0.18)]">
        <div className="relative flex items-start gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-[#ff9f1c] bg-[#2b1604] text-[#ff9f1c]">
            <Icon type="alert" size={30} />
          </div>
          <div>
            <p className="font-mono text-xs font-black uppercase tracking-[0.24em] text-[#ff9f1c]">M03 · Riesgos y Límites</p>
            <h2 className="mt-1 font-mono text-2xl font-black uppercase leading-none text-[#fff1d0]">Zona de revisión</h2>
            <p className="mt-3 font-mono text-sm font-bold leading-relaxed text-[#cfc7b8]">
              Toca cada tarjeta para ver la comparación entre tu situación actual y una base ideal.
            </p>
          </div>
        </div>
      </PixelShell>

      <div className="mt-4 grid gap-4">
        <PixelShell className="p-4">
          <div className="relative grid gap-3 font-mono">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ffd15a]">Resumen del escáner</p>
            <div className="border border-[#263a50] bg-[#08182b] p-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">Punto de partida</p>
              <p className="mt-1 text-sm font-black text-[#fff1d0]">{summary.point}</p>
            </div>
            <div className="border border-[#263a50] bg-[#08182b] p-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">Riesgo declarado</p>
              <p className="mt-1 text-sm font-bold leading-relaxed text-[#cfc7b8]">{summary.risk}</p>
            </div>
          </div>
        </PixelShell>

        <div className="grid gap-3">
          {riskChecks.map((risk) => {
            const isExpanded = expandedRiskId === risk.id;
            return (
              <PixelShell key={risk.id} className="p-3">
                <button
                  type="button"
                  onClick={() => setExpandedRiskId(isExpanded ? null : risk.id)}
                  className="relative w-full text-left font-mono"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-black uppercase tracking-wider text-[#fff1d0]">{risk.title}</p>
                      <p className="mt-1 text-[11px] font-bold leading-snug text-[#aeb7c2]">{risk.current}</p>
                    </div>
                    <span className={`shrink-0 border-2 px-2 py-1 text-[10px] font-black uppercase tracking-widest ${levelStyles[risk.level]}`}>
                      {risk.level}
                    </span>
                  </div>
                  <p className="mt-3 text-[11px] font-bold leading-relaxed text-[#cfc7b8]">{risk.note}</p>
                  <p className="mt-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#ffd15a]">
                    {isExpanded ? "▲ Ocultar detalles" : "▼ Ver más detalles"}
                  </p>
                </button>

                {isExpanded && (
                  <div className="relative mt-4 grid gap-3 border-t border-[#263a50] pt-4 font-mono" style={{ animation: "fadeInUp 220ms ease both" }}>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="border border-[#263a50] bg-[#08182b] p-3">
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">Estado actual</p>
                        <p className="mt-1 text-xs font-bold leading-relaxed text-[#e8dcc8]">{risk.current}</p>
                      </div>
                      <div className="border border-[#263a50] bg-[#08182b] p-3">
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#74f24d]">Situación ideal</p>
                        <p className="mt-1 text-xs font-bold leading-relaxed text-[#e8dcc8]">{risk.ideal}</p>
                      </div>
                    </div>
                    <div className="border border-[#ffd15a] bg-[#150f05] p-3">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">Brecha detectada</p>
                      <p className="mt-1 text-xs font-bold leading-relaxed text-[#e8dcc8]">{risk.gap}</p>
                    </div>
                    <div className="border border-[#74f24d] bg-[#092414] p-3">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#74f24d]">Siguiente paso</p>
                      <p className="mt-1 text-xs font-bold leading-relaxed text-[#e8dcc8]">{risk.nextStep}</p>
                    </div>
                  </div>
                )}
              </PixelShell>
            );
          })}
        </div>

        <PixelShell className="p-4">
          <div className="relative flex gap-3">
            <Icon type="info" className="mt-0.5 shrink-0 text-[#ffd15a]" size={20} />
            <p className="font-mono text-xs font-bold leading-relaxed text-[#e8dcc8]">
              Esta pantalla no decide si puedes aplicar a una visa. Solo ordena riesgos para que M04 pueda comparar rutas con menos confusión.
            </p>
          </div>
        </PixelShell>
        <div className="grid grid-cols-[1fr_1.4fr] gap-3">
          <button type="button" onClick={onBackToMap} className="border-2 border-[#314258] bg-[#07111f] px-3 py-3 font-mono text-xs font-black uppercase tracking-widest text-[#cfc7b8] shadow-[0_5px_0_rgba(0,0,0,0.45)]">
            Volver mapa
          </button>
          <button
            type="button"
            onClick={() => {
              onCompleteMission();
              onOpenRoutes();
            }}
            className="border-2 border-[#ffd15a] bg-[#a8621f] px-3 py-3 font-mono text-xs font-black uppercase tracking-widest text-[#1b1208] shadow-[0_5px_0_rgba(0,0,0,0.55)]"
          >
            Abrir M04
          </button>
        </div>
      </div>
    </div>
  );
}

function ProfessionalAdvicePanel({ route, answers, compact = false }) {
  const assessment = getProfessionalAdviceAssessment(route, answers);
  const styles = {
    Alto: "border-[#ff6b35] bg-[#2b1208] text-[#ffb089]",
    Medio: "border-[#ffd15a] bg-[#211704] text-[#ffe0a3]",
    Bajo: "border-[#74f24d] bg-[#092414] text-[#caffbd]",
  };

  return (
    <PixelShell className="p-4">
      <div className="relative grid gap-3 font-mono">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-[#ff9f1c] bg-[#2b1604] text-[#ff9f1c]">
            <Icon type="alert" size={22} />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ff9f1c]">¿Necesito apoyo profesional?</p>
            <p className="mt-2 text-sm font-black uppercase leading-tight text-[#fff1d0]">{assessment.title}</p>
          </div>
        </div>

        <div className={`border-2 p-3 ${styles[assessment.level]}`}>
          <p className="text-[10px] font-black uppercase tracking-widest">Nivel de complejidad</p>
          <p className="mt-1 text-lg font-black uppercase">{assessment.level}</p>
          <p className="mt-2 text-xs font-bold leading-relaxed">{assessment.summary}</p>
        </div>

        {!compact && (
          <div className="grid gap-2">
            {assessment.reasons.map((reason) => (
              <div key={reason} className="border border-[#263a50] bg-[#08182b] p-3 text-xs font-bold leading-relaxed text-[#e8dcc8]">
                {reason}
              </div>
            ))}
          </div>
        )}

        <div className="border border-[#263a50] bg-[#08182b] p-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">Siguiente paso</p>
          <p className="mt-1 text-xs font-bold leading-relaxed text-[#cfc7b8]">{assessment.action}</p>
        </div>

        <SourceCard
          source={officialSources.omara}
          title="Verificar agente registrado"
          description="Usa el registro oficial para comprobar que la persona esté autorizada antes de pagar asesoría migratoria."
        />
      </div>
    </PixelShell>
  );
}

function StudentProviderSearchPanel() {
  const [studyArea, setStudyArea] = useState(studentStudyAreas[0].id);
  const selectedArea = studentStudyAreas.find((area) => area.id === studyArea) || studentStudyAreas[0];

  return (
    <PixelShell className="p-4">
      <div className="relative grid gap-3 font-mono">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ffd15a]">Escuelas y cursos oficiales</p>
          <p className="mt-2 text-xs font-bold leading-relaxed text-[#cfc7b8]">
            Para Student visa, busca proveedores y cursos registrados en CRICOS. No basta con que una escuela exista: el curso y el proveedor deben estar registrados para estudiantes internacionales.
          </p>
        </div>

        <label className="grid gap-2 text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">
          Área de búsqueda
          <select
            className="border-2 border-[#314258] bg-[#08182b] px-3 py-3 font-mono text-xs font-bold normal-case tracking-normal text-[#fff1d0] outline-none focus:border-[#ffd15a]"
            value={studyArea}
            onChange={(event) => setStudyArea(event.target.value)}
          >
            {studentStudyAreas.map((area) => (
              <option key={area.id} value={area.id}>{area.label}</option>
            ))}
          </select>
        </label>

        <div className="border border-[#263a50] bg-[#08182b] p-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#74f24d]">Qué buscar en CRICOS</p>
          <p className="mt-1 text-xs font-bold leading-relaxed text-[#e8dcc8]">{selectedArea.search}</p>
          <p className="mt-2 text-[11px] font-bold leading-relaxed text-[#aeb7c2]">{selectedArea.note}</p>
        </div>

        <div className="grid gap-2">
          <a
            className="border-2 border-[#ffd15a] bg-[#3a2505] px-3 py-3 text-center text-xs font-black uppercase tracking-widest text-[#ffd15a] shadow-[0_4px_0_rgba(0,0,0,0.45)]"
            href={officialSources.cricos.url}
            target="_blank"
            rel="noreferrer"
          >
            Abrir búsqueda oficial CRICOS →
          </a>
          <SourceCard source={officialSources.cricos} />
        </div>
      </div>
    </PixelShell>
  );
}

function WhmPassportStatusPanel({ route }) {
  if (!route.whmMatches || route.whmMatches.length === 0) return null;

  const statusStyles = {
    open: "border-[#74f24d] bg-[#092414] text-[#caffbd]",
    not_capped: "border-[#74f24d] bg-[#092414] text-[#caffbd]",
    ballot: "border-[#ffd15a] bg-[#211704] text-[#ffe0a3]",
    paused: "border-[#ffd15a] bg-[#211704] text-[#ffe0a3]",
    closed: "border-[#ff6b35] bg-[#2b1208] text-[#ffb089]",
    undefined: "border-[#4a5568] bg-[#0b1422] text-[#c9c3b5]",
  };

  return (
    <PixelShell className="p-4">
      <div className="relative grid gap-3 font-mono">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ffd15a]">Lectura por pasaporte</p>
        {route.whmMatches.map((match) => (
          <div key={match.country} className="border border-[#263a50] bg-[#08182b] p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-black uppercase text-[#fff1d0]">{match.country}</p>
                <p className="mt-1 text-[11px] font-bold leading-relaxed text-[#cfc7b8]">
                  {match.eligible
                    ? `Subclass ${match.subclass} · edad ${match.ageLimit} · cupo: ${match.cap}`
                    : "No aparece como pasaporte WHM elegible en la tabla cargada."}
                </p>
              </div>
              <span className={`shrink-0 border-2 px-2 py-1 text-[10px] font-black uppercase tracking-widest ${statusStyles[match.capStatus] || statusStyles.undefined}`}>
                {match.eligible ? getCapStatusLabel(match.capStatus) : "Verificar"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </PixelShell>
  );
}

function RouteDetailScreen({ route, answers, onBack, onOpenResources, onSelectRoute }) {
  return (
    <div className="relative px-4 pb-28 pt-4">
      <PixelShell glow className="p-4 shadow-[0_0_24px_rgba(255,209,90,0.18)]">
        <div className="relative flex items-start gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-[#ffd15a] bg-[#3a2505] text-[#ffd15a]">
            <Icon type="route" size={30} />
          </div>
          <div>
            <p className="font-mono text-xs font-black uppercase tracking-[0.24em] text-[#ff9f1c]">Detalle de ruta</p>
            <h2 className="mt-1 font-mono text-2xl font-black uppercase leading-none text-[#fff1d0]">{route.title}</h2>
            <p className="mt-3 font-mono text-sm font-bold leading-relaxed text-[#cfc7b8]">
              Esta es una ruta para explorar, no una recomendación final ni una validación de elegibilidad.
            </p>
          </div>
        </div>
      </PixelShell>

      <div className="mt-4 grid gap-4">
        <PixelShell className="p-4">
          <div className="relative grid gap-3 font-mono">
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-[#263a50] bg-[#08182b] p-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">Nivel</p>
                <p className="mt-1 text-sm font-black text-[#fff1d0]">{route.level}</p>
              </div>
              <div className="border border-[#263a50] bg-[#08182b] p-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">Riesgo</p>
                <p className="mt-1 text-sm font-black text-[#fff1d0]">{route.risk}</p>
              </div>
            </div>

            <div className="border border-[#263a50] bg-[#08182b] p-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">Por qué aparece</p>
              <p className="mt-1 text-xs font-bold leading-relaxed text-[#cfc7b8]">{route.reason}</p>
            </div>

            <div className="border border-[#ffd15a] bg-[#150f05] p-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">Qué falta confirmar</p>
              <p className="mt-1 text-xs font-bold leading-relaxed text-[#e8dcc8]">{route.missing}</p>
            </div>

            <div className="border border-[#74f24d] bg-[#092414] p-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#74f24d]">Recomendable para...</p>
              <p className="mt-1 text-xs font-bold leading-relaxed text-[#e8dcc8]">{route.recommendedFor}</p>
            </div>

            <div className="border border-[#74f24d] bg-[#092414] p-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#74f24d]">Siguiente acción recomendada</p>
              <p className="mt-1 text-xs font-bold leading-relaxed text-[#e8dcc8]">
                Revisa la fuente oficial, compara requisitos y después valida si tus recursos iniciales son suficientes en M05.
              </p>
            </div>
          </div>
        </PixelShell>

        <ProfessionalAdvicePanel route={route} answers={answers} />

        {route.id === "student" && <StudentProviderSearchPanel />}

        <WhmPassportStatusPanel route={route} />

        <SourceCard source={route.source} />
        {route.secondarySource && <SourceCard source={route.secondarySource} />}

        <PixelShell className="p-4">
          <div className="relative flex gap-3">
            <Icon type="alert" className="mt-0.5 shrink-0 text-[#ff9f1c]" size={20} />
            <p className="font-mono text-xs font-bold leading-relaxed text-[#e8dcc8]">
              Verifica siempre requisitos vigentes, condiciones, documentos y costos en fuentes oficiales antes de tomar decisiones.
            </p>
          </div>
        </PixelShell>

        <div className="grid grid-cols-[1fr_1.4fr] gap-3">
          <button type="button" onClick={onBack} className="border-2 border-[#314258] bg-[#07111f] px-3 py-3 font-mono text-xs font-black uppercase tracking-widest text-[#cfc7b8] shadow-[0_5px_0_rgba(0,0,0,0.45)]">
            Volver a rutas
          </button>
          <button
            type="button"
            onClick={() => {
              onSelectRoute(route);
              onOpenResources();
            }}
            className="border-2 border-[#ffd15a] bg-[#a8621f] px-3 py-3 font-mono text-xs font-black uppercase tracking-widest text-[#1b1208] shadow-[0_5px_0_rgba(0,0,0,0.55)]"
          >
            Seleccionar y revisar recursos
          </button>
        </div>
      </div>
    </div>
  );
}

function RouteComparatorScreen({ answers, selectedRoute: savedSelectedRoute, onBackToMap, onOpenRoutes }) {
  const routes = getFilteredRoutes(answers);
  const comparisonRoutes = routes.slice(0, 5);
  return (
    <div className="relative px-4 pb-28 pt-4">
      <PixelShell glow className="p-4 shadow-[0_0_24px_rgba(255,209,90,0.18)]">
        <div className="relative flex items-start gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-[#ffd15a] bg-[#3a2505] text-[#ffd15a]">
            <Icon type="route" size={30} />
          </div>
          <div>
            <p className="font-mono text-xs font-black uppercase tracking-[0.24em] text-[#ff9f1c]">M04-B · Comparador</p>
            <h2 className="mt-1 font-mono text-2xl font-black uppercase leading-none text-[#fff1d0]">Comparar rutas</h2>
            <p className="mt-3 font-mono text-sm font-bold leading-relaxed text-[#cfc7b8]">
              Compara ventajas, desventajas y cuándo conviene cada ruta. Puedes volver a Rutas para ver el detalle completo.
            </p>
          </div>
        </div>
      </PixelShell>

      <div className="mt-4 grid gap-4">
        {comparisonRoutes.map((route) => {
          const comparison = getRouteComparison(route);
          const isSelected = savedSelectedRoute?.id === route.id && savedSelectedRoute?.title === route.title;
          return (
            <PixelShell key={`compare-${route.id}-${route.title}`} className={`p-4 ${isSelected ? "border-[#74f24d]" : ""}`}>
              <div className="relative grid gap-3 font-mono">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-black uppercase text-[#fff1d0]">{route.title}</p>
                    <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">{route.level} · {route.risk}</p>
                  </div>
                  {isSelected && <span className="shrink-0 border-2 border-[#74f24d] px-2 py-1 text-[9px] font-black uppercase tracking-widest text-[#74f24d]">Seleccionada</span>}
                </div>

                <div className="border border-[#263a50] bg-[#06101f] p-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#74f24d]">Conviene si...</p>
                  <p className="mt-1 text-xs font-bold leading-relaxed text-[#e8dcc8]">{comparison.bestFor}</p>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="border border-[#263a50] bg-[#06101f] p-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#74f24d]">Ventajas</p>
                    <div className="mt-2 grid gap-1">
                      {comparison.advantages.map((item) => <p key={item} className="text-xs font-bold leading-relaxed text-[#e8dcc8]">✓ {item}</p>)}
                    </div>
                  </div>
                  <div className="border border-[#263a50] bg-[#06101f] p-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#ff9f1c]">Desventajas</p>
                    <div className="mt-2 grid gap-1">
                      {comparison.disadvantages.map((item) => <p key={item} className="text-xs font-bold leading-relaxed text-[#e8dcc8]">! {item}</p>)}
                    </div>
                  </div>
                </div>
              </div>
            </PixelShell>
          );
        })}

        <div className="grid grid-cols-[1fr_1.4fr] gap-3">
          <button type="button" onClick={onBackToMap} className="border-2 border-[#314258] bg-[#07111f] px-3 py-3 font-mono text-xs font-black uppercase tracking-widest text-[#cfc7b8] shadow-[0_5px_0_rgba(0,0,0,0.45)]">
            Volver mapa
          </button>
          <button type="button" onClick={onOpenRoutes} className="border-2 border-[#ffd15a] bg-[#a8621f] px-3 py-3 font-mono text-xs font-black uppercase tracking-widest text-[#1b1208] shadow-[0_5px_0_rgba(0,0,0,0.55)]">
            Abrir rutas
          </button>
        </div>
      </div>
    </div>
  );
}

function EscapeRoutesScreen({ answers, onBackToMap, onOpenResources, onCompleteMission, selectedRoute: savedSelectedRoute, onSelectRoute }) {
  const [selectedRouteId, setSelectedRouteId] = useState(null);
  const routes = getFilteredRoutes(answers);
  const routeInDetail = routes.find((route) => route.id === selectedRouteId);

  if (routeInDetail) {
    return (
      <RouteDetailScreen
        route={routeInDetail}
        answers={answers}
        onBack={() => setSelectedRouteId(null)}
        onSelectRoute={onSelectRoute}
        onOpenResources={() => {
          onCompleteMission();
          onOpenResources();
        }}
      />
    );
  }
  const groupedRoutes = {
    "Explorar ahora": routes.filter((route) => route.level === "Explorar ahora"),
    "Revisar con cuidado": routes.filter((route) => route.level === "Revisar con cuidado"),
    "Ruta futura": routes.filter((route) => route.level === "Ruta futura"),
  };

  const levelStyles = {
    "Explorar ahora": "border-[#74f24d] bg-[#092414] text-[#caffbd]",
    "Revisar con cuidado": "border-[#ffd15a] bg-[#211704] text-[#ffe0a3]",
    "Ruta futura": "border-[#4a5568] bg-[#0b1422] text-[#c9c3b5]",
  };

  const comparisonRoutes = routes.slice(0, 5);

  return (
    <div className="relative px-4 pb-28 pt-4">
      <PixelShell glow className="p-4 shadow-[0_0_24px_rgba(255,209,90,0.18)]">
        <div className="relative flex items-start gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-[#ffd15a] bg-[#3a2505] text-[#ffd15a]">
            <Icon type="route" size={30} />
          </div>
          <div>
            <p className="font-mono text-xs font-black uppercase tracking-[0.24em] text-[#ff9f1c]">M04 · Rutas de Escape</p>
            <h2 className="mt-1 font-mono text-2xl font-black uppercase leading-none text-[#fff1d0]">Rutas para explorar</h2>
            <p className="mt-3 font-mono text-sm font-bold leading-relaxed text-[#cfc7b8]">
              Estas rutas se filtran según tu diagnóstico. Puedes volver a esta misión y cambiar la ruta seleccionada cuando quieras.
            </p>
          </div>
        </div>
      </PixelShell>

      <div className="mt-4 grid gap-4">
        <PixelShell className="p-4">
          <div className="relative flex gap-3">
            <Icon type="alert" className="mt-0.5 shrink-0 text-[#ff9f1c]" size={20} />
            <p className="font-mono text-xs font-bold leading-relaxed text-[#e8dcc8]">
              La elegibilidad depende de requisitos oficiales vigentes, condiciones de visa, documentos, ocupación exacta y evaluación individual.
            </p>
          </div>
        </PixelShell>

        {Object.entries(groupedRoutes).map(([level, levelRoutes]) => {
          if (levelRoutes.length === 0) return null;
          return (
            <section key={level} className="grid gap-3">
              <div className={`border-2 px-3 py-2 font-mono text-xs font-black uppercase tracking-[0.18em] ${levelStyles[level]}`}>
                {level}
              </div>

              {levelRoutes.map((route) => (
                <PixelShell key={route.id} className="p-4">
                  <div className="relative grid gap-3 font-mono">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-lg font-black uppercase leading-tight text-[#fff1d0]">{route.title}</p>
                        <p className="mt-1 text-[11px] font-black uppercase tracking-widest text-[#ffd15a]">{route.level}</p>
                      </div>
                      <div className={`shrink-0 border-2 px-2 py-1 text-[10px] font-black uppercase tracking-widest ${levelStyles[route.level]}`}>
                        {route.risk}
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <div className="border border-[#263a50] bg-[#08182b] p-3">
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">Por qué aparece</p>
                        <p className="mt-1 text-xs font-bold leading-relaxed text-[#cfc7b8]">{route.reason}</p>
                      </div>
                      <div className="border border-[#263a50] bg-[#08182b] p-3">
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">Qué falta confirmar</p>
                        <p className="mt-1 text-xs font-bold leading-relaxed text-[#cfc7b8]">{route.missing}</p>
                      </div>
                      <div className="border border-[#263a50] bg-[#08182b] p-3">
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#74f24d]">Recomendable para...</p>
                        <p className="mt-1 text-xs font-bold leading-relaxed text-[#cfc7b8]">{route.recommendedFor}</p>
                      </div>
                    </div>

                    {route.whmMatches && <WhmPassportStatusPanel route={route} />}

                    <SourceCard source={route.source} />
                    {route.secondarySource && <SourceCard source={route.secondarySource} />}

                    <button
                      type="button"
                      onClick={() => setSelectedRouteId(route.id)}
                      className="border-2 border-[#ffd15a] bg-[#3a2505] px-3 py-3 text-xs font-black uppercase tracking-widest text-[#ffd15a] shadow-[0_4px_0_rgba(0,0,0,0.45)]"
                    >
                      Ver ruta
                    </button>
                  </div>
                </PixelShell>
              ))}
            </section>
          );
        })}

        <div className="grid grid-cols-[1fr_1.4fr] gap-3">
          <button type="button" onClick={onBackToMap} className="border-2 border-[#314258] bg-[#07111f] px-3 py-3 font-mono text-xs font-black uppercase tracking-widest text-[#cfc7b8] shadow-[0_5px_0_rgba(0,0,0,0.45)]">
            Volver mapa
          </button>
          <button
            type="button"
            onClick={() => {
              const firstPriorityRoute = routes[0];
              if (firstPriorityRoute) onSelectRoute(firstPriorityRoute);
              onCompleteMission();
              onOpenResources();
            }}
            className="border-2 border-[#ffd15a] bg-[#a8621f] px-3 py-3 font-mono text-xs font-black uppercase tracking-widest text-[#1b1208] shadow-[0_5px_0_rgba(0,0,0,0.55)]"
          >
            Abrir M05
          </button>
        </div>
      </div>
    </div>
  );
}

function SurvivalResourcesScreen({ answers, selectedRoute, resources, setResources, onBackToMap, onCompleteMission, onOpenInventory, onOpenRoutes }) {
  const [localResources, setLocalResources] = useState(() => {
    if (resources && Array.isArray(resources.costs) && resources.routeId === selectedRoute?.id) return resources;
    return {
      routeId: selectedRoute?.id || "",
      routeTitle: selectedRoute?.title || "Ruta no seleccionada",
      availableBudget: getBudgetNumberFromRange(answers.budget),
      costs: getDefaultSurvivalCosts(answers, selectedRoute?.id || ""),
    };
  });

  const totals = calculateSurvivalTotals(localResources);

  const statusStyles = {
    Suficiente: "border-[#74f24d] bg-[#092414] text-[#caffbd]",
    Justo: "border-[#ffd15a] bg-[#211704] text-[#ffe0a3]",
    "Zona de riesgo": "border-[#ff6b35] bg-[#2b1208] text-[#ffb089]",
    Pendiente: "border-[#4a5568] bg-[#0b1422] text-[#c9c3b5]",
  };

  const updateResources = (updater) => {
    setLocalResources((current) => {
      const next = typeof updater === "function" ? updater(current) : updater;
      setResources(next);
      return next;
    });
  };

  const updateCost = (id, key, value) => {
    updateResources((current) => ({
      ...current,
      costs: current.costs.map((item) => (item.id === id ? { ...item, [key]: value } : item)),
    }));
  };

  return (
    <div className="relative px-4 pb-28 pt-4">
      <PixelShell glow className="p-4 shadow-[0_0_24px_rgba(255,209,90,0.18)]">
        <div className="relative flex items-start gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-[#ffd15a] bg-[#3a2505] text-[#ffd15a]">
            <Icon type="wallet" size={30} />
          </div>
          <div>
            <p className="font-mono text-xs font-black uppercase tracking-[0.24em] text-[#ff9f1c]">M05 · Recursos de Supervivencia</p>
            <h2 className="mt-1 font-mono text-2xl font-black uppercase leading-none text-[#fff1d0]">Caja inicial</h2>
            <p className="mt-3 font-mono text-sm font-bold leading-relaxed text-[#cfc7b8]">
              Calcula si tu presupuesto cubre una llegada básica para la ruta seleccionada. Todos los valores están expresados en dólares australianos (AUD). Puedes regresar a M04 y cambiar la ruta cuando quieras.
            </p>
          </div>
        </div>
      </PixelShell>

      <div className="mt-4 grid gap-4">
        <PixelShell className="p-4">
          <div className="relative grid gap-3 font-mono">
            <div className="border border-[#263a50] bg-[#08182b] p-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">Ruta seleccionada</p>
              <p className="mt-1 text-sm font-black text-[#fff1d0]">{selectedRoute?.title || "Sin ruta seleccionada"}</p>
              <p className="mt-2 text-[11px] font-bold leading-relaxed text-[#cfc7b8]">{selectedRoute?.recommendedFor || "Regresa a M04 para seleccionar una ruta y ajustar esta caja inicial."}</p>
              <button type="button" onClick={onOpenRoutes} className="mt-3 border-2 border-[#314258] bg-[#07111f] px-3 py-2 text-[10px] font-black uppercase tracking-widest text-[#cfc7b8]">
                Cambiar ruta en M04
              </button>
            </div>
            <label className="grid gap-2 text-xs font-black uppercase tracking-widest text-[#ffd15a]">
              Presupuesto disponible (AUD)
              <input
                type="number"
                min="0"
                className="border-2 border-[#314258] bg-[#08182b] px-3 py-3 font-mono text-sm font-bold normal-case tracking-normal text-[#fff1d0] outline-none focus:border-[#ffd15a]"
                value={localResources.availableBudget || ""}
                onChange={(event) => updateResources((current) => ({ ...current, availableBudget: event.target.value }))}
                placeholder="Ej. 8500 AUD"
              />
            </label>
            <div className={`border-2 p-3 ${statusStyles[totals.status]}`}>
              <p className="text-[10px] font-black uppercase tracking-widest">Estado</p>
              <p className="mt-1 text-lg font-black uppercase">{totals.status}</p>
              <p className="mt-2 text-xs font-bold leading-relaxed">{totals.message}</p>
            </div>
          </div>
        </PixelShell>

        <PixelShell className="p-4">
          <div className="relative grid gap-3 font-mono">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ffd15a]">Costos iniciales editables · AUD</p>
            {localResources.costs.map((item) => (
              <div key={item.id} className="grid gap-2 border border-[#263a50] bg-[#08182b] p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-black uppercase tracking-wider text-[#fff1d0]">{item.label}</p>
                    <p className="mt-1 text-[10px] font-bold leading-relaxed text-[#aeb7c2]">{item.note}</p>
                  </div>
                  <input
                    type="number"
                    min="0"
                    className="w-24 shrink-0 border-2 border-[#314258] bg-[#06101f] px-2 py-2 text-right text-xs font-black text-[#ffd15a] outline-none focus:border-[#ffd15a]"
                    value={item.amount}
                    onChange={(event) => updateCost(item.id, "amount", event.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </PixelShell>

        <PixelShell glow className="p-4">
          <div className="relative grid gap-3 font-mono">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ffd15a]">Resultado</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-[#263a50] bg-[#08182b] p-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">Disponible</p>
                <p className="mt-1 text-sm font-black text-[#fff1d0]">{formatAud(totals.available)}</p>
              </div>
              <div className="border border-[#263a50] bg-[#08182b] p-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">Total estimado</p>
                <p className="mt-1 text-sm font-black text-[#fff1d0]">{formatAud(totals.total)}</p>
              </div>
            </div>
            <div className={`border-2 p-3 ${totals.difference >= 0 ? "border-[#74f24d] bg-[#092414] text-[#caffbd]" : "border-[#ff6b35] bg-[#2b1208] text-[#ffb089]"}`}>
              <p className="text-[10px] font-black uppercase tracking-widest">Diferencia</p>
              <p className="mt-1 text-xl font-black">{formatAud(totals.difference)}</p>
            </div>
          </div>
        </PixelShell>

        <div className="grid gap-3">
          <SourceCard source={officialSources.visaPricing} />
          <SourceCard source={officialSources.studyAustraliaCost} />
        </div>

        <PixelShell className="p-4">
          <div className="relative flex gap-3">
            <Icon type="info" className="mt-0.5 shrink-0 text-[#ffd15a]" size={20} />
            <p className="font-mono text-xs font-bold leading-relaxed text-[#e8dcc8]">
              Esta calculadora es una guía editable y todos los importes están en AUD. Verifica tarifas oficiales, costos reales de curso, alojamiento y seguros antes de decidir.
            </p>
          </div>
        </PixelShell>

        <div className="grid grid-cols-[1fr_1.4fr] gap-3">
          <button
            type="button"
            onClick={() => {
              setResources(localResources);
              onCompleteMission();
              onBackToMap();
            }}
            className="border-2 border-[#314258] bg-[#07111f] px-3 py-3 font-mono text-xs font-black uppercase tracking-widest text-[#cfc7b8] shadow-[0_5px_0_rgba(0,0,0,0.45)]"
          >
            Guardar mapa
          </button>
          <button
            type="button"
            onClick={() => {
              setResources(localResources);
              onCompleteMission();
              onOpenInventory();
            }}
            className="border-2 border-[#ffd15a] bg-[#a8621f] px-3 py-3 font-mono text-xs font-black uppercase tracking-widest text-[#1b1208] shadow-[0_5px_0_rgba(0,0,0,0.55)]"
          >
            Abrir M06
          </button>
        </div>
      </div>
    </div>
  );
}

function InventoryScreen({ answers, selectedRoute, inventory, setInventory, onBackToMap, onCompleteMission, onOpenRoutes, onOpenPlan }) {
  const [localInventory, setLocalInventory] = useState(() => {
    if (inventory?.routeId === selectedRoute?.id && Array.isArray(inventory.items) && inventory.items.length > 0) return inventory.items;
    if (Array.isArray(inventory) && inventory.length > 0 && !selectedRoute?.id) return inventory;
    return getDefaultInventory(answers, selectedRoute);
  });

  const progress = getInventoryProgress(localInventory);
  const routeProfile = getRouteRequirementProfile(selectedRoute);
  const neededCount = localInventory.filter((item) => item.needed).length;
  const readyCount = localInventory.filter((item) => item.needed && item.status === "ready").length;

  const statusStyles = {
    ready: "border-[#74f24d] bg-[#092414] text-[#caffbd]",
    missing: "border-[#ff6b35] bg-[#2b1208] text-[#ffb089]",
    review: "border-[#ffd15a] bg-[#211704] text-[#ffe0a3]",
    optional: "border-[#4a5568] bg-[#0b1422] text-[#c9c3b5]",
  };

  const updateInventory = (updater) => {
    setLocalInventory((current) => {
      const next = typeof updater === "function" ? updater(current) : updater;
      setInventory({ routeId: selectedRoute?.id || "", routeTitle: selectedRoute?.title || "Ruta no seleccionada", items: next });
      return next;
    });
  };

  const updateItem = (id, patch) => {
    updateInventory((current) => current.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  };

  return (
    <div className="relative px-4 pb-28 pt-4">
      <PixelShell glow className="p-4 shadow-[0_0_24px_rgba(255,209,90,0.18)]">
        <div className="relative flex items-start gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-[#ffd15a] bg-[#3a2505] text-[#ffd15a]">
            <Icon type="backpack" size={30} />
          </div>
          <div>
            <p className="font-mono text-xs font-black uppercase tracking-[0.24em] text-[#ff9f1c]">M06 · Inventario</p>
            <h2 className="mt-1 font-mono text-2xl font-black uppercase leading-none text-[#fff1d0]">Documentos y evidencia</h2>
            <p className="mt-3 font-mono text-sm font-bold leading-relaxed text-[#cfc7b8]">
              Ordena documentos y evidencia de acuerdo con la visa/ruta seleccionada. Puedes volver a M04 y cambiar la ruta cuando quieras.
            </p>
          </div>
        </div>
      </PixelShell>

      <div className="mt-4 grid gap-4">
        <PixelShell className="p-4">
          <div className="relative grid gap-3 font-mono">
            <div className="border border-[#263a50] bg-[#08182b] p-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">Ruta seleccionada</p>
              <p className="mt-1 text-sm font-black text-[#fff1d0]">{routeProfile?.title || selectedRoute?.title || "Sin ruta seleccionada"}</p>
              {routeProfile?.note && <p className="mt-2 text-[11px] font-bold leading-relaxed text-[#cfc7b8]">{routeProfile.note}</p>}
              <button type="button" onClick={onOpenRoutes} className="mt-3 border-2 border-[#314258] bg-[#07111f] px-3 py-2 text-[10px] font-black uppercase tracking-widest text-[#cfc7b8]">
                Cambiar ruta en M04
              </button>
            </div>
            <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-[#ffd15a]">
              <span>Inventario base</span>
              <span>{progress}%</span>
            </div>
            <ProgressBlocks value={progress} />
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-[#263a50] bg-[#08182b] p-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">Necesarios</p>
                <p className="mt-1 text-lg font-black text-[#fff1d0]">{neededCount}</p>
              </div>
              <div className="border border-[#263a50] bg-[#08182b] p-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">Listos</p>
                <p className="mt-1 text-lg font-black text-[#fff1d0]">{readyCount}</p>
              </div>
            </div>
          </div>
        </PixelShell>

        <div className="grid gap-3">
          {localInventory.map((item) => (
            <PixelShell key={item.id} className="p-3">
              <div className="relative grid gap-3 font-mono">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-black uppercase tracking-wider text-[#fff1d0]">{item.label}</p>
                    <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">{item.category} · {item.needed ? "Requisito / evidencia" : "Opcional"}</p>
                    {item.detail && <p className="mt-2 text-[11px] font-bold leading-relaxed text-[#aeb7c2]">{item.detail}</p>}
                    {item.sourceUrl && (
                      <a className="mt-2 inline-block text-[10px] font-black uppercase tracking-widest text-[#74f24d] underline" href={item.sourceUrl} target="_blank" rel="noreferrer">
                        Ver fuente oficial →
                      </a>
                    )}
                  </div>
                  <span className={`shrink-0 border-2 px-2 py-1 text-[10px] font-black uppercase tracking-widest ${statusStyles[item.status]}`}>
                    {getInventoryStatusLabel(item.status)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    ["ready", "Listo"],
                    ["missing", "Falta"],
                    ["review", "Revisar"],
                    ["optional", "Opcional"],
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => updateItem(item.id, { status: value, needed: value !== "optional" })}
                      className={`border-2 px-2 py-2 text-[10px] font-black uppercase tracking-widest ${item.status === value ? "border-[#ffd15a] bg-[#3a2505] text-[#ffd15a]" : "border-[#314258] bg-[#07111f] text-[#cfc7b8]"}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <input
                  className="border-2 border-[#314258] bg-[#06101f] px-3 py-2 text-xs font-bold text-[#fff1d0] outline-none focus:border-[#ffd15a]"
                  value={item.notes || ""}
                  onChange={(event) => updateItem(item.id, { notes: event.target.value })}
                  placeholder="Nota opcional: ubicación, pendiente, vencimiento, archivo..."
                />
              </div>
            </PixelShell>
          ))}
        </div>

        <PixelShell className="p-4">
          <div className="relative flex gap-3">
            <Icon type="info" className="mt-0.5 shrink-0 text-[#ffd15a]" size={20} />
            <p className="font-mono text-xs font-bold leading-relaxed text-[#e8dcc8]">
              Este inventario se basa en la ruta seleccionada y debe usarse como guía de organización. La lista final de documentos puede cambiar según el checklist oficial, ImmiAccount y tu situación individual.
            </p>
          </div>
        </PixelShell>

        <div className="grid grid-cols-[1fr_1.4fr] gap-3">
          <button
            type="button"
            onClick={() => {
              onCompleteMission();
              onBackToMap();
            }}
            className="border-2 border-[#314258] bg-[#07111f] px-3 py-3 font-mono text-xs font-black uppercase tracking-widest text-[#cfc7b8] shadow-[0_5px_0_rgba(0,0,0,0.45)]"
          >
            Guardar mapa
          </button>
          <button
            type="button"
            onClick={() => {
              onCompleteMission();
              onOpenPlan();
            }}
            className="border-2 border-[#ffd15a] bg-[#a8621f] px-3 py-3 font-mono text-xs font-black uppercase tracking-widest text-[#1b1208] shadow-[0_5px_0_rgba(0,0,0,0.55)]"
          >
            Abrir M07
          </button>
        </div>
      </div>
    </div>
  );
}

function getInventoryItemsForPlan(inventory, answers, selectedRoute) {
  if (inventory?.routeId === selectedRoute?.id && Array.isArray(inventory.items)) return inventory.items;
  if (Array.isArray(inventory)) return inventory;
  return getDefaultInventory(answers, selectedRoute);
}

function getRoutePlanRisk({ answers, selectedRoute, totals, missingItems, inventoryProgress }) {
  if (!selectedRoute) {
    return {
      label: "Ruta no seleccionada",
      detail: "El riesgo principal es que todavía no hay una ruta base para organizar costos, documentos y próximos pasos.",
    };
  }

  if (totals.status === "Zona de riesgo" || totals.status === "Pendiente") {
    return {
      label: "Presupuesto vs ruta seleccionada",
      detail: `La ruta ${selectedRoute.title} todavía no tiene una caja inicial suficiente o clara. Antes de avanzar, ajusta M05 y valida costos reales.`,
    };
  }

  if (missingItems.length >= 4 || inventoryProgress < 50) {
    return {
      label: "Documentos insuficientes para esta ruta",
      detail: `La ruta ${selectedRoute.title} tiene demasiadas evidencias pendientes. El bloqueo principal está en M06.`,
    };
  }

  if (selectedRoute.id === "student") {
    return {
      label: "Curso, fondos y propósito de estudio",
      detail: "Para Student, el riesgo central es que curso, presupuesto, propósito real de estudio y evidencia documental estén alineados.",
    };
  }

  if (selectedRoute.id === "working_holiday" || selectedRoute.id === "working_holiday_check") {
    return {
      label: "Pasaporte, edad y cupos WHM",
      detail: "Para Working Holiday / Work and Holiday, el riesgo central es confirmar pasaporte elegible, edad, cupos o ballot y requisitos específicos del país.",
    };
  }

  if (selectedRoute.id === "skilled") {
    return {
      label: "Ocupación, inglés y skills assessment",
      detail: "Para Skilled, el riesgo central es validar ocupación, autoridad evaluadora, nivel de inglés, experiencia y puntos.",
    };
  }

  if (selectedRoute.id === "employer_sponsored") {
    return {
      label: "Empleador patrocinador",
      detail: "Para Employer Sponsored, el riesgo central es conseguir un empleador real, ocupación compatible, nominación y condiciones laborales válidas.",
    };
  }

  if (selectedRoute.id === "visitor") {
    return {
      label: "Propósito de visita y no trabajar",
      detail: "Para Visitor, el riesgo central es demostrar propósito de visita, fondos, vínculos de retorno y no tratarla como ruta laboral.",
    };
  }

  if (selectedRoute.id === "partner") {
    return {
      label: "Evidencia de relación",
      detail: "Para Partner, el riesgo central es que exista una relación elegible y evidencia suficiente para sostenerla.",
    };
  }

  if (selectedRoute.id === "graduate") {
    return {
      label: "Elegibilidad post-estudios",
      detail: "Para Graduate, el riesgo central es que estudios, fechas, stream, inglés y requisitos vigentes encajen.",
    };
  }

  return {
    label: selectedRoute.risk || getDiagnosisSummary(answers).risk,
    detail: selectedRoute.missing || "El riesgo debe confirmarse contra requisitos oficiales y tu situación individual.",
  };
}

function getPlanActions({ answers, selectedRoute, resources, inventory }) {
  const routeTitle = selectedRoute?.title || "Ruta no seleccionada";
  const resourceBase = resources?.routeId === selectedRoute?.id ? resources : {
    availableBudget: getBudgetNumberFromRange(answers.budget),
    costs: getDefaultSurvivalCosts(answers, selectedRoute?.id || ""),
  };
  const totals = calculateSurvivalTotals(resourceBase);
  const items = getInventoryItemsForPlan(inventory, answers, selectedRoute);
  const missingItems = items.filter((item) => item.needed && item.status !== "ready");
  const readyItems = items.filter((item) => item.needed && item.status === "ready");
  const inventoryProgress = getInventoryProgress(items);
  const routeRisk = getRoutePlanRisk({ answers, selectedRoute, totals, missingItems, inventoryProgress });

  const urgent = [];
  const important = [];
  const later = [];
  const avoid = [];

  if (!selectedRoute) urgent.push("Regresa a M04 y selecciona una ruta antes de construir el plan final.");
  if (totals.status === "Zona de riesgo" || totals.status === "Pendiente") urgent.push("Ajusta tu caja inicial en M05 antes de tomar decisiones costosas.");
  if (missingItems.length > 0) urgent.push(`Completa o revisa primero: ${missingItems.slice(0, 3).map((item) => item.label).join(", ")}.`);

  important.push(`Verifica requisitos vigentes de ${routeTitle} en las fuentes oficiales antes de avanzar.`);
  important.push("Actualiza notas del inventario con ubicación, vencimientos o pendientes de cada documento.");
  important.push("Contrasta costos editables de M05 contra tarifas y precios reales antes de pagar algo.");

  if (inventoryProgress >= 70 && totals.status !== "Zona de riesgo") later.push("Preparar una carpeta digital organizada por identidad, fondos, estudios, trabajo y ruta elegida.");
  later.push("Comparar una segunda ruta en M04 si la ruta actual tiene demasiadas brechas.");

  avoid.push("No aplicar solo con la lectura de la app: confirma siempre en Home Affairs, ImmiAccount o fuentes oficiales.");
  avoid.push("No pagar cursos, agentes o servicios si todavía tienes presupuesto, documentos o elegibilidad sin confirmar.");

  return {
    routeTitle,
    totals,
    inventoryProgress,
    readyCount: readyItems.length,
    missingCount: missingItems.length,
    routeRisk,
    urgent,
    important,
    later,
    avoid,
  };
}

function getSourceContext(source, selectedRoute) {
  const contexts = {
    [officialSources.studentVisa.url]: {
      title: "Requisitos de Student visa",
      description: "Página oficial para revisar condiciones, elegibilidad y requisitos generales de la visa de estudiante.",
    },
    [officialSources.visitorVisa.url]: {
      title: "Requisitos de Visitor visa",
      description: "Página oficial para revisar condiciones de visita, estadía y documentos de soporte.",
    },
    [officialSources.workingHoliday417.url]: {
      title: "Working Holiday 417",
      description: "Página oficial para confirmar pasaporte elegible, edad, condiciones y requisitos de subclass 417.",
    },
    [officialSources.workHoliday462.url]: {
      title: "Work and Holiday 462",
      description: "Página oficial para confirmar pasaporte elegible, edad, requisitos adicionales y condiciones de subclass 462.",
    },
    [officialSources.whmCountryCaps.url]: {
      title: "Cupos y estado WHM",
      description: "Consulta oficial para revisar si los cupos por país están abiertos, pausados, cerrados o sujetos a ballot.",
    },
    [officialSources.skilledVisas.url]: {
      title: "Rutas Skilled / SkillSelect",
      description: "Referencia oficial para entender rutas skilled, SkillSelect y procesos asociados.",
    },
    [officialSources.employerSponsored.url]: {
      title: "Visas con patrocinio laboral",
      description: "Referencia oficial para revisar rutas donde un empleador puede patrocinar al trabajador.",
    },
    [officialSources.partnerVisa.url]: {
      title: "Partner visa",
      description: "Referencia oficial para revisar opciones de pareja, sponsor y evidencia de relación.",
    },
    [officialSources.graduateVisa.url]: {
      title: "Temporary Graduate 485",
      description: "Referencia oficial para revisar opciones posteriores a estudios elegibles en Australia.",
    },
    [officialSources.visaFinder.url]: {
      title: "Buscador general de visas",
      description: "Herramienta oficial para explorar visas cuando todavía falta confirmar la ruta más adecuada.",
    },
    [officialSources.documentChecklist.url]: {
      title: "Checklist oficial de documentos",
      description: "Herramienta oficial para identificar documentos que podrían solicitarse según visa, país y situación.",
    },
    [officialSources.visaPricing.url]: {
      title: "Costos oficiales de visa",
      description: "Estimador oficial para revisar tarifas de aplicación antes de presupuestar o pagar.",
    },
    [officialSources.studyAustraliaCost.url]: {
      title: "Costo de vida y estudio",
      description: "Referencia oficial de Study Australia para estimar costos de vida, estudio y preparación financiera.",
    },
    [officialSources.cricos.url]: {
      title: "Escuelas y cursos CRICOS",
      description: "Registro oficial para buscar proveedores y cursos autorizados para estudiantes internacionales.",
    },
  };

  return contexts[source.url] || {
    title: selectedRoute?.title ? `Fuente para ${selectedRoute.title}` : "Fuente oficial",
    description: "Referencia oficial para verificar requisitos, condiciones o información vigente.",
  };
}

function getOfficialSourcesForRoute(selectedRoute) {
  const sources = [];
  const add = (source) => {
    if (!source || sources.some((item) => item.url === source.url)) return;
    sources.push(source);
  };

  add(selectedRoute?.source);
  add(selectedRoute?.secondarySource);
  const profile = getRouteRequirementProfile(selectedRoute);
  add(profile?.source);
  add(officialSources.documentChecklist);
  add(officialSources.visaPricing);

  if (selectedRoute?.id === "student") {
    add(officialSources.studyAustraliaCost);
    add(officialSources.cricos);
  }
  if (!selectedRoute) add(officialSources.visaFinder);

  return sources;
}

function PlanEscapeScreen({ answers, selectedRoute, resources, inventory, onBackToMap, onOpenSources, onOpenRoutes, onCompleteMission }) {
  const plan = getPlanActions({ answers, selectedRoute, resources, inventory });
  const statusStyles = {
    Suficiente: "border-[#74f24d] bg-[#092414] text-[#caffbd]",
    Justo: "border-[#ffd15a] bg-[#211704] text-[#ffe0a3]",
    "Zona de riesgo": "border-[#ff6b35] bg-[#2b1208] text-[#ffb089]",
    Pendiente: "border-[#4a5568] bg-[#0b1422] text-[#c9c3b5]",
  };

  const ActionGroup = ({ title, items, tone = "default" }) => {
    const toneClass = tone === "danger" ? "border-[#ff6b35] bg-[#2b1208] text-[#ffb089]" : tone === "good" ? "border-[#74f24d] bg-[#092414] text-[#caffbd]" : "border-[#263a50] bg-[#08182b] text-[#e8dcc8]";
    return (
      <div className={`border p-3 font-mono ${toneClass}`}>
        <p className="text-[10px] font-black uppercase tracking-widest">{title}</p>
        <div className="mt-2 grid gap-2">
          {items.map((item, index) => (
            <p key={`${title}-${index}`} className="text-xs font-bold leading-relaxed">{index + 1}. {item}</p>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="relative px-4 pb-28 pt-4">
      <PixelShell glow className="p-4 shadow-[0_0_24px_rgba(255,209,90,0.18)]">
        <div className="relative flex items-start gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-[#ffd15a] bg-[#3a2505] text-[#ffd15a]">
            <Icon type="file" size={30} />
          </div>
          <div>
            <p className="font-mono text-xs font-black uppercase tracking-[0.24em] text-[#ff9f1c]">M07 · Plan de Escape</p>
            <h2 className="mt-1 font-mono text-2xl font-black uppercase leading-none text-[#fff1d0]">Siguiente paso</h2>
            <p className="mt-3 font-mono text-sm font-bold leading-relaxed text-[#cfc7b8]">
              Este plan resume tu ruta, caja inicial e inventario. Puedes volver a M04 para cambiar ruta cuando quieras.
            </p>
          </div>
        </div>
      </PixelShell>

      <div className="mt-4 grid gap-4">
        <PixelShell className="p-4">
          <div className="relative grid gap-3 font-mono">
            <div className="border border-[#263a50] bg-[#08182b] p-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">Ruta seleccionada</p>
              <p className="mt-1 text-sm font-black text-[#fff1d0]">{plan.routeTitle}</p>
              <button type="button" onClick={onOpenRoutes} className="mt-3 border-2 border-[#314258] bg-[#07111f] px-3 py-2 text-[10px] font-black uppercase tracking-widest text-[#cfc7b8]">
                Cambiar ruta en M04
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className={`border-2 p-3 ${statusStyles[plan.totals.status]}`}>
                <p className="text-[10px] font-black uppercase tracking-widest">Caja inicial</p>
                <p className="mt-1 text-sm font-black uppercase">{plan.totals.status}</p>
              </div>
              <div className="border border-[#263a50] bg-[#08182b] p-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">Inventario</p>
                <p className="mt-1 text-sm font-black text-[#fff1d0]">{plan.inventoryProgress}% listo</p>
              </div>
            </div>
            <div className="border border-[#263a50] bg-[#08182b] p-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">Riesgo principal de la ruta</p>
              <p className="mt-1 text-sm font-black text-[#fff1d0]">{plan.routeRisk.label}</p>
              <p className="mt-2 text-xs font-bold leading-relaxed text-[#cfc7b8]">{plan.routeRisk.detail}</p>
            </div>
          </div>
        </PixelShell>

        <ProfessionalAdvicePanel route={selectedRoute} answers={answers} compact />

        <ActionGroup title="Urgente" items={plan.urgent.length ? plan.urgent : ["No hay bloqueos urgentes detectados. Mantén revisión de fuentes oficiales."]} tone="danger" />
        <ActionGroup title="Importante" items={plan.important} />
        <ActionGroup title="Después" items={plan.later} tone="good" />
        <ActionGroup title="No hacer todavía" items={plan.avoid} tone="danger" />

        <PixelShell className="p-4">
          <div className="relative flex gap-3">
            <Icon type="alert" className="mt-0.5 shrink-0 text-[#ff9f1c]" size={20} />
            <p className="font-mono text-xs font-bold leading-relaxed text-[#e8dcc8]">
              Este plan no confirma elegibilidad ni reemplaza asesoría migratoria. Es una guía de organización basada en tus respuestas.
            </p>
          </div>
        </PixelShell>

        <div className="grid grid-cols-[1fr_1.4fr] gap-3">
          <button type="button" onClick={onBackToMap} className="border-2 border-[#314258] bg-[#07111f] px-3 py-3 font-mono text-xs font-black uppercase tracking-widest text-[#cfc7b8] shadow-[0_5px_0_rgba(0,0,0,0.45)]">
            Volver mapa
          </button>
          <button
            type="button"
            onClick={() => {
              onCompleteMission();
              onOpenSources();
            }}
            className="border-2 border-[#ffd15a] bg-[#a8621f] px-3 py-3 font-mono text-xs font-black uppercase tracking-widest text-[#1b1208] shadow-[0_5px_0_rgba(0,0,0,0.55)]"
          >
            Abrir M08
          </button>
        </div>
      </div>
    </div>
  );
}

function SourcesCenterScreen({ selectedRoute, onBackToMap, onOpenPlan, onCompleteMission }) {
  const sources = getOfficialSourcesForRoute(selectedRoute);
  return (
    <div className="relative px-4 pb-28 pt-4">
      <PixelShell glow className="p-4 shadow-[0_0_24px_rgba(255,209,90,0.18)]">
        <div className="relative flex items-start gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-[#ffd15a] bg-[#3a2505] text-[#ffd15a]">
            <Icon type="info" size={30} />
          </div>
          <div>
            <p className="font-mono text-xs font-black uppercase tracking-[0.24em] text-[#ff9f1c]">M08 · Fuentes Oficiales</p>
            <h2 className="mt-1 font-mono text-2xl font-black uppercase leading-none text-[#fff1d0]">Centro de referencias</h2>
            <p className="mt-3 font-mono text-sm font-bold leading-relaxed text-[#cfc7b8]">
              Revisa las páginas oficiales asociadas a tu ruta antes de pagar, aplicar o decidir.
            </p>
          </div>
        </div>
      </PixelShell>

      <div className="mt-4 grid gap-4">
        <PixelShell className="p-4">
          <div className="relative font-mono">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">Ruta actual</p>
            <p className="mt-1 text-sm font-black text-[#fff1d0]">{selectedRoute?.title || "Sin ruta seleccionada"}</p>
            <p className="mt-2 text-xs font-bold leading-relaxed text-[#cfc7b8]">
              Si cambias la ruta en M04, esta lista de fuentes también cambiará.
            </p>
          </div>
        </PixelShell>

        <div className="grid gap-3">
          {sources.map((source) => {
            const context = getSourceContext(source, selectedRoute);
            return <SourceCard key={source.url} source={source} title={context.title} description={context.description} />;
          })}
        </div>

        <PixelShell className="p-4">
          <div className="relative flex gap-3">
            <Icon type="alert" className="mt-0.5 shrink-0 text-[#ff9f1c]" size={20} />
            <p className="font-mono text-xs font-bold leading-relaxed text-[#e8dcc8]">
              Los requisitos, tarifas, cupos y documentos pueden cambiar. La fuente oficial manda sobre cualquier resumen dentro de la app.
            </p>
          </div>
        </PixelShell>

        <div className="grid grid-cols-[1fr_1.4fr] gap-3">
          <button type="button" onClick={onOpenPlan} className="border-2 border-[#314258] bg-[#07111f] px-3 py-3 font-mono text-xs font-black uppercase tracking-widest text-[#cfc7b8] shadow-[0_5px_0_rgba(0,0,0,0.45)]">
            Volver M07
          </button>
          <button
            type="button"
            onClick={() => {
              onCompleteMission();
              onBackToMap();
            }}
            className="border-2 border-[#ffd15a] bg-[#a8621f] px-3 py-3 font-mono text-xs font-black uppercase tracking-widest text-[#1b1208] shadow-[0_5px_0_rgba(0,0,0,0.55)]"
          >
            Marcar revisado
          </button>
        </div>
      </div>
    </div>
  );
}

function ProfileScreen({ answers, missions, selectedRoute, resources, inventory, progress, onEditDiagnosis, onChangeRoute, onOpenPlan, onResetOperation }) {
  const profileResources = resources || {
    routeId: selectedRoute?.id || "",
    routeTitle: selectedRoute?.title || "Ruta no seleccionada",
    availableBudget: getBudgetNumberFromRange(answers.budget),
    costs: getDefaultSurvivalCosts(answers, selectedRoute?.id || ""),
  };
  const totals = calculateSurvivalTotals(profileResources);
  const inventoryItemsForProfile = inventory?.items || (Array.isArray(inventory) ? inventory : []);
  const inventoryProgress = inventoryItemsForProfile.length ? getInventoryProgress(inventoryItemsForProfile) : 0;
  const completedCount = missions.filter((mission) => mission.status === "completed").length;
  const goals = getSelectedGoals(answers);
  const profileRows = [
    ["Pasaporte", answers.passportOther || answers.passport || "No registrado"],
    ["Segundo pasaporte", answers.secondPassport === "yes" ? answers.secondPassportOther || answers.secondPassportCountry || "Sí, sin país registrado" : answers.secondPassport === "no" ? "No" : "No registrado"],
    ["Edad", answers.age ? `${answers.age} años` : "No registrada"],
    ["Ubicación", getLocationLabel(answers.location)],
    ["Objetivos", goals.length ? goals.map((goal) => getGoalLabel(goal)).join(" + ") : "No registrados"],
    ["Visa actual", answers.currentVisa || getVisaStatusLabel(answers.hasVisa)],
    ["Presupuesto", answers.budget || "No registrado"],
    ["Inglés", answers.englishLevel || "No registrado"],
    ["Experiencia", getWorkExperienceLabel(answers.workExperience)],
    ["Área laboral", getWorkCategoryLabel(answers.workCategory, answers.workCategoryOther)],
  ];

  return (
    <div className="relative px-4 pb-28 pt-4">
      <PixelShell glow className="p-4 shadow-[0_0_24px_rgba(255,209,90,0.18)]">
        <div className="relative flex items-start gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-[#ffd15a] bg-[#3a2505] text-[#ffd15a]">
            <Icon type="user" size={30} />
          </div>
          <div>
            <p className="font-mono text-xs font-black uppercase tracking-[0.24em] text-[#ff9f1c]">Perfil</p>
            <h2 className="mt-1 font-mono text-2xl font-black uppercase leading-none text-[#fff1d0]">Centro de control</h2>
            <p className="mt-3 font-mono text-sm font-bold leading-relaxed text-[#cfc7b8]">
              Aquí se resume tu operación actual. Si cambias algo importante, vuelve a revisar ruta, caja inicial e inventario.
            </p>
          </div>
        </div>
      </PixelShell>

      <div className="mt-4 grid gap-4">
        <PixelShell className="p-4">
          <div className="relative grid gap-3 font-mono">
            <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-[#ffd15a]">
              <span>Progreso general</span>
              <span>{progress}%</span>
            </div>
            <ProgressBlocks value={progress} />
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-[#263a50] bg-[#08182b] p-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">Misiones</p>
                <p className="mt-1 text-lg font-black text-[#fff1d0]">{completedCount}/{missions.length}</p>
              </div>
              <div className="border border-[#263a50] bg-[#08182b] p-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">Inventario</p>
                <p className="mt-1 text-lg font-black text-[#fff1d0]">{inventoryProgress}%</p>
              </div>
            </div>
          </div>
        </PixelShell>

        <PixelShell className="p-4">
          <div className="relative grid gap-3 font-mono">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ffd15a]">Ruta seleccionada</p>
            <div className="border border-[#263a50] bg-[#08182b] p-3">
              <p className="text-sm font-black uppercase text-[#fff1d0]">{selectedRoute?.title || "Sin ruta seleccionada"}</p>
              <p className="mt-2 text-xs font-bold leading-relaxed text-[#cfc7b8]">{selectedRoute?.recommendedFor || "Selecciona una ruta en M04 para personalizar recursos, inventario y plan."}</p>
            </div>
            <button type="button" onClick={onChangeRoute} className="border-2 border-[#ffd15a] bg-[#3a2505] px-3 py-3 text-xs font-black uppercase tracking-widest text-[#ffd15a] shadow-[0_4px_0_rgba(0,0,0,0.45)]">
              Cambiar ruta
            </button>
          </div>
        </PixelShell>

        <PixelShell className="p-4">
          <div className="relative grid gap-3 font-mono">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ffd15a]">Datos del diagnóstico</p>
            {profileRows.map(([label, value]) => (
              <div key={label} className="grid gap-1 border border-[#263a50] bg-[#08182b] p-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">{label}</p>
                <p className="text-xs font-bold leading-relaxed text-[#e8dcc8]">{value}</p>
              </div>
            ))}
            <button type="button" onClick={onEditDiagnosis} className="border-2 border-[#314258] bg-[#07111f] px-3 py-3 text-xs font-black uppercase tracking-widest text-[#cfc7b8] shadow-[0_4px_0_rgba(0,0,0,0.45)]">
              Editar diagnóstico
            </button>
          </div>
        </PixelShell>

        <PixelShell className="p-4">
          <div className="relative grid gap-3 font-mono">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ffd15a]">Caja inicial</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-[#263a50] bg-[#08182b] p-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">Estado</p>
                <p className="mt-1 text-sm font-black text-[#fff1d0]">{totals.status}</p>
              </div>
              <div className="border border-[#263a50] bg-[#08182b] p-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">Diferencia</p>
                <p className="mt-1 text-sm font-black text-[#fff1d0]">{formatAud(totals.difference)}</p>
              </div>
            </div>
          </div>
        </PixelShell>

        <div className="grid grid-cols-[1fr_1.2fr] gap-3">
          <button type="button" onClick={onOpenPlan} className="border-2 border-[#ffd15a] bg-[#a8621f] px-3 py-3 font-mono text-xs font-black uppercase tracking-widest text-[#1b1208] shadow-[0_5px_0_rgba(0,0,0,0.55)]">
            Ver plan
          </button>
          <button type="button" onClick={onResetOperation} className="border-2 border-[#ff6b35] bg-[#2b1208] px-3 py-3 font-mono text-xs font-black uppercase tracking-widest text-[#ffb089] shadow-[0_5px_0_rgba(0,0,0,0.55)]">
            Reiniciar operación
          </button>
        </div>
      </div>
    </div>
  );
}

function calculateSkilledPoints(input) {
  const age = Number(input.age || 0);
  let agePoints = 0;
  if (age >= 18 && age < 25) agePoints = 25;
  if (age >= 25 && age < 33) agePoints = 30;
  if (age >= 33 && age < 40) agePoints = 25;
  if (age >= 40 && age < 45) agePoints = 15;

  const englishPoints = {
    competent: 0,
    proficient: 10,
    superior: 20,
  }[input.english] || 0;

  const overseasWorkPoints = {
    less_3: 0,
    "3_5": 5,
    "5_8": 10,
    more_8: 15,
  }[input.overseasWork] || 0;

  const australianWorkPoints = {
    less_1: 0,
    "1_3": 5,
    "3_5": 10,
    "5_8": 15,
    more_8: 20,
  }[input.australianWork] || 0;

  const educationPoints = {
    doctorate: 20,
    bachelor_master: 15,
    diploma_trade: 10,
    other: 0,
  }[input.education] || 0;

  const nominationPoints = {
    none: 0,
    state_190: 5,
    regional_491: 15,
  }[input.nomination] || 0;

  const partnerPoints = {
    skilled_partner: 10,
    single_or_partner_aus: 10,
    competent_partner: 5,
    none: 0,
  }[input.partner] || 0;

  const bonusPoints = [
    input.australianStudy ? 5 : 0,
    input.specialistEducation ? 10 : 0,
    input.regionalStudy ? 5 : 0,
    input.communityLanguage ? 5 : 0,
    input.professionalYear ? 5 : 0,
  ].reduce((sum, value) => sum + value, 0);

  const total = agePoints + englishPoints + overseasWorkPoints + australianWorkPoints + educationPoints + nominationPoints + partnerPoints + bonusPoints;

  let status = "Por debajo del mínimo";
  let message = "El resultado queda por debajo de 65 puntos. Revisa inglés, experiencia, nominación o estudios antes de avanzar.";

  if (total >= 65 && total < 80) {
    status = "Mínimo técnico";
    message = "Alcanza el umbral mínimo de puntos, pero eso no garantiza invitación. Debe compararse con ocupación, demanda y rondas vigentes.";
  }

  if (total >= 80) {
    status = "Base más fuerte";
    message = "Tienes una base de puntos más sólida, pero aún faltan ocupación, skills assessment, EOI, invitación y requisitos específicos.";
  }

  return {
    total,
    status,
    message,
    breakdown: [
      ["Edad", agePoints],
      ["Inglés", englishPoints],
      ["Experiencia fuera de Australia", overseasWorkPoints],
      ["Experiencia en Australia", australianWorkPoints],
      ["Educación", educationPoints],
      ["Nominación", nominationPoints],
      ["Pareja / estado", partnerPoints],
      ["Bonos", bonusPoints],
    ],
  };
}

function getApplicationSimulationProfile(selectedRoute) {
  const routeId = selectedRoute?.id || "generic";
  const profiles = {
    student: {
      title: "Simulación Student visa",
      subtitle: "Como si estuvieras preparando una aplicación Student subclass 500.",
      questions: [
        { id: "passport", label: "Tengo pasaporte vigente", weight: 1 },
        { id: "coe", label: "Tengo CoE o curso CRICOS definido", weight: 2 },
        { id: "funds", label: "Tengo evidencia financiera clara", weight: 2 },
        { id: "oshc", label: "Tengo OSHC o seguro considerado", weight: 1 },
        { id: "genuine_student", label: "Puedo demostrar que tengo una intención genuina de estudiar", weight: 3, help: ["Esto forma parte de la evaluación Genuine Student.", "Debe poder explicar por qué eliges ese curso, proveedor y ciudad.", "Debe conectar con tu historial de estudios, trabajo, objetivos y circunstancias personales.", "No es un requisito aislado: se revisa dentro del contexto completo de tu aplicación."] },
        { id: "english", label: "Tengo inglés o plan de inglés según requisito", weight: 1 },
      ],
      warning: "No simula aprobación. Solo mide preparación interna antes de revisar checklist oficial e ImmiAccount.",
    },
    skilled: {
      title: "Simulación Skilled visa",
      subtitle: "Como si estuvieras preparando una estrategia Skilled / SkillSelect.",
      questions: [
        { id: "occupation", label: "Tengo ocupación ANZSCO probable", weight: 2 },
        { id: "assessment", label: "Sé qué autoridad evaluadora aplica", weight: 2 },
        { id: "english", label: "Tengo o puedo obtener examen de inglés", weight: 2 },
        { id: "points", label: "Mi puntaje estimado está en 65+", weight: 2 },
        { id: "experience", label: "Tengo evidencia laboral comprobable", weight: 2 },
        { id: "education", label: "Tengo títulos/certificados organizados", weight: 1 },
        { id: "nomination", label: "He revisado si necesito nominación estatal/regional", weight: 1 },
      ],
      warning: "Skilled suele requerir análisis técnico de ocupación, puntos y skills assessment. Esta simulación no reemplaza asesoría profesional.",
    },
    working_holiday: {
      title: "Simulación Working Holiday / Work and Holiday",
      subtitle: "Como si estuvieras preparando una primera WHM 417/462.",
      questions: [
        { id: "passport", label: "Mi pasaporte aparece como elegible", weight: 2 },
        { id: "age", label: "Estoy dentro del rango de edad", weight: 2 },
        { id: "funds", label: "Tengo fondos iniciales suficientes", weight: 1 },
        { id: "country_rules", label: "Revisé requisitos específicos de mi país", weight: 2 },
        { id: "cap_ballot", label: "Revisé cupos, ballot o estado del programa", weight: 2 },
        { id: "conditions", label: "Entiendo condiciones de trabajo y estadía", weight: 1 },
      ],
      warning: "Para subclass 462 puede haber requisitos adicionales por país. Confirma siempre el estado oficial antes de aplicar.",
    },
    working_holiday_check: {
      title: "Simulación WHM por verificar",
      subtitle: "Como si estuvieras revisando si puedes aplicar a WHM.",
      questions: [
        { id: "passport", label: "Confirmé si mi pasaporte tiene acuerdo WHM", weight: 3 },
        { id: "age", label: "Estoy dentro del rango de edad", weight: 2 },
        { id: "subclass", label: "Sé si sería 417 o 462", weight: 2 },
        { id: "cap_ballot", label: "Revisé cupos, ballot o estado del programa", weight: 2 },
        { id: "backup", label: "Tengo una ruta alternativa si WHM no aplica", weight: 1 },
      ],
      warning: "Si el pasaporte no es elegible o el cupo está cerrado, no conviene avanzar como si fuera ruta viable.",
    },
    visitor: {
      title: "Simulación Visitor visa",
      subtitle: "Como si estuvieras preparando una visita temporal.",
      questions: [
        { id: "purpose", label: "Tengo propósito de visita claro", weight: 2 },
        { id: "funds", label: "Tengo fondos para toda la estadía", weight: 2 },
        { id: "return", label: "Tengo plan de salida/retorno", weight: 2 },
        { id: "ties", label: "Puedo demostrar vínculos fuera de Australia", weight: 2 },
        { id: "no_work", label: "Entiendo que no es una ruta para trabajar", weight: 2 },
        { id: "accommodation", label: "Tengo alojamiento o plan inicial", weight: 1 },
      ],
      warning: "Visitor no debe usarse como ruta laboral. La simulación debe detectar si el plan real contradice las condiciones.",
    },
    employer_sponsored: {
      title: "Simulación Employer Sponsored",
      subtitle: "Como si estuvieras revisando una ruta con patrocinio laboral.",
      questions: [
        { id: "employer", label: "Tengo empleador real dispuesto a patrocinar", weight: 3 },
        { id: "occupation", label: "El puesto encaja con una ocupación aplicable", weight: 2 },
        { id: "salary", label: "El salario/condiciones parecen compatibles", weight: 2 },
        { id: "experience", label: "Tengo experiencia laboral comprobable", weight: 2 },
        { id: "business", label: "El empleador puede sostener la nominación", weight: 2 },
        { id: "english", label: "Tengo inglés requerido o plan para obtenerlo", weight: 1 },
      ],
      warning: "Esta ruta depende también del empleador. Si el sponsor no está listo, el aplicante tampoco lo está.",
    },
    partner: {
      title: "Simulación Partner visa",
      subtitle: "Como si estuvieras revisando evidencia de relación.",
      questions: [
        { id: "relationship", label: "Existe relación elegible y real", weight: 3 },
        { id: "financial", label: "Tenemos evidencia financiera conjunta o explicación clara", weight: 2 },
        { id: "social", label: "Tenemos evidencia social de la relación", weight: 2 },
        { id: "household", label: "Tenemos evidencia de convivencia o dinámica doméstica", weight: 2 },
        { id: "commitment", label: "Podemos explicar compromiso y línea de tiempo", weight: 2 },
        { id: "sponsor", label: "El sponsor parece elegible", weight: 2 },
      ],
      warning: "Partner puede ser muy sensible si la relación es corta, hay poca evidencia o hay historial migratorio complejo.",
    },
    graduate: {
      title: "Simulación Temporary Graduate 485",
      subtitle: "Como si estuvieras revisando una ruta post-estudio.",
      questions: [
        { id: "course", label: "Terminé o terminaré un curso elegible", weight: 3 },
        { id: "dates", label: "Mis fechas de finalización y visa actual están claras", weight: 2 },
        { id: "english", label: "Tengo inglés requerido o fecha de examen", weight: 2 },
        { id: "afp", label: "Tengo considerado AFP check si aplica", weight: 1 },
        { id: "insurance", label: "Tengo cobertura de salud considerada", weight: 1 },
        { id: "stream", label: "Sé qué stream podría aplicar", weight: 2 },
      ],
      warning: "Graduate depende mucho de fechas y requisitos vigentes. Un error de timing puede cambiar toda la estrategia.",
    },
    current_visa_review: {
      title: "Simulación de visa actual",
      subtitle: "Como si estuvieras revisando tu situación antes de cambiar de ruta.",
      questions: [
        { id: "grant", label: "Tengo mi visa grant notice", weight: 2 },
        { id: "expiry", label: "Sé mi fecha exacta de vencimiento", weight: 2 },
        { id: "conditions", label: "Entiendo mis condiciones actuales", weight: 3 },
        { id: "pending", label: "Sé si tengo solicitudes pendientes", weight: 1 },
        { id: "next", label: "Tengo identificada la siguiente ruta posible", weight: 2 },
        { id: "deadline", label: "Tengo margen antes de fechas críticas", weight: 2 },
      ],
      warning: "Si hay poco tiempo, condiciones incumplidas o solicitud pendiente, conviene revisión profesional.",
    },
    generic: {
      title: "Simulación general",
      subtitle: "Como si estuvieras preparando una aplicación inicial.",
      questions: [
        { id: "route", label: "Tengo una ruta seleccionada", weight: 2 },
        { id: "identity", label: "Tengo identidad y pasaporte claros", weight: 1 },
        { id: "funds", label: "Tengo presupuesto realista", weight: 2 },
        { id: "documents", label: "Tengo documentos base organizados", weight: 2 },
        { id: "sources", label: "Revisé fuentes oficiales", weight: 2 },
      ],
      warning: "Selecciona una ruta en M04 para obtener una simulación más específica.",
    },
  };

  return profiles[routeId] || profiles.generic;
}

function calculateApplicationSimulation(profile, answers) {
  const selected = answers || {};
  const totalWeight = profile.questions.reduce((sum, question) => sum + question.weight, 0);
  const achieved = profile.questions.reduce((sum, question) => sum + (selected[question.id] ? question.weight : 0), 0);
  const percent = totalWeight ? Math.round((achieved / totalWeight) * 100) : 0;

  let status = "No listo";
  let message = "Todavía hay puntos críticos sin confirmar. No conviene avanzar como si la aplicación estuviera lista.";

  if (percent >= 70 && percent < 90) {
    status = "Casi listo";
    message = "La base está tomando forma, pero aún faltan verificaciones importantes antes de aplicar.";
  }

  if (percent >= 90) {
    status = "Listo para revisión final";
    message = "El escenario parece ordenado para una revisión final contra fuentes oficiales y checklist real.";
  }

  return { percent, achieved, totalWeight, status, message };
}

function getApplicationQuestionHelp(question, selectedRoute) {
  if (Array.isArray(question.help) && question.help.length > 0) return question.help;

  const routeName = selectedRoute?.title || "la visa seleccionada";
  const shared = {
    passport: ["Sirve para confirmar identidad, nacionalidad y datos base del aplicante.", "Debe revisarse contra la página oficial de la visa y el checklist aplicable.", "No subas documentos aquí; solo marca si ya lo tienes identificado."],
    funds: ["Se refiere a fondos o respaldo económico que podrían pedirse para sostener la estadía, estudios, visita o llegada.", "La forma exacta de demostrarlo puede cambiar según visa, país, stream y checklist oficial.", "Este punto no confirma suficiencia: solo mide si ya tienes una base financiera para revisar."],
    english: ["Algunas rutas exigen evidencia formal de inglés; otras lo usan como parte de admisión, empleabilidad o estrategia.", "Debes revisar el requisito exacto para la visa, stream, proveedor o autoridad correspondiente.", "Si todavía no tienes examen, marca este punto solo si tienes un plan claro para obtenerlo."],
    age: ["Algunas visas tienen límites de edad o rangos que afectan elegibilidad.", "El rango exacto debe confirmarse en la página oficial de la visa o programa.", "Este simulador solo ayuda a detectar si la edad es un punto crítico."],
    conditions: ["Se refiere a entender las condiciones de la visa, límites de trabajo, estudio, estadía o requisitos posteriores.", "Las condiciones oficiales aparecen en Home Affairs, ImmiAccount, VEVO o el grant notice.", "No avances si no tienes claro qué te permite y qué no te permite esta ruta."],
    occupation: ["Aplica cuando la visa depende de una ocupación, lista ocupacional o funciones laborales.", "Debe compararse con fuentes oficiales y, si corresponde, con ANZSCO o autoridad evaluadora.", "No basta con que el nombre del puesto se parezca; importan funciones, evidencia y requisitos."],
    experience: ["Se refiere a experiencia laboral que puedas explicar y respaldar con evidencia.", "Puede incluir contratos, cartas laborales, payslips, funciones, fechas y referencias según el caso.", "La calidad de la evidencia importa tanto como los años de experiencia."],
    education: ["Se refiere a estudios, títulos, certificados o formación que respalden la ruta.", "Algunas visas o evaluaciones pueden pedir evidencia académica específica.", "Confirma si se requieren transcripts, certificados, completion letters o traducciones."],
    assessment: ["En rutas Skilled, normalmente debes identificar la autoridad evaluadora correspondiente a tu ocupación.", "No todas las ocupaciones usan la misma autoridad ni los mismos criterios.", "Este punto suele ser técnico y puede requerir revisión cuidadosa."],
    points: ["Las rutas Skilled por puntos usan una tabla de puntos, pero alcanzar el mínimo no garantiza invitación.", "El puntaje debe revisarse junto con ocupación, EOI, nominación y rondas vigentes.", "Usa la calculadora oficial para validar el escenario."],
    nomination: ["Algunas rutas Skilled o Employer dependen de nominación estatal, regional o del empleador.", "La nominación tiene requisitos propios además de los de la visa.", "Este punto revisa si ya identificaste si la nominación es necesaria para tu caso."],
    coe: ["Para Student, el CoE confirma inscripción en un curso registrado para estudiantes internacionales.", "El curso y proveedor deben revisarse en CRICOS y fuentes oficiales.", "Tener curso elegido no significa que la visa esté lista; aún faltan requisitos de aplicación."],
    oshc: ["Para Student, el seguro OSHC suele formar parte de la preparación de la visa.", "Debes revisar fechas, cobertura y proveedor según tu situación.", "Este simulador solo confirma que ya lo tienes considerado."],
    country_rules: ["Algunas visas, especialmente Work and Holiday 462, tienen requisitos diferentes según pasaporte.", "Pueden existir requisitos de educación, inglés, carta de apoyo, cupos o ballot.", "Siempre verifica la página oficial específica para tu país."],
    cap_ballot: ["Algunos programas tienen cupos, estado de país o proceso de ballot/pre-aplicación.", "Si el cupo está cerrado o pausado, la estrategia cambia aunque cumplas otros requisitos.", "Debe revisarse antes de pagar o preparar una aplicación completa."],
    subclass: ["Sirve para identificar si la ruta corresponde a una subclass específica, como 417 o 462.", "Cada subclass puede tener condiciones y requisitos distintos.", "No asumas subclass solo por objetivo; confirma por pasaporte y fuente oficial."],
    backup: ["Una ruta alternativa evita depender de una sola opción si la visa no aplica, está cerrada o se vuelve riesgosa.", "Puede ser Student, Visitor, Skilled, Employer o esperar mejor momento.", "Este punto mide si tienes plan B antes de tomar decisiones costosas."],
    purpose: ["Se refiere a poder explicar el propósito real de la solicitud.", "Debe ser coherente con el tipo de visa, duración, fondos y circunstancias personales.", "Si el propósito contradice las condiciones de la visa, aumenta el riesgo."],
    return: ["En rutas de visita, puede ser importante demostrar intención temporal y plan de salida.", "Puede incluir boleto, itinerario, vínculos o razones para regresar según el caso.", "No significa que siempre debas tener todo comprado; significa que el plan debe ser creíble."],
    ties: ["Se refiere a vínculos fuera de Australia, como trabajo, estudios, familia, bienes u obligaciones.", "Ayuda a explicar por qué la estadía sería temporal cuando la visa lo requiere.", "La evidencia exacta depende de tu situación."],
    no_work: ["Visitor no está diseñada como ruta para trabajar en Australia.", "Este punto revisa que tu plan no contradiga las condiciones de la visa.", "Si tu objetivo real es trabajar, conviene revisar otra ruta."],
    accommodation: ["Sirve para demostrar que tienes un plan de estadía o llegada razonable.", "Puede ser reserva, dirección inicial, invitación o plan tentativo según la ruta.", "No reemplaza otros requisitos de fondos o propósito."],
    employer: ["En rutas con patrocinio laboral, el empleador real es parte central del caso.", "No basta con intención; debe existir una posición, empresa y disposición a patrocinar si aplica.", "También deben revisarse requisitos del sponsor y de la nominación."],
    salary: ["En rutas employer sponsored, salario y condiciones pueden ser relevantes para la nominación o cumplimiento del programa.", "Debe compararse con requisitos oficiales y mercado aplicable.", "Este punto ayuda a detectar si el puesto parece viable o necesita revisión."],
    business: ["El empleador debe poder sostener la nominación, puesto y obligaciones del sponsor si aplica.", "Negocios pequeños, roles poco claros o puestos creados solo para visa pueden elevar el riesgo.", "Este punto no evalúa al negocio; solo marca que debe revisarse."],
    relationship: ["En Partner, el centro de la aplicación es demostrar una relación real y elegible.", "Suele revisarse evidencia financiera, social, doméstica y compromiso.", "Este tipo de visa puede ser sensible si la relación es corta o la evidencia es débil."],
    financial: ["En Partner, puede formar parte de la evidencia de vida compartida o interdependencia económica.", "No significa que todas las parejas tengan exactamente la misma evidencia.", "Si no existe evidencia conjunta, puede requerirse explicación y otros soportes."],
    social: ["Se refiere a evidencia de que la relación existe en un contexto social real.", "Puede incluir viajes, fotos, eventos, mensajes o conocimiento de familiares/amigos, según el caso.", "La calidad y coherencia de la evidencia importan."],
    household: ["Se refiere a convivencia, responsabilidades compartidas o dinámica doméstica.", "No todos los casos tienen la misma historia, pero debe explicarse de forma coherente.", "Puede ser un punto crítico si no hay convivencia o hay separaciones largas."],
    commitment: ["Se refiere a la continuidad, historia y compromiso de la relación.", "La línea de tiempo debe ser clara y consistente con la evidencia.", "Contradicciones de fechas o versiones pueden elevar el riesgo."],
    sponsor: ["En Partner o rutas patrocinadas, el sponsor debe cumplir condiciones propias.", "Debe revisarse identidad, estatus, elegibilidad e historial si aplica.", "Este simulador no valida al sponsor; solo marca si ya lo tienes considerado."],
    course: ["En Graduate, el curso, duración, finalización y elegibilidad pueden ser determinantes.", "Debes revisar requisitos vigentes para subclass 485 y stream correspondiente.", "Fechas y documentos de completion pueden ser críticos."],
    dates: ["Las fechas pueden afectar elegibilidad, vencimiento de visa y momento correcto para aplicar.", "Debes confirmar completion date, visa expiry, exámenes y documentos con margen suficiente.", "Errores de timing pueden cambiar toda la estrategia."],
    afp: ["Algunas rutas pueden requerir police checks o documentos de carácter.", "En Graduate, el AFP check suele ser un punto importante a revisar.", "Confirma vigencia y momento correcto según fuentes oficiales."],
    insurance: ["Se refiere a cobertura de salud o seguro requerido/adecuado según la visa.", "Puede ser OSHC, OVHC u otra cobertura dependiendo de la ruta.", "Revisa fechas y tipo de cobertura antes de aplicar."],
    stream: ["Algunas visas tienen streams o categorías internas con requisitos distintos.", "Identificar el stream correcto evita preparar documentos para una ruta equivocada.", "Debe validarse en la página oficial de la visa."],
    grant: ["El grant notice muestra subclass, fechas y condiciones de la visa concedida.", "Es clave si ya estás dentro de Australia o revisando una siguiente ruta.", "No dependas solo de memoria; confirma el documento real."],
    expiry: ["La fecha exacta de vencimiento define urgencia y margen de acción.", "Debe confirmarse en grant notice, VEVO o ImmiAccount.", "Si queda poco tiempo, aumenta el riesgo de error."],
    pending: ["Una solicitud pendiente puede cambiar estrategia, condiciones y tiempos.", "Debes conocer estado, bridging visa si aplica y comunicaciones oficiales.", "No tomar decisiones sin revisar el estado real."],
    next: ["Sirve para identificar una ruta siguiente antes de que el tiempo se vuelva crítico.", "La siguiente visa debe ser compatible con tu situación, documentos y condiciones actuales.", "No todas las rutas permiten corregir un caso a último minuto."],
    deadline: ["Revisa si tienes margen real antes de vencimientos, pagos, exámenes o documentos críticos.", "Entre menos margen, más importante es confirmar requisitos antes de actuar.", "Este punto detecta presión de tiempo."],
    route: ["Primero debe existir una ruta base para que la simulación sea útil.", "Sin ruta, los requisitos pueden cambiar demasiado.", "Selecciona una visa/ruta en M04 para personalizar el simulador."],
    identity: ["Identidad y pasaporte son base para casi cualquier solicitud.", "También pueden afectar elegibilidad por país o acuerdos de visa.", "Confirma datos antes de avanzar."],
    documents: ["Se refiere a tener documentos base ordenados antes de simular una aplicación.", "El checklist final depende de visa, país, stream y caso individual.", "Usa M06 y fuentes oficiales para revisar detalles."],
    sources: ["Revisar fuentes oficiales reduce el riesgo de usar información desactualizada.", "La fuente oficial manda sobre cualquier resumen de la app.", "Este punto confirma que no estás decidiendo solo con referencias secundarias."],
  };

  return shared[question.id] || [
    `Este punto está relacionado con ${routeName}.`,
    "Debe revisarse contra requisitos oficiales, checklist y situación individual.",
    "La simulación solo mide preparación; no confirma elegibilidad ni aprobación.",
  ];
}

function getApplicationQuestionSource(question, selectedRoute) {
  const profile = getRouteRequirementProfile(selectedRoute);
  if (profile?.source) return profile.source;
  if (selectedRoute?.source) return selectedRoute.source;

  const routeId = selectedRoute?.id || "generic";
  const routeSources = {
    student: officialSources.studentVisa,
    skilled: officialSources.skilledVisas,
    working_holiday: officialSources.workingHolidayVisa,
    working_holiday_check: officialSources.workingHolidayVisa,
    visitor: officialSources.visitorVisa,
    employer_sponsored: officialSources.employerSponsored,
    partner: officialSources.partnerVisa,
    graduate: officialSources.graduateVisa,
    current_visa_review: officialSources.visaFinder,
  };

  return routeSources[routeId] || officialSources.visaFinder;
}

function getApplicationDeliverable(question, selectedRoute) {
  const routeId = selectedRoute?.id || "generic";
  const isWhm = routeId === "working_holiday" || routeId === "working_holiday_check";

  const routeSpecific = {
    student: {
      passport: "Pasaporte vigente escaneado o datos completos del pasaporte.",
      coe: "CoE emitido por el proveedor o curso CRICOS claramente identificado.",
      funds: "Estados de cuenta, cartas de soporte financiero o evidencia económica lista para revisar.",
      oshc: "Póliza OSHC o cotización/confirmación de cobertura para el periodo de estudio.",
      genuine_student: "Borrador de explicación Genuine Student con curso, proveedor, motivos, historial y objetivos.",
      english: "Resultado de examen de inglés, carta de admisión o confirmación de requisito del proveedor.",
    },
    skilled: {
      occupation: "Nombre de ocupación, código ANZSCO probable y lista oficial donde aparece.",
      assessment: "Autoridad evaluadora identificada y checklist de skills assessment revisado.",
      english: "Resultado válido de examen de inglés o fecha de examen programada.",
      points: "Cálculo de puntos guardado y validado contra la calculadora oficial.",
      experience: "Cartas laborales, contratos, payslips o evidencia de funciones y fechas.",
      education: "Títulos, certificados, transcripts y traducciones si aplican.",
      nomination: "Estado o región objetivo, requisitos de nominación y ocupación compatible.",
    },
    working_holiday: {
      passport: "Pasaporte del país elegible y subclass confirmada, 417 o 462.",
      age: "Edad actual y fecha límite personal para aplicar antes de superar el rango permitido.",
      funds: "Evidencia de fondos iniciales y, si aplica, fondos para salida de Australia.",
      country_rules: "Checklist específico de tu país para subclass 417/462.",
      cap_ballot: "Captura o nota del estado oficial de cupo, ballot o programa para tu país.",
      conditions: "Resumen personal de condiciones de estadía, trabajo y extensión WHM.",
    },
    working_holiday_check: {
      passport: "Confirmación oficial de si tu pasaporte tiene acuerdo WHM vigente.",
      age: "Edad actual y rango oficial aplicable a tu pasaporte.",
      subclass: "Subclass correcta identificada: 417 o 462.",
      cap_ballot: "Estado oficial de cupo, ballot, pausa o disponibilidad del programa.",
      backup: "Ruta alternativa definida si WHM no aplica.",
    },
    visitor: {
      purpose: "Itinerario o explicación breve del motivo real de visita.",
      funds: "Estados de cuenta o evidencia de fondos para cubrir toda la estadía.",
      return: "Boleto de salida, plan de salida o explicación clara de retorno.",
      ties: "Evidencia de trabajo, estudios, familia, bienes u obligaciones fuera de Australia.",
      no_work: "Confirmación personal de que el plan no depende de trabajar en Australia.",
      accommodation: "Reserva, dirección inicial, carta de invitación o plan de alojamiento.",
    },
    employer_sponsored: {
      employer: "Datos del empleador, contacto y confirmación de intención de patrocinar.",
      occupation: "Puesto, funciones y ocupación aplicable identificada.",
      salary: "Oferta, contrato o salario estimado para comparar con reglas vigentes.",
      experience: "Evidencia laboral relacionada con el puesto patrocinado.",
      business: "Información básica del negocio y capacidad aparente para sostener la nominación.",
      english: "Resultado de inglés o plan para cumplir requisito del stream.",
    },
    partner: {
      relationship: "Línea de tiempo de la relación y evidencia base de relación real.",
      financial: "Cuentas, pagos, transferencias, gastos compartidos o explicación si no existen.",
      social: "Fotos, viajes, eventos, mensajes o evidencia de reconocimiento social.",
      household: "Evidencia de convivencia, responsabilidades domésticas o dinámica compartida.",
      commitment: "Declaración o notas sobre historia, compromiso y planes de la relación.",
      sponsor: "Identidad, estatus migratorio y datos básicos del sponsor.",
    },
    graduate: {
      course: "Completion letter, transcript o evidencia de curso australiano elegible.",
      dates: "Fechas clave: completion date, vencimiento de visa y ventana de aplicación.",
      english: "Resultado válido de examen de inglés o fecha de examen programada.",
      afp: "AFP check solicitado o planificado dentro del momento correcto.",
      insurance: "Evidencia de seguro de salud adecuado para la solicitud.",
      stream: "Stream probable de subclass 485 identificado y justificado.",
    },
    current_visa_review: {
      grant: "Visa grant notice guardado y revisado.",
      expiry: "Fecha exacta de vencimiento confirmada en grant notice, VEVO o ImmiAccount.",
      conditions: "Lista de condiciones actuales y lo que permiten/prohíben.",
      pending: "Estado de solicitudes pendientes o comunicaciones oficiales.",
      next: "Siguiente ruta posible identificada con fuente oficial.",
      deadline: "Calendario de fechas críticas y margen real de acción.",
    },
    generic: {
      route: "Ruta base seleccionada en M04.",
      identity: "Pasaporte e identidad organizados.",
      funds: "Presupuesto disponible y respaldo básico identificado.",
      documents: "Carpeta o lista de documentos base.",
      sources: "Fuentes oficiales revisadas y guardadas.",
    },
  };

  if (isWhm) {
    return routeSpecific[routeId]?.[question.id] || routeSpecific.working_holiday[question.id] || "Evidencia o nota concreta para confirmar este punto WHM.";
  }

  return routeSpecific[routeId]?.[question.id] || routeSpecific.generic[question.id] || "Documento, dato o evidencia concreta para revisar este requisito.";
}

function getApplicationHelpSummary(question, selectedRoute) {
  const routeId = selectedRoute?.id || "generic";
  const routeTitle = selectedRoute?.title || "la visa seleccionada";
  const isWhm = routeId === "working_holiday" || routeId === "working_holiday_check";

  const routeSpecific = {
    student: {
      passport: "Requisito: contar con pasaporte vigente para identificar al aplicante dentro de la solicitud.",
      coe: "Requisito: contar con Confirmation of Enrolment (CoE) de un curso/proveedor registrado para estudiantes internacionales.",
      funds: "Requisito de soporte: demostrar capacidad financiera suficiente cuando el checklist o la evaluación lo solicite.",
      oshc: "Requisito: contar con cobertura de salud para estudiantes internacionales (OSHC) durante el periodo correspondiente.",
      genuine_student: "Requisito: demostrar que tienes una intención genuina de estudiar en Australia y que el curso elegido es coherente con tu perfil.",
      english: "Requisito posible: presentar evidencia de inglés si aplica según el curso, proveedor, país o checklist oficial.",
    },
    skilled: {
      occupation: "Requisito base: identificar una ocupación aplicable y relacionada con tu experiencia, normalmente asociada a ANZSCO/listas oficiales.",
      assessment: "Requisito clave: obtener skills assessment positivo con la autoridad evaluadora correspondiente, cuando aplique a la ruta skilled.",
      english: "Requisito: demostrar el nivel de inglés exigido por la visa o necesario para sumar puntos.",
      points: "Requisito de puntos: alcanzar al menos el umbral mínimo indicado para rutas points-tested; alcanzar el mínimo no garantiza invitación.",
      experience: "Evidencia clave: demostrar experiencia laboral relacionada, verificable y alineada con la ocupación declarada.",
      education: "Evidencia clave: respaldar estudios, títulos o calificaciones que apoyen ocupación, puntos o evaluación de habilidades.",
      nomination: "Requisito posible: contar con nominación estatal/regional si la ruta elegida depende de subclass 190 o 491.",
    },
    working_holiday: {
      passport: "Requisito: tener pasaporte de un país o jurisdicción elegible para Working Holiday 417 o Work and Holiday 462.",
      age: "Requisito de edad: normalmente 18 a 30 años; algunos pasaportes permiten aplicar hasta 35 años en subclass 417.",
      funds: "Requisito de soporte: contar con fondos suficientes para la estadía inicial y, si aplica, salida de Australia.",
      country_rules: "Requisito específico por país: subclass 462 puede pedir educación, inglés, carta de apoyo, cupo o ballot según pasaporte.",
      cap_ballot: "Requisito operativo: verificar si tu país tiene cupo, ballot, pausa o estado especial antes de aplicar.",
      conditions: "Condición de visa: entender límites de estadía, trabajo y requisitos posteriores si quieres extender o aplicar de nuevo.",
    },
    working_holiday_check: {
      passport: "Requisito inicial: confirmar si tu pasaporte tiene acuerdo WHM vigente con Australia.",
      age: "Requisito de edad: normalmente 18 a 30 años; algunos pasaportes permiten aplicar hasta 35 años en subclass 417.",
      subclass: "Requisito de ruta: confirmar si tu caso corresponde a subclass 417 o subclass 462 antes de preparar documentos.",
      cap_ballot: "Requisito operativo: revisar cupos, ballot, pausas o estado del programa para tu país.",
      backup: "Revisión estratégica: tener ruta alternativa si tu pasaporte, edad, cupo o subclass no permite avanzar.",
    },
    visitor: {
      purpose: "Requisito: demostrar un propósito de visita temporal claro y compatible con Visitor visa.",
      funds: "Requisito de soporte: demostrar fondos suficientes para cubrir la estadía como visitante.",
      return: "Requisito de intención temporal: mostrar plan de salida o motivos creíbles para salir de Australia al finalizar la visita.",
      ties: "Evidencia de soporte: demostrar vínculos fuera de Australia, como trabajo, estudios, familia u obligaciones.",
      no_work: "Condición de visa: Visitor visa no es una ruta para trabajar en Australia.",
      accommodation: "Evidencia de soporte: contar con alojamiento, dirección inicial o plan razonable de estadía.",
    },
    employer_sponsored: {
      employer: "Requisito central: contar con un empleador real dispuesto y apto para patrocinar.",
      occupation: "Requisito: que el puesto esté alineado con una ocupación aplicable para la ruta de patrocinio.",
      salary: "Requisito posible: salario y condiciones deben ser compatibles con la nominación y reglas vigentes.",
      experience: "Evidencia clave: demostrar experiencia laboral suficiente y relacionada con el puesto patrocinado.",
      business: "Requisito del sponsor: el empleador debe poder sostener la posición, nominación y obligaciones de patrocinio.",
      english: "Requisito posible: demostrar inglés según la visa, ocupación o stream aplicable.",
    },
    partner: {
      relationship: "Requisito central: demostrar una relación real, continua y elegible con el sponsor.",
      financial: "Evidencia de relación: mostrar aspectos financieros compartidos o explicar por qué no existen.",
      social: "Evidencia de relación: demostrar reconocimiento social de la relación cuando aplique.",
      household: "Evidencia de relación: demostrar convivencia, responsabilidades domésticas o dinámica compartida.",
      commitment: "Evidencia de relación: explicar compromiso, historia y continuidad de la relación.",
      sponsor: "Requisito del sponsor: confirmar identidad, estatus y elegibilidad de la persona patrocinadora.",
    },
    graduate: {
      course: "Requisito base: haber completado estudios australianos elegibles para Temporary Graduate 485 según el stream aplicable.",
      dates: "Requisito crítico: confirmar fechas de finalización, visa actual y ventana correcta para aplicar.",
      english: "Requisito: demostrar inglés válido según los requisitos vigentes de subclass 485.",
      afp: "Requisito posible: contar con AFP check cuando aplique y dentro del momento correcto.",
      insurance: "Requisito: contar con cobertura de salud adecuada para la solicitud y estadía.",
      stream: "Requisito de ruta: identificar el stream correcto de subclass 485 antes de preparar la aplicación.",
    },
    current_visa_review: {
      grant: "Requisito de revisión: tener tu visa grant notice para confirmar subclass, fechas y condiciones.",
      expiry: "Requisito crítico: conocer la fecha exacta de vencimiento de tu visa actual.",
      conditions: "Requisito crítico: entender las condiciones activas de tu visa, como trabajo, estudio o estadía.",
      pending: "Requisito de revisión: confirmar si tienes solicitudes pendientes o comunicaciones oficiales abiertas.",
      next: "Requisito estratégico: identificar una siguiente ruta compatible antes de que el tiempo sea crítico.",
      deadline: "Requisito de tiempo: confirmar si tienes margen real antes de vencimientos o fechas límite.",
    },
    generic: {
      route: "Requisito inicial: seleccionar una ruta base para que la simulación pueda ajustar requisitos.",
      identity: "Requisito base: tener identidad y pasaporte claros antes de preparar cualquier aplicación.",
      funds: "Requisito de soporte: tener presupuesto realista antes de comprometer pagos o fechas.",
      documents: "Requisito operativo: organizar documentos base antes de revisar checklist final.",
      sources: "Requisito de seguridad: verificar la ruta en fuentes oficiales antes de decidir o aplicar.",
    },
  };

  if (isWhm) {
    return routeSpecific[routeId]?.[question.id] || routeSpecific.working_holiday[question.id] || "Requisito WHM: verifica este punto contra la página oficial de la subclass y las reglas específicas de tu pasaporte.";
  }

  return routeSpecific[routeId]?.[question.id] || routeSpecific.generic[question.id] || `Requisito relacionado con ${routeTitle}: verifica este punto contra la fuente oficial antes de avanzar.`;
}

function VisaApplicationSimulator({ selectedRoute }) {
  const profile = getApplicationSimulationProfile(selectedRoute);
  const [answers, setAnswers] = useState({});
  const [expandedHelpId, setExpandedHelpId] = useState(null);
  const result = calculateApplicationSimulation(profile, answers);
  const statusStyles = {
    "No listo": "border-[#ff6b35] bg-[#2b1208] text-[#ffb089]",
    "Casi listo": "border-[#ffd15a] bg-[#211704] text-[#ffe0a3]",
    "Listo para revisión final": "border-[#74f24d] bg-[#092414] text-[#caffbd]",
  };

  const toggleAnswer = (id) => {
    setAnswers((current) => ({ ...current, [id]: !current[id] }));
  };

  return (
    <PixelShell className="p-4">
      <div className="relative grid gap-4 font-mono">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ffd15a]">Simulación de aplicación</p>
          <h3 className="mt-2 text-xl font-black uppercase leading-tight text-[#fff1d0]">{profile.title}</h3>
          <p className="mt-2 text-xs font-bold leading-relaxed text-[#cfc7b8]">{profile.subtitle}</p>
        </div>

        <div className={`border-2 p-4 ${statusStyles[result.status]}`}>
          <p className="text-[10px] font-black uppercase tracking-widest">Estado simulado</p>
          <p className="mt-1 text-3xl font-black leading-none">{result.percent}%</p>
          <p className="mt-2 text-sm font-black uppercase">{result.status}</p>
          <p className="mt-2 text-xs font-bold leading-relaxed">{result.message}</p>
        </div>

        <ProgressBlocks value={result.percent} />

        <div className="grid gap-2">
          {profile.questions.map((question) => {
            const questionHelpSummary = getApplicationHelpSummary(question, selectedRoute);
            const questionDeliverable = getApplicationDeliverable(question, selectedRoute);
            const questionSource = getApplicationQuestionSource(question, selectedRoute);
            const hasHelp = Boolean(questionHelpSummary && questionSource?.url);
            const isHelpOpen = expandedHelpId === question.id;
            return (
              <div key={question.id} className="grid gap-2">
                <div className={`grid grid-cols-[1fr_auto] items-stretch gap-2 border-2 p-2 ${answers[question.id] ? "border-[#74f24d] bg-[#092414] text-[#74f24d]" : "border-[#314258] bg-[#07111f] text-[#cfc7b8]"}`}>
                  <button
                    type="button"
                    onClick={() => toggleAnswer(question.id)}
                    className="text-left text-xs font-black uppercase tracking-wider"
                  >
                    <span className="mr-2">{answers[question.id] ? "✓" : "□"}</span>
                    {question.label}
                    <span className="ml-2 text-[10px] opacity-80">+{question.weight}</span>
                  </button>
                  {hasHelp && (
                    <button
                      type="button"
                      onClick={() => setExpandedHelpId(isHelpOpen ? null : question.id)}
                      className="flex h-8 w-8 items-center justify-center border-2 border-[#ffd15a] bg-[#3a2505] text-xs font-black text-[#ffd15a]"
                      aria-label={`Ver ayuda sobre ${question.label}`}
                    >
                      ?
                    </button>
                  )}
                </div>
                {hasHelp && isHelpOpen && (
                  <div className="border border-[#ffd15a] bg-[#150f05] p-3 text-[11px] font-bold leading-relaxed text-[#ffe0a3]" style={{ animation: "fadeInUp 180ms ease both" }}>
                    <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">Resumen del requisito</p>
                    <p>{questionHelpSummary}</p>
                    <div className="mt-3 border border-[#263a50] bg-[#08182b] p-2 text-[#e8dcc8]">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#74f24d]">Entregable</p>
                      <p className="mt-1">{questionDeliverable}</p>
                    </div>
                    <p className="mt-2 text-[#e8dcc8]">Para más información, verifica la fuente oficial.</p>
                    <a className="mt-2 inline-block text-[10px] font-black uppercase tracking-widest text-[#74f24d] underline" href={questionSource.url} target="_blank" rel="noreferrer">
                      {questionSource.label} →
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="border border-[#263a50] bg-[#08182b] p-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#ff9f1c]">Advertencia</p>
          <p className="mt-1 text-xs font-bold leading-relaxed text-[#e8dcc8]">{profile.warning}</p>
        </div>

        <div className="border border-[#263a50] bg-[#08182b] p-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">Sin carga de documentos</p>
          <p className="mt-1 text-xs font-bold leading-relaxed text-[#cfc7b8]">
            Esta simulación solo usa respuestas internas. No requiere subir archivos, fotos ni documentos externos.
          </p>
        </div>
      </div>
    </PixelShell>
  );
}

function calculateStudentCostSimulation(input) {
  const applicationFee = parseAud(input.applicationFee);
  const initialTuition = parseAud(input.initialTuition);
  const oshc = parseAud(input.oshc);
  const medical = parseAud(input.medical);
  const biometrics = parseAud(input.biometrics);
  const translations = parseAud(input.translations);
  const flight = parseAud(input.flight);
  const rentWeeks = parseAud(input.rentWeeks);
  const weeklyRent = parseAud(input.weeklyRent);
  const bond = parseAud(input.bond);
  const foodWeeks = parseAud(input.foodWeeks);
  const weeklyFood = parseAud(input.weeklyFood);
  const transport = parseAud(input.transport);
  const emergency = parseAud(input.emergency);
  const availableBudget = parseAud(input.availableBudget);

  const applicationTotal = applicationFee + oshc + medical + biometrics + translations;
  const studyTotal = initialTuition;
  const livingTotal = flight + rentWeeks * weeklyRent + bond + foodWeeks * weeklyFood + transport + emergency;
  const total = applicationTotal + studyTotal + livingTotal;
  const difference = availableBudget - total;

  let status = "Zona de riesgo";
  let message = "El presupuesto disponible queda por debajo del costo simulado. Revisa matrícula, alojamiento, fechas o fondo de emergencia antes de avanzar.";

  if (availableBudget <= 0) {
    status = "Pendiente";
    message = "Agrega tu presupuesto disponible para comparar contra el costo total simulado.";
  } else if (difference >= total * 0.15) {
    status = "Con margen";
    message = "El presupuesto cubre el escenario y deja margen. Aun así, verifica costos reales y requisitos oficiales antes de pagar.";
  } else if (difference >= 0) {
    status = "Muy justo";
    message = "El presupuesto cubre el escenario, pero con poco margen. Conviene ajustar costos o aumentar reserva.";
  }

  return { applicationTotal, studyTotal, livingTotal, total, availableBudget, difference, status, message };
}

function StudentCostSimulator({ answers }) {
  const [openSection, setOpenSection] = useState("result");
  const [input, setInput] = useState(() => ({
    availableBudget: getBudgetNumberFromRange(answers.budget) || 0,
    applicationFee: 710,
    initialTuition: 3500,
    oshc: 700,
    medical: 0,
    biometrics: 0,
    translations: 250,
    flight: 1200,
    rentWeeks: 4,
    weeklyRent: 300,
    bond: 1200,
    foodWeeks: 4,
    weeklyFood: 140,
    transport: 250,
    emergency: 1500,
  }));

  const result = calculateStudentCostSimulation(input);
  const statusStyles = {
    Pendiente: "border-[#4a5568] bg-[#0b1422] text-[#c9c3b5]",
    "Zona de riesgo": "border-[#ff6b35] bg-[#2b1208] text-[#ffb089]",
    "Muy justo": "border-[#ffd15a] bg-[#211704] text-[#ffe0a3]",
    "Con margen": "border-[#74f24d] bg-[#092414] text-[#caffbd]",
  };

  const update = (key, value) => setInput((current) => ({ ...current, [key]: value }));
  const MoneyInput = ({ label, valueKey, note }) => (
    <label className="grid gap-2 text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">
      {label}
      <input
        type="number"
        min="0"
        className="border-2 border-[#314258] bg-[#08182b] px-3 py-3 font-mono text-xs font-bold normal-case tracking-normal text-[#fff1d0] outline-none focus:border-[#ffd15a]"
        value={input[valueKey]}
        onChange={(event) => update(valueKey, event.target.value)}
      />
      {note && <span className="text-[10px] font-bold normal-case tracking-normal text-[#aeb7c2]">{note}</span>}
    </label>
  );

  return (
    <PixelShell className="p-4">
      <div className="relative grid gap-4 font-mono">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ffd15a]">Costo Total Student</p>
          <p className="mt-2 text-xs font-bold leading-relaxed text-[#cfc7b8]">
            Simula cuánto dinero necesitarías para una ruta Student inicial. Todos los valores están en dólares australianos (AUD) y son editables.
          </p>
        </div>

        <ScenarioAccordionButton id="result" title="Resultado" accent="gold" openSection={openSection} setOpenSection={setOpenSection}>
          <div className="grid gap-3">
            <MoneyInput label="Presupuesto disponible · AUD" valueKey="availableBudget" />
            <div className={`border-2 p-4 ${statusStyles[result.status]}`}>
              <p className="text-[10px] font-black uppercase tracking-widest">Estado</p>
              <p className="mt-1 text-lg font-black uppercase">{result.status}</p>
              <p className="mt-2 text-xs font-bold leading-relaxed">{result.message}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-[#263a50] bg-[#08182b] p-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">Total simulado</p>
                <p className="mt-1 text-sm font-black text-[#fff1d0]">{formatAud(result.total)}</p>
              </div>
              <div className={`border p-3 ${result.difference >= 0 ? "border-[#74f24d] bg-[#092414] text-[#caffbd]" : "border-[#ff6b35] bg-[#2b1208] text-[#ffb089]"}`}>
                <p className="text-[10px] font-black uppercase tracking-widest">Diferencia</p>
                <p className="mt-1 text-sm font-black">{formatAud(result.difference)}</p>
              </div>
            </div>
            <ProgressBlocks value={result.availableBudget > 0 && result.total > 0 ? Math.min(100, Math.round((result.availableBudget / result.total) * 100)) : 0} />
          </div>
        </ScenarioAccordionButton>

        <ScenarioAccordionButton id="application" title="Costos de aplicación" accent="gold" openSection={openSection} setOpenSection={setOpenSection}>
          <div className="grid gap-3">
            <MoneyInput label="Tarifa de visa" valueKey="applicationFee" note="Editable. Verifica siempre el Visa Pricing Estimator." />
            <MoneyInput label="OSHC / seguro de estudiante" valueKey="oshc" />
            <MoneyInput label="Exámenes médicos" valueKey="medical" note="Puede aplicar según país, historial o solicitud." />
            <MoneyInput label="Biométricos" valueKey="biometrics" note="Puede aplicar según país o solicitud." />
            <MoneyInput label="Traducciones / documentos" valueKey="translations" />
            <div className="border border-[#263a50] bg-[#08182b] p-3 text-xs font-bold text-[#e8dcc8]">
              Total aplicación: <span className="text-[#ffd15a]">{formatAud(result.applicationTotal)}</span>
            </div>
          </div>
        </ScenarioAccordionButton>

        <ScenarioAccordionButton id="study" title="Costos de estudio" accent="green" openSection={openSection} setOpenSection={setOpenSection}>
          <div className="grid gap-3">
            <MoneyInput label="Matrícula / pago inicial" valueKey="initialTuition" note="Depende del proveedor, curso, duración y plan de pagos." />
            <div className="border border-[#263a50] bg-[#08182b] p-3 text-xs font-bold text-[#e8dcc8]">
              Total estudio inicial: <span className="text-[#74f24d]">{formatAud(result.studyTotal)}</span>
            </div>
          </div>
        </ScenarioAccordionButton>

        <ScenarioAccordionButton id="living" title="Costo de vida inicial" accent="orange" openSection={openSection} setOpenSection={setOpenSection}>
          <div className="grid gap-3">
            <MoneyInput label="Vuelo" valueKey="flight" />
            <MoneyInput label="Semanas de renta inicial" valueKey="rentWeeks" />
            <MoneyInput label="Renta semanal" valueKey="weeklyRent" />
            <MoneyInput label="Bond / depósito" valueKey="bond" />
            <MoneyInput label="Semanas de comida" valueKey="foodWeeks" />
            <MoneyInput label="Comida semanal" valueKey="weeklyFood" />
            <MoneyInput label="Transporte inicial" valueKey="transport" />
            <MoneyInput label="Fondo de emergencia" valueKey="emergency" />
            <div className="border border-[#263a50] bg-[#08182b] p-3 text-xs font-bold text-[#e8dcc8]">
              Total vida inicial: <span className="text-[#ff9f1c]">{formatAud(result.livingTotal)}</span>
            </div>
          </div>
        </ScenarioAccordionButton>

        <ScenarioAccordionButton id="sources" title="Fuentes oficiales" accent="gold" openSection={openSection} setOpenSection={setOpenSection}>
          <div className="grid gap-3">
            <SourceCard source={officialSources.studentVisa} title="Student visa subclass 500" description="Revisa requisitos generales, condiciones y proceso oficial." />
            <SourceCard source={officialSources.visaPricing} title="Costos oficiales de visa" description="Confirma tarifa vigente antes de presupuestar o pagar." />
            <SourceCard source={officialSources.studyAustraliaCost} title="Costos de vida y estudio" description="Referencia oficial para estimar gastos de vida y educación en Australia." />
            <SourceCard source={officialSources.cricos} title="Cursos y proveedores CRICOS" description="Verifica que curso y proveedor estén registrados para estudiantes internacionales." />
          </div>
        </ScenarioAccordionButton>
      </div>
    </PixelShell>
  );
}

function SkilledPointsSimulator({ answers }) {
  const [input, setInput] = useState(() => ({
    age: answers.age || "",
    english: answers.englishLevel === "Avanzado" ? "proficient" : answers.englishLevel === "Tengo examen oficial" ? "proficient" : "competent",
    overseasWork: answers.workExperience === "more_5_years" ? "5_8" : answers.workExperience === "3_5_years" ? "3_5" : "less_3",
    australianWork: "less_1",
    education: "bachelor_master",
    nomination: "none",
    partner: "none",
    australianStudy: false,
    specialistEducation: false,
    regionalStudy: false,
    communityLanguage: false,
    professionalYear: false,
  }));

  const result = calculateSkilledPoints(input);
  const statusStyles = {
    "Por debajo del mínimo": "border-[#ff6b35] bg-[#2b1208] text-[#ffb089]",
    "Mínimo técnico": "border-[#ffd15a] bg-[#211704] text-[#ffe0a3]",
    "Base más fuerte": "border-[#74f24d] bg-[#092414] text-[#caffbd]",
  };

  const update = (key, value) => setInput((current) => ({ ...current, [key]: value }));

  return (
    <PixelShell className="p-4">
      <div className="relative grid gap-4 font-mono">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ffd15a]">Calculadora Skilled</p>
          <p className="mt-2 text-xs font-bold leading-relaxed text-[#cfc7b8]">
            Simula puntos para rutas Skilled. Esto no confirma elegibilidad ni invitación; solo ordena tu escenario.
          </p>
        </div>

        <div className={`border-2 p-4 ${statusStyles[result.status]}`}>
          <p className="text-[10px] font-black uppercase tracking-widest">Puntaje estimado</p>
          <p className="mt-1 text-4xl font-black leading-none">{result.total}</p>
          <p className="mt-2 text-sm font-black uppercase">{result.status}</p>
          <p className="mt-2 text-xs font-bold leading-relaxed">{result.message}</p>
        </div>

        <div className="grid gap-3">
          <label className="grid gap-2 text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">
            Edad
            <input
              type="number"
              min="0"
              className="border-2 border-[#314258] bg-[#08182b] px-3 py-3 font-mono text-xs font-bold normal-case tracking-normal text-[#fff1d0] outline-none focus:border-[#ffd15a]"
              value={input.age}
              onChange={(event) => update("age", event.target.value)}
            />
          </label>

          <label className="grid gap-2 text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">
            Inglés
            <select className="border-2 border-[#314258] bg-[#08182b] px-3 py-3 font-mono text-xs font-bold normal-case tracking-normal text-[#fff1d0] outline-none focus:border-[#ffd15a]" value={input.english} onChange={(event) => update("english", event.target.value)}>
              <option value="competent">Competent English · 0 pts</option>
              <option value="proficient">Proficient English · 10 pts</option>
              <option value="superior">Superior English · 20 pts</option>
            </select>
          </label>

          <label className="grid gap-2 text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">
            Experiencia fuera de Australia
            <select className="border-2 border-[#314258] bg-[#08182b] px-3 py-3 font-mono text-xs font-bold normal-case tracking-normal text-[#fff1d0] outline-none focus:border-[#ffd15a]" value={input.overseasWork} onChange={(event) => update("overseasWork", event.target.value)}>
              <option value="less_3">Menos de 3 años · 0 pts</option>
              <option value="3_5">3 a menos de 5 años · 5 pts</option>
              <option value="5_8">5 a menos de 8 años · 10 pts</option>
              <option value="more_8">8 años o más · 15 pts</option>
            </select>
          </label>

          <label className="grid gap-2 text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">
            Experiencia en Australia
            <select className="border-2 border-[#314258] bg-[#08182b] px-3 py-3 font-mono text-xs font-bold normal-case tracking-normal text-[#fff1d0] outline-none focus:border-[#ffd15a]" value={input.australianWork} onChange={(event) => update("australianWork", event.target.value)}>
              <option value="less_1">Menos de 1 año · 0 pts</option>
              <option value="1_3">1 a menos de 3 años · 5 pts</option>
              <option value="3_5">3 a menos de 5 años · 10 pts</option>
              <option value="5_8">5 a menos de 8 años · 15 pts</option>
              <option value="more_8">8 años o más · 20 pts</option>
            </select>
          </label>

          <label className="grid gap-2 text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">
            Educación
            <select className="border-2 border-[#314258] bg-[#08182b] px-3 py-3 font-mono text-xs font-bold normal-case tracking-normal text-[#fff1d0] outline-none focus:border-[#ffd15a]" value={input.education} onChange={(event) => update("education", event.target.value)}>
              <option value="doctorate">Doctorado · 20 pts</option>
              <option value="bachelor_master">Bachelor / Master · 15 pts</option>
              <option value="diploma_trade">Diploma / trade qualification · 10 pts</option>
              <option value="other">Otra / no confirmada · 0 pts</option>
            </select>
          </label>

          <label className="grid gap-2 text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">
            Nominación
            <select className="border-2 border-[#314258] bg-[#08182b] px-3 py-3 font-mono text-xs font-bold normal-case tracking-normal text-[#fff1d0] outline-none focus:border-[#ffd15a]" value={input.nomination} onChange={(event) => update("nomination", event.target.value)}>
              <option value="none">Sin nominación · 0 pts</option>
              <option value="state_190">State nomination 190 · 5 pts</option>
              <option value="regional_491">Regional nomination 491 · 15 pts</option>
            </select>
          </label>

          <label className="grid gap-2 text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">
            Pareja / estado
            <select className="border-2 border-[#314258] bg-[#08182b] px-3 py-3 font-mono text-xs font-bold normal-case tracking-normal text-[#fff1d0] outline-none focus:border-[#ffd15a]" value={input.partner} onChange={(event) => update("partner", event.target.value)}>
              <option value="none">Sin puntos de pareja · 0 pts</option>
              <option value="skilled_partner">Pareja skilled elegible · 10 pts</option>
              <option value="single_or_partner_aus">Soltero/a o pareja AU citizen/PR · 10 pts</option>
              <option value="competent_partner">Pareja con competent English · 5 pts</option>
            </select>
          </label>
        </div>

        <div className="grid gap-2">
          {[
            ["australianStudy", "Australian study requirement · 5 pts"],
            ["specialistEducation", "Specialist education qualification · 10 pts"],
            ["regionalStudy", "Study in regional Australia · 5 pts"],
            ["communityLanguage", "Credentialled community language · 5 pts"],
            ["professionalYear", "Professional Year in Australia · 5 pts"],
          ].map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => update(key, !input[key])}
              className={`border-2 px-3 py-2 text-left text-[10px] font-black uppercase tracking-widest ${input[key] ? "border-[#74f24d] bg-[#092414] text-[#74f24d]" : "border-[#314258] bg-[#07111f] text-[#cfc7b8]"}`}
            >
              {input[key] ? "✓ " : "□ "}{label}
            </button>
          ))}
        </div>

        <div className="grid gap-2">
          {result.breakdown.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between border border-[#263a50] bg-[#08182b] px-3 py-2 text-xs font-bold text-[#e8dcc8]">
              <span>{label}</span>
              <span className="text-[#ffd15a]">{value} pts</span>
            </div>
          ))}
        </div>

        <SourceCard
          source={officialSources.skilledVisas}
          title="Skilled visas"
          description="Referencia oficial para revisar rutas Skilled y requisitos asociados."
        />
        <SourceCard
          source={{ label: "Department of Home Affairs · Points calculator", url: "https://immi.homeaffairs.gov.au/help-support/tools/points-calculator" }}
          title="Calculadora oficial de puntos"
          description="Usa la herramienta oficial para confirmar el puntaje antes de tomar decisiones."
        />
      </div>
    </PixelShell>
  );
}

function getScenarioAlerts(answers = {}, selectedRoute) {
  const routeId = selectedRoute?.id || "generic";
  const alerts = [];
  const budgetValue = getBudgetNumberFromRange(answers.budget);
  const age = Number(answers.age || 0);
  const documents = Array.isArray(answers.documentsReady) ? answers.documentsReady.filter((item) => item !== "Ninguno todavía") : [];

  if (!selectedRoute) alerts.push("No hay ruta seleccionada. Vuelve a M04 para elegir una ruta antes de simular aplicación.");
  if (!answers.passport && !answers.passportOther) alerts.push("Falta pasaporte principal; puede cambiar elegibilidad, subclass y requisitos.");
  if (!answers.age) alerts.push("Falta edad; algunas rutas dependen de rango de edad o puntos.");
  if (budgetValue > 0 && budgetValue < 5000 && ["student", "skilled", "partner", "employer_sponsored"].includes(routeId)) alerts.push("El presupuesto registrado puede ser bajo para esta ruta; revisa M05 antes de comprometer pagos.");
  if (documents.length <= 1) alerts.push("Hay pocos documentos marcados como listos; conviene revisar M06 antes de avanzar.");

  if (routeId === "student") {
    if (answers.englishLevel === "Básico" || answers.englishLevel === "No lo sé") alerts.push("Student puede requerir revisar inglés, admisión o requisitos del proveedor.");
    alerts.push("Revisa que curso, proveedor, fondos y Genuine Student estén alineados antes de aplicar.");
  }

  if (routeId === "skilled") {
    alerts.push("Skilled depende de ocupación, puntos, inglés y skills assessment; no basta con experiencia general.");
  }

  if (routeId === "working_holiday" || routeId === "working_holiday_check") {
    if (age > 30) alerts.push("Verifica edad máxima según pasaporte; algunos 417 permiten hasta 35, pero muchos casos son hasta 30.");
    alerts.push("Confirma subclass, cupos, ballot y requisitos específicos del país antes de pagar.");
  }

  if (routeId === "visitor") {
    alerts.push("Visitor no debe depender de trabajar en Australia; el propósito debe ser temporal y compatible con la visa.");
  }

  if (routeId === "current_visa_review" || functionallyHasVisaExpiryRisk(answers)) {
    alerts.push("Tu visa actual o fechas pueden cambiar la estrategia; confirma grant notice, VEVO y condiciones antes de moverte.");
  }

  return alerts.length ? alerts.slice(0, 5) : ["No hay alertas fuertes detectadas, pero aún debes verificar requisitos oficiales antes de aplicar."];
}

function ScenarioAccordionButton({ id, title, accent = "gold", openSection, setOpenSection, children }) {
  const isOpen = openSection === id;
  const accentStyles = {
    gold: {
      border: "border-[#ffd15a]",
      bg: "bg-[#17110a]",
      text: "text-[#ffd15a]",
      panel: "border-[#263a50] bg-[#08182b]",
    },
    green: {
      border: "border-[#74f24d]",
      bg: "bg-[#092414]",
      text: "text-[#74f24d]",
      panel: "border-[#263a50] bg-[#08182b]",
    },
    orange: {
      border: "border-[#ff9f1c]",
      bg: "bg-[#150f05]",
      text: "text-[#ff9f1c]",
      panel: "border-[#3b2a14] bg-[#08182b]",
    },
  };
  const styles = accentStyles[accent] || accentStyles.gold;

  return (
    <div className="grid gap-2">
      <button
        type="button"
        onClick={() => setOpenSection(isOpen ? null : id)}
        className={`flex items-center justify-between border-2 px-4 py-3 font-mono text-left shadow-[0_4px_0_rgba(0,0,0,0.35)] ${styles.border} ${styles.bg}`}
      >
        <span className={`text-xs font-black uppercase tracking-[0.2em] ${styles.text}`}>{title}</span>
        <span className={`text-lg font-black ${styles.text}`}>{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen && (
        <div className={`border p-4 ${styles.panel}`} style={{ animation: "fadeInUp 180ms ease both" }}>
          {children}
        </div>
      )}
    </div>
  );
}

function ScenarioCurrentScreen({ answers, selectedRoute, routeTitle }) {
  const [openSection, setOpenSection] = useState(null);
  const goals = getSelectedGoals(answers);
  const alerts = getScenarioAlerts(answers, selectedRoute);
  const passportText = answers.passportOther || answers.passport || "No registrado";
  const secondPassportText = answers.secondPassport === "yes" ? answers.secondPassportOther || answers.secondPassportCountry || "Sí, sin país registrado" : answers.secondPassport === "no" ? "No" : "No registrado";
  const scenarioRows = [
    ["Ruta simulada", routeTitle],
    ["Pasaporte", passportText],
    ["Segundo pasaporte", secondPassportText],
    ["Edad", answers.age ? `${answers.age} años` : "No registrada"],
    ["Ubicación", getLocationLabel(answers.location)],
    ["Objetivos", goals.length ? goals.map((goal) => getGoalLabel(goal)).join(" + ") : "No registrados"],
    ["Visa actual", answers.currentVisa || getVisaStatusLabel(answers.hasVisa)],
    ["Presupuesto", answers.budget || "No registrado"],
    ["Inglés", answers.englishLevel || "No registrado"],
    ["Experiencia", getWorkExperienceLabel(answers.workExperience)],
    ["Área laboral", getWorkCategoryLabel(answers.workCategory, answers.workCategoryOther)],
    ["Documentos listos", formatDocuments(answers.documentsReady)],
  ];

  return (
    <div className="grid gap-3">
      <ScenarioAccordionButton id="overview" title="Lectura del escenario" accent="gold" openSection={openSection} setOpenSection={setOpenSection}>
        <div className="relative grid gap-3 font-mono">
          <h3 className="text-xl font-black uppercase leading-tight text-[#fff1d0]">{routeTitle}</h3>
          <p className="text-xs font-bold leading-relaxed text-[#cfc7b8]">
            Esta pantalla hereda tu diagnóstico del Mapa 1 y lo traduce a una base de simulación. No confirma elegibilidad; solo ordena qué vas a probar en este mapa.
          </p>
        </div>
      </ScenarioAccordionButton>

      <ScenarioAccordionButton id="data" title="Datos heredados del Mapa 1" accent="gold" openSection={openSection} setOpenSection={setOpenSection}>
        <div className="relative grid gap-2 font-mono">
          {scenarioRows.map(([label, value]) => (
            <div key={label} className="grid gap-1 border border-[#263a50] bg-[#08182b] p-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">{label}</p>
              <p className="text-xs font-bold leading-relaxed text-[#e8dcc8]">{value}</p>
            </div>
          ))}
        </div>
      </ScenarioAccordionButton>

      <ScenarioAccordionButton id="alerts" title="Alertas iniciales" accent="orange" openSection={openSection} setOpenSection={setOpenSection}>
        <div className="relative grid gap-3 font-mono">
          {alerts.map((alert) => (
            <div key={alert} className="border border-[#ff9f1c] bg-[#150f05] p-3 text-xs font-bold leading-relaxed text-[#ffe0a3]">
              ! {alert}
            </div>
          ))}
        </div>
      </ScenarioAccordionButton>

      <ScenarioAccordionButton id="application" title="Simulación de aplicación" accent="gold" openSection={openSection} setOpenSection={setOpenSection}>
        <VisaApplicationSimulator selectedRoute={selectedRoute} />
      </ScenarioAccordionButton>
    </div>
  );
}

function SimulatorMissionBody({ selectedSimMission, answers, selectedRoute, routeTitle }) {
  if (selectedSimMission.id === "S01") {
    return <ScenarioCurrentScreen answers={answers} selectedRoute={selectedRoute} routeTitle={routeTitle} />;
  }

  if (selectedSimMission.id === "S02") {
    return <SkilledPointsSimulator answers={answers} />;
  }

  if (selectedSimMission.id === "S02_STUDENT") {
    return <StudentCostSimulator answers={answers} />;
  }

  return (
    <>
      <PixelShell className="p-4">
        <div className="relative font-mono">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ffd15a]">Próximo desarrollo</p>
          <p className="mt-2 text-xs font-bold leading-relaxed text-[#cfc7b8]">
            Este simulador se desarrollará después. El mapa ya cambia según la ruta seleccionada; ahora falta construir la herramienta específica de esta misión.
          </p>
          <div className="mt-3 border border-[#263a50] bg-[#08182b] p-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">Ruta dinámica</p>
            <p className="mt-1 text-xs font-bold leading-relaxed text-[#e8dcc8]">{routeTitle}</p>
          </div>
        </div>
      </PixelShell>

      <VisaApplicationSimulator selectedRoute={selectedRoute} />
    </>
  );
}

function SimulatorMissionDetailScreen({ mission, answers, selectedRoute, routeTitle, onBack }) {
  return (
    <main className="relative px-4 pb-28 pt-4">
      <PixelShell glow className="p-4 shadow-[0_0_24px_rgba(255,209,90,0.18)]">
        <div className="relative flex items-start gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-[#ffd15a] bg-[#3a2505] text-[#ffd15a]">
            <Icon type={mission.status === "locked" ? "lock" : mission.icon} size={30} />
          </div>
          <div>
            <p className="font-mono text-xs font-black uppercase tracking-[0.24em] text-[#ff9f1c]">Mapa 2 · Simulador</p>
            <h2 className="mt-1 font-mono text-2xl font-black uppercase leading-none text-[#fff1d0]">{mission.id} · {mission.title}</h2>
            <p className="mt-3 font-mono text-sm font-bold leading-relaxed text-[#cfc7b8]">{mission.description}</p>
          </div>
        </div>
      </PixelShell>

      <div className="mt-4 grid gap-4">
        <SimulatorMissionBody selectedSimMission={mission} answers={answers} selectedRoute={selectedRoute} routeTitle={routeTitle} />

        <button
          type="button"
          onClick={onBack}
          className="border-2 border-[#314258] bg-[#07111f] px-3 py-3 font-mono text-xs font-black uppercase tracking-widest text-[#cfc7b8] shadow-[0_5px_0_rgba(0,0,0,0.45)]"
        >
          Volver al simulador
        </button>
      </div>
    </main>
  );
}

function SimulatorMapScreen({ answers, selectedRoute, onOpenEscapeMap, onOpenArrivalMap }) {
  const simulatorMissions = useMemo(() => getSimulatorMissions(selectedRoute), [selectedRoute]);
  const defaultMissionId = useMemo(() => getSimulatorDefaultMissionId(selectedRoute), [selectedRoute]);
  const [selectedSimMissionId, setSelectedSimMissionId] = useState(null);
  const selectedSimMission = selectedSimMissionId ? simulatorMissions.find((mission) => mission.id === selectedSimMissionId) : null;
  const routeTitle = selectedRoute?.title || "Ruta no seleccionada";
  const routeLabel = selectedRoute?.id ? `Simulador ${selectedRoute.title}` : "Simulador general";

  if (selectedSimMission) {
    return (
      <SimulatorMissionDetailScreen
        mission={selectedSimMission}
        answers={answers}
        selectedRoute={selectedRoute}
        routeTitle={routeTitle}
        onBack={() => setSelectedSimMissionId(null)}
      />
    );
  }

  return (
    <main className="relative px-3 pb-28">
      <section className="relative mt-2">
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px flex-1 bg-[#263a50]" />
          <span className="font-mono text-lg font-black uppercase tracking-[0.14em] text-[#ffd15a]">✦ {routeLabel} ✦</span>
          <span className="h-px flex-1 bg-[#263a50]" />
        </div>

        <div className="relative overflow-hidden border-2 border-[#8b5d18] bg-[#07182b] px-2 pb-5 pt-4 shadow-[inset_0_0_50px_rgba(0,0,0,0.35)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(255,209,90,0.16),transparent_22%),radial-gradient(circle_at_20%_55%,rgba(17,65,98,0.25),transparent_22%),radial-gradient(circle_at_80%_60%,rgba(112,75,10,0.22),transparent_18%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:14px_14px] opacity-50" />

          <div className="relative z-10 flex justify-center">
            <div className="relative flex flex-col items-center" style={{ animation: "floatingPanelSoft 3s ease-in-out infinite" }}>
              <div className="flex h-20 w-20 items-center justify-center border-2 border-[#ffd15a] bg-[#3a2505] text-[#ffd15a] shadow-[0_0_24px_rgba(255,209,90,0.28)]">
                <Icon type="star" size={44} />
              </div>
              <div className="relative mt-2 border-2 border-[#ffd15a] bg-[#17110a] px-6 py-2 font-mono text-xl font-black uppercase tracking-[0.12em] text-[#ffd15a] shadow-[0_0_24px_rgba(255,209,90,0.24)]">
                Simulador
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-5 grid gap-3 px-0 sm:px-4">
            {simulatorMissions.map((mission, index) => {
              const isSelected = false;
              const styles = getStatusStyles(mission.status);
              return (
                <button
                  key={mission.id}
                  type="button"
                  onClick={() => setSelectedSimMissionId(mission.id)}
                  className={`relative border-2 p-3 text-left font-mono transition-transform hover:scale-[1.01] ${isSelected ? "border-[#ffd15a] bg-[#3a2505]" : "border-[#314258] bg-[#07111f]"}`}
                  style={{ animation: `fadeInUp 340ms ease both ${index * 45}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center border-2 ${styles.badge}`}>
                      <Icon type={mission.status === "locked" ? "lock" : mission.icon} size={19} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-black uppercase text-[#fff1d0]">{mission.id} · {mission.title}</p>
                      <p className={`mt-1 text-[10px] font-black uppercase tracking-widest ${styles.text}`}>{styles.label}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="relative z-10 mt-5 grid gap-3">
            <PixelShell glow className="p-4 shadow-[0_0_18px_rgba(255,209,90,0.18)]">
              <div className="relative flex items-start gap-2 font-mono">
                <Icon type="info" className="mt-0.5 shrink-0 text-[#ffd15a]" size={18} />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">Selecciona un simulador</p>
                  <p className="mt-1 text-[11px] font-bold leading-relaxed text-[#e8dcc8]">
                    Toca una tarjeta para abrir su subpantalla. Así no tienes que desplazarte hasta abajo para ver el contenido.
                  </p>
                  <p className="mt-2 text-[11px] font-bold leading-relaxed text-[#cfc7b8]">Ruta base actual: {routeTitle}</p>
                </div>
              </div>
            </PixelShell>

            <div className="grid grid-cols-[1fr_1.4fr] gap-3">
              <button type="button" onClick={onOpenEscapeMap} className="border-2 border-[#314258] bg-[#07111f] px-3 py-3 font-mono text-xs font-black uppercase tracking-widest text-[#cfc7b8] shadow-[0_5px_0_rgba(0,0,0,0.45)]">
                Mapa Escape
              </button>
              <button type="button" onClick={onOpenArrivalMap} className="border-2 border-[#74f24d] bg-[#092414] px-3 py-3 font-mono text-xs font-black uppercase tracking-widest text-[#74f24d] shadow-[0_5px_0_rgba(0,0,0,0.55)]">
                Mapa Aterrizaje
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ArrivalMapScreen({ selectedRoute, onBackToEscapeMap }) {
  const [selectedArrivalMission, setSelectedArrivalMission] = useState(arrivalMissionData[0]);
  const routeHint = selectedRoute?.id === "student"
    ? "Prioridad Student: vuelos, OSHC, CoE, campus, banco, SIM y reglas de trabajo."
    : selectedRoute?.id === "working_holiday"
      ? "Prioridad WHM: vuelos flexibles, TFN, alojamiento inicial, trabajo rápido y documentos básicos."
      : selectedRoute?.id === "visitor"
        ? "Prioridad Visitor: boletos, alojamiento, presupuesto y condiciones de no trabajo."
        : "Prioridad general: aterrizaje, trámites básicos, transporte, alojamiento y supervivencia inicial.";

  return (
    <main className="relative px-3 pb-28">
      <section className="relative mt-2">
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px flex-1 bg-[#263a50]" />
          <span className="font-mono text-lg font-black uppercase tracking-[0.14em] text-[#74f24d]">✦ Primeros Pasos ✦</span>
          <span className="h-px flex-1 bg-[#263a50]" />
        </div>

        <div className="relative overflow-hidden border-2 border-[#1f5f3a] bg-[#07182b] px-2 pb-5 pt-4 shadow-[inset_0_0_50px_rgba(0,0,0,0.35)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(116,242,77,0.16),transparent_22%),radial-gradient(circle_at_20%_55%,rgba(17,65,98,0.25),transparent_22%),radial-gradient(circle_at_80%_60%,rgba(25,80,52,0.2),transparent_18%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:14px_14px] opacity-50" />

          <div className="relative z-10 flex justify-center">
            <div className="relative flex flex-col items-center" style={{ animation: "floatingPanelSoft 3s ease-in-out infinite" }}>
              <div className="flex h-20 w-20 items-center justify-center border-2 border-[#74f24d] bg-[#092414] text-[#74f24d] shadow-[0_0_24px_rgba(116,242,77,0.28)]">
                <Icon type="compass" size={44} />
              </div>
              <div className="relative mt-2 border-2 border-[#74f24d] bg-[#092414] px-6 py-2 font-mono text-xl font-black uppercase tracking-[0.12em] text-[#74f24d] shadow-[0_0_24px_rgba(116,242,77,0.24)]">
                Australia
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-5 grid gap-3 px-0 sm:px-4">
            {arrivalMissionData.map((mission, index) => {
              const isSelected = selectedArrivalMission.id === mission.id;
              const isCurrent = mission.status === "current";
              const styles = isCurrent
                ? getStatusStyles("current")
                : getStatusStyles(mission.status);
              return (
                <button
                  key={mission.id}
                  type="button"
                  onClick={() => setSelectedArrivalMission(mission)}
                  className={`relative border-2 p-3 text-left font-mono transition-transform hover:scale-[1.01] ${isSelected ? "border-[#74f24d] bg-[#092414]" : "border-[#314258] bg-[#07111f]"}`}
                  style={{ animation: `fadeInUp 340ms ease both ${index * 45}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center border-2 ${styles.badge}`}>
                      <Icon type={mission.icon} size={19} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-black uppercase text-[#fff1d0]">{mission.id} · {mission.title}</p>
                      <p className={`mt-1 text-[10px] font-black uppercase tracking-widest ${styles.text}`}>{styles.label}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="relative z-10 mt-5 grid gap-3">
            <PixelShell glow className="p-3 shadow-[0_0_18px_rgba(116,242,77,0.18)]">
              <div className="relative flex items-start gap-2">
                <Icon type="info" className="mt-0.5 shrink-0 text-[#74f24d]" size={18} />
                <div className="font-mono">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#74f24d]">{selectedArrivalMission.id} · {selectedArrivalMission.title}</p>
                  <p className="mt-1 text-[11px] font-bold leading-relaxed text-[#e8dcc8]">{selectedArrivalMission.description}</p>
                  <p className="mt-2 text-[11px] font-bold leading-relaxed text-[#cfc7b8]">{routeHint}</p>
                </div>
              </div>
            </PixelShell>

            <button
              type="button"
              onClick={onBackToEscapeMap}
              className="border-2 border-[#314258] bg-[#07111f] px-3 py-3 font-mono text-xs font-black uppercase tracking-widest text-[#cfc7b8] shadow-[0_5px_0_rgba(0,0,0,0.45)]"
            >
              Volver a Operación Escape
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function AccessGate({ onUnlock }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitAccess = (event) => {
    event.preventDefault();
    const validUser = username.trim().toLowerCase() === "vica";
    const validPassword = password === "ChatoGTP";

    if (!validUser || !validPassword) {
      setError("Acceso denegado. Revisa usuario y contraseña.");
      return;
    }

    if (typeof window !== "undefined") {
      window.localStorage.setItem("oea_access_granted", "true");
    }
    onUnlock();
  };

  return (
    <div className="min-h-screen bg-[#020814] px-4 py-10 text-[#f5ecd8] selection:bg-[#ffd15a] selection:text-[#06101f]">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatingPanelSoft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
      `}</style>
      <div className="mx-auto max-w-md">
        <PixelShell glow className="p-5 shadow-[0_0_28px_rgba(255,209,90,0.2)]">
          <form onSubmit={submitAccess} className="relative grid gap-5 font-mono">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center border-2 border-[#ffd15a] bg-[#3a2505] text-[#ffd15a] shadow-[0_0_22px_rgba(255,209,90,0.28)]">
                <Icon type="lock" size={34} />
              </div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#ff9f1c]">Acceso privado</p>
              <h1 className="mt-2 text-3xl font-black uppercase leading-none text-[#fff1d0]">Operación Escape</h1>
              <p className="mt-3 text-xs font-bold leading-relaxed text-[#cfc7b8]">
                Ingresa usuario y contraseña para entrar al prototipo.
              </p>
            </div>

            <label className="grid gap-2 text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">
              Usuario
              <input
                className="border-2 border-[#314258] bg-[#08182b] px-3 py-3 text-sm font-bold normal-case tracking-normal text-[#fff1d0] outline-none focus:border-[#ffd15a]"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                  setError("");
                }}
                placeholder="Usuario"
                autoComplete="username"
              />
            </label>

            <label className="grid gap-2 text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">
              Contraseña
              <input
                type="password"
                className="border-2 border-[#314258] bg-[#08182b] px-3 py-3 text-sm font-bold normal-case tracking-normal text-[#fff1d0] outline-none focus:border-[#ffd15a]"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError("");
                }}
                placeholder="Contraseña"
                autoComplete="current-password"
              />
            </label>

            {error && (
              <div className="border-2 border-[#ff6b35] bg-[#2b1208] p-3 text-xs font-bold leading-relaxed text-[#ffb089]">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="border-2 border-[#ffd15a] bg-[#a8621f] px-3 py-4 text-xs font-black uppercase tracking-widest text-[#1b1208] shadow-[0_5px_0_rgba(0,0,0,0.55)]"
            >
              Entrar
            </button>

            <div className="border border-[#263a50] bg-[#08182b] p-3 text-[11px] font-bold leading-relaxed text-[#aeb7c2]">
              Esta protección es una barrera básica dentro del frontend. No reemplaza password protection real de Netlify.
            </div>
          </form>
        </PixelShell>
      </div>
    </div>
  );
}

function MapScreen({ missions, selectedMission, setSelectedMission, setActiveScreen, allMissionsCompleted, onOpenArrivalMap }) {
  const [lockedAlert, setLockedAlert] = useState(null);

  const handleLockedAttempt = (mission) => {
    setSelectedMission(mission);
    setLockedAlert(mission);
    window.setTimeout(() => setLockedAlert(null), 3200);
  };

  return (
    <main className="relative px-3">
      <section className="relative mt-2">
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px flex-1 bg-[#263a50]" />
          <span className="font-mono text-xl font-black uppercase tracking-[0.18em] text-[#ffd15a]">✦ Mapa de Escape ✦</span>
          <span className="h-px flex-1 bg-[#263a50]" />
        </div>

        <div className="relative overflow-hidden border-2 border-[#263a50] bg-[#07182b] px-2 pb-5 pt-4 shadow-[inset_0_0_50px_rgba(0,0,0,0.35)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_55%_8%,rgba(255,209,90,0.16),transparent_20%),radial-gradient(circle_at_20%_55%,rgba(17,65,98,0.25),transparent_22%),radial-gradient(circle_at_80%_60%,rgba(25,80,52,0.2),transparent_18%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:14px_14px] opacity-50" />
          <div className="pointer-events-none absolute inset-0 opacity-45">
            <div className="absolute left-6 top-64 h-10 w-16 bg-[linear-gradient(135deg,transparent_50%,#2f4050_51%),linear-gradient(225deg,transparent_50%,#5d6b77_51%)] bg-[length:32px_32px]" />
            <div className="absolute right-5 top-[370px] h-16 w-20 rounded-full bg-[#0b3324] blur-[1px]" />
            <div className="absolute right-9 top-[350px] h-10 w-10 bg-[#1c5b3d]" />
            <div className="absolute right-16 top-[372px] h-8 w-8 bg-[#16452f]" />
            <div className="absolute left-5 top-[420px] font-mono text-[#244c6f]">⌁⌁⌁</div>
            <div className="absolute right-10 top-[250px] font-mono text-[#244c6f]">⌁⌁</div>
          </div>

          <CompassRose />
          <Stamp side="left" />
          <Stamp side="right" />

          <div className="relative z-10 flex justify-center">
            <AustraliaPixelArt
              unlocked={allMissionsCompleted}
              onClick={() => {
                if (allMissionsCompleted) {
                  onOpenArrivalMap();
                  return;
                }
                setLockedAlert({ id: "Australia", title: "Segundo mapa bloqueado" });
                window.setTimeout(() => setLockedAlert(null), 3200);
              }}
            />
          </div>

          <MissionPath
            missions={missions}
            selectedMission={selectedMission}
            onLockedAttempt={handleLockedAttempt}
            onMissionSelect={(mission) => {
              setSelectedMission(mission);
              if (mission.id === "M01") setActiveScreen("m01");
              if (mission.id === "M02") setActiveScreen("m02");
              if (mission.id === "M03") setActiveScreen("m03");
              if (mission.id === "M04") setActiveScreen("m04");
              if (mission.id === "M05") setActiveScreen("m05");
              if (mission.id === "M06") setActiveScreen("m06");
              if (mission.id === "M07") setActiveScreen("m07");
              if (mission.id === "M08") setActiveScreen("m08");
            }}
          />

          {lockedAlert && (
            <div
              className="absolute right-3 top-8 z-20 w-[150px] border-2 border-[#ff9f1c] bg-[#0a111c]/95 p-3 font-mono text-[12px] font-black leading-snug text-[#f5ecd8] shadow-[0_5px_0_rgba(0,0,0,0.45)]"
              style={{ animation: "floatingPanelSoft 2.6s ease-in-out infinite" }}
            >
              <div className="mb-1 flex items-center gap-2 text-[#ff9f1c]">
                <Icon type="alert" size={18} /> ALERTA
              </div>
              No puedes saltarte pasos clave.
              <div className="mt-2 text-[10px] font-bold leading-snug text-[#cfc7b8]">
                {lockedAlert.id === "Australia" ? "Completa M08 para desbloquear el segundo mapa." : `Completa la misión anterior para desbloquear ${lockedAlert.id}.`}
              </div>
            </div>
          )}

          <div className="relative z-10 mt-5 flex justify-center">
            <div className="border-2 border-[#5b3510] bg-[#a8621f] px-7 py-2 font-mono text-[22px] font-black uppercase tracking-wider text-[#1b1208] shadow-[0_6px_0_rgba(0,0,0,0.5)]">
              Start
            </div>
          </div>

          <div className="relative z-10 mt-5 grid grid-cols-[1fr_124px] gap-3 sm:grid-cols-[1fr_150px]">
            <PixelShell glow className="p-3 shadow-[0_0_18px_rgba(255,209,90,0.18)]">
              <div className="relative flex items-start gap-2" style={{ animation: "floatingPanelSoft 2.2s ease-in-out infinite" }}>
                <Icon type="info" className="mt-0.5 shrink-0 text-[#ffd15a]" size={18} />
                <p className="font-mono text-[11px] font-bold leading-relaxed text-[#e8dcc8]">
                  {selectedMission.description}
                </p>
              </div>
            </PixelShell>
            <PixelShell className="p-3">
              <p className="relative font-mono text-[10px] font-black uppercase tracking-widest text-[#ffd15a]">{selectedMission.id}</p>
              <p className="relative mt-1 font-mono text-[11px] font-bold leading-snug text-[#cfc7b8]">{selectedMission.title}</p>
            </PixelShell>
          </div>

          {selectedMission.id === "M04" && selectedMission.status !== "locked" && (
            <div className="relative z-10 mt-4 grid gap-3">
              <PixelShell glow className="p-3 shadow-[0_0_18px_rgba(255,209,90,0.18)]">
                <div className="relative grid gap-2 font-mono">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#ffd15a]">Subniveles desbloqueados</p>
                  <p className="text-[11px] font-bold leading-relaxed text-[#e8dcc8]">Elige cómo quieres revisar tus rutas antes de avanzar.</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveScreen("m04")}
                      className="border-2 border-[#ffd15a] bg-[#3a2505] px-3 py-3 text-left text-[10px] font-black uppercase tracking-widest text-[#ffd15a] shadow-[0_4px_0_rgba(0,0,0,0.45)]"
                    >
                      Rutas
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveScreen("m04_compare")}
                      className="border-2 border-[#74f24d] bg-[#092414] px-3 py-3 text-left text-[10px] font-black uppercase tracking-widest text-[#74f24d] shadow-[0_4px_0_rgba(0,0,0,0.45)]"
                    >
                      Comparador
                    </button>
                  </div>
                </div>
              </PixelShell>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default function OperacionEscapeMapa() {
  const [accessGranted, setAccessGranted] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem("oea_access_granted") === "true";
  });
  const [selectedMission, setSelectedMission] = useState(missionData[1]);
  const [activeScreen, setActiveScreen] = useState("map");
  const [mapSwitcherOpen, setMapSwitcherOpen] = useState(false);
  const [diagnosisAnswers, setDiagnosisAnswers] = useState(() => {
    if (typeof window === "undefined") return {};
    try {
      return JSON.parse(window.localStorage.getItem("oea_diagnosis") || "{}");
    } catch {
      return {};
    }
  });
  const [survivalResources, setSurvivalResources] = useState(() => {
    if (typeof window === "undefined") return null;
    try {
      return JSON.parse(window.localStorage.getItem("oea_survival_resources") || "null");
    } catch {
      return null;
    }
  });
  const [missionProgress, setMissionProgress] = useState(() => {
    if (typeof window === "undefined") return {};
    try {
      return JSON.parse(window.localStorage.getItem("oea_mission_progress") || "{}");
    } catch {
      return {};
    }
  });
  const [inventory, setInventory] = useState(() => {
    if (typeof window === "undefined") return null;
    try {
      return JSON.parse(window.localStorage.getItem("oea_inventory") || "null");
    } catch {
      return null;
    }
  });
  const [selectedRoute, setSelectedRoute] = useState(() => {
    if (typeof window === "undefined") return null;
    try {
      return JSON.parse(window.localStorage.getItem("oea_selected_route") || "null");
    } catch {
      return null;
    }
  });

  const saveSurvivalResources = (next) => {
    setSurvivalResources(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("oea_survival_resources", JSON.stringify(next));
    }
  };

  const updateMissionProgress = (patch) => {
    setMissionProgress((current) => {
      const next = { ...current, ...patch };
      if (typeof window !== "undefined") {
        window.localStorage.setItem("oea_mission_progress", JSON.stringify(next));
      }
      return next;
    });
  };

  const saveInventory = (next) => {
    setInventory(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("oea_inventory", JSON.stringify(next));
    }
  };

  const saveSelectedRoute = (route) => {
    setSelectedRoute(route);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("oea_selected_route", JSON.stringify(route));
    }
  };

  const saveDiagnosisAnswers = (updater) => {
    setDiagnosisAnswers((current) => {
      const next = typeof updater === "function" ? updater(current) : updater;
      if (typeof window !== "undefined") {
        window.localStorage.setItem("oea_diagnosis", JSON.stringify(next));
      }
      return next;
    });
  };

  const missions = useMemo(() => getMissionProgressState(diagnosisAnswers, missionProgress), [diagnosisAnswers, missionProgress]);
  const hasCompletedDiagnosis = Boolean(diagnosisAnswers.mainRisk);
  const progress = useMemo(() => getPreparationProgress(missions), [missions]);
  const allMissionsCompleted = missions.every((mission) => mission.status === "completed");
  const currentMission = allMissionsCompleted ? null : missions.find((mission) => mission.status === "current") || missions[0];

  const navItems = [
    { label: "Inicio", icon: "home", active: activeScreen === "m01" },
    { label: "Mapa", icon: "map", active: activeScreen === "map" },
    { label: "Rutas", icon: "route", active: activeScreen === "m04" || activeScreen === "m04_compare" || activeScreen === "m05" },
    { label: "Checklist", icon: "checklist", active: activeScreen === "m06" },
    { label: "Perfil", icon: "user", active: activeScreen === "profile" },
  ];

  const openBottomNav = (label) => {
    if (label === "Inicio") {
      setSelectedMission(missionData[0]);
      setActiveScreen("m01");
      return;
    }

    if (label === "Mapa") {
      setActiveScreen(activeScreen === "arrival_map" ? "arrival_map" : "map");
      return;
    }

    if (label === "Rutas") {
      if (!hasCompletedDiagnosis) {
        setSelectedMission(missionData[1]);
        setActiveScreen("m02");
        return;
      }
      setSelectedMission(missionData[3]);
      setActiveScreen("m04");
      return;
    }

    if (label === "Checklist") {
      if (!hasCompletedDiagnosis) {
        setSelectedMission(missionData[1]);
        setActiveScreen("m02");
        return;
      }
      if (!missionProgress.m05Completed) {
        setSelectedMission(missionData[4]);
        setActiveScreen("m05");
        return;
      }
      setSelectedMission(missionData[5]);
      setActiveScreen("m06");
      return;
    }

    if (label === "Perfil") {
      setActiveScreen("profile");
    }
  };

  const resetOperation = () => {
    if (typeof window !== "undefined") {
      const confirmed = window.confirm("Esto borrará diagnóstico, ruta, caja inicial, inventario y progreso. ¿Quieres reiniciar la operación?");
      if (!confirmed) return;
      ["oea_diagnosis", "oea_mission_progress", "oea_survival_resources", "oea_inventory", "oea_selected_route", "oea_m01_opening_seen"].forEach((key) => window.localStorage.removeItem(key));
    }
    setDiagnosisAnswers({});
    setMissionProgress({});
    setSurvivalResources(null);
    setInventory(null);
    setSelectedRoute(null);
    setSelectedMission(missionData[1]);
    setActiveScreen("m01");
  }; 

  if (!accessGranted) {
    return <AccessGate onUnlock={() => setAccessGranted(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#020814] text-[#f5ecd8] selection:bg-[#ffd15a] selection:text-[#06101f]">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatingPanel {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes floatingPanelSoft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 28px rgba(255,209,90,0.30); }
          50% { box-shadow: 0 0 40px rgba(255,209,90,0.58); }
        }
      `}</style>

      <div className="mx-auto flex min-h-screen max-w-md flex-col overflow-hidden border-x-2 border-[#1e3144] bg-[#06101f] shadow-2xl">
        <div className="relative flex-1 overflow-y-auto pb-28">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_8%,rgba(255,159,28,0.12),transparent_18%),radial-gradient(circle_at_90%_22%,rgba(54,85,120,0.22),transparent_28%),linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:auto,auto,16px_16px,16px_16px]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-full border-4 border-[#0e1d2e]" />

          <header className="relative px-4 pb-3 pt-5">
            <div className="flex items-start gap-3">
              {allMissionsCompleted && (
                <div className="relative">
                  <button
                    className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center border-2 border-[#314258] bg-[#07111f] text-[#f5ecd8] shadow-[0_4px_0_rgba(0,0,0,0.35)]"
                    type="button"
                    aria-label="Cambiar mapa"
                    onClick={() => setMapSwitcherOpen((open) => !open)}
                  >
                    <Icon type="menu" size={25} />
                  </button>
                  {mapSwitcherOpen && (
                    <div className="absolute left-0 top-14 z-40 w-56 border-2 border-[#ffd15a] bg-[#07111f] p-3 font-mono shadow-[0_8px_0_rgba(0,0,0,0.45)]">
                      <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#ffd15a]">Cambiar mapa</p>
                      <div className="grid gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveScreen("map");
                            setMapSwitcherOpen(false);
                          }}
                          className="border-2 border-[#314258] bg-[#08182b] px-3 py-2 text-left text-[11px] font-black uppercase tracking-widest text-[#e8dcc8]"
                        >
                          Mapa 1 · Escape
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveScreen("simulator_map");
                            setMapSwitcherOpen(false);
                          }}
                          className="border-2 border-[#ffd15a] bg-[#3a2505] px-3 py-2 text-left text-[11px] font-black uppercase tracking-widest text-[#ffd15a]"
                        >
                          Mapa 2 · Simulador
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveScreen("arrival_map");
                            setMapSwitcherOpen(false);
                          }}
                          className="border-2 border-[#74f24d] bg-[#092414] px-3 py-2 text-left text-[11px] font-black uppercase tracking-widest text-[#74f24d]"
                        >
                          Mapa 3 · Australia
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[17px] font-black uppercase leading-none tracking-[0.18em] text-[#ff8f1f]">Operación</p>
                <h1 className="mt-1 font-mono text-[31px] font-black uppercase leading-[0.92] tracking-tight text-[#fff1d0] drop-shadow-[3px_3px_0_rgba(0,0,0,0.55)]">
                  Escape a Australia
                </h1>
                <p className="mt-3 max-w-[280px] font-mono text-[13px] font-bold leading-snug text-[#cfc7b8]">
                  No necesitas saberlo todo. Necesitas saber dónde estás y cuál es tu siguiente paso.
                </p>
              </div>
              <div className="relative hidden h-16 w-11 rotate-12 border-2 border-[#ad7b2a] bg-[#071a34] text-[#ffd15a] shadow-[0_5px_0_rgba(0,0,0,0.4)] sm:flex">
                <div className="absolute left-1 top-1 font-mono text-[7px] font-black uppercase">Pasaporte</div>
                <Icon type="passport" className="m-auto" size={24} />
              </div>
              <div className="flex h-10 items-center gap-2 border-2 border-[#314258] bg-[#07111f] px-3 font-mono text-lg font-black text-[#fff1d0] shadow-[0_4px_0_rgba(0,0,0,0.35)]">
                <Icon type="star" className="text-[#ffd15a]" size={18} />
                <span>{progress}</span>
              </div>
            </div>
          </header>

          {activeScreen === "m01" ? (
            <MissionIntroScreen
              progress={progress}
              currentMission={currentMission}
              hasCompletedDiagnosis={hasCompletedDiagnosis}
              allMissionsCompleted={allMissionsCompleted}
              onOpenRoutes={() => {
                setSelectedMission(missionData[3]);
                setActiveScreen("m04");
              }}
              onOpenRouteComparator={() => {
                setSelectedMission(missionData[3]);
                setActiveScreen("m04_compare");
              }}
              onBack={() => setActiveScreen("map")}
              onStartDiagnosis={() => {
                setSelectedMission(missionData[1]);
                setActiveScreen("m02");
              }}
              onOpenCurrentMission={() => {
                const target = currentMission || missions[missions.length - 1] || missionData[1];
                const screenMap = {
                  M01: "m01",
                  M02: "m02",
                  M03: "m03",
                  M04: "m04",
                  M05: "m05",
                  M06: "m06",
                  M07: "m07",
                  M08: "m08",
                };
                setSelectedMission(target);
                setActiveScreen(screenMap[target.id] || "map");
              }}
            />
          ) : activeScreen === "m02" ? (
            <DiagnosisScreen
              answers={diagnosisAnswers}
              setAnswers={saveDiagnosisAnswers}
              onBack={() => setActiveScreen("map")}
              onComplete={() => {
                if (typeof window !== "undefined") {
                  window.localStorage.setItem("oea_diagnosis", JSON.stringify(diagnosisAnswers));
                }
                setActiveScreen("diagnosis_summary");
              }}
            />
          ) : activeScreen === "diagnosis_summary" ? (
            <DiagnosisSummaryScreen
              answers={diagnosisAnswers}
              onBackToMap={() => setActiveScreen("map")}
              onOpenRiskMission={() => {
                setSelectedMission(missionData[2]);
                setActiveScreen("m03");
              }}
            />
          ) : activeScreen === "m03" ? (
            <RiskLimitsScreen
              answers={diagnosisAnswers}
              onBackToMap={() => setActiveScreen("map")}
              onCompleteMission={() => updateMissionProgress({ m03Completed: true })}
              onOpenRoutes={() => {
                setSelectedMission(missionData[3]);
                setActiveScreen("m04");
              }}
            />
          ) : activeScreen === "m04" ? (
            <EscapeRoutesScreen
              answers={diagnosisAnswers}
              selectedRoute={selectedRoute}
              onSelectRoute={saveSelectedRoute}
              onBackToMap={() => setActiveScreen("map")}
              onCompleteMission={() => updateMissionProgress({ m04Completed: true })}
              onOpenResources={() => {
                setSelectedMission(missionData[4]);
                setActiveScreen("m05");
              }}
            />
          ) : activeScreen === "m04_compare" ? (
            <RouteComparatorScreen
              answers={diagnosisAnswers}
              selectedRoute={selectedRoute}
              onBackToMap={() => setActiveScreen("map")}
              onOpenRoutes={() => {
                setSelectedMission(missionData[3]);
                setActiveScreen("m04");
              }}
            />
          ) : activeScreen === "m05" ? (
            <SurvivalResourcesScreen
              answers={diagnosisAnswers}
              selectedRoute={selectedRoute}
              resources={survivalResources}
              setResources={saveSurvivalResources}
              onCompleteMission={() => updateMissionProgress({ m05Completed: true })}
              onOpenRoutes={() => {
                setSelectedMission(missionData[3]);
                setActiveScreen("m04");
              }}
              onOpenInventory={() => {
                setSelectedMission(missionData[5]);
                setActiveScreen("m06");
              }}
              onBackToMap={() => setActiveScreen("map")}
              onOpenPlan={() => {
                setSelectedMission(missionData[6]);
                setActiveScreen("m07");
              }}
            />
          ) : activeScreen === "m06" ? (
            <InventoryScreen
              answers={diagnosisAnswers}
              selectedRoute={selectedRoute}
              inventory={inventory}
              setInventory={saveInventory}
              onCompleteMission={() => updateMissionProgress({ m06Completed: true })}
              onOpenRoutes={() => {
                setSelectedMission(missionData[3]);
                setActiveScreen("m04");
              }}
              onOpenPlan={() => {
                setSelectedMission(missionData[6]);
                setActiveScreen("m07");
              }}
              onBackToMap={() => setActiveScreen("map")}
            />
          ) : activeScreen === "m07" ? (
            <PlanEscapeScreen
              answers={diagnosisAnswers}
              selectedRoute={selectedRoute}
              resources={survivalResources}
              inventory={inventory}
              onBackToMap={() => setActiveScreen("map")}
              onOpenRoutes={() => {
                setSelectedMission(missionData[3]);
                setActiveScreen("m04");
              }}
              onCompleteMission={() => updateMissionProgress({ m07Completed: true })}
              onOpenSources={() => {
                setSelectedMission(missionData[7]);
                setActiveScreen("m08");
              }}
            />
          ) : activeScreen === "m08" ? (
            <SourcesCenterScreen
              selectedRoute={selectedRoute}
              onBackToMap={() => setActiveScreen("map")}
              onOpenPlan={() => {
                setSelectedMission(missionData[6]);
                setActiveScreen("m07");
              }}
              onCompleteMission={() => updateMissionProgress({ m08Completed: true })}
            />
          ) : activeScreen === "simulator_map" ? (
            <SimulatorMapScreen
              answers={diagnosisAnswers}
              selectedRoute={selectedRoute}
              onOpenEscapeMap={() => setActiveScreen("map")}
              onOpenArrivalMap={() => setActiveScreen("arrival_map")}
            />
          ) : activeScreen === "arrival_map" ? (
            <ArrivalMapScreen
              selectedRoute={selectedRoute}
              onBackToEscapeMap={() => setActiveScreen("map")}
            />
          ) : activeScreen === "profile" ? (
            <ProfileScreen
              answers={diagnosisAnswers}
              missions={missions}
              selectedRoute={selectedRoute}
              resources={survivalResources}
              inventory={inventory}
              progress={progress}
              onEditDiagnosis={() => {
                setSelectedMission(missionData[1]);
                setActiveScreen("m02");
              }}
              onChangeRoute={() => {
                setSelectedMission(missionData[3]);
                setActiveScreen("m04");
              }}
              onOpenPlan={() => {
                setSelectedMission(missionData[6]);
                setActiveScreen("m07");
              }}
              onResetOperation={resetOperation}
            />
          ) : (
            <MapScreen
              missions={missions}
              selectedMission={selectedMission}
              setSelectedMission={setSelectedMission}
              setActiveScreen={setActiveScreen}
              allMissionsCompleted={allMissionsCompleted}
              onOpenArrivalMap={() => setActiveScreen("simulator_map")}
            />
          )}
        </div>

        <nav className="fixed bottom-0 left-1/2 z-30 grid w-full max-w-md -translate-x-1/2 grid-cols-5 border-t-2 border-[#1e3144] bg-[#07111f]/98 shadow-[0_-10px_30px_rgba(0,0,0,0.4)] backdrop-blur">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => openBottomNav(item.label)}
              className={`flex flex-col items-center gap-1 border-r border-[#142235] px-1 py-3 font-mono text-[11px] font-black ${item.active ? "border-t-2 border-t-[#ff9f1c] bg-[#201508] text-[#ffb52e]" : "text-[#9aa4af]"}`}
            >
              <Icon type={item.icon} size={23} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
