import { useSuperHeroesData } from "../hooks/useSuperHeroesData";
import { Link } from "react-router-dom";

function RQSuperHeroesPage() {
  const onSuccess = () => {
    console.log("Perform side effect after data fetching");
  };

  const onError = () => {
    console.log("Perform side effect after encountering error");
  };

  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData({
      onSuccess,
      onError,
    });

  console.log({ isLoading, isFetching });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error?.message}</h2>;
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
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
