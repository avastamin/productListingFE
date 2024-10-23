import { useEffect, useState } from "react";
import Products from "./Components/Products";
import * as ProductsAPI from "./ProductsAPI";
import { debounce } from "./utils/helpers";

import PriceRangeInput from "./Components/PriceRangeInput";
import StarRatingInput from "./Components/StarRatingInput";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { LoadingCircle } from "./Components/LoadingCircle";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [rating, setRating] = useState<number>(1);

  const handleMouseEnter = (value: number) => {
    setRating(value);
  };
  const handleClick = (value: number) => {
    setRating(value);
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxPrice);
    setMinPrice(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minPrice);
    setMaxPrice(value);
  };

  useEffect(() => {
    setIsLoading(true);
    ProductsAPI.getAll().then((products) => {
      setProducts(products);
      setIsLoading(false);
    });
  }, []);

  const fetchResults = async (
    searchTerm: string,
    minPrice?: number,
    maxPrice?: number
  ) => {
    if (searchTerm || minPrice || maxPrice) {
      setIsLoading(true);
      try {
        const data = await ProductsAPI.searchAndFilterProducts(
          searchTerm,
          minPrice,
          maxPrice,
          rating
        );
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching results:", error);
        setProducts([]);
      }
    }
  };

  const debouncedFetchResults = debounce(fetchResults, 300);

  useEffect(() => {
    debouncedFetchResults(query, minPrice, maxPrice);
  }, [query, minPrice, maxPrice, rating]);

  return (
    <div className="w-full bg-red-300 h-full">
      <div className="bg-white mx-auto max-w-6xl">
        <div className="">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            {/* Separator */}
            <div
              aria-hidden="true"
              className="h-6 w-px bg-gray-900/10 lg:hidden"
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form action="#" method="GET" className="relative flex flex-1">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <MagnifyingGlassIcon
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                />
                <input
                  id="search-field"
                  name="search"
                  type="search"
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                />
              </form>
            </div>
          </div>
          <main className="mx-auto px-4 py-0 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
              <aside className="border-r pr-2">
                <h2 className="sr-only">Filters</h2>
                <div className="bg-white flex items-center justify-center">
                  <PriceRangeInput
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    handleMinChange={handleMinChange}
                    handleMaxChange={handleMaxChange}
                  />
                </div>
                <div className="flex items-center flex-col">
                  <h2 className="text-base mb-2 font-semibold">
                    Filter by ratings
                  </h2>
                  <div className="flex justify-center align-middle items-center">
                    <StarRatingInput
                      handleMouseEnter={handleMouseEnter}
                      handleClick={handleClick}
                      rating={rating}
                    />
                    <span className="text-xs font-bold">& Up</span>
                  </div>
                </div>
              </aside>

              <div className="mt-6 pt-1 lg:col-span-2 lg:mt-0 xl:col-span-3">
                <div className="flex justify-center">
                  {isLoading && <LoadingCircle />}
                </div>
                {products && products.length > 0 ? (
                  <Products products={products} />
                ) : (
                  <div className="flex justify-center">No Items found</div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
