import {PortableText} from '@portabletext/react';
import type {GetStaticProps, InferGetStaticPropsType} from 'next';
import Image from 'next/image';

import Container from '~/components/Container';
import {readToken} from '~/lib/sanity.api';
import {getClient} from '~/lib/sanity.client';
import {urlForImage} from '~/lib/sanity.image';
import {getJobs, getProfile, getProjects, type Job, type Profile, type Project} from '~/lib/sanity.queries';
import type {SharedPageProps} from '~/pages/_app';
import {formatDate} from '~/utils';

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
};


export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    profile: Profile;
    jobs: Job[];
    projects: Project[];
  }
> = async ({draftMode = false}) => {
  const client = getClient(draftMode ? {token: readToken} : undefined);
  const profile = await getProfile(client, process.env.SANITY_PROFILE_SLUG);
  const jobs = await getJobs(client);
  const projects = await getProjects(client);
  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
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
  const {profile, jobs, projects, } = props;

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
              <p><a href="#contact">Let&apos;s get in touch</a>  - <a href="">Download CV</a> </p>
            </div>

          </div>
        </Container>

      </header>
      <main>
        <Container>
          <h2>Just a bit about <span className='highlight'>&lt;Me/&gt;</span></h2>
          <div className='content'>
            <p>
              My name <strong className='highlight'>{profile.name}</strong> and I am a <strong className='highlight'>{profile.position}</strong> based in <strong className='highlight'>{profile.location}</strong>. <br />

              {profile.excerpt}
            </p>
          </div>
          {/* <div>
          <span>&lt;/&gt;</span>
        </div> */}
          <h2><span className='highlight'>&lt;Work</span>Experience/&gt;</h2>

          {jobs.map((job) => (
            <div className='job' key={job._id}>
              <div className='job-started'>
                <p>
                  {formatDate(job.startedAt)}
                </p>
              </div>
              <div className='job-content'>
                <div className='job__header'>
                  <div className='job__header__left'>

                    <h3>{job.name} <span className='highlight'>@{job.company}</span></h3>
                  </div>

                </div>
                <div className='body-content'>
                  <PortableText value={job.body} components={components} />
                </div>
              </div>
              <div className='job__header__right'>
                <img src={urlForImage(job.logo)} width={100} alt={job.company} />
              </div>

            </div>
          )
          )}

          <h2>&lt;Clients<span className='highlight'>Projects/&gt;</span> </h2>

          {projects.length > 0 && <div className='projects'>
            {projects.map((project) => (
              <div className='project' key={project._id}>
                <div className='project__header'>
                  <div className='project__header__left'>
                    <h3>{project.name} <span className='highlight'>@{project.company}</span></h3>
                  </div>
                  <div className='project_image'>
                    <img src={urlForImage(project.mainImage)} height={40} alt={project.name} />
                  </div>
                </div>
                <div className='body-content'>
                  <PortableText value={project.body} components={components} />
                  <div className="badges">
                    {project.skills.map((skill) => (<div className='badge' key={skill._id}>{skill.name}</div>))}
                  </div>
                </div>
              </div>
            )
            )}
          </div>
          }
          <h2>&lt;Soft<span className='highlight'>Skills/&gt;</span> </h2>
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
    </div>
  );
}
