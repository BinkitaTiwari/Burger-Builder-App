import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../navigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/drawerToggle/DrawerToggle';
const toolbar = (props) =>
(
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <div className={classes.Logo}>
        <Logo  />
        </div>
        <nav className={classes.DesktopOnly}><NavigationItems isAuthenticated={props.isAuth}/></nav>
    </header>
);
export default toolbar;