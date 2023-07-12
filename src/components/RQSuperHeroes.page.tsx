import axios, { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "react-query";

interface SuperHero {
  id: number;
  name: string;
  alterEgo: string;
}

const fetchSuperHeroes = () => axios.get("http://localhost:4000/superheroes");

function RQSuperHeroesPage() {
  const { isLoading, data, isError, error, isFetching } = useQuery<
    AxiosResponse<SuperHero[]>,
    AxiosError
  >("super-heroes", fetchSuperHeroes, {
    cacheTime: 300000, // default
    staleTime: 0, // default
    refetchOnMount: true, //or 'always' default
    refetchOnWindowFocus: true, //or 'always' default
    refetchInterval: false, // can set some milliseconds for polling. it's stopped when window loses focus
  });

  console.log({ isLoading, isFetching });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
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
