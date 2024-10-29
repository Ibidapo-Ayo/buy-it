export default function MainLayout({ children }: {
    children: React.ReactNode
}) {
    return (
        <div className='flex w-full h-screen justify-center items-center'>
            {children}
        </div>

    )
}