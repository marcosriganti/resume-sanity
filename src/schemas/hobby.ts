import {defineField, defineType} from 'sanity';

export default defineType({
    name: 'hobby',
    title: 'Hobby',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: "icon",
            title: "Icon",
            type: "iconPicker"
        }),
        {
            title: 'Priority',
            name: 'priority',
            type: 'number'
          }
    ],
    orderings: [
       
        {
          title: 'Priority',
          name: 'priorityDesc',
          by: [
            {field: 'priority', direction: 'desc'}
          ]
        }
      ],
    preview: {
        select: {
            title: 'name',
        },
    },
    
});
