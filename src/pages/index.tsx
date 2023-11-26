import type {GetStaticProps, InferGetStaticPropsType} from 'next';
import Head from 'next/head';
import Image from 'next/image';

import AboutMe from '~/components/AboutMe';
import Container from '~/components/Container';
import Jobs from '~/components/Jobs';
import Projects from '~/components/Projects';
import SoftSkills from '~/components/SoftSkills';
import {readToken} from '~/lib/sanity.api';
import {getClient} from '~/lib/sanity.client';
import {urlForImage} from '~/lib/sanity.image';
import Link from 'next/link';
import {
  getJobs, 
  getProfile,
  getProjects,
  getSoftSkills,
  type Job,
  type Profile,
  type Project,
  type SoftSkill
} from '~/lib/sanity.queries';
import type {SharedPageProps} from '~/pages/_app';
const socialNetworks = [
  {
    name: 'Email',
    key: 'email',
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
    name: 'GitHub',
    key: 'github',
  },

];

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    profile: Profile;
    jobs: Job[];
    projects: Project[];
    softSkills: SoftSkill[];
  }
> = async ({draftMode = false}) => {
  const client = getClient(draftMode ? {token: readToken} : undefined);
  const profile = await getProfile(client, process.env.SANITY_PROFILE_SLUG);
  const jobs = await getJobs(client);
  const projects = await getProjects(client);
  const softSkills = await getSoftSkills(client);

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      profile,
      jobs,
      softSkills,
      projects,
    },
  };
};

export default function IndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const {profile, jobs, projects, softSkills} = props;
  return (
    <>
      <Head>
        <title>
        {profile.name} - CV Resume 
        </title>
        <meta
          name="description"
          content={profile.excerpt} 
          key="desc"
        />
      </Head>
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
                <h1><span className='highlight'>Hi</span> there! I&apos;m <span className='highlight'> {profile.name.split(' ')[0]}</span></h1>
                <h2>Full Stack / Front End <span className='highlight'>Web Developer</span></h2>
                <h3><strong><a href="#contact" className='highlight'>Let&apos;s get in touch</a></strong>  or  <Link href="/cv" className='highlight'>Download the CV</Link> </h3>
              </div>
            </div>
          </Container>
        </header>
        <main>
          <Container>
            <AboutMe data={profile} />  
            <Jobs data={jobs} />  
            <Projects data={projects} />
            <SoftSkills data={ softSkills} />
          </Container>
        </main>

        <footer className='footer' id='contact'>
          <Container>
            <div>
              <h2>Let&apos;s have a Conversation and Explore how far We can go</h2>
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
      </div></>
  );
}
