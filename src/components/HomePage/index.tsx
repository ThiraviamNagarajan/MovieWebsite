import axios from "axios";
import { useEffect, useState } from "react";
import { PiFilmSlateFill } from "react-icons/pi";
import MovieDetails from "../MovieDetails";
import Spinner from "../Common/Spinner";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isSpinner, setIsSpinner] = useState<any>(true);

  useEffect(() => {
    fetchMovies();

    setTimeout(() => {
      setIsSpinner(false);
    }, 2000);
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
      {isSpinner ? (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner />
        </div>
      ) : (
        <>
          {" "}
          <div
            style={{
              position: "sticky",
              top: 0,
              left: 0,
              backgroundColor: "gray",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 60px",
              color: "white",
              borderBottomLeftRadius: "8px",
              borderBottomRightRadius: "8px",
            }}
            className="navbar"
          >
            <div>
              <PiFilmSlateFill size={40} />
            </div>
            <div style={{marginLeft:"60px"}}>Welcome to MovieBuff</div>
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
            <div style={{ width: "80%" ,display:'flex',flexDirection:'column',gap:'20px'}}>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "white",
                  marginTop: "30px",
                }}
              >
                Here is the list of movies for you!
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "var(--secondary-color)",
                  flexWrap: "wrap",
                  gap: "25px",
                  maxHeight:'450px',
                  overflow:'auto'
                }}
              >
                {movies.map((movie: any) => (
                  <MovieDetails key={movie.id} movie={movie} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;
