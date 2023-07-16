import axios, { AxiosError, AxiosResponse } from "axios";
import { QueryKey, useQuery, useQueryClient } from "react-query";

export interface SuperHero {
  id: number;
  name: string;
  alterEgo: string;
}

const fetchSuperHero = ({ queryKey }: { queryKey: QueryKey }) =>
  axios.get(`http://localhost:4000/superheroes/${queryKey[1]}`);

export const useSuperHeroData = (heroId: string) => {
  const queryClient = useQueryClient();

  return useQuery<AxiosResponse<SuperHero> | { data: SuperHero }, AxiosError>(
    ["super-hero", heroId],
    fetchSuperHero,
    {
      initialData: () => {
        const hero = queryClient
          .getQueryData<AxiosResponse<SuperHero[]>>("super-heroes")
          ?.data?.find((hero) => hero.id === Number.parseInt(heroId));

        if (hero) {
          return {
            data: hero,
          };
        }
      },
    }
  );
};
