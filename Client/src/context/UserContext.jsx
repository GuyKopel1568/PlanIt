import { createContext, useEffect, useState } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorage';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [token, setToken] = useLocalStorageState(null, 'token');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user if token exists
  useEffect(() => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    async function fetchUser() {
      try {
        const res = await fetch('http://localhost:5000/api/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to fetch user');
        setUser(data); // ✅ Here it sets the user context
      } catch (err) {
        console.error('UserContext error:', err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [token]);

  function logout() {
    setToken(null);
    setUser(null);
  }

  const value = {
    user,
    token,
    setToken,
    setUser,
    loading,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
}
