import axios, { AxiosError, AxiosResponse } from "axios";
import { useQuery, useMutation } from "react-query";

interface SuperHero {
  id: number;
  name: string;
  alterEgo: string;
}

const fetchSuperHeroes = () => axios.get("http://localhost:4000/superheroes");
const addSuperHero = (hero: { name: string; alterEgo: string }) =>
  axios.post("http://localhost:4000/superheroes", hero);

interface Props {
  onSuccess: () => void;
  onError: () => void;
}

export const useSuperHeroesData = ({ onSuccess, onError }: Props) => {
  return useQuery<
    AxiosResponse<SuperHero[]>,
    AxiosError
    // string[]
  >("super-heroes", fetchSuperHeroes, {
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
  });
};

export const useAddSuperHeroData = () => {
  return useMutation<
    AxiosResponse<SuperHero>,
    AxiosError,
    { name: string; alterEgo: string }
  >(addSuperHero);
};
