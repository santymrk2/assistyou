import {createClient} from  "@libsql/client"

const client = createClient({
    url: import.meta.env.VITE_DB_URL as string,
    authToken: import.meta.env.VITE_DB_AUTH_TOKEN as string,
})

export const addUserVotes = async (userId: string, votes: number) => {
    await client.execute({
        sql: `UPDATE users SET votes = votes + $1 WHERE id = $2`,
        args: [votes, userId]
})
}
