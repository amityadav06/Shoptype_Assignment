import Giphy from "./Giphy";
import { useEffect, useState } from "react";
import "./styles.css";
import { FaSearch } from "react-icons/fa";

const ApiKey = `?api_key=${process.env.REACT_APP_API_KEY}`;
const mainUrl = "https://api.giphy.com/v1/gifs/trending";
const searchUrl = "https://api.giphy.com/v1/gifs/search";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [gif, setGif] = useState([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");

  const fetchGifs = async () => {
    setLoading(true);
    let url;
    const myurl = `${mainUrl}${ApiKey}`;
    const urlQuery = `&q=${query}`;
    if (query) {
      url = `${searchUrl}${ApiKey}${urlQuery}`;
    } else {
      url = `${myurl}`;
    }
    try {
      const response = await fetch(url);
      const resJson = await response.json();
      setGif((oldGif) => {
        if (query && page === 1) {
          return resJson.data;
        } else if (query) {
          return [...oldGif, ...resJson.data];
        } else {
          return [...oldGif, ...resJson.data];
        }
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGifs();
  }, [page]);

  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (
        (!loading && window.innerHeight + window.scrollY) >=
        document.body.scrollHeight - 2
      ) {
        setPage((oldPage) => {
          return oldPage + 1;
        });
      }
    });
    return () => window.removeEventListener("scroll", event);
    /// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input
            type="text"
            placeholder="search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="form-input"
          />
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="gifs-container">
        <div className="gifs-center">
          {gif.map((item, index) => {
            return <Giphy key={index} {...item} />;
          })}
        </div>
        {loading && <h2> Loading...</h2>}
      </section>
    </main>
  );
}
