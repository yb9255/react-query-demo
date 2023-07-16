import { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "react-query";

const fetchColors = (pageNumber: number) =>
  axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);

interface Color {
  id: number;
  label: string;
}

function PaginatedQueriesPage() {
  const [pageNumber, setPageNumber] = useState(1);

  const { isLoading, isError, error, data } = useQuery<
    AxiosResponse<Color[]>,
    AxiosError
  >(["colors", pageNumber], () => fetchColors(pageNumber), {
    keepPreviousData: true,
  });

  if (isLoading) {
    return <h2>Loading..</h2>;
  }

  if (isError) {
    return <h2>{error?.message}</h2>;
  }

  console.log(pageNumber);

  return (
    <>
      <div>
        {data?.data.map((color) => {
          return (
            <div key={color.id}>
              <h2>
                {color.id}. {color.label}
              </h2>
            </div>
          );
        })}
      </div>
      <div>
        <button
          onClick={() => setPageNumber((page) => page - 1)}
          disabled={pageNumber === 1}
        >
          Prev page
        </button>
        <button
          onClick={() => setPageNumber((page) => page + 1)}
          disabled={pageNumber === 4}
        >
          Next page
        </button>
      </div>
    </>
  );
}

export default PaginatedQueriesPage;
