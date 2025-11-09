export async function fetchAvailableMeals(){
    const responce = await fetch("http://localhost:3000/meals");
    const resData = await responce.json();
    if(!responce.ok){
        throw new Error("unable to load menu")
    }
    return resData;
}