import React, {FC} from 'react';

import {SoftSkill} from '~/lib/sanity.queries';

interface SoftSkillsProps {
    data: SoftSkill[];
}

const SoftSkills: FC<SoftSkillsProps> = ({data}) => {
    return (
        <>
            <h2>&lt;Soft<span className='highlight'>Skills/&gt;</span> </h2>
            {data.length > 0 && (
                <div className='soft-skills'>
                    {data.map((skill) => (
                        <div className='soft-skill' key={skill._id}>
                            <div className='soft-skill__header'>
                                <div className='soft-skill__header__left'>
                                    <h3>{skill.name} </h3>
                                </div>
                            </div>
                            <div className='body-content'>
                                <p>{skill.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default SoftSkills;