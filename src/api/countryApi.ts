// src/api/countryApi.ts
import type { Country } from "../@types/country";

const BASE_URL = "https://api.restcountries.com/countries/v5";
const API_KEY = import.meta.env.VITE_API_KEY; // Lấy key từ file .env (dành cho Vite)

// Hàm helper dùng chung để chèn Header Authorization
const fetchWithAuth = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} - ${response.statusText}`);
  }
  return response.json();
};

// src/api/countryApi.ts
// ... giữ nguyên phần BASE_URL và fetchWithAuth ...

export const countryApi = {
  getAllCountries: async (offset: number = 0): Promise<Country[]> => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}?offset=${offset}&pretty=1`);
      return response.data.objects; // LẤY ĐÚNG MẢNG OBJECTS
    } catch (error) {
      console.error("Lỗi getAllCountries:", error);
      throw error;
    }
  },

  getCountriesByName: async (name: string): Promise<Country[]> => {
    try {
      const response = await fetchWithAuth(
        `${BASE_URL}/name?q=${encodeURIComponent(name)}&pretty=1`,
      );
      return response.data.objects || response || null;
    } catch (error) {
      console.error("Lỗi getCountriesByName:", error);
      throw error;
    }
  },

  getCountryDetail: async (code: string): Promise<Country | null> => {
    try {
      const response = await fetchWithAuth(
        `${BASE_URL}/name?q=${code}&pretty=1`,
      );

      return response?.data?.objects?.[0] || response || null;
    } catch (error) {
      console.error("Lỗi getCountryByCode:", error);
      throw error;
    }
  },

  getCountriesByRegion: async (region: string): Promise<Country[]> => {
    try {
      const response = await fetchWithAuth(
        `${BASE_URL}?region=${region}&pretty=1`,
      );
      return response.data.objects;
    } catch (error) {
      console.error("Lỗi getCountriesByRegion:", error);
      throw error;
    }
  },

  getCountryByCode: async (code: string): Promise<Country | null> => {
    try {
      const response = await fetchWithAuth(
        `${BASE_URL}?q=${code.toLowerCase()}&pretty=1`,
      );
      // API v5 trả trực tiếp object hoặc bọc trong data
      return response.data || response || null;
    } catch (error) {
      console.error("Lỗi getCountryByCode:", error);
      throw error;
    }
  },
};
