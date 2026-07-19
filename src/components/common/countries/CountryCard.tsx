import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import type { Country } from "../../../@types/country";
import { useCountryStore } from "../../../stores/useCountryStore";

interface CountryCardProps {
  country: Country;
}

export default function CountryCard({ country }: CountryCardProps) {
  const navigate = useNavigate();
  const formattedPopulation = country.population.toLocaleString();
  const countryCodeLower = country.codes.alpha_2?.toLowerCase() || "";
  const flagUrl = countryCodeLower
    ? `https://flagcdn.com/w320/${countryCodeLower}.png`
    : "https://flagcdn.com/w320/un.png";

  const capitalName =
    country.capital && country.capital.length > 0
      ? Object.values(country.capital[0])[0]?.name
      : "N/A";

  const { addFavorite, removeFavorite, isFavorite } = useCountryStore();
  const favoriteCheck = isFavorite(country.codes.alpha_3);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    console.log('click');
    
    e.stopPropagation();
    if (favoriteCheck) {
      removeFavorite(country.codes.alpha_3);
    } else {
      addFavorite(country);
    }
  };

  return (
    <div
      onClick={() => navigate(`/country/${country.codes.alpha_3}`)}
      className="bg-white dark:bg-zinc-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full hover:-translate-y-1 relative group"
    >
      {/* Nút Trái tim nổi lên trên ảnh Cờ */}
      <button
        onClick={handleFavoriteClick}
        className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm shadow-sm hover:scale-110 transition-transform z-10"
      >
        <Heart
          className={favoriteCheck ? "fill-red-500 text-red-500" : "text-gray-400 dark:text-gray-500"}
        />
      </button>

      <img
        src={flagUrl}
        alt={`Flag of ${country.names.common}`}
        className="w-full h-40 object-cover border-b border-gray-100 dark:border-zinc-700"
      />

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          {country.names.common}
        </h3>
        <div className="space-y-1 text-sm text-gray-600 dark:text-zinc-300">
          <p>
            <strong>Population:</strong> {formattedPopulation}
          </p>
          <p>
            <strong>Region:</strong> {country.region}
          </p>
          <p>
            <strong>Capital:</strong> {capitalName}
          </p>
        </div>
      </div>
    </div>
  );
}
