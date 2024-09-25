import { client } from "./sanity";


export async function cateGory(cateogry) {
    const query = `*[_type == "product" && category->name == "${cateogry}"] {
        _id,
        "imageUrl": images[0].asset->url,
         price,
         name,
         shipping,
         "slug": slug.current,
         "categoryName": category->name
     }`;

 const data = await client.fetch(query);

 return data;
  }
  