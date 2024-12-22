import React, { useEffect, useState } from "react";
import axios from "axios";
import './TheGuardian.css'; 

const TheGuardian = () => {
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [type, setType] = useState("");
    const [sectionName, setSectionName] = useState("");
    const [keyword, setKeyword] = useState("");
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const API_URL = `https://content.guardianapis.com/search?api-key=ffd2afb9-5683-492f-b9c6-0f360cc6ebaf`;

    const uniqueSections = [...new Set(newsData.map((article) => article.sectionName))];
    const uniqueTypes = [...new Set(newsData.map((article) => article.pillarName))];

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(API_URL);
                const results = response.data.response.results;
                setNewsData(results);
                setFilteredArticles(results);
            } catch (err) {
                setError("Failed to fetch articles. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, []);

    useEffect(() => {
        const filtered = newsData.filter(
            (article) =>
                (type === "" || article.pillarName === type) &&
                (sectionName === "" || article.sectionName === sectionName) &&
                (keyword === "" || article.webTitle.toLowerCase().includes(keyword.toLowerCase()))
        );
        setFilteredArticles(filtered);
        setCurrentPage(1);
    }, [type, sectionName, keyword, newsData]);

    const clearFilters = () => {
        setType("");
        setSectionName("");
        setKeyword("");
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

    const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);

    return (
        <div className="container"> {/* Added container for centering */}
            <h1 className="main-title">The Guardian News</h1>

            {loading && <p className="loading">Loading...</p>}
            {error && <p className="error">{error}</p>}

            <div className="filters">
                <input
                    type="text"
                    placeholder="Search by keyword..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="filter-input"
                />
                <select value={type} onChange={(e) => setType(e.target.value)} className="filter-select">
                    <option value="">All Pillars</option>
                    {uniqueTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
                <select value={sectionName} onChange={(e) => setSectionName(e.target.value)} className="filter-select">
                    <option value="">All Sections</option>
                    {uniqueSections.map((section) => (
                        <option key={section} value={section}>{section}</option>
                    ))}
                </select>
                <button onClick={clearFilters} className="clear-button">Clear Filters</button>
            </div>

            <div className="articles-grid"> {/* Use a grid for layout */}
                {paginatedArticles.map((article) => (
                    <div key={article.id} className="article-card"> {/* Card styling */}
                        <h3>{article.webTitle}</h3>
                        <p><strong>Section:</strong> {article.sectionName}</p>
                        <p><strong>Pillar:</strong> {article.pillarName}</p>
                        <a href={article.webUrl} target="_blank" rel="noopener noreferrer" className="read-more">Read More</a>
                    </div>
                ))}
                {paginatedArticles.length === 0 && <p className="no-articles">No articles found.</p>}
            </div>

            {filteredArticles.length > itemsPerPage && (
                <div className="pagination">
                    <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="page-button">Previous</button>
                    <span className="page-info">Page {currentPage} of {totalPages}</span>
                    <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="page-button">Next</button>
                </div>
            )}
        </div>
    );
};

export default TheGuardian;