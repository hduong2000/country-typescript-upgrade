// src/stores/useCountryStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Country } from "../@types/country";

interface CountryState {
  favorites: Country[];
  addFavorite: (country: Country) => void;
  removeFavorite: (code: string) => void;
  isFavorite: (code: string) => boolean;
}

export const useCountryStore = create<CountryState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (country) => {
        set((state) => ({ favorites: [...state.favorites, country] }));
      },
      removeFavorite: (code) => {
        set((state) => ({
          favorites: state.favorites.filter(
            (country) => country.codes.alpha_3 !== code,
          ),
        }));
      },
      isFavorite: (code) => {
        return get().favorites.some((country) => country.codes.alpha_3 === code);
      },
    }),
    {
      name: "country-storage", 
    },
  ),
);
