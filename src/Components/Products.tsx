import StarRating from "../Components/StarRating";
export default function Products({ products }: any) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-1lg:max-w-7xl lg:px-8">
        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-3 sm:gap-x-6">
          {products &&
            products.map((product) => (
              <div
                key={product.id}
                className="border border-gray-50 p-0.5 rounded-md shadow-md"
              >
                <div className="relative">
                  <div className="relative h-72 w-full overflow-hidden rounded-lg">
                    <img
                      alt={product.name}
                      src={product.imageSrc}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="relative mt-4 px-2">
                    <h3 className="text-sm font-medium text-gray-900">
                      {product.name}
                    </h3>
                    <p className="mt-2">
                      <StarRating value={product.review} />
                    </p>
                  </div>
                  <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                    />
                    <p className="relative text-lg font-semibold text-white">
                      ${product.price}
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <a
                    href={product?.href}
                    className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                  >
                    Add to bag<span className="sr-only">, {product.name}</span>
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
