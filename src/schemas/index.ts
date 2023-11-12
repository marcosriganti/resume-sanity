import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import company from './company'
import profile from './profile'
import skill from './skill'
import job from './job'
import project from './project'
import softSkill from './softSkill'
import hobby from './hobby'
export const schemaTypes = [ profile, blockContent, company]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ blockContent, profile, company, skill, softSkill, hobby, job, project],
}
