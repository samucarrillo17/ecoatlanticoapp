export function calcularDiferenciaHoras(inicio: string, fin: string): number {
  // Asumiendo formato "HH:mm" (ej: "08:30")
  const [horaInicio, minInicio] = inicio.split(':').map(Number);
  const [horaFin, minFin] = fin.split(':').map(Number);

  // Convertimos todo a minutos totales desde las 00:00
  const minutosInicio = horaInicio * 60 + minInicio;
  const minutosFin = horaFin * 60 + minFin;

  // Calculamos la diferencia
  let diferenciaMinutos = minutosFin - minutosInicio;

  // Si la diferencia es negativa, asumimos que terminó al día siguiente
  if (diferenciaMinutos < 0) {
    diferenciaMinutos += 24 * 60;
  }

  // Devolvemos el total en horas (ej: 2.5 para 2h 30min)
  return diferenciaMinutos / 60;
}