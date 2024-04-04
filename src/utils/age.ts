export function ageCalculated(birthday: string) {
  const fechaNacimiento = new Date(birthday)
  const hoy = new Date()
  const edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
  const mesActual = hoy.getMonth()
  const mesNacimiento = fechaNacimiento.getMonth()

  // Si el mes actual es menor que el mes de nacimiento o si son iguales pero el día actual es menor que el día de nacimiento, resta 1 a la edad
  if (mesActual < mesNacimiento || (mesActual === mesNacimiento && hoy.getDate() < fechaNacimiento.getDate())) {
    return edad - 1
  }

  return edad
}
