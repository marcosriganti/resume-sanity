import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import company from './company'
import profile from './profile'
import skill from './skill'
import job from './job'
import project from './project'
export const schemaTypes = [ profile, blockContent, company]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ blockContent, profile, company, skill, job, project],
}
