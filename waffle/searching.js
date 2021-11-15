import axios from "axios";
import AnimeList from "./AnimeList";

const baseUrl = `https://api.jikan.moe/v3/search/anime?q=`;

export const Anime = () => {
  const [animes, setAnime] = useState([]);
  const [search, setSearch] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    async function getAnimeFromApi() {
      const response = await axios.get(`${baseUrl}${search}`);
      setAnime(response.data.results);
    }
    getAnimeFromApi();
  };
  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <h1>Anime Finder!</h1>
      <form id="anime-search" method="GET" onSubmit={handleSubmit}>
        <input
          type="search"
          name="anime"
          id="anime"
          value={search}
          onChange={handleChange}
        />
        <input type="submit" value="GO" />
      </form>
      <div className="container">
        {animes.map((searches) => (
          <AnimeList key={searches.mal_id} {...searches} />
        ))}
      </div>
    </div>
  );
};
