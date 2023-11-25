import {PortableText} from '@portabletext/react';
import React, {FC} from 'react';

import {type Profile} from '~/lib/sanity.queries';


interface ProjectProps {
    data: Profile;
}

const AboutMe: FC<ProjectProps> = ({data}) => {
    const { name, position, location, body} = data;
    return (
        <>
          <h2>Just a bit about <span className='highlight'>&lt;Me/&gt;</span></h2>
            <div className='content'>
              <p>
                My name <strong className='highlight'>{name}</strong> and I am a <strong className='highlight'>{position}</strong> based in <strong className='highlight'>{location}</strong>. <br />

              </p>
              <div className='body-content'>
                <PortableText value={body}/>
              </div>
            </div>
        </>
    );
};

export default AboutMe;