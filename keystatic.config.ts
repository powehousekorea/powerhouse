import { config, fields, collection } from '@keystatic/core'

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'content/posts/*',
      format: { contentField: 'body' },
      schema: {
        title: fields.slug({
          name: { label: 'Title', validation: { isRequired: true } },
        }),
        mainImage: fields.image({
          label: 'Main Image',
          directory: 'public/images/posts',
          publicPath: '/images/posts/',
        }),
        categories: fields.multiselect({
          label: 'Categories',
          options: [
            { label: 'News', value: 'news' },
            { label: 'Activity', value: 'activity' },
          ],
        }),
        publishedAt: fields.datetime({
          label: 'Published At',
          defaultValue: { kind: 'now' },
        }),
        summary: fields.text({
          label: 'Summary',
          multiline: true,
        }),
        body: fields.mdx({
          label: 'Body',
          options: {
            image: {
              directory: 'public/images/posts',
              publicPath: '/images/posts/',
            },
          },
        }),
      },
    }),
    people: collection({
      label: 'People',
      slugField: 'name',
      path: 'content/people/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({
          name: { label: 'Name', validation: { isRequired: true } },
        }),
        role: fields.text({
          label: 'Role',
        }),
        image: fields.image({
          label: 'Image',
          directory: 'public/images/people',
          publicPath: '/images/people/',
        }),
        bio: fields.text({
          label: 'Bio',
          multiline: true,
        }),
      },
    }),
    linkCards: collection({
      label: 'Link Cards',
      slugField: 'title',
      path: 'content/link-cards/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({
          name: { label: 'Title', validation: { isRequired: true } },
        }),
        url: fields.url({
          label: 'URL',
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: 'Description',
          multiline: true,
        }),
        thumbnail: fields.image({
          label: 'Thumbnail',
          directory: 'public/images/link-cards',
          publicPath: '/images/link-cards/',
        }),
        publishedAt: fields.datetime({
          label: 'Published At',
          defaultValue: { kind: 'now' },
        }),
      },
    }),
  },
})
