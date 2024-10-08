import Footer from "@/app/components/Footer";
import Details from "../../components/Details"
import Headers from "../../components/Headers"
import { getProductBySlug } from "@/sanity/product-util";
// import Comments from "@/app/components/Comments";


export default async function page({params}) {
  const {slug} = params;

  const product = await getProductBySlug(slug);

  if(!product) {
    return {
      notFound:true
    }
  }
  
  return (
    <div>
        <Headers/>
       
        <div className="mb-20">
            <Details product={product[0]}/>
            {/* <Comments  product={product[0]}/> */}
        </div>
        <Footer/>
    </div>
  )
}