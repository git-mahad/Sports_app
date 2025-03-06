import React, { useState, useEffect } from 'react';
import "./SportsNews.css"
import Card from './Card';

const SportsNews = () => {
    const [search, setSearch] = useState("sports");
    const [newsData, setNewsData] = useState([]);
    const [error, setError] = useState(null);

    const api_key = "08511eab8fdb4d82a29ead09d9a10c09";

    useEffect(() => {
        getData();
    }, []);

    const getData = async (customSearch = search) => {
        try {
            const searchTerms = customSearch.toLowerCase();
            const baseQuery = `"${searchTerms}" AND (cricket OR "pakistan super league" OR PSL OR "psl cricket")`;
            const queries = encodeURIComponent(baseQuery);
            const response = await fetch(
                `https://newsapi.org/v2/everything?q=${queries}&language=en&sortBy=publishedAt&pageSize=100&apiKey=${api_key}`
            );

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const jsonData = await response.json();
            if (!jsonData.articles || jsonData.articles.length === 0) {
                setError("No news found. Try different search terms.");
                setNewsData([]);
            } else {
                setNewsData(jsonData.articles);
                setError(null);
            }
        } catch (err) {
            console.error("Failed to fetch data:", err.message);
            setError(err.message);
        }
    };

    const handleInput = (e) => {
        setSearch(e.target.value);
    };

    const userInput = (e) => {
        const category = e.target.value;
        setSearch(category);
        getData(category);
    };

    return (
        <div className="sport-news">
            <nav>
                <div>
                    <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <h1>
                            <span>S</span>ports <span>N</span>ews
                        </h1>
                    </a>
                </div>

                <div className="searchbar">
                    <input type="text" placeholder="search sport news" onChange={handleInput} />
                    <button onClick={() => getData()} className="btn btn-search">
                        Search
                    </button>
                </div>
            </nav>
            <div className="catagory">
                <button onClick={userInput} value="Cricket" className="btn btn-catagory">
                    Cricket
                </button>
                <button onClick={userInput} value="Football" className="btn btn-catagory">
                    Football
                </button>
                <button onClick={userInput} value="Hockey" className="btn btn-catagory">
                    Hockey
                </button>
                <button onClick={userInput} value="Badminton" className="btn btn-catagory">
                    Badminton
                </button>
                <button onClick={userInput} value="Tennis" className="btn btn-catagory">
                    Tennis
                </button>
            </div>
            {error && (
                <div className="error-message" style={{ color: 'red', textAlign: 'center', margin: '20px' }}>
                    {error}
                </div>
            )}
            <div>{
                newsData && newsData.length > 0 ? <Card data={newsData} /> : null}</div>
        </div>
    );
};

export default SportsNews;
