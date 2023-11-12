import {defineField, defineType} from 'sanity';

export default defineType({
    name: 'softSkill',
    title: 'Soft Skill',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
    ],
    preview: {
        select: {
            title: 'name',
        },
    },
});
