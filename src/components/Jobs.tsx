import {PortableText} from '@portabletext/react';
import React, {FC} from 'react';
import {formatDate} from '~/utils';

import {urlForImage} from '~/lib/sanity.image';
import {type Job} from '~/lib/sanity.queries';


interface ProjectProps {
    data: Job[];
}

const Jobs: FC<ProjectProps> = ({data}) => {
    return (
        <>
        <h2><span className='highlight'>&lt;Work</span>Experience/&gt;</h2>
            <div className='content'>
              <p>Throughout my career, I&apos;ve had the opportunity to work in various capacities, ranging from full-time to part-time roles. The following is a curated selection of companies I&apos;ve been fortunate to be a part of over the years.</p>
            </div>
            {data.map((job) => (
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
                    <PortableText value={job.body} />
                  </div>
                </div>
                <div className='job__header__right'>
                  <img src={urlForImage(job.logo).url()} width={100} alt={job.company} />
                </div>

              </div>
            )
            )}

        </>
    );
};

export default Jobs;