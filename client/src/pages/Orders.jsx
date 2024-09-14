import React, { useEffect, useState } from "react";
import { getOrders, getCart } from "../api";


const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);

    const getAllOrders = async () =>{
        setLoading(true)
        const token = localStorage.getItem("foodeli-app-token");
        await getOrders(token).then((res)=>{
            console.log(res.data);
            setOrders(res.data);
            setLoading(false);
        });
    };

    useEffect(() => {
        getAllOrders();
      }, [reload]);

      
    return(
        <div>
            <h1>Your previous orders</h1>
            {orders.map((item) => <p>{item}</p>)}
        </div>
    );
}

export default Orders