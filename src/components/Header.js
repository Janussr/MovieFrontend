import { NavLink } from "react-router-dom";


const Header = () => {
    return (
        <div>
            <nav>
                <ul className='header'>
                    <li><NavLink to='/movielist'>Catalog</NavLink></li>
                    <li><NavLink to='/cart/1'>Cart</NavLink></li>
                </ul>
            </nav>
        </div >
    )
}

export default Header;