import React, { createContext, useContext, useEffect, useReducer } from "react";

const FAVORITES_KEY = "favorites";

interface FavoritesState {
  ids: number[];
  toastMessage: string;
}

type FavoritesAction =
  | { type: "TOGGLE"; movieId: number; movieTitle: string }
  | { type: "CLEAR_TOAST" };

function loadInitialFavorites(): number[] {
  const saved = localStorage.getItem(FAVORITES_KEY);
  return saved ? JSON.parse(saved) : [];
}

function favoritesReducer(
  state: FavoritesState,
  action: FavoritesAction
): FavoritesState {
  switch (action.type) {
    case "TOGGLE": {
      const isFavorite = state.ids.includes(action.movieId);
      const ids = isFavorite
        ? state.ids.filter((id) => id !== action.movieId)
        : [...state.ids, action.movieId];

      return {
        ids,
        toastMessage: isFavorite
          ? `${action.movieTitle} retiré des favoris.`
          : `${action.movieTitle} ajouté aux favoris.`,
      };
    }
    case "CLEAR_TOAST":
      return { ...state, toastMessage: "" };
    default:
      return state;
  }
}

interface FavoritesContextType {
  favorites: number[];
  isFavorite: (movieId: number) => boolean;
  toggleFavorite: (movieId: number, movieTitle: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Le 3e argument de useReducer est une fonction d'init "paresseuse",
  // exécutée une seule fois au montage — comme useState(() => ...).
  const [state, dispatch] = useReducer(favoritesReducer, undefined, () => ({
    ids: loadInitialFavorites(),
    toastMessage: "",
  }));

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(state.ids));
  }, [state.ids]);

  useEffect(() => {
    if (!state.toastMessage) return;

    const timeoutId = window.setTimeout(() => {
      dispatch({ type: "CLEAR_TOAST" });
    }, 2200);

    return () => window.clearTimeout(timeoutId);
  }, [state.toastMessage]);

  const toggleFavorite = (movieId: number, movieTitle: string) => {
    dispatch({ type: "TOGGLE", movieId, movieTitle });
  };

  const isFavorite = (movieId: number) => state.ids.includes(movieId);

  return (
    <FavoritesContext.Provider
      value={{ favorites: state.ids, isFavorite, toggleFavorite }}
    >
      {state.toastMessage && (
        <div className="favorite-toast" role="status" aria-live="polite">
          {state.toastMessage}
        </div>
      )}
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error(
      "useFavorites doit être utilisé au sein de FavoritesProvider"
    );
  }
  return context;
};