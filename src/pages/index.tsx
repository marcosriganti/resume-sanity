import type {GetStaticProps, InferGetStaticPropsType} from 'next';
// import { useLiveQuery } from 'next-sanity/preview'
import {formatDate} from '~/utils';
import Image from 'next/image';
import {PortableText} from '@portabletext/react'

import Container from '~/components/Container';
import {readToken} from '~/lib/sanity.api';
import {getClient} from '~/lib/sanity.client';
import {getPosts, getProfile, type Profile, getJobs, getProjects, type Job, type Project} from '~/lib/sanity.queries';
import type {SharedPageProps} from '~/pages/_app';
import {urlForImage} from '~/lib/sanity.image';

const socialNetworks = [
  {
    name: 'GitHub',
    key: 'github',
  },
  {
    name: 'LinkedIn',
    key: 'linkedin',
  },
  {
    name: 'Calendly',
    key: 'calendly',
  },
  {
    name: 'Email',
    key: 'email',
  },


];

const components = {
  types: {
    code: props => (
      <pre data-language={props.node.language}>
        <code>{props.node.code}</code>
      </pre>
    )
  }
}


export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    profile: Profile;
    jobs: Job[];
  }
> = async ({draftMode = false}) => {
  const client = getClient(draftMode ? {token: readToken} : undefined);
  const posts = await getPosts(client);
  const profile = await getProfile(client, process.env.SANITY_PROFILE_SLUG);
  const jobs = await getJobs(client);
  const projects = await getProjects(client);
  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      posts,
      profile,
      jobs,
      // softSkills,
      projects,
    },
  };
};

export default function IndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  // const [posts] = useLiveQuery<Post[]>(props.posts, postsQuery)
  console.log(props);
  const {profile, jobs} = props;

  return (
    <div className='page'>
      <header>
        <Container>
          <div className='header'>
            <div className='avatar'>

              <div className='image-wrapper'>
                <Image src={urlForImage(profile.mainImage).width(250).height(250).url()} className='user-img' height={250}
                  width={250} alt={profile.name} />
              </div>
            </div>
            <div className='description'>
              <h1><span className='highlight'>Hi</span> there! I'm <span className='highlight'> {profile.name.split(' ')[0]}</span></h1>
              <h2>Full Stack / Front End <span className='highlight'>Web Developer</span></h2>
            </div>

          </div>
        </Container>

      </header>
      <main>
        <Container>
          <h2>Just a bit about <span className='highlight'>Me</span></h2>
          <div className='content'>
            <p>
              My name <strong className='highlight'>{profile.name}</strong> and I am a <strong className='highlight'>{profile.position}</strong> based in <strong className='highlight'>{profile.location}</strong>. <br />

              {profile.excerpt}
            </p>
          </div>

          <h2><span className='highlight'>Work</span> Experience</h2>

          {jobs.map((job) => (
            <div className='job' key={job._id}>
              <div className='job__header'>
                <div className='job__header__left'>
                  <p>
                    {formatDate(job.startedAt)}
                  </p>
                  <h3>{job.name} <span className='highlight'>@{job.company}</span></h3>
                </div>
                <div className='job__header__right'>

                </div>
              </div>
              <div className='body-content'>
                <PortableText value={job.body}  components={components}/>
              </div>
            </div>
          )
          )}

          <h2>Clients  <span className='highlight'>+ Projects </span> </h2>
          <h2>Skills</h2>
          <h2>Soft Skills</h2>
          <h2>Little hoobies</h2>
        </Container>
      </main>
      {/* <header>
        <h1>{profile.name}</h1>
        <h2>{profile.position}</h2>
      </header> */}

      {/* {posts.length ? (
          posts.map((post) => <Card key={post._id} post={post} />)
        ) : (
          <Welcome />
        )} */}
      {/* Footer */}
      <footer className='footer'>

        <Container>
          <div>

            <h2>Let's have a Conversation and Explore how far We can go</h2>
            <p>

              If you are looking for a developer who can help you build your next project, or you are looking for a mentor to help you get started with web development, or you just want to say hi, feel free to reach out to me.
            </p>

            <div className='list-inline'>
              {socialNetworks.map((network) => (
                <a key={network.key} href={profile[network.key]} className='button'>
                  <h3>{network.name}</h3>
                </a>
              ))
              }
            </div>


          </div>
        </Container>

      </footer>
    </div>
  );
}
