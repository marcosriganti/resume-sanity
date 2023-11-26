import type {GetStaticProps, InferGetStaticPropsType} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import Container from '~/components/Container';
import Jobs from '~/components/Jobs';
import Projects from '~/components/Projects';
import SoftSkills from '~/components/SoftSkills';
import {readToken} from '~/lib/sanity.api';
import {getClient} from '~/lib/sanity.client';
import {urlForImage} from '~/lib/sanity.image';
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
const personalDetails = [
  {
    name: 'Location',
    key: 'location',
  },
  {
    name: 'Date of Birth',
    key: 'dob',
  },
  {
    name: 'Marital status',
    key: 'civilStatus',
  },
  {
    name: 'Citizenships',
    key: 'citizenship',
  },
  {
    name: 'Spoken Languages',
    key: 'language',
  },
];
const socialNetworks = [
  {
    name: 'Phone',
    key: 'phone',
  },
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

export default function CvPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const {profile, jobs, projects, softSkills} = props;
  return (
    <>
      <Head>
        <title>
        {profile.name} - CV Resume</title>
        <meta
          name="description"
          content={profile.excerpt} 
          key="desc"
        />
      </Head>
      <div className='page print'>

        <main>
          <Container>
            <div className="sidebar">
            <div className='image-wrapper'>
            <Link href="/" ><Image src={urlForImage(profile.mainImage).width(250).height(250).url()} className='user-img' height={250}
                  width={250} alt={profile.name} />
                  </Link>
                </div>
              <h1>{ profile.name }</h1>
              <h2>{profile.position}</h2>
              <a className='no-print' href="javascript:window.print();">Click here to Download</a>
              <br/>
              <h2>Personal Details</h2>
              <dl>
                {personalDetails.map((network) => (
                  <div key={network.key}>
                    <dt>{network.name}</dt>
                    <dd>{profile[network.key]}</dd>
                  </div>
                )) }
              </dl>
              <h2>Contact Details</h2>
              <dl>
                {socialNetworks.map((network) => (
                  <div key={network.key}>
                    <dt>{network.name}</dt>
                    <dd>{profile[network.key].replace('mailto:','')}</dd>
                  </div>
                )) }
              </dl>
            </div>
            <div className="main-content">
            <Jobs data={jobs} />  
              <div className='print-page'>
              <Projects data={projects.slice(0,9)} />
            <SoftSkills data={ softSkills} />
            </div>
            </div>
          </Container>
        </main>
      </div></>
  );
}
