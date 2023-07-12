import axios, { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "react-query";

interface SuperHero {
  id: number;
  name: string;
  alterEgo: string;
}

const fetchSuperHero = (heroId: string) =>
  axios.get(`http://localhost:4000/superheroes/${heroId}`);

export const useSuperHeroData = (heroId: string) => {
  console.log(heroId);

  return useQuery<AxiosResponse<SuperHero>, AxiosError>(
    ["super-hero", heroId],
    () => fetchSuperHero(heroId)
  );
};
