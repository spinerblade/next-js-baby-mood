type NameParts = {
  username: string;
  firstName: string | null;
  lastName: string | null;
};

export function getDisplayName(person: NameParts) {
  const fullName = [person.firstName, person.lastName]
    .filter(Boolean)
    .join(' ');
  return fullName || person.username;
}

export function formatWeight(grams: number) {
  return `${(grams / 1000).toLocaleString('de-AT', { maximumFractionDigits: 2 })} kg`;
}

export function formatHeight(cm: number) {
  return `${cm} cm`;
}
