//this page imports all schemas so they can be exported as once file

import product from "./product-schema"
import order from "./order-schema";
import comment from "./comment-schema";
import contact from "./contact-schema";
import category from "./category";

// const schemas = [product,order,comment,contact];
export const schemaTypes = [product,order,comment,contact,category]

// export default schemas;
