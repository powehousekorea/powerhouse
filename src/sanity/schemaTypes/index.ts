import { type SchemaTypeDefinition } from 'sanity'
import { post } from './post'
import { person } from './person'
import { linkCard } from './linkCard'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [post, person, linkCard],
}
