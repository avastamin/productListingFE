const StarRating = ({ value }: { value: number }) => {
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
        return (
          <svg
            key={starValue}
            xmlns="http://www.w3.org/2000/svg"
            className={`w-4 h-4 cursor-pointer ${
              starValue <= value ? "text-yellow-500" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 .587l3.668 7.568 8.329 1.206-6.032 5.867 1.422 8.274L12 18.897l-7.387 3.883 1.422-8.274-6.032-5.867 8.329-1.206z" />
          </svg>
        );
      })}
    </div>
  );
};

export default StarRating;
