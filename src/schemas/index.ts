import {SchemaTypeDefinition} from 'sanity';

import blockContent from './blockContent';
import company from './company';
import hobby from './hobby';
import job from './job';
import profile from './profile';
import project from './project';
import skill from './skill';
import softSkill from './softSkill';
export const schemaTypes = [profile, blockContent, company];
export const schema: {types: SchemaTypeDefinition[];} = {
  types: [blockContent, profile, company, skill, softSkill, hobby, job, project],
};
