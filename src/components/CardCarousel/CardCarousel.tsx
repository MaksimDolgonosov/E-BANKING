import Carousel from "react-bootstrap/Carousel";
// import ExampleCarouselImage from "components/ExampleCarouselImage";
import BigCardForIssue from "../CardItem/BigCardForIssue";
import { useAppSelector } from "../../hooks/hook";
import { TCurrency, TSystems } from "../../types/types";
import { useState } from "react";

interface ICardCarouselProps {
  system: TSystems;
  currency: TCurrency;
  setStyle: (num: number) => void;
}

const CardCarousel = ({ system, currency, setStyle }: ICardCarouselProps) => {
  const userName = useAppSelector((state) => state.user.name);
  const userSurname = useAppSelector((state) => state.user.surname);
  // const [style, setStyle] = useState(0);

  return (
    <Carousel interval={null} onSelect={setStyle}>
      <Carousel.Item>
        <BigCardForIssue name={userName + " " + userSurname} style={"black"} system={system} currency={currency} />
        {/* <ExampleCarouselImage text="First slide" /> */}
        <Carousel.Caption>
          {/* <h3>GOLD</h3> */}
          {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <BigCardForIssue name={userName + " " + userSurname} style={"gold"} system={system} currency={currency} />
        {/* <ExampleCarouselImage text="Second slide" /> */}
        <Carousel.Caption>
          {/* <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <BigCardForIssue name={userName + " " + userSurname} style={"platinum"} system={system} currency={currency} />
        {/* <ExampleCarouselImage text="Third slide" /> */}
        <Carousel.Caption>
          {/* <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CardCarousel;
// style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
