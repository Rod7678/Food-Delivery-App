import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
    const responce = await fetch(url, config);
    const resData = await responce.json()
    if(!responce.ok){
        throw new Error(resData.message || "something went wrong, failed to send request");
    }

    return resData;
}

// export default function useFetch(url, config , initialData) {
//     const [isFetching, setIsFetching] = useState(false);
//     const [error, setError] = useState();
//     const [fetchedData, setFetchedData] = useState(initialData);

//     const sendRequest =  useCallback(async function sendRequest() {
//         setIsFetching(true)
//         try{
//             const resData = await sendHttpRequest(url, config);
//             setFetchedData(resData);
//         }catch(error){
//             setError({
//                 message : error.message || "unable to fetch data"
//             })
//         }
//         setIsFetching(false)
//     }, [url, config]) 

//     useEffect(()=>{
//         if(config && (config.method === 'GET' || !config)){
//             sendRequest();
//         }
//     },[sendRequest, config])

//     return {
//         isFetching,
//         fetchedData,
//         error,
//         sendRequest
//     }
    
// }




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
        setFetchedData,
        error
    }
}