import Link from "next/link";
export default function Navbar(){
    
        return (
            <>
              <header className="header -home-2 -sticky-font-light js-header bg-white">
                <div className="header__bar  js-header-bar js-header-item">
                  <div className="row justify-content-between align-items-center">
                    <div className="col-auto z-5 position-unset">
                      <div className="header__item -margin-lg">
                        <div className="header__logo text-black js-header-logo">
                          <Link href="/" data-barba>
                            <img
                              className="imperfect-logo"
                              src="/general/imp_logo_main.png"
                              alt=""
                            />
                          </Link>
                        </div>
        
                        <div className="menu js-menu ">
                          <div className="mobile__footer js-mobile-footer">
                            <div className="mobile__socials">
                              <a data-barba href="#">
                                <i className="fa fa-facebook" aria-hidden="true"></i>
                              </a>
                              <a data-barba href="#">
                                <i className="fa fa-twitter" aria-hidden="true"></i>
                              </a>
                              <a data-barba href="#">
                                <i className="fa fa-instagram" aria-hidden="true"></i>
                              </a>
                              <a data-barba href="#">
                                <i className="fa fa-linkedin" aria-hidden="true"></i>
                              </a>
                            </div>
        
                            <div className="mobile__copyright">
                              <img
                                src="/static/img/general/logo-light.svg"
                                alt="logo"
                                className="icon"
                              />
                              <p>© 2021 Hellix. All rights reserved.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
        
                    <div className="col-auto z-5 sm:pos-unset">
                      <div className="header__icons ">
                        <div className="header__cart">
                          <a data-barba href="#"></a>
                        </div>
        
                        <div className="header__search">
                          <button className="js-headerSearch-open"></button>
                        </div>
        
                        <div className="header__menu">
                          <button
                            type="button"
                            className="nav-button-close d-none md:d-block pointer-events-none js-nav-close"
                          >
                            <i className="icon text-black icon-cross"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
        
                  <div className="headerSearch js-headerSearch">
                    <div className="headerSearch__line"></div>
        
                    <button className="headerSearch__close js-headerSearch-close">
                      <i className="icon icon-cross text-black"></i>
                    </button>
                  </div>
                </div>
              </header>
              <div className="lines -vertical-lines">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </>
          );
    
}