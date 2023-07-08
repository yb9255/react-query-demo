import axios, { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "react-query";

interface SuperHero {
  id: number;
  name: string;
  alterEgo: string;
}

const fetchSuperHeroes = () => axios.get("http://localhost:4000/superheroes");

function RQSuperHeroesPage() {
  const { isLoading, data } = useQuery<AxiosResponse<SuperHero[]>, AxiosError>(
    "super-heroes",
    fetchSuperHeroes
  );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      {data?.data.map((hero) => (
        <div key={hero.id}>{hero.name}</div>
      ))}
    </>
  );
}

export default RQSuperHeroesPage;
