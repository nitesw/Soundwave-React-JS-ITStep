import { createContext, useState } from "react";
export const MusicContext = createContext({
  // properties
  ids: [],
  count: 0,
  // methods
  setCount: () => null,
  setIds: () => null,
  addId: (id) => null,
  removeId: (id) => null,
});
export const MusicProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const [ids, setIds] = useState([]);

  const addId = (id) => {
    ids.push(id);
    setIds(ids);
  };
  const removeId = (id) => {
    const index = ids.indexOf(id);
    if (index > -1) {
      ids.splice(index, 1);
    }
    setIds(ids);
  };

  const value = { count, setCount, ids, setIds, addId, removeId };
  return (
    <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
  );
};
