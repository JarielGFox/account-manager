import React, { useEffect, useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.scss";

// problema di login e logout è nel backend.Probabile rompe ancora il cazzo con ID e account_id;

function Navbar({ isLoggedIn, setIsLoggedIn, setForceUpdateKey }) {
    //stato per verificare se l'utente è loggato
    const [menuOpen, setMenuOpen] = useState(false);

    console.log("Props in Navbar:", { isLoggedIn, setIsLoggedIn });

    const [size, setSize] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (size.width > 768 && menuOpen) {
            setMenuOpen(false);
        }
    }, [size.width, menuOpen]);

    const menuToggleHandler = () => {
        setMenuOpen((p) => !p);
    };

    const navigate = useNavigate();

    //useEffect per fare API call al BE per verificare se l'utente è correttamente loggato

    const checkLoginStatus = async () => {
        try {
            const response = await fetch('http://localhost:8000/php/includes/checkLoginStatus.inc.php', {
                method: 'GET',
                credentials: 'include',
            });

            const data = await response.json();
            if (data.status === 'loggedIn') {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error('Failed to check login status:', error.message)
        }
        console.log('After checkLoginStatus:', isLoggedIn); // Log after setting the state
    };

    // useEffect to call checkLoginStatus on mount
    useEffect(() => {
        console.log('Before checkLoginStatus:', isLoggedIn); // Log before calling the function
        checkLoginStatus();
    }, []);

    //funzione per il logout
    const handleLogout = async () => {
        console.log('Before handleLogout:', isLoggedIn); // Log before calling the function
        try {
            const response = await fetch('http://localhost:8000/php/includes/logout.inc.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong')
            }

            console.log('Successfully logged out!');
            setIsLoggedIn(false);
            // Force re-render
            setForceUpdateKey(prevKey => prevKey + 1);
            console.log('After handleLogout:', isLoggedIn); // Log after setting the state
            checkLoginStatus();
            navigate('/login');
        } catch (error) {
            console.error('There was a problem with the logout:', error.message);
        }
    };

    return (
        <header className="header">
            <div className="header__content">
                <Link to="/" className="header__content__logo">
                    Home
                </Link>
                <nav
                    className={`${"header__content__nav"} 
          ${menuOpen && size.width < 768 ? `${"isMenu"}` : ""} 
          }`}
                >
                    <ul>
                        <li>
                            <Link to="#">Sezione 1</Link>
                        </li>

                        <li>
                            <Link to="#">Sezione 2</Link>
                        </li>

                        <li>
                            <Link to="#">Sezione 3</Link>
                        </li>

                        {isLoggedIn ? (
                            <button className="btn btn__logout" onClick={handleLogout}>Logout</button>
                        ) : (
                            <>
                                <Link to="/register">
                                    <button className="btn">Register</button>
                                </Link>
                                <Link to="/login">
                                    <button className="btn btn__login">Login</button>
                                </Link>
                            </>
                        )}
                    </ul>
                </nav>
                <div className="header__content__toggle">
                    {!menuOpen ? (
                        <BiMenuAltRight onClick={menuToggleHandler} />
                    ) : (
                        <AiOutlineClose onClick={menuToggleHandler} />
                    )}
                </div>
            </div>
        </header>
    );
}

export default Navbar;