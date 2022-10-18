import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';

function Header() {
    const pathname = window.location.pathname;
    const path = pathname === '/' ? 'home' : pathname.substr(1);
    const [activeItem, setActiveItem] = useState(path);

    const handleItemClick = (e, { name }) => setActiveItem(name);

    return (
        <div>
            <Menu pointing secondary size='massive' color='purple'>
                <Menu.Item
                    href="/"
                    name='home'
                    active={activeItem === 'home'}
                    onClick={handleItemClick}
                    // as={Link}
                    // to='/'
                />

                <Menu.Menu position='right'>
                    <Menu.Item
                        href="/login"
                        name='login'
                        active={activeItem === 'login'}
                        onClick={handleItemClick}
                    />

                    <Menu.Item
                        href="/register"
                        name='register'
                        active={activeItem === 'register'}
                        onClick={handleItemClick}
                    />
                </Menu.Menu>
            </Menu>
        </div>
    )
}

export default Header;