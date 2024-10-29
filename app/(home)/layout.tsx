import Footer from "@/components/footer/footer"
import Header from "@/components/landing-page/nav/Header"
import { ProductProvider } from "../context/product-context"


export default function MainLayout({ children }: {
    children: React.ReactNode
}) {
    return (
        <ProductProvider>
            <div className="w-full md:px-20 px-5">
                <Header />
            </div>
            <div className='w-full md:px-20 px-5 bg-white'>
                {children}
            </div>
            <Footer />
        </ProductProvider>
    )
}