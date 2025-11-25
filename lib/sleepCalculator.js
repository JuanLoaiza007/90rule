import { addMinutes, format, parse } from "date-fns";

/**
 * Calcula las horas óptimas para despertarse basadas en ciclos de sueño de 90 minutos.
 * @param {string} bedTime - Hora de acostarse en formato HH:MM (24h).
 * @param {number} latencyMinutes - Minutos que tarda en conciliar el sueño.
 * @returns {Array} Array de objetos con { cycles, totalMinutes, wakeTime }
 */
export function calculateWakeUpTimes(bedTime, latencyMinutes) {
  if (!bedTime || latencyMinutes < 0) return [];

  // Parsear la hora de acostarse (asumiendo fecha de hoy)
  const today = new Date();
  const [hours, minutes] = bedTime.split(":").map(Number);
  const bedDateTime = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    hours,
    minutes
  );

  // Tiempo efectivo de sueño: hora de acostarse + latencia
  const effectiveSleepTime = addMinutes(bedDateTime, latencyMinutes);

  const suggestions = [];

  // Generar hasta 6 sugerencias (ciclos 1 a 6)
  for (let cycles = 1; cycles <= 6; cycles++) {
    const wakeTime = addMinutes(effectiveSleepTime, cycles * 90);
    const totalMinutes = latencyMinutes + cycles * 90;

    suggestions.push({
      cycles,
      totalMinutes,
      wakeTime,
    });
  }

  return suggestions;
}

/**
 * Formatea una hora en 12h o 24h.
 * @param {Date} date - Fecha a formatear.
 * @param {boolean} use12Hour - Si usar formato 12h con AM/PM.
 * @returns {string} Hora formateada.
 */
export function formatWakeTime(date, use12Hour) {
  return format(date, use12Hour ? "hh:mm a" : "HH:mm");
}
