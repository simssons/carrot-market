import { useState } from "react";

interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}

type UseMutationResult<T> = [(data: any) => void, UseMutationState<T>];

export default function useMutation<T = any>(
  url: string
): UseMutationResult<T> {
  const [state, setState] = useState<UseMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });
  // const [loading, setLoading] = useState(false);
  // const [data, setData] = useState<undefined | any>(undefined);
  // const [error, setError] = useState<undefined | any>(undefined);
  function mutation(data: any) {
    // setLoading(true);
    setState((prev) => ({ ...prev, loading: true }));
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json().catch(() => {})) //json은 promise 돌려줌, json이 없을 경우도 있어서 이걸 catch한거 이 코드면 에러나도 아무일 도 안일어남. 에러 그냥 삼킨거
      .then((data) => setState((prev) => ({ ...prev, data, loading: false })))
      // .then(setData)
      // .then((json)=> setData(json))); 위가 shortened 버전.
      // .catch(setError)
      .catch((error) =>
        setState((prev) => ({ ...prev, error, loading: false }))
      );
  }
  return [mutation, { ...state }];
}
