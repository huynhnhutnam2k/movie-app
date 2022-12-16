/* eslint-disable @typescript-eslint/no-unused-expressions */
export const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init);
  return res.json();
};

export const apiKey = "9b387cd43c01be13be603f954cb4b2b2";
const tmdbEndpoint = "https://api.themoviedb.org/3";
export const tmdbAPI = {
  getList: (category: string = "movie", type: string, page = 1) => {
    return `${tmdbEndpoint}/${category}/${type}?api_key=${apiKey}&page=${page}`;
  },
  getDetails: (category: string = "movie", movieId: any) =>
    `${tmdbEndpoint}/${category}/${movieId}?api_key=${apiKey}`,
  getMeta: (
    category: string | undefined,
    movieId: string | undefined,
    type: string
  ) => `${tmdbEndpoint}/${category}/${movieId}/${type}?api_key=${apiKey}`,
  search: (category: string | undefined, query: string, page: number) =>
    `${tmdbEndpoint}/search/${category}?api_key=${apiKey}&query=${query}&page=${page}`,
  imageOriginal: (url: string) => `https://image.tmdb.org/t/p/original/${url}`,
  image500: (url: string) => `https://image.tmdb.org/t/p/w500/${url}`,
};
