import { useEffect, useState } from 'react';

export function useAuth() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('user');
      setUser(stored ? JSON.parse(stored) : null);
    }
  }, []);

  return user;
} 