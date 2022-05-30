import React, { Component } from "react";
import "./footer.css";
export class Footer extends Component {
  render() {
    return (
      <footer id="footer">
        <div className="social_media">
          <ul>
            <li>
              <a href="https://www.facebook.com" rel="noopener">
                <i className="fab fa-facebook-square fa-2x facebook"></i>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com" rel="noopener">
                <i className="fab fa-linkedin fa-2x linkedin"></i>
              </a>
            </li>
            <li>
              <a href="https://github.com" rel="noopener">
                <i className="fab fa-github-square fa-2x github"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com"
                rel="noopener"
              >
                <i className="fab fa-youtube fa-2x youtube"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="last_services">
          <p>Todo-It Team . Rights reserved</p>
        </div>
        <div className="rights">
          <p>&copy; Todo - It 2022</p>
        </div>
      </footer>
    );
  }
}

export default Footer;