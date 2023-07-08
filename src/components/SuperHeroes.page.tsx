import axios from "axios";
import { useEffect, useState } from "react";

interface SuperHero {
  id: number;
  name: string;
  alterEgo: string;
}

function SuperHeroesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<SuperHero[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/superheroes");
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
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
