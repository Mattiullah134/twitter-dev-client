import { graphql } from "../../gql/gql";

export const followUserMutation = graphql(`#graphql
    mutation FollowUserMutation($to: ID!) {
        followUser(to: $to)
    }
`)
export const unFollowUserMutation = graphql(`#graphql
    mutation UnfollowUserMutation($to: ID!) {
        unFollowUser(to: $to)
    }   
`)           