export interface CountryCurrency{
    name: string;
    symbol: string;
}

export interface CountryLanguages {
  [key: string]: string; // Dữ liệu trả về dạng { vie: "Vietnamese", eng: "English" }
}

export interface Country {
  names: {
    common: string;
    official: string;
  };
  cca3: string; // Mã 3 chữ cái (VNM, USA...) dùng để làm Route Detail và tìm nước giáp ranh
  capital?: string[]; // Có thể có nước không có thủ đô hoặc trả về mảng
  region: string;
  subregion?: string;
  population: number;
  flag: {
    url_png: string;
    url_svg: string;
    description?: string;
  };
  currencies?: {
    [key: string]: CountryCurrency;
  };
  codes: {
    alpha_2: string;
    alpha_3: string;
    ccn3: string;
  };
  languages?: CountryLanguages;
  borders?: string[]; // Mảng chứa mã cca3 của các nước giáp ranh
}