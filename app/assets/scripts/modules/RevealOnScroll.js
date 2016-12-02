import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class RevealOnScroll { /*order matters in the contstructor function - make sure vars are accessible before running the function */
  constructor(elements, offset){
    this.itemsToReveal = elements;
    this.offsetPercentage = offset;
    this.hideInitially(); /*run on page load*/
    this.createWaypoints();
  }

  hideInitially(){
    this.itemsToReveal.addClass("reveal-item");
  }

  createWaypoints(){
    var that = this;

    this.itemsToReveal.each(function(){
      var currentItem = this;
      new Waypoint({
        element: currentItem, /*this is the dom element */
        handler: function(){/* what we want to happen when the element is scrolled to */
          $(currentItem).addClass("reveal-item--is-visible");
        },
        offset: that.offsetPercentage /* trigger the handler earlier */
      });
    });
  }

}

export default RevealOnScroll;
