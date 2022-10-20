import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_FISH_QUERY } from '../utils/queries';
import { Grid } from 'semantic-ui-react';
import { useState } from 'react';
import { useEffect } from 'react';

function Home() {
  const { loading, data } = useQuery(GET_ALL_FISH_QUERY);
  // const fish = data?.getAllFish || [];
  // trial
  const [fish, setFish] = useState([]);

  useEffect(() => {
    if (data) {
      setFish(data.getAllFish)
    }
  }, [data])

  if (loading) {
    return <div>
      <h1>Loading...</h1>
      <h1>Figuring shit out!!!</h1>
    </div>
  }

  if (data) {
    console.log(data)
  }

  return (
    <Grid columns={3}>
      <Grid.Row>
        <h1>Recent Listings</h1>
      </Grid.Row>
      {/* <Grid.Row> */}
      {/* works */}
      {/* {<p>{data.getAllFish[0].fishname}</p>} */}
      <Grid.Row>
      <Grid.Column>
        {/* trying new map */}


        {/*  */}

        
        {fish.map((val) => {
          return <div key={val.id} className="for-sale-container">
            <h1> {val.fishname} </h1>
            <h2> {val.username} </h2>
            <h2> {val.price} </h2>
            <h2> {val.size} </h2>
            <h2> {val.quantity} </h2>
            <h2> {val.location} </h2>
          </div>
        })}
      </Grid.Column>
      </Grid.Row>
      {/* want to loop through all */}
      {/* {data.map((val) => {
            return <h1> {val.fishname} </h1>
          })} */}



      {/* </Grid.Row> */}
    </Grid>
  )
}

export default Home;

