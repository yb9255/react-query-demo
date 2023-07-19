import axios, { AxiosError, AxiosResponse } from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";

interface SuperHero {
  id: number;
  name: string;
  alterEgo: string;
}

interface AddSuperHeroContext {
  previousHeroData: SuperHero | undefined;
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
    enabled: true, // automatically fetching data. default true
    onSuccess,
    onError,
    // select: (data: AxiosResponse<SuperHero[]>) =>
    //   data.data.map((superHero) => superHero.name),
  });
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<SuperHero>,
    AxiosError,
    { name: string; alterEgo: string },
    AddSuperHeroContext
  >(addSuperHero, {
    // onSuccess: (data) => {
    //   // it doesn't work when enabled option is false in useQuery
    //   // queryClient.invalidateQueries("super-heroes");
    //   queryClient.setQueryData<AxiosResponse<SuperHero[]> | undefined>(
    //     "super-heroes",
    //     (oldQueryData) => {
    //       if (oldQueryData) {
    //         return {
    //           ...oldQueryData,
    //           data: [...oldQueryData.data, data.data],
    //         };
    //       }

    //       return oldQueryData;
    //     }
    //   );
    // },
    onMutate: async (newHero) => {
      await queryClient.cancelQueries("super-heroes");

      const previousHeroData =
        queryClient.getQueryData<SuperHero>("super-heroes");

      if (previousHeroData) {
        queryClient.setQueryData<AxiosResponse<SuperHero[]> | undefined>(
          "super-heroes",
          (oldQueryData) => {
            if (oldQueryData) {
              return {
                ...oldQueryData,
                data: [
                  ...oldQueryData.data,
                  { id: oldQueryData.data.length + 1, ...newHero },
                ],
              };
            }

            return oldQueryData;
          }
        );
      }

      return {
        previousHeroData,
      };
    }, //fired before mutation function is fired
    onError: (_error, _hero, context) => {
      if (context?.previousHeroData) {
        queryClient.setQueryData("super-heroes", context.previousHeroData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries("super-heroes");
    },
  });
};
