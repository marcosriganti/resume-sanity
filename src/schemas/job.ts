import {defineField, defineType} from 'sanity';

export default defineType({
    name: 'job',
    title: 'Job',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Position Name',
            type: 'string',
        }),
        defineField({
            name: 'company',
            title: 'Company Name',
            type: 'reference',
            to: [{type: 'company'}],
        }),
        defineField({
            name: 'startedAt',
            title: 'Started At',
            type: 'datetime',
        }),
        defineField({
            name: 'endedAt',
            title: 'Ended At',
            type: 'datetime',
          }),
          defineField({
            name: 'body',
            title: 'Role Description',
            type: 'blockContent',
          }), 
    ],
    preview: {
        select: {
            title: 'name',
            company: 'company.name',
        },
        prepare(selection) {
            const {company} = selection;
            return { ...selection, subtitle: company && `at ${company}` }
          },
    },
});
