import axios from "axios";
import { useEffect, useState } from "react";
import MovieDetails from "../MovieDetails";
import { PiFilmReelBold, PiFilmSlateFill } from "react-icons/pi";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  async function fetchMovies() {
    const options = {
      method: "GET",
      url: "https://movies-api14.p.rapidapi.com/shows",
      headers: {
        "x-rapidapi-key": "4ddb078362msh87003a644ab4a8cp1c4d3fjsned104496e064",
        "x-rapidapi-host": "movies-api14.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setMovies(response.data.movies);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          backgroundColor: "gray",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 50px",
          color: "white",
          borderBottomLeftRadius:"8px",
          borderBottomRightRadius:"8px",
          // width: "100%",  
        }}
        className="navbar"
      >
        <div><PiFilmSlateFill size={40} /></div>
        <div>"Welcome to MovieBuff"</div>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Search for movies"
            value=""
            style={{
              padding: "5px",
              borderRadius: "3px",
              border: "1px solid #ccc",
              fontSize: "12px",
              backgroundColor: "white",
              outline: "none",
            }}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100%",
          width: "100%",
          color: "var(--primary-color)",
          backgroundColor: "var(--tertiary-color)",
        }}
      >
        <div style={{ width: "80%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "var(--secondary-color)",
              marginTop: "20px",
              flexWrap: "wrap",
              gap: "25px",
            }}
          >
            {movies.map((movie: any) => (
              <MovieDetails key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
