import {
  useQuery,
  QueryFunctionContext,
  UseQueryResult,
  UseQueryOptions,
} from "@tanstack/react-query";
import api from "api";

interface QueryKeyArgs {
  url: string;
}

interface Props {
  name: string;
  url: string;
  onSuccess?: (data: object | [] | object[]) => void;
  onError?: (error: object) => void;
  queryOptions?: UseQueryOptions<any, any, any, any>;
}

async function getAll({
  queryKey,
}: QueryFunctionContext<[string, QueryKeyArgs]>) {
  const { url } = queryKey[1];

  console.log(url);
  const res = await api.get(url);
  console.log(res);

  return res.data;
}
function useGetAll(args: Props): UseQueryResult {
  const { name, onSuccess, onError, queryOptions, url } = args;

  const data = useQuery({
    queryKey: [`${name}`, { url }],
    queryFn: getAll,
    onSuccess,
    onError,
    ...queryOptions,
  });

  return { ...data };
}
export default useGetAll;
