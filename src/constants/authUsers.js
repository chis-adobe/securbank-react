export const MOCK_USERS = {
  'liviuchisdemo@gmail.com': { tag: 'connect', displayName: 'Liviu Chis' },
  'liviuadobedemo@gmail.com': { tag: 'invest', displayName: 'Liviu Adobe' },
};

export function authenticateUser(email) {
  const normalized = email.trim().toLowerCase();
  const user = MOCK_USERS[normalized];
  if (!user) {
    return null;
  }
  return { email: normalized, tag: user.tag, displayName: user.displayName };
}
