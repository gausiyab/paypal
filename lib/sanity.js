import {createClient} from '@sanity/client'
import  ImageUrlBuilder  from "@sanity/image-url";

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion:  '2023-03-03',
    // apiVersion:  '2022=-03-07',
    useCdn:true
});

const builder = ImageUrlBuilder(client)

export function urlFor(source) {
    return builder.image(source);
}