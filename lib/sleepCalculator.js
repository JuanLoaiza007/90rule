import { addMinutes, subMinutes, format, parse } from "date-fns";

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

  // Generar hasta 6 sugerencias (ciclos 6 a 1)
  // Mostramos primero las más recomendadas (más ciclos)
  for (let cycles = 6; cycles >= 1; cycles--) {
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
/**
 * Calcula las horas óptimas para acostarse basadas en una hora de despertar deseada.
 * @param {string} wakeTime - Hora de despertar deseada en formato HH:MM (24h).
 * @param {number} latencyMinutes - Minutos que tarda en conciliar el sueño.
 * @returns {Array} Array de objetos con { cycles, totalMinutes, wakeTime } (donde wakeTime es en realidad bedTime en este contexto)
 */
export function calculateBedTimes(wakeTime, latencyMinutes) {
  if (!wakeTime || latencyMinutes < 0) return [];

  const today = new Date();
  const [hours, minutes] = wakeTime.split(":").map(Number);
  const wakeDateTime = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    hours,
    minutes
  );

  const suggestions = [];

  // Generar hasta 6 sugerencias (ciclos 1 a 6) en orden inverso
  // Para que la sugerencia de más ciclos (más descanso) aparezca primero o sea más prominente
  for (let cycles = 6; cycles >= 1; cycles--) {
    // Primero restamos los ciclos de 90 min
    const sleepNeededMinutes = cycles * 90;
    // Luego restamos la latencia para saber a qué hora meterse a la cama
    const bedTime = subMinutes(wakeDateTime, sleepNeededMinutes + latencyMinutes);
    const totalMinutes = sleepNeededMinutes + latencyMinutes;

    suggestions.push({
      cycles,
      totalMinutes,
      wakeTime: bedTime, // Reutilizamos el nombre de la propiedad por consistencia en el componente
    });
  }

  // Ordenamos de más ciclos a menos ciclos para mostrar los mejores primero
  return suggestions;
}
