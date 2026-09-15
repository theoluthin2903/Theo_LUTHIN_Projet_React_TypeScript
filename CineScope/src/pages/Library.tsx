import React from 'react';
import { useLibrary } from '../context/LibraryContext';
import type {WatchStatus } from '../types/movie';


interface CategoryConfig {
  key: WatchStatus;
  title: string;
  description: string;
}

const CATEGORIES: CategoryConfig[] = [
  {
    key: 'to_watch',
    title: 'À regarder',
    description: 'Films que vous souhaitez regarder prochainement.',
  },
  {
    key: 'in_progress',
    title: 'En cours',
    description: 'Films que vous avez commencé à regarder.',
  },
  {
    key: 'watched',
    title: 'Vu',
    description: 'Films que vous avez déjà regardés.',
  },
];

export const LibraryPage: React.FC = () => {
  const { library, updateStatus, removeFromLibrary } = useLibrary();

  const getMoviesByStatus = (status: WatchStatus) => {
    return library.filter((movie) => movie.status === status);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Ma bibliothèque</h1>

      <div className="space-y-10">
        {CATEGORIES.map(({ key, title, description }) => {
          const movies = getMoviesByStatus(key);

          return (
            <section key={key} className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
              <h2 className="text-2xl font-semibold mb-1">{title}</h2>
              <p className="text-sm text-gray-400 mb-4">{description}</p>

              {movies.length === 0 ? (
                <p className="text-gray-500 italic py-4">Aucun film dans cette liste</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {movies.map((movie) => (
                    <div key={movie.id} className="relative group">
                      {/* Remplacez par votre composant de carte de film */}
                      <div className="border border-slate-600 p-3 rounded">
                        <p className="font-medium text-white">{movie.title}</p>
                        
                        {/* Sélecteur permettant de changer la catégorie du film */}
                        <select
                          value={movie.status}
                          onChange={(e) =>
                            updateStatus(movie.id, e.target.value as WatchStatus)
                          }
                          className="mt-2 text-xs bg-slate-700 text-white rounded p-1 w-full"
                        >
                          <option value="to_watch">À regarder</option>
                          <option value="in_progress">En cours</option>
                          <option value="watched">Vu</option>
                        </select>

                        <button
                          onClick={() => removeFromLibrary(movie.id)}
                          className="mt-2 text-xs text-red-400 hover:text-red-300 w-full text-left"
                        >
                          Retirer
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default LibraryPage;