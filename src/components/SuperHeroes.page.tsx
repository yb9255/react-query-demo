import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

interface SuperHero {
  id: number;
  name: string;
  alterEgo: string;
}

function SuperHeroesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<SuperHero[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/superheroes");
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error.message);
          setIsLoading(false);
        }
      }
    };

    getData();
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <>
      <h2>Super Heroes Page</h2>
      {data.map((hero) => (
        <div key={hero.id}>{hero.name}</div>
      ))}
    </>
  );
}

export default SuperHeroesPage;
