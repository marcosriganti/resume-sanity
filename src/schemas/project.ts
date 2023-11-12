import {defineField, defineType} from 'sanity';

export default defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Client Name',
            type: 'string',
        }),
        defineField({
            name: 'job',
            title: 'Performing Job',
            type: 'reference',
            to: [{type: 'job'}],
        }),
        defineField({
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
              hotspot: true,
            },
          }),
          defineField({
            name: 'body',
            title: 'Description',
            type: 'blockContent',
          }), 
          defineField({
            name: 'skill',
            title: 'Skills',
            type: 'array',
            of: [{type: 'reference', to: {type: 'skill'}}],
        }),
    ],
    preview: {
        select: {
            title: 'name',
            job: 'job.name',
        },
        prepare(selection) {
            const {job} = selection;
            return { ...selection, subtitle: job && `as ${job}` }
          },
    },
});
