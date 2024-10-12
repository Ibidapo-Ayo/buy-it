import Footer from "@/components/footer/footer"
import Header from "@/components/landing-page/nav/Header"
import { ProductProvider } from "../context/product-context"


export default function MainLayout({ children }: {
    children: React.ReactNode
}) {
    return (
        <ProductProvider>
            <div>
                <div className='md:px-20 px-5 bg-white'>
                    <Header />
                </div>
                {children}
                <Footer />
            </div>
        </ProductProvider>
    )
}