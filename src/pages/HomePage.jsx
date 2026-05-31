import "./css/HomePage.css";

const HomePage = () => {
  return (
    <>
      <div className="homepage">
        <h1 className="homepage-headline">Welcome to our store!</h1>
        <div className="newsletter">
          <h2>Sign up for our newsletter</h2>
          <p>New arrivals and offers, straight to your inbox.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="your@email.com" />
            <button>Subscribe</button>
          </div>
        </div>
        <div className="map-wrapper">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.870374566964!2d-73.96024778459347!3d40.70983364549026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259581b8355af%3A0xd0fcb1ec4d43b0!2sWilliamsburg%2C%20Brooklyn%2C%20NY%2011211!5e0!3m2!1sen!2sus!4v1715999437893!5m2!1sen!2sus"
            width="100%"
            height="300"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
