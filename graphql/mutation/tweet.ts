import { graphql } from "../../gql/gql"

export const addTweetMutation = graphql(`#graphql
    mutation Mutation($payload: CreateTweetData!) {
        createTweet(payload: $payload) {
        id  
        content
        imageUrl
            author {
                firstname
                lastname
                imageUrl
            }
        }
    }
`)