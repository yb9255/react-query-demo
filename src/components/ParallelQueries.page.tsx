import axios, { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "react-query";

interface SuperHero {
  id: number;
  name: string;
  alterEgo: string;
}

interface Friend {
  id: number;
  name: string;
}

const fetchSuperHeroes = () => axios.get("http://localhost:4000/superheroes");
const fetchFriends = () => axios.get("http://localhost:4000/friends");

function ParallelQueriesPage() {
  useQuery<AxiosResponse<SuperHero[]>, AxiosError>(
    "super-heroes",
    fetchSuperHeroes
  );
  useQuery<AxiosResponse<Friend[]>, AxiosError>("friends", fetchFriends);

  return <div>ParallelQueriesPage</div>;
}

export default ParallelQueriesPage;
