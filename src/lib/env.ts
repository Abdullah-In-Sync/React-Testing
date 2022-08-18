/* istanbul ignore file */
export const env = {
    which: process.env.NEXT_PUBLIC_ENVIRONMENT,
    graphql: {
        url: process.env.NEXT_PUBLIC_GRAPHQL_SERVER
    },
    v1: {
        rootUrl: process.env.NEXT_PUBLIC_V1_ROOT_URL
    }
}