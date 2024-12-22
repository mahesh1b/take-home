import React, { useEffect, useState } from "react";
import axios from "axios";
import "./NewsAPI.css";

const NewsApi = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("");
  const [country, setCountry] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const API_URL = `https://newsapi.org/v2/top-headlines/sources?apiKey=75ea6a56f69d4bbc917600d22e3cad57`;

  const getUniqueValues = (key) => {
    return [...new Set(newsData.map((news) => news[key]))];
  };

  const categories = getUniqueValues("category");
  const languages = getUniqueValues("language");
  const countries = getUniqueValues("country");

  const filteredNews = newsData.filter((news) => {
    const matchesKeyword =
      keyword === "" || news.name.toLowerCase().includes(keyword.toLowerCase());
    const matchesCategory =
      category === "" || news.category === category.toLowerCase();
    const matchesLanguage =
      language === "" || news.language === language.toLowerCase();
    const matchesCountry =
      country === "" || news.country === country.toLowerCase();

    return (
      matchesKeyword && matchesCategory && matchesLanguage && matchesCountry
    );
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedNews = filteredNews.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(API_URL);
        setNewsData(response.data.sources);
      } catch (err) {
        setError("Failed to fetch articles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const clearFilters = () => {
    setKeyword("");
    setLanguage("");
    setCategory("");
    setCountry("");
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="news-app-container">
      <header className="app-header">
        <h1>News Explorer</h1>
      </header>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search by keyword..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="search-input"
        />
        <div className="select-group">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="">All Languages</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang.toUpperCase()}
              </option>
            ))}
          </select>
          <select value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="">All Countries</option>
            {countries.map((ctr) => (
              <option key={ctr} value={ctr}>
                {ctr.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        <button onClick={clearFilters} className="clear-filters-btn">
          Clear Filters
        </button>
      </div>

      {loading && <div className="loading-message">Loading...</div>}
      {error && <div className="error-message">{error}</div>}

      <div className="news-list">
        {paginatedNews.length > 0 ? (
          paginatedNews.map((news) => (
            <div key={news.id} className="news-card">
              <div className="news-card-content">
                <h2>{news.name}</h2>
                <p className="news-description">{news.description}</p>
                <div className="news-meta">
                  <span className="news-category">
                    {news.category.charAt(0).toUpperCase() + news.category.slice(1)}
                  </span>
                  <span className="news-source">Source: {news.id}</span>
                </div>
              </div>
              <div className="news-actions">
                <a
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="read-more-btn"
                >
                  Read More
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">No matching articles found.</div>
        )}
      </div>

      {filteredNews.length > itemsPerPage && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsApi;