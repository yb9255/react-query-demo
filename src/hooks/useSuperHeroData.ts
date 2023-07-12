import axios, { AxiosError, AxiosResponse } from "axios";
import { QueryKey, useQuery } from "react-query";

interface SuperHero {
  id: number;
  name: string;
  alterEgo: string;
}

const fetchSuperHero = ({ queryKey }: { queryKey: QueryKey }) =>
  axios.get(`http://localhost:4000/superheroes/${queryKey[1]}`);

export const useSuperHeroData = (heroId: string) => {
  console.log(heroId);

  return useQuery<AxiosResponse<SuperHero>, AxiosError>(
    ["super-hero", heroId],
    fetchSuperHero
  );
};
