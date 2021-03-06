import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll from 'jquery-smooth-scroll';

class StickyHeader {
  constructor() {
    this.lazyImages = $(".lazyload");
    this.siteHeader = $(".site-header");
    this.headerTriggerElement = $(".large-hero__title");
    this.createHeaderWaypoint();
    this.pageSections = $(".page-section");
    this.headerLinks = $(".primary-nav a");
    this.createPageSectionWaypoints();
    this.addSmoothScrolling();
    this.refreshWaypoints();
  }

  refreshWaypoints() {
    this.lazyImages.on('load',function(){
      Waypoint.refreshAll(); // Waypoint library attaches object called Waypoint in the browser's global window scope so note this method refreshes all Waypoints that exist in the browser's memory
    });
  }

  // enable smooth scrolling with a new method
  addSmoothScrolling(){
    this.headerLinks.smoothScroll({speed:1500}); /* speed is in milliseconds*/
  }

  createHeaderWaypoint(){

    var that = this;

    new Waypoint({
      element: this.headerTriggerElement[0],
      handler: function(direction){
        if (direction == "down") {
          that.siteHeader.addClass("site-header--dark");
        } else {
          that.siteHeader.removeClass("site-header--dark");
        }
      }
    });
  }

  createPageSectionWaypoints() {

    var that = this;

    this.pageSections.each(function(){

      var currentPageSection = this;

      new Waypoint({
        element: currentPageSection,
        handler: function(direction) {
          if (direction == "down") {
            var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
            // reset by removing the class from header links already yellow
            that.headerLinks.removeClass("is-current-link");
            // add highlighted class
            $(matchingHeaderLink).addClass("is-current-link");
          }
        },
        offset: "18%"//default is 0
      });

      new Waypoint({
        element: currentPageSection,
        handler: function(direction) {
          if (direction == "up") {
            var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
            // reset by removing the class from header links already yellow
            that.headerLinks.removeClass("is-current-link");
            // add highlighted class
            $(matchingHeaderLink).addClass("is-current-link");
          }
        },
        offset: "-40%"//default is 0
      });
    });
  }


}


export default StickyHeader;
