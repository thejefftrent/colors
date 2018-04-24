function Color(hex) {
  /*
  input must either be #XXXXXX or #XXX
  ^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$
  */
  function validateColor(s) {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(s);
  }
  if(validateColor(hex))
  {
    this.hex = hex;
  }

  function calcLuma(rgb)
  {
    var luma = Math.round(((rgb[0] * 299) +
                           (rgb[1] * 587) +
                           (rgb[2] * 114)) / 1000);
    return luma;
  }

  function calcText(rgb)
  {
    if (calcLuma(rgb) > 125) {
      return "#FFFFFF"; //white
    }
    else {
      return "#000000"; //black
    }
  }
  /*
    Helper Function
    return and array of three elements [r,g,b] from a string of #XXX or #XXXXXX
  */
  this.rgbArray = function() {
    var s = this.hex;
    if(s.length == 4) {
      var r = parseInt(s.substr(1,1).concat(s.substr(1,1)), 16);
      var g = parseInt(s.substr(2,1).concat(s.substr(2,1)), 16);
      var b = parseInt(s.substr(3,1).concat(s.substr(3,1)), 16);
    }
    else { //s.length == 7
      var r = parseInt(s.substr(1,2), 16);
      var g = parseInt(s.substr(3,2), 16);
      var b = parseInt(s.substr(5,2), 16);
    }
    return [r,g,b];
  }

  this.rgbArrayArg = function(a) {
    var s = a;
    if(s.length == 4) {
      var r = parseInt(s.substr(1,1).concat(s.substr(1,1)), 16);
      var g = parseInt(s.substr(2,1).concat(s.substr(2,1)), 16);
      var b = parseInt(s.substr(3,1).concat(s.substr(3,1)), 16);
    }
    else { //s.length == 7
      var r = parseInt(s.substr(1,2), 16);
      var g = parseInt(s.substr(3,2), 16);
      var b = parseInt(s.substr(5,2), 16);
    }
    return [r,g,b];
  }


  /*
  Helper Function
    takes [r,g,b] array and return "#XXXXXX"
  */
  this.rgbString = function(a) {
    return "#".concat(("0" + a[0]).slice(-2)).concat(("0" + a[1]).slice(-2)).concat(("0" + a[2]).slice(-2));
  }

  this.setHex = function(hex) {
    if(validateColor(hex))
    {
      this.hex = hex;
    }
    return validateColor(hex);
  }

  this.getColorHex = function() {
    return this.hex;
  }

  this.getColorText = function() {
    return calcText(this.hex);
  }

  this.getShade = function(shade) {
    var rgb = this.rgbArray();
    var r = Math.floor(rgb[0] * (1 - shade)).toString(16);
    var g = Math.floor(rgb[1] * (1 - shade)).toString(16);
    var b = Math.floor(rgb[2] * (1 - shade)).toString(16);
    return this.rgbString([r,g,b]);
  }

  this.getTint = function(tint) {
    var rgb = this.rgbArray();
    var r = Math.floor(rgb[0] + (255 - rgb[0]) * tint).toString(16);
    var g = Math.floor(rgb[1] + (255 - rgb[1]) * tint).toString(16);
    var b = Math.floor(rgb[2] + (255 - rgb[2]) * tint).toString(16);
    return this.rgbString([r,g,b]);

  }

  this.getShadeText = function(shade) {
    return calcText(calcLuma(this.rgbArrayArg(this.getShade(shade))));
  }

  this.getTintText = function(tint) {
    return calcText(calcLuma(this.rgbArrayArg(this.getTint(tint))));
  }

  this.getLuma = function() {
    return calcLuma(this.rgbArray());
  }
}
