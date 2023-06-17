import Image from "next/image";
import classes from "./Hero.module.css";

const Hero = () => {
	return (
		<section className={classes.hero}>
			<div className={classes.image}>
				<Image src="/images/site/Jordan-at-the-races.png" alt="An image showing Jordan" width={300} height={300} />
			</div>
			<h1>Hi, I'm Jordan</h1>
			<p>I blog about my full stack web development progress and any related things I find interesting.</p>
		</section>
	);
};

export default Hero;
