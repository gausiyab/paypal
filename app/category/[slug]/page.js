import Footer from "@/app/components/Footer";
import Headers from "../../components/Headers"
import { cateGory } from "@/lib/category";


export default async function page({params}) {
  const {slug} = params;

  const data = await cateGory(slug);

  console.log(data);
  
  
  return (
    <div>
        <Headers/>
       
        <div className="mb-20">
            
            product {slug}
        </div>
        <Footer/>
    </div>
  )
}