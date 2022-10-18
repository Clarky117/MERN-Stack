import { gql } from '@apollo/client';

export const GET_ALL_FISH_QUERY = gql`
    query getAllFish{
        getAllFish{

        
        id
        fishname 
        username 
        price 
        size 
        quantity 
        location 
        createdAt
        comments{
            id 
            username 
            body 
            createdAt
        }
        thumbsup{
            username
        }
    }
    }
`