import React, { useState } from "react";
import Card from "@/components/Card/Card";
import Pagination from "@/components/Pagination/Pagination";
import { NewsListProps } from "@/types/types"


const NewsList: React.FC<NewsListProps> = ({ articles, isLoading, itemsPerPage = 12 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(articles.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentArticles = articles.slice(indexOfFirstItem, indexOfLastItem);

  // Display a loading message or a message if there are no articles
  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (articles.length === 0) {
    return <div className="text-center text-gray-500">No articles found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Latest News</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentArticles.map((article, index) => (
          <Card post={article} key={index} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-12">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default NewsList;
