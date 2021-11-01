import { useContext } from "react";

import { MoviesContext } from '../context/MoviesContext';

export function useMoviesContext() {
    return useContext(MoviesContext);
}