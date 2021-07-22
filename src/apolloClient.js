import { ApolloClient, InMemoryCache, ApolloLink, HttpLink, from } from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import { onError } from "@apollo/client/link/error";
import { getTokenSilently } from './auth';

const link = from([
    setContext(async (req, prevContext) => {
        const authorization = await getAuth();
        const authorizationHeader = authorization ? { authorization } : {};
        return {
            headers: {
                ...authorizationHeader
            }
        };
    }),
    new HttpLink({
        //uri: "https://recipe-maker-backend.tryy3.us/query"
        //uri: "http://localhost:8090/query"
        uri: "https://recipe-maker-backend.herokuapp.com/v1/graphql"
    })
])

const client = new ApolloClient({
    link,
    cache: new InMemoryCache({
        typePolicies: {
            "Query": {
                fields: {
                    "ingredients": {
                        merge: false,
                    },
                    "recipes": {
                        merge: false,
                    },
                    "pumps": {
                        merge: false,
                    }
                }
            },
            // "pumps": {
            //     fields: {
            //         name: {
            //             read(_, { variables }) {
            //                 console.log(arguments);
            //                 return "Hi";
            //             }
            //         }
            //     }
            // }
        }
    }),
    connectToDevTools: true,
});

const getAuth = async () => {
    const token = await getTokenSilently();
    return token ? `Bearer ${token}` : "";
};

export default client;
