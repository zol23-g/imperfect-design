import "@/app/css/main.css"
import "@/app/css/vendor.css"
export default function Footer(){
        return (
          <footer className="footer -type-1">
          <div className="footer__top">
            <div className="container">
              <div className="row y-gap-48 justify-content-between">
                <div className="col-lg-3 col-md-6">
                  <div className="footer__item">
                    <h3 className="footer__title text-white">Contact</h3>
    
                    <div className="footer__content pr-20">
                      <div className="footer__content__item">
                        <p>
                          <span>T:</span> +251 926 75 35 00
                        </p>
                        <p>
                          <span>M:</span> myimperfectdesign@gmail.com
                        </p>
                      </div>
    
                      <div className="footer__content__item">
                        <p>
                          <span>A:</span> 4 Kilo, Addis Ababa, Ethiopia
                        </p>
                      </div>
    
                      <div className="footer__content__item">
                        <a
                          data-barba
                          href="https://maps.app.goo.gl/3k4ZTQSpaLcwC56z9?g_st=it"
                          className="button -simple text-white"
                          target="_blank"
                        >
                          GET DIRECTIONS
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
    
                <div className="col-lg-3 col-md-6">
                  <div className="footer__item">
                    <h3 className="footer__title text-white">OUR SERVICES</h3>
    
                    <div className="footer__content">
                      <div className="footer__content__item">
                        <a data-barba href="interior/index.html">
                          Architecture & Interior
                        </a>
                      </div>
    
                      <div className="footer__content__item">
                        <a data-barba href="product/index.html">
                          Product Design
                        </a>
                      </div>
    
                      <div className="footer__content__item">
                        <a data-barba href="#">
                          Custom Solutions
                        </a>
                      </div>
    
                      <div className="footer__content__item">
                        <a data-barba href="interior/index.html">
                          Interior Design
                        </a>
                      </div>
    
                      <div className="footer__content__item">
                        <a data-barba href="landscape/index.html">
                          Landscape Design
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
    
                <div className="col-lg-3 col-md-6">
                  <div className="footer__item">
                    <h3 className="footer__title text-white">SUBSCRIBE</h3>
    
                    <div className="footer__content">
                      <div className="footer__content__item">
                        <p>
                          We will send you updates on new products and discounts.
                        </p>
                      </div>
    
                      <div className="footer__newsletter">
                        <div id="mc_embed_shell">
                          <form
                            action="https://gmail.us21.list-manage.com/subscribe/post?u=1ac36f287395dda3350119932&amp;id=338c81b5fb&amp;f_id=008ae5e6f0"
                            method="post"
                            id="mc-embedded-subscribe-form"
                            name="mc-embedded-subscribe-form"
                            className="validate"
                            target="_blank"
                          >
                            <input
                              type="email"
                              name="EMAIL"
                              className="required email"
                              id="mce-EMAIL"
                              required
                              placeholder="Your Email"
                            />
                            <br />
                            <div id="mce-responses">
                              <div
                                className="response"
                                id="mce-error-response"
                                style={{ display: "none", color: "red" }}
                              ></div>
                              <div
                                className="response"
                                id="mce-success-response"
                                style={{ display: "none", color: "#fff" }}
                              ></div>
                            </div>
                            <div
                              aria-hidden="true"
                              style={{
                                position: "absolute",
                                left: "-5000px",
                              }}
                            >
                              {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups */}
                              <input
                                type="text"
                                name="b_1ac36f287395dda3350119932_338c81b5fb"
                                tabIndex={-1}
                                value=""
                              />
                            </div>
                            <button
                              type="submit"
                              name="subscribe"
                              id="mc-embedded-subscribe"
                              value="Subscribe"
                            >
                              <i className="icon icon-send"></i>
                            </button>
                          </form>
                        </div>
                      </div>
    
                      <div className="footer__socials">
                        <h3 className="footer__title text-white">FOLLOW US</h3>
    
                        <div className="footer__socials_content">
                          <a
                            data-barba
                            href="https://www.instagram.com/imperfect_des/"
                            className="text-white"
                          >
                            <i className="fa fa-instagram" aria-hidden="true"></i>
                          </a>
                          <a data-barba href="#" className="text-white">
                            <i className="fa fa-linkedin" aria-hidden="true"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    
          <div className="footer__bottom">
            <div className="container">
              <div className="row align-items-center justify-content-between sm:justify-content-start">
                <div className="col-auto sm:order-2">
                  <div className="footer__bottom_text">
                    © 2023 Imperfect Design. All rights reserved.
                  </div>
                </div>
    
                <div className="col-auto sm:d-none">
                  <div className="footer__bottom_text">
                    Designed by Razermind Studio
                  </div>
                </div>
              </div>
            </div>
          </div>
    
          <div data-cursor className="backButton js-backButton">
            <div className="nav -slider">
              <div className="nav__item -left">
                <i className="icon icon-right-arrow"></i>
              </div>
            </div>
          </div>
        </footer>
          );
    
}