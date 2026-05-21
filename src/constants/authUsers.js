export const MOCK_USERS = {
  'liviu@securbank.com': { tag: 'mortgage', displayName: 'Liviu' },
  'mark@securbank.com': { tag: 'premium', displayName: 'Mark' },
};

export function authenticateUser(email) {
  const normalized = email.trim().toLowerCase();
  const user = MOCK_USERS[normalized];
  if (!user) {
    return null;
  }
  return { email: normalized, tag: user.tag, displayName: user.displayName };
}
