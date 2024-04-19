import Header from "../header/Header";

export default function MainLayout({ children }) {
    return (
        <>
            <Header full={true} />
            { children }
        </>
    )
}