import { Fragment } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useInfiniteQuery } from "react-query";

const fetchColors = (pageParam: number) =>
  axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);

interface Color {
  id: number;
  label: string;
}

function InfiniteQueryPage() {
  const {
    isLoading,
    isError,
    error,
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery<AxiosResponse<Color[]>, AxiosError>(
    ["colors"],
    ({ pageParam }) => fetchColors(pageParam),
    {
      getNextPageParam: (_lastPage, pages) => {
        if (pages.length < 4) {
          return pages.length + 1;
        }
      },
    }
  );

  if (isLoading) {
    return <h2>Loading..</h2>;
  }

  if (isError) {
    return <h2>{error?.message}</h2>;
  }

  return (
    <>
      <div>
        {data?.pages.map((page, index) => {
          return (
            <Fragment key={index}>
              {page.data.map((color) => (
                <h2 key={color.id}>
                  {color.id}. {color.label}
                </h2>
              ))}
            </Fragment>
          );
        })}
      </div>
      <div>
        <button disabled={!hasNextPage} onClick={() => fetchNextPage()}>
          Load more
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
}

export default InfiniteQueryPage;
