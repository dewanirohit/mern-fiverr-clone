import Slider from "infinite-react-carousel";

import "./slide.scss";

export default function Slide({ children, slidesToShow, arrowScroll }) {
	return (
		<div className="slide">
			<div className="container">
				<Slider
					slidesToShow={slidesToShow}
					arrowScroll={arrowScroll}
				>
					{children}
				</Slider>
			</div>
		</div>
	);
}
