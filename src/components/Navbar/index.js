import React, { useEffect, useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./navbar.scss";

function Navbar() {
    //stato per verificare se l'utente è loggato
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const [menuOpen, setMenuOpen] = useState(false);

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

    //useEffect per fare API call al BE per verificare se l'utente è correttamente loggato
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await fetch('http://localhost:8000/php/includes/checkLoginStatus.inc.php', {
                    method: 'GET',
                    credentials: 'include',
                });

                const data = await response.json();
                if (data.loggedIn) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('Failed to check login status:', error.message)
            }
        };

        checkLoginStatus();
    }, []);

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
                            <Link to="/logout">
                                <button className="btn btn__logout">Logout</button>
                            </Link>
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