window.onload = function () {
	    let img = $(".wrap1");
      console.log(img);

	img.on("mousemove", function (event) {
    console.log(event.pageY,"Y")
    console.log(event.pageX,"X")
        var styles = {
          "-webkit-transform":
            "translate3d(" +
            event.pageX / -64 +
            "px," +
            event.pageY / -100 +
            "px,0)",
          "-moz-transform":
            "translate3d(" +
            event.pageX / -64 +
            "px," +
            event.pageY / -100 +
            "px,0)",
          "-o-transform":
            "translate3d(" +
            event.pageX / -64 +
            "px," +
            event.pageY / -100 +
            "px,0)",
          transform:
            "translate3d(" +
            event.pageX / -64 +
            "px," +
            event.pageY / -100 +
            "px,0)",
        };

        img.css(styles);
      });

      window.ondeviceorientation = function (event) {
        var alpha = Math.round(event.alpha),
          beta = Math.round(event.beta),
          gamma = Math.round(event.gamma),
          phoneStyles = {
            "webkit-transform":
              "translate3d(" + beta / 4 + "px," + gamma / 4 + "px,0)",
            "-moz-transform":
              "translate3d(" + beta / 4 + "px," + gamma / 4 + "px,0)",
            "-o-transform":
              "translate3d(" + beta / 4 + "px," + gamma / 4 + "px,0)",
            "transform:":
              "translate3d(" + beta / 4 + "px," + gamma / 4 + "px,0)",
          };

        img.css(phoneStyles);
      };
  // $(".wrap1").mousemove(function (e) {
  //     console.log('sss')
  //     var moveX = (e.pageX * -1) / 15;
  //     var moveY = (e.pageY * -1) / 15;
  //     $(this).css("background-position", moveX + "px " + moveY + "px");
  //   });
}