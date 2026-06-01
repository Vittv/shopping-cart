import {
  faFacebook,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faAt, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./css/Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="contact-and-address">
        <div className="contact">
          <p>
            <FontAwesomeIcon className="fa-icon" icon={faPhone} />
            (555) 123-4567
          </p>
          <p>
            <FontAwesomeIcon className="fa-icon" icon={faAt} />
            contact@vittmart.com
          </p>
          <p>
            <FontAwesomeIcon className="fa-icon" icon={faInstagram} />
            @vittmart
          </p>
          <p>
            <FontAwesomeIcon className="fa-icon" icon={faFacebook} />
            /vittmart
          </p>
          <p>
            <FontAwesomeIcon className="fa-icon" icon={faGithub} />
            <a
              href="https://github.com/Vittv/shopping-cart"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vittv
            </a>
          </p>
        </div>
        <div className="address">
          <p>Vittmart</p>
          <p>1428 Ambrosia Avenue</p>
          <p>Williamsburg Brooklyn, NY 11211</p>
          <p>United States</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
