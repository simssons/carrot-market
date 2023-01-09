import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function useUser() {
  const { data, error } = useSWR("/api/users/me");
  const router = useRouter();
  useEffect(() => {
    if (data && !data.ok) {
      router.replace("/enter");
    }
  }, [data, router]);

  /* const [user, setUser] = useState();
  const router = useRouter();
  useEffect(() => {
    fetch("/api/users/me")
      .then((response) => response.json())
      .then((data) => {
        if (!data.ok) {
          // return router.push("/enter"); push는 페이지 이동이라 브라우저 history에 남음
          return router.replace("/enter"); //남지않음
        }
        setUser(data.profile);
      });
  }, [router]); */
  return { user: data?.profile, isLoading: !data && !error };
}
