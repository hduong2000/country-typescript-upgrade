// src/pages/DetailPage.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { countryApi } from '../api/countryApi';
import { useFetch } from '../hooks/useFetch';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';

export default function DetailPage() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();

  const { data: country, loading, error } = useFetch(
    () => countryApi.getCountryDetail(code || ''),
    [code]
  );
  console.log('Country detail:', country);
  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!country) return <ErrorMessage message="Không tìm thấy thông tin quốc gia này!" />;

  const currencyName = country.currencies 
    ? Object.values(country.currencies)[0]?.name 
    : 'N/A';

  const languagesList = country.languages && Array.isArray(country.languages) && country.languages.length > 0
    ? country.languages.map(lang => lang.name).join(', ')
    : 'N/A';

  const flagUrl = `https://flagcdn.com/w320/${country.codes.alpha_2.toLowerCase()}.png`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 p-4 md:p-8 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        
        <button
          onClick={() => navigate('/')}
          className="mb-8 px-6 py-2.5 bg-white dark:bg-zinc-800 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2 font-medium border-none text-gray-700 dark:text-zinc-200"
        >
          ← Back to Homepage
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Cột trái: Quốc kỳ lớn */}
          <div className="rounded-lg overflow-hidden shadow-lg border border-gray-100 dark:border-zinc-800">
            <img 
              src={flagUrl} 
              alt={`Flag of ${country.names.common}`} 
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Cột phải: Thông tin chi tiết */}
          <div>
            {/* 1. Tên quốc gia viết cực lớn */}
            <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-gray-900 dark:text-white">
              {country.names.common}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm md:text-base">
              
              <div className="space-y-3">
                {/* 2. Đổ các thông tin cơ bản */}
                <p><strong className="text-gray-700 dark:text-zinc-200">Official Name:</strong> {country.names.official}</p>
                <p><strong className="text-gray-700 dark:text-zinc-200">Population:</strong> {country.population.toLocaleString()}</p>
                <p><strong className="text-gray-700 dark:text-zinc-200">Region:</strong> {country.region}</p>
                <p><strong className="text-gray-700 dark:text-zinc-200">Subregion:</strong> {country.subregion || 'N/A'}</p>
              </div>

              <div className="space-y-3">
                {/* 3. Đổ thông tin nâng cao */}
                <p><strong className="text-gray-700 dark:text-zinc-200">Currencies:</strong> {currencyName}</p>
                <p><strong className="text-gray-700 dark:text-zinc-200">Languages:</strong> {languagesList}</p>
              </div>

            </div>

            {/* Phần hiển thị các quốc gia giáp ranh (Borders) */}
            {country.borders && country.borders.length > 0 && (
              <div className="mt-10">
                <h3 className="font-semibold mb-3 text-lg text-gray-800 dark:text-zinc-100">Border Countries:</h3>
                <div className="flex flex-wrap gap-2">
                  {country.borders.map((borderCode) => (
                    <button
                      key={borderCode}
                      onClick={() => navigate(`/country/${borderCode}`)}
                      className="px-4 py-1.5 bg-white dark:bg-zinc-800 text-xs md:text-sm rounded shadow-sm hover:shadow-md border border-gray-100 dark:border-zinc-700 transition-all font-medium text-gray-700 dark:text-zinc-200"
                    >
                      {borderCode}
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}