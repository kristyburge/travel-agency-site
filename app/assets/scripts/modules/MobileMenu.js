import $ from 'jquery';

class MobileMenu {
  // forks
  constructor(){
    this.siteHeader = $('.site-header');
    this.menuIcon = $(".site-header__menu-icon");

    this.menuContent = $(".site-header__menu-content");

    this.events(); // call the events method

  }

  //must manaully call this method! It's not native/expected.
  // spoons
  events() {
    this.menuIcon.click(this.toggleTheMenu.bind(this));
  }

  // knives
  toggleTheMenu() {
    this.menuContent.toggleClass("site-header__menu-content--is-visible");
    this.siteHeader.toggleClass("site-header--is-expanded");
    this.menuIcon.toggleClass("site-header__menu-icon--close-x");
  }
}

export default MobileMenu;
