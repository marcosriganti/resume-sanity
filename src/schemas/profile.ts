import {defineField, defineType} from 'sanity';

export default defineType({
    name: 'profile',
    title: 'Profile',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Full Name',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            // validation: (Rule) => Rule.required(),
            options: {
                source: 'title',
                maxLength: 96,
            },
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
            name: 'position',
            title: 'Position Title',
            type: 'string',
        }),
        defineField({
            name: 'dob',
            title: 'Date of Birth',
            type: 'datetime',
        }),
        defineField({
            name: 'civilStatus',
            title: 'Marital Status',
            type: 'string',
        }),
        defineField({
            name: 'language',
            title: 'Language',
            type: 'string',
        }),
        defineField({
            name: 'citizenship',
            title: 'Citizenship',
            type: 'string',
        }),
        defineField({
            name: 'phone',
            title: 'Phone Number',
            type: 'string',
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
        }),
        defineField({
            name: 'linkedin',
            title: 'LinkedIn',
            type: 'string',
        }),
        defineField({
            name: 'github',
            title: 'GitHub',
            type: 'string',
        }),
        defineField({
            name: 'calendly',
            title: 'Calendly',
            type: 'string',
        }),
        defineField({
            name: 'excerpt',
            title: 'About Me',
            type: 'text',
            rows: 4,
        }),
        defineField({
            name: 'body',
            title: 'Long Bio',
            type: 'blockContent',
        }),
    ],
    preview: {
        select: {
            title: 'name',
            author: 'author.name',
            media: 'mainImage',
        },
        prepare(selection) {
            const {author} = selection;
            return {...selection, subtitle: author && `by ${author}`};
        },
    },
});
