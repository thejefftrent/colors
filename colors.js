/*
input must either be #XXXXXX or #XXX
^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$
*/
function validateColor(s) {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(input);
}


/*
  return and array of three elements [r,g,b] from a string of #XXX or #XXXXXX
*/
function rgbArray(s) {
  if(s.length === 4) {
    var r = s.substr(1,1).concat(s.substr(1,1));
    var g = s.substr(2,1).concat(s.substr(2,1));
    var b = s.substr(3,1).concat(s.substr(3,1));
  }
  else { //s.length == 7
    var r = s.substr(1,2);
    var g = s.substr(3,2);
    var b = s.substr(5,2);
  }
  return [r,g,b];
}


/*
  takes [r,g,b] array and return "#XXXXXX"
*/
function rgbString(a) {
  return "#".concat(a[0]).concat(a[1]).concat(a[2]);
}
