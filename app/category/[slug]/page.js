import Footer from "@/app/components/Footer";
import Headers from "../../components/Headers"


export default async function page({params}) {
  const {slug} = params;


  
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