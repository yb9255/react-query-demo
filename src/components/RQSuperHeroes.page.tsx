import { useState } from "react";
import {
  useAddSuperHeroData,
  useSuperHeroesData,
} from "../hooks/useSuperHeroesData";
import { Link } from "react-router-dom";

function RQSuperHeroesPage() {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  const { mutate: addHero } = useAddSuperHeroData();

  const onSuccess = () => {
    console.log("Perform side effect after data fetching");
  };

  const onError = () => {
    console.log("Perform side effect after encountering error");
  };

  const handleAddHeroClick = () => {
    const hero = { name, alterEgo };
    addHero(hero);
  };

  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData({
      onSuccess,
      onError,
    });

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error?.message}</h2>;
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      <div>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(event) => setAlterEgo(event.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
      <button onClick={() => refetch()}>Fetch Heroes</button>
      {data?.data.map((hero) => (
        <div key={hero.id}>
          <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
        </div>
      ))}
      {/* {data?.map((hero) => (
        <div key={hero}>{hero}</div>
      ))} */}
    </>
  );
}

export default RQSuperHeroesPage;
