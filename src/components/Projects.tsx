import {PortableText} from '@portabletext/react';
import React, {FC} from 'react';

import {urlForImage} from '~/lib/sanity.image';
import {type Project} from '~/lib/sanity.queries';


interface ProjectProps {
    data: Project[];
}

const Projects: FC<ProjectProps> = ({data}) => {
    return (
        <>
            <h2>&lt;Clients<span className='highlight'>Projects/&gt;</span> </h2>
            <div className='content'>
                <p>Enumerating all the clients and projects I&apos;ve had the privilege to be a part of would be an exhaustive task. Grateful for the opportunities; this is a small list of them:</p>
            </div>
            {data.length > 0 && <div className='projects'>
                {data.map((project) => (
                    <div className='project' key={project._id}>
                        <div className='project__header'>
                            <div className='project__header__left'>
                                <h3>{project.name} <span className='highlight'>@{project.company}</span></h3>
                            </div>
                            <div className='project_image'>
                                <img src={urlForImage(project.mainImage).url()} height={40} alt={project.name} />
                            </div>
                        </div>
                        <div className='body-content'>
                            <PortableText value={project.body} />
                        </div>
                        <div className="badges">
                                {project.skills.map((skill) => (<div className='badge' key={skill._id}>{skill.name}</div>))}
                            </div>
                    </div>
                )
                )}
            </div>
            }
        </>
    );
};

export default Projects;