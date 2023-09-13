
import { graphql } from "../../gql/gql";

export const getTweets = graphql(`#graphql
        query GetTweets {
            getTweets {
            id
            content
            imageUrl
            author {
                id
                firstname
                lastname
                imageUrl
            }
        }
    }
`)
export const getSignedUrlQuery = graphql(`#graphql
    query Query($imageName: String!, $imageType: String!) {
        getSignedUrlForTweet(imageName: $imageName, imageType: $imageType)
    }

`)