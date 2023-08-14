import { NavLink } from "react-router-dom";


const Header = () => {
    return (
        <div>
            <nav>
                <ul className='header'>
                    <li><NavLink to='/'>One</NavLink></li>
                    <li><NavLink to='/two'>Two</NavLink></li>
                    <li><NavLink to='/movielist'>Movie List</NavLink></li>
                </ul>
            </nav>
        </div >
    )
}

export default Header;