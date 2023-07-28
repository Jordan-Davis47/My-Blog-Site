import React from "react";
import Link from "next/link";

import Logo from "./Logo";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
	return (
		<header className={classes.header}>
			<div className={classes.logoSection}>
				<Link href="/">
					<Logo />
				</Link>
			</div>
			<nav>
				<ul>
					<li>
						<Link href="/posts">All Posts</Link>
					</li>
					{/* <li>
						<Link href="/contact">Contact</Link>
					</li> */}
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;
