import Footer from "@/app/components/Layout/Footer"
import Header from "@/app/components/Layout/Header"
import MedicineDetails from "@/app/components/Route/Medicines/MedicineDetails/MedicineDetails"
import UserAuthProtected from "@/app/hooks/userAuthProtected"


type Props = {}

const page = (props: Props) => {
  return (
    <div className="bg-gray-50">
     <Header navbarOnly={false} activeHeading={2}/>
        <UserAuthProtected>
          <MedicineDetails/>
        </UserAuthProtected>
     <Footer/>
    </div>
  )
}

export default page