import { Box } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";


export const Home = () => {
  const [user,setUser] = useState({});
  const selector = useSelector(state=>state);
  const [greet,setGreet] = useState("Welcome")
  const navigate = useNavigate();

  useEffect(()=>{
    if(selector){
      setUser(selector?.userReducer?.value);
    }
    
  },[selector]);


  useEffect(()=>{
    if(user){
      setGreet("Welcome")
    }else{
      navigate("/login");
    }
  },[user]);
  return (
    <Box display={"flex"} justifyContent={"center"} h={"80vh"} fontWeight={"900"} fontSize={"30px"} alignItems={"center"}>{greet} {user?.user?.name}</Box>
  )
}
