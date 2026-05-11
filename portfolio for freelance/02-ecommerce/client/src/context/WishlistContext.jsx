import { createContext, useContext, useState } from 'react';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [savedIds, setSavedIds] = useState(new Set());

  function toggleSaved(id) {
    setSavedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <WishlistContext.Provider value={{ savedIds, toggleSaved }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
