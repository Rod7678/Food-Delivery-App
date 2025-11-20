import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
    const responce = await fetch(url, config);

    const resData = await responce.json();
    if(!responce.ok){
        throw new Error(
            resData.message || 'Something went Wrong'
        );
    }

    return resData;
}

export default function useFetch(url, config, initialData) {
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    function clearData(){
        setData(initialData);
    }

    const sendRequest = useCallback(async function sendRequest(data) {
        setIsLoading(true);
        try{
            const resData = await sendHttpRequest(url, {...config, body: data  });
            setData(resData)
        }catch(error){
            setError(error.message  || 'something went wrong')
        }
        setIsLoading(false);
    }, [url, config]);

    useEffect(() => {
        if(config && (config.method === 'GET' || !config.method)|| !config){
            sendRequest(); 
        }
    }, [sendRequest, config]);

    return {
        data,
        isLoading,
        error,
        sendRequest,
        clearData
    };
}