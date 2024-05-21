import PageTitle from "@/components/layout/PageTitle"
import { Products } from "@/components/ui/Products"

export const Home = () => {
  return (
    <div className="home">
      <PageTitle title="Home" />
      <Products />
    </div>
  )
}
