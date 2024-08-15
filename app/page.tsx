import React,{useState,useEffect} from "react";
import axios from "axios"
import { useRouter } from 'next/router';
var FormData = require("form-data");



const Verify = () =>{
const [posts,setPosts]= useState("")
 const route = useRouter();
  const url ="https://theuntempered.com/verify.php"

useEffect(()=>{
  if(!route.isReady) return
//  alert(reference)
  const reference = route.query.reference
  alert(reference)
  async function verifyPayment(reference){
    const form = new FormData();
    form.append("reference",reference)
    await axios.post(url,form,{
      headers:{
            'X-Requested-With': 'XMLHttpRequest',
      }
    }).then(resp=>{
      let res=JSON.parse(resp.data);
      setPosts(res.message +" "+res.data.customer.first_name +" for payment of "+res.data.amount)
      console.log(res)
    }).catch(error=>console.log(error))
  }
  verifyPayment(reference)


  
},[route.isReady,route.query])
return(

<div style={{padding:"200px"}} className="w3-center">{posts}</div>
  

)
  
}

export default Verify