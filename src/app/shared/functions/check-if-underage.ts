export function checkIfUnderage(birthdate: Date): boolean {
  if((new Date().getFullYear() - 18) >= birthdate.getFullYear())
    return false;
  else return true;
}
