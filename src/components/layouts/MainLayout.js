import HeaderFull from "../header/HeaderFull";

export default function MainLayout({ children }) {
    return (
        <div>
            <HeaderFull />
            { children }
        </div>
    )
}