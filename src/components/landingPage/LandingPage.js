import React from "react";
import "./LandingPage.css"; // Import the CSS file

const LandingPage = () => {
  return (
    <div className="container">
      <h1 className="title">Explore News APIs</h1>
      <p className="title-desc">Locate articles and breaking news headlines from news sources and blogs across the web...</p>
      <div className="card-container">
        <div className="card">
          <h2 className="card-title">NEWS API</h2>
          <p className="card-description">
            This is a comprehensive API that allows developers to access
            articles from more than 70,000 news sources, including major
            newspapers, magazines, and blogs. The API provides access to
            articles in various languages and categories, and it supports
            search and filtering.
          </p>
          <a className="learn-more-link" href="/newsapi">
            Learn More
          </a>
        </div>
        <div className="card">
          <h2 className="card-title">The Guardian</h2>
          <p className="card-description">
            This API allows developers to access articles from The Guardian
            newspaper, one of the most respected news sources in the world.
            The API provides access to articles in various categories and
            supports search and filtering.
          </p>
          <a className="learn-more-link" href="/the-guardian">
            Learn More
          </a>
        </div>
        <div className="card">
          <h2 className="card-title">New York Times</h2>
          <p className="card-description">
            This API allows developers to access articles from The New York
            Times, one of the most respected news sources in the world. The
            API provides access to articles in various categories and
            supports search and filtering.
          </p>
          <a className="learn-more-link" href="/nyt">
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;