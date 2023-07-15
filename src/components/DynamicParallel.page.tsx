import axios, { AxiosResponse } from "axios";
import { useQueries } from "react-query";
import { SuperHero } from "../hooks/useSuperHeroData";

const fetchSuperHero = (id: number) =>
  axios.get(`http://localhost:4000/superheroes/${id}`);

function DynamicParallelPage({ heroIds }: { heroIds: number[] }) {
  const queryResults = useQueries<AxiosResponse<SuperHero>[]>(
    heroIds.map((id) => ({
      queryKey: ["super-hero", id],
      queryFn: () => fetchSuperHero(id),
    }))
  );

  console.log(queryResults);

  return <div>DynamicParallelPage</div>;
}

export default DynamicParallelPage;
