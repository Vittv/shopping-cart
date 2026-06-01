import { useEffect, useRef, useState } from "react";
import "./css/Marquee.css";

const CATEGORIES = [
  "womens-dresses",
  "womens-bags",
  "womens-jewellery",
  "womens-shoes",
];

const Marquee = () => {
  const [images, setImages] = useState([]);
  const trackRef = useRef(null);

  useEffect(() => {
    Promise.all(
      CATEGORIES.map((cat) =>
        fetch(`https://dummyjson.com/products/category/${cat}`)
          .then((res) => res.json())
          .then((data) => data.products.map((p) => p.thumbnail)),
      ),
    ).then((results) => {
      const all = results.flat();
      setImages([...all, ...all]); // duplicate for seamless loop
    });
  }, []);

  return (
    <div className="marquee-wrapper">
      <div className="marquee-track" ref={trackRef}>
        {images.map((src) => (
          <img key={src} src={src} alt="" className="marquee-img" />
        ))}
      </div>
    </div>
  );
};

export default Marquee;
