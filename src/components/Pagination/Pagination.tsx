import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const getPageNumbers = () => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  return (
    <nav className="flex space-x-2 text-base font-medium">
      <button
        className={`px-4 py-2 rounded-md ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"}`}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>
      {getPageNumbers().map((num) => (
        <button
          key={num}
          className={`w-10 h-10 flex items-center justify-center rounded-full ${
            currentPage === num ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => onPageChange(num)}
        >
          {num}
        </button>
      ))}
      <button
        className={`px-4 py-2 rounded-md ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"}`}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
