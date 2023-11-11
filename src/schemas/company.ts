import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'company',
  title: 'Company',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Company Name',
      type: 'string',
    }),
    defineField({
        name: 'mainImage',
        title: 'Main image',
        type: 'image',
        options: {
          hotspot: true,
        },
      }),
    ],
  
  preview: {
    select: {
      title: 'name',
    //   author: 'author.name',
    //   media: 'mainImage',
    },
    // prepare(selection) {
    // //   const { author } = selection
    //     return `${selection.name}`;
    // },
  },
})
