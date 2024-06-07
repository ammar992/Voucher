/* eslint-disable react/prop-types */


import { Button } from "@chakra-ui/react"


const MainButton = ({name,func,loading}) => {
   
  return (
    <Button bg={'#E9813B'} isLoading={loading} onClick={()=>{func()}} on size={"sm"} _hover={"none"} px={8} width={{base:"100%",md:'fit-content'}} color={'white'}>
    {name}
  </Button>
  )
}

export default MainButton