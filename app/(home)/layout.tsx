import Footer from "@/components/footer"
import Header from "@/components/landing-page/nav/Header"


export default function MainLayout({ children }: {
    children: React.ReactNode
}) {
    return (
        <div>
            <div className='md:px-20 px-5 bg-white'>
            <Header />
            </div>
            {children}
            <Footer />
        </div>
    )
}