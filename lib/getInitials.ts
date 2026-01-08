export function getInitials(
  firstName?: string | null,
  lastName?: string | null,
  username?: string | null
): string {
  const f = (firstName || "").trim();
  const l = (lastName || "").trim();

  if (f && l) {
    return `${f[0]}${l[0]}`.toUpperCase();
  }

  if (f) {
    const parts = f.split(" ").filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return f[0].toUpperCase();
  }

  if (username) {
    const segments = username.split(/[.\s_-]+/).filter(Boolean);
    if (segments.length >= 2) {
      return (segments[0][0] + segments[1][0]).toUpperCase();
    }
    return username.slice(0, 2).toUpperCase();
  }

  return "U";
}
