import Image from "next/image";
import classes from "./Hero.module.css";

const Hero = () => {
	return (
		<section className={classes.hero}>
			<div className={classes.image}>
				<Image src="/images/site/Jordan-at-the-races.png" alt="An image showing Jordan" width={300} height={300} />
			</div>
			<h1>Full Stack Development & Personal Interests</h1>
			{/* <h3>Featured Posts</h3> */}
		</section>
	);
};

export default Hero;
