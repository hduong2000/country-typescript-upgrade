import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { countryApi } from "../api/countryApi";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import { useDebounce } from "../hooks/useDebounce";
import CountryCard from "../components/common/countries/CountryCard";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const {
    data,
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["countries", debouncedSearchTerm, region],
    queryFn: async ({ pageParam = 0 }) => {
      if (debouncedSearchTerm.trim() !== "") {
        return countryApi.getCountriesByName(debouncedSearchTerm);
      }
      if (region !== "") {
        return countryApi.getCountriesByRegion(region);
      }
      return countryApi.getAllCountries(pageParam);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {

      if (lastPage.length < 25) return undefined;
      return allPages.length * 25;
    },
  });

  const allCountries = data ? data.pages.flatMap((page) => page) : [];

  const shouldShowLoadMore = hasNextPage && searchTerm.trim() === "" && region === "";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          Explore Countries
        </h1>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <input
            type="text"
            placeholder="Search for a country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:max-w-md px-5 py-3 rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-white placeholder:text-gray-400 border-none shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          />
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full sm:w-52 px-5 py-3 rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-white border-none shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer transition-all"
          >
            <option value="">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>

        {status === "pending" ? (
          <Loader />
        ) : status === "error" ? (
          <ErrorMessage message={error instanceof Error ? error.message : "Đã có lỗi"} />
        ) : allCountries.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500 dark:text-zinc-400 font-medium">
              Không tìm thấy quốc gia nào phù hợp với từ khóa của bạn.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {allCountries.map((country) => (
                <CountryCard key={country.codes.alpha_3} country={country} />
              ))}
            </div>

            {shouldShowLoadMore && (
              <div className="text-center mt-8">
                <button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 font-medium shadow-md transition-all disabled:cursor-not-allowed"
                >
                  {isFetchingNextPage ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}