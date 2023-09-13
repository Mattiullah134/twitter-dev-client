import { graphql } from "../../gql/gql"
export const verifyGoogleAuthTokenQuery = graphql(`#graphql
    query verifyGoogleToken($token: String!) {
        verifyGoogleAuthToken(token: $token)
    }
`)

export const getCurrentUserQuery = graphql(`#graphql
    query GetCurrentUser {
        getCurrentUser {
            id
            firstname
            lastname
            imageUrl
            email
            recommendedUsers {
                email
                id  
                firstname
                lastname
                imageUrl
            }
            tweets {
                id
                content
                imageUrl
                author {
                    id
                    imageUrl
                    firstname
                    lastname
                }
            }
            followers {
                email
                id
                imageUrl
                firstname
                lastname
            }
            followings {
                email
                firstname
                id
                lastname
                imageUrl
            }
        }
    }
`)
export const getUserByIdQuery = graphql(`#graphql
        query GetUserById($id: ID!) {
            getUserById(id: $id) {
                id
                email
                firstname
                imageUrl
                lastname
                tweets {
                    id
                    content
                    imageUrl
                    author {
                        id
                        firstname
                        lastname
                        imageUrl
                        email
                    }
                }
                followers {
                    email
                    id
                    imageUrl
                    firstname
                    lastname
                }
                followings {
                    email
                    firstname
                    id
                    lastname
                    imageUrl
                }
            }
        }
`)
