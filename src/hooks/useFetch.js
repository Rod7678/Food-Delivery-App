import { useEffect, useState } from "react";


export function useInput(defaultValue){
     const [ enteredValue, setEnteredValue] = useState(defaultValue);
     const [ didEdit, setDidEdit] = useState(false);

       function handleInputChanges(event){
         setEnteredValue(event.target.value);
         setDidEdit(false);
       }    
       
       function handleInputBlur(){
         setDidEdit(true);
       }


       return {
        enteredValue,
        handleInputBlur,
        handleInputChanges,
        hasError: didEdit 
       }
       

}

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