import { useEffect, useState } from "react";

export default function useFetch(fetchFn){
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();
    const [fetchedData, setFetchedData] = useState([]);

    useEffect(()=>{
        async function fetchData() {
            setIsFetching(true);
            try{
                const meals = await fetchFn();
                setFetchedData(meals);
            }catch(error){
                setError({
                    message : error.message || "unable to fetch data"
                })
            }

            setIsFetching(false)
        }

        fetchData()
    }, [fetchFn])

    return {
        isFetching,
        fetchedData,
        error
    }
}