import type { GetStaticProps, InferGetStaticPropsType } from 'next'
// import { useLiveQuery } from 'next-sanity/preview'

// import Card from '~/components/Card'
import Container from '~/components/Container'
// import Welcome from '~/components/Welcome'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { getPosts, type Post, postsQuery, getProfile, type Profile, getJobs } from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'
import {urlForImage} from '~/lib/sanity.image';

console.log('process.env.SANITY_PROFILE_ID', process.env.SANITY_PROFILE_ID)

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    posts: Post[]
    profile: Profile
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const posts = await getPosts(client)
  const profile = await getProfile(client, process.env.SANITY_PROFILE_SLUG);
  const jobs = await getJobs(client);
  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      posts,
      profile,
      jobs
    },
  }
}

export default function IndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  // const [posts] = useLiveQuery<Post[]>(props.posts, postsQuery)
  console.log(props)
  const {profile} = props;
  
  return (
    <Container>
      <header>
        <h1>{profile.name}</h1>
        <h2>{profile.position}</h2>
        <img src={ urlForImage(profile.mainImage) } width={250}/>

      </header>
      <div>
        side bar
        <h2>Pic</h2>
        <h4>Contact</h4>
        <h3>Soft Skills</h3>

      </div>
      <div>
        content 

        {/*  */}
        <h2>Work Experience</h2>
        <h2>Clients</h2>
        <h2>Skills</h2>
        
      </div>
      <section>
        {/* {posts.length ? (
          posts.map((post) => <Card key={post._id} post={post} />)
        ) : (
          <Welcome />
        )} */}
      </section>
    </Container>
  )
}
