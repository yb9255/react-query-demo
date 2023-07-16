import axios from "axios";
import { QueryKey, useQuery, useQueryClient } from "react-query";

export interface SuperHero {
  id: number;
  name: string;
  alterEgo: string;
}

const fetchSuperHero = async ({ queryKey }: { queryKey: QueryKey }) => {
  const response = await axios.get(
    `http://localhost:4000/superheroes/${queryKey[1]}`
  );

  return response.data;
};

export const useSuperHeroData = (heroId: string) => {
  const queryClient = useQueryClient();

  return useQuery<SuperHero, { message: string }>(
    ["super-hero", heroId],
    fetchSuperHero,
    {
      enabled: false,
      initialData: () => {
        const hero = queryClient
          .getQueryData<SuperHero[]>("super-heroes")
          ?.find((hero) => hero.id === Number(heroId));

        if (hero) {
          return hero;
        }
      },
    }
  );
};
