import axios from "axios";
import { useQuery } from "react-query";
import { SuperHero } from "./useSuperHeroData";

const fetchSuperHeroes = async () => {
  const response = await axios.get("http://localhost:4000/superheroes");
  return response.data;
};

interface Props {
  onSuccess: () => void;
  onError: () => void;
}

export const useSuperHeroesData = ({ onSuccess, onError }: Props) => {
  return useQuery<SuperHero[], { message: string }>(
    "super-heroes",
    fetchSuperHeroes,
    {
      cacheTime: 300000, // default
      staleTime: 0, // default
      refetchOnMount: true, //or 'always' default
      refetchOnWindowFocus: true, //or 'always' default
      refetchInterval: false, // can set some milliseconds for polling. it's stopped when window loses focus
      enabled: false, // automatically fetching data. default true
      onSuccess,
      onError,
      // select: (data: AxiosResponse<SuperHero[]>) =>
      //   data.data.map((superHero) => superHero.name),
    }
  );
};
