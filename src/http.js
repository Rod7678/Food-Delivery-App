export async function fetchAvailableMeals(){
    const responce = await fetch("http://localhost:3000/meals");
    const resData = await responce.json();
    if(!responce.ok){
        throw new Error("unable to load menu")
    }
    return resData;
}


export async function selectedOrders(orders) {
    const responce = await fetch("http://localhost:3000/orders",{
        method: 'POST',
        body: JSON.stringify(orders),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const resData = await responce.json();
    if(!responce.ok){
        throw new Error("unable to load menu")
    }
    return resData;

}