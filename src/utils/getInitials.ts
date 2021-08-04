export const getInitials = (name: string) => {
  const names = name.split(" ");
  if (names.length === 1) return names[0].substring(0, 2).toUpperCase();

  let initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};
