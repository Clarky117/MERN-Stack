import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_FISH_QUERY } from '../utils/queries';

// export default function Home() {

//   const { loading, data } = useQuery(GET_ALL_FISH_QUERY);


//   return (
//     <div><h1>Home</h1></div>
//   )
// }

// second way?

// const Home = () => {
//   const { loading, data } = useQuery(GET_ALL_FISH_QUERY);

//   if(data){
//     console.log(data)
//   }

//   return (
//     <div><h1>Home</h1></div>
//   )
// }

// third way


function Home() {
  const { loading, data } = useQuery(GET_ALL_FISH_QUERY);

  if(data) {
    console.log(data)
  }

  return (
    <div><h1>Home</h1></div>
  )
}

export default Home;

