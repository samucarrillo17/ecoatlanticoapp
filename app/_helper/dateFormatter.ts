const formateador = new Intl.DateTimeFormat('es-ES', {
  day: 'numeric',
  month: 'long',
})
export const formatDate = (date: Date) => {
  return formateador.format(date)
}
