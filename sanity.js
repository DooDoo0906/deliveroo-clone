import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Connection to the backend
const client = createClient({
    projectId:"w7l2i5yg",
    dataset:'production',
    useCdn: true,
    apiVersion:'2021-10-21',
})

// a helper to export image url
const builder = imageUrlBuilder(client);
export const urlFor = (source)=>builder.image(source);

export default client;