
// Save the widths of each nav item
var widthArray = [];
window.onload = function () {
  var element = document.getElementById('dynamicList');
  var totalChildrenWidth = 0;
  for (var i = 0; i < element.children.length; i++) {
    totalChildrenWidth += element.children[i].offsetWidth;
    widthArray.push(totalChildrenWidth);
  }


  // check is the navbar is overflowing
  checkOverflow();

  // Display the navbar after completing the push or pulls of the Nav list items
  var navs = document.getElementsByTagName('nav');
  for( var i = 0; i < navs.length; i++ ) {
    navs[i].style.visibility = 'visible';
  }

}

/*........... Listen to the resize event of the window .......................*/
window.onresize = function() {
  checkOverflow();
}

/*..............................................................................
Function to check if the width of the navbar is greater than the viewport's width
..............................................................................*/
function checkOverflow() {
  var parent = document.getElementById('navbarCollapse');
  var dynamicList = document.getElementById('dynamicList');
  var pushPoint = dynamicList.offsetWidth;
  var stackWidth = document.getElementById('stack').offsetWidth;
  var navHeaderWidth = document.getElementById('navbarHeader').offsetWidth;
  var switchPoint = (parent.scrollWidth - stackWidth - navHeaderWidth - 15);
  var pullPoint = dynamicList.children.length == widthArray.length ? NaN : widthArray[dynamicList.children.length] ;

  var noOfItemsInList = dynamicList.children.length;
  var possibleNoOfItems = noOfItemsInList;
  for( var i = 0; i < widthArray.length; i++ ) {
    if( switchPoint > widthArray[widthArray.length - 1 - i] ) {
      possibleNoOfItems = widthArray.length - i;
      noOfItemsInList = dynamicList.children.length
      break;
    }
  }

  for( var i = noOfItemsInList; i < possibleNoOfItems; i++ ) {
      pullFromStack();
  }

  for( var i = noOfItemsInList; i > possibleNoOfItems; i-- ) {
    if( (parent.scrollWidth > 730)  ) {// (parent.scrollWidth > 730) is checked to insure push-pull syncs with the @media query min-width 767px
      pushIntoStack();
    }
  }

  // Display all the navbar items when widow width is < 768px , or when parent.scrollWidth < 730px
  if( (parent.scrollWidth < 730)  ) {
    for (var i = noOfItemsInList; i < widthArray.length; i++) {
      pullFromStack();
    }
  }
}

function pushIntoStack() {
  var dynamicList = document.getElementById('dynamicList');
  var stackContent = document.getElementById('stackContent');
  var listSize = dynamicList.children.length;
  if( hasChildElement( dynamicList ) )
    stackContent.insertBefore( dynamicList.removeChild( dynamicList.children[listSize-1] ),stackContent.childNodes[0] );
}

function pullFromStack() {
  var dynamicList = document.getElementById('dynamicList');
  var stackContent = document.getElementById('stackContent');
  if( hasChildElement( stackContent ) )
    dynamicList.appendChild( stackContent.removeChild( stackContent.children[0] ) );
}

function hasChildElement( elm ) {
  var child, rv;
  if( elm.children ) {
    rv = elm.children.length !== 0;
  }else {
    rv = false;
    for( child = elm.firstChild; !rv && child ; child = child.nextSibling ) {
      if( child.nodeType == 1) {
        rv = true;
      }
    }
  }
  return rv;
}
