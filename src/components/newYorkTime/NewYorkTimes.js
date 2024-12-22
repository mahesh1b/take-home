import React, { useEffect, useState } from "react";
import axios from "axios";
import "./NewYorkTimes.css"; // Import your CSS file

const NewYorkTimes = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [source, setSource] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const API_URL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=eKjMneANyTxNuAbfLe8AaQNaG2Fv4MgT`;

  const getUniqueValues = (key) => {
    return [...new Set(newsData.map((article) => article[key] || ""))].filter(
      (val) => val
    );
  };

  const categories = getUniqueValues("section_name");
  const sources = getUniqueValues("source");

  const filteredArticles = newsData.filter((article) => {
    const matchesKeyword =
      keyword === "" ||
      article.abstract?.toLowerCase().includes(keyword.toLowerCase()) ||
      (article.headline?.main || "").toLowerCase().includes(keyword.toLowerCase());
    const matchesDate =
      date === "" || new Date(article.pub_date).toISOString().split("T")[0] === date;
    const matchesCategory = category === "" || article.section_name === category;
    const matchesSource = source === "" || article.source === source;
    return matchesKeyword && matchesDate && matchesCategory && matchesSource;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedArticles = filteredArticles.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(API_URL);
        setNewsData(response.data.response.docs);
      } catch (err) {
        setError(`Failed to fetch articles: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const clearFilters = () => {
    setKeyword("");
    setDate("");
    setCategory("");
    setSource("");
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container"> {/* Added container for layout */}
      <h1>New York Times</h1>

      <div className="filters"> {/* Added filters div */}
        <input
          type="text"
          placeholder="Search by keyword..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select value={source} onChange={(e) => setSource(e.target.value)}>
          <option value="">All Sources</option>
          {sources.map((src) => (
            <option key={src} value={src}>
              {src}
            </option>
          ))}
        </select>
        <button onClick={clearFilters}>Clear Filters</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="articles"> {/* Added articles div */}
        {paginatedArticles.length > 0 ? (
          paginatedArticles.map((article) => (
            <div key={article._id} className="article-card"> {/* Card design */}
              <h2>{article.headline?.main}</h2>
              <p>{article.abstract}</p>
              <p>
                Category: <span className="category">{article.section_name}</span>
              </p>
              <p>
                Source: <span className="source">{article.source}</span>
              </p>
              <p>Published: {new Date(article.pub_date).toLocaleDateString()}</p>
              <a href={article.web_url} target="_blank" rel="noopener noreferrer" className="read-more">
                Read More
              </a>
            </div>
          ))
        ) : (
          <p>No matching articles found.</p>
        )}
      </div>

      {filteredArticles.length > itemsPerPage && (
        <div className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default NewYorkTimes;