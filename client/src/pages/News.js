import React, { useEffect, useState } from 'react';
import axios from 'axios';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?category=technology&apiKey=d6ffc9b586ad4e46944db8aa0a7c2922`
        );
        setArticles(response.data.articles);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold">Latest Tech News</h1>
      {articles.length === 0 ? (
        <p>No tech news available at the moment.</p>
      ) : (
        <ul className="space-y-6">
          {articles.map((article, index) => (
            <li key={index} className="p-4 bg-white rounded shadow">
              <h2 className="mb-2 text-2xl font-semibold">
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </h2>
              <p className="mb-2 text-gray-700">{article.description}</p>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </span>
                <span className="text-sm text-gray-500">{article.source.name}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default News;