import { getSession } from "next-auth/client"

function Blog({ data }) {
    return <h1>Blog page - {data}</h1>
}

export default Blog

export async function getServerSideProps(context) {
    const session = await getSession(context)

    const { referer, host } = context.req.headers
    const parts = referer.split(host)

    if (!session) {
        return {
            redirect: {
                destination: `/api/auth/signin?callbackUrl=${parts[0] + host}/blog`,
                permanent: false
            }
        }
    }

    return {
        props: {
            session,
            data: session ? 'Your Personal Blogs' : 'Public Blogs'
        }
    }
}
