export function getMonthName(index: number): string {
  switch (index) {
    case 0: return 'Janvier';
    case 1: return 'Février';
    case 2: return 'Mars';
    case 3: return 'Avril';
    case 4: return 'Mai';
    case 5: return 'Juin';
    case 6: return 'Juillet';
    case 7: return 'Août';
    case 8: return 'Septembre';
    case 9: return 'Octobre';
    case 10: return 'Novembre';
    case 11: return 'Décembre';
    default: return '';
  };
}
