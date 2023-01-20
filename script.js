/*
    //  Here we get the swipeBar and swipe_container elements from the DOM.
    */
const swipeBar = document.getElementById("swipeBar"),
  swipe_container = document.getElementById("swipe_container");

/*
    //  Here we calculate the height of the webpage.
    //  This is required for the menu to not go outside of the webpage.
    */
var body = document.body,
  html = document.documentElement;

var height = Math.max(
  body.scrollHeight,
  body.offsetHeight,
  html.clientHeight,
  html.scrollHeight,
  html.offsetHeight
);

/*
    //  Here we set the max height the menu can go.
    //  To decrese the height, subdivide from "height".
    */
const maxheight = height - 100;

/*
    //  Here we set the height of the swipeBar initial value and content.
    //  And set the height of the swipeBar and the content to the initial value.
    //  To change the height of the swipeBar, change the value of "initialheight".
    */

const initialheight = 30;
const contentHeight = height - initialheight;
const content = document.getElementById("content");
content.style.height = contentHeight + "px";
swipeBar.style.height = initialheight + "px";

/*
    //  This is the main focus of the swipe menu, these EventListeners allow us to listen to the touch events.
    //  At first we are listening to the touchstart, this is to get the initial value of the position of the swipeBar.
    //  Then we are listening to the touchmove, this is to get the value of the position of the swipeBar as it is being moved.
    //  We are also setting the transition to none, so that the menu doesn't animate when it is being moved manually.
    //  Also we are setting the height of the swipe_container to the value of the swipeBar.
    //  If the value is greater than 160px and less than the maxheight, then we set the height to the value of the swipeBar.
    //  In the end we are listening to the touchend, this is to get the final value of the position of the swipeBar,
    //  to set the transition style and set the height of the swipe_container depending on the height we have left it, this gives us the snap effect.
    */
var swipeStart;
swipeBar.addEventListener("touchstart", (e) => {
  swipeStart = height - Math.round(e.targetTouches[0].screenY);
});
swipeBar.addEventListener("touchmove", (e) => {
  swipe_container.style.transition = "";
  var swipeMove = height - Math.round(e.targetTouches[0].screenY);
  if (swipeMove > 160 && swipeMove < maxheight) {
    swipe_container.style.height = swipeMove + "px";
  } else if (swipeMove === 160) {
    swipe_container.style.height = "160px";
  } else if (swipeMove === maxheight) {
    swipe_container.style.height = maxheight + "px";
  }
});
swipeBar.addEventListener("touchend", (e) => {
  swipe_container.style.transition = "height 0.2s";
  var swipeEnd = height - Math.round(e.changedTouches[0].screenY);
  if (swipeEnd < swipeStart) {
    swipe_container.style.height = "160px";
  }
  if (swipeEnd > swipeStart) {
    swipe_container.style.height = maxheight + "px";
  }
});
