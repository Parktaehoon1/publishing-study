$(document).ready(function () {

   $('header').scrollupbar();
   
   // header scroll up : bar view
   $(window).scroll(function(){
      var scrollHeight = $( document ).scrollTop();
      if ( scrollHeight > 100 ) {
          $( 'header' ).addClass('back');
      } else {
         $( 'header' ).removeClass('back');
      }
      //console.log(scrollHeight);
  });

  // lang nav : mobile toggle
  //  $(".lang_wrap > span").click(function (){
  //     if (window.innerWidth < 1300) {
  //        $(this).next().slideToggle(300);
  //        return false;
  //     }
  //  });
  
   // family_site : footer 
   $(".btn_site").click(function (){
      $(".btn_site").toggleClass("on");
      $(".site_list").slideToggle();
      return false;
   });
});



// top tag 
$(function(){
   $('body').append('<a class="top" id="top">top</a>');
   $( '#top' ).hide();
   $(window).scroll(function(){
       if ( $( this ).scrollTop() > 200 ) {
           $( '#top' ).fadeIn();
       } else {
           $( '#top' ).fadeOut();
       }
   });

   $( '#top' ).click( function() {
       $( 'html, body' ).animate( { scrollTop : 0 }, 400 );
       return false;
   });
});


// Toast popup
let removeToast;

function toast(string) {
   const toast = document.getElementById("toast");

   toast.classList.contains("reveal") ?
      (clearTimeout(removeToast), removeToast = setTimeout(function () {
            document.getElementById("toast").classList.remove("reveal")
      }, 1000)) :
      removeToast = setTimeout(function () {
            document.getElementById("toast").classList.remove("reveal")
      }, 1000)
   toast.classList.add("reveal"),
      toast.innerText = string
}


// layer popup
function pop_up_layer(el){
   var scroll_top = $(window).scrollTop();
   var class_obj = $('.' + el);
   var temp = $('#' + el);
   //var bg = temp.prev().hasClass('bg');   //dimmed 레이어를 감지하기 위한 boolean 변수
   
   var bg = class_obj.find('.bg');
   
   if(bg){
     bg.css('height',$('body').prop('scrollHeight') + 'px'); 
     bg.css('display','block');
      
     class_obj.fadeIn();   //'bg' 클래스가 존재하면 레이어가 나타나고 배경은 dimmed 된다. 
      
   }else{
      temp.fadeIn();
   }

   temp.find('.btn_close').click(function(e){
      if(bg){
         class_obj.fadeOut(200); //'bg' 클래스가 존재하면 레이어를 사라지게 한다. 
      }else{
         temp.fadeOut(200);
      }
      e.preventDefault();
      bg.fadeOut(400);
   });
    
   bg.click(function(){
      $(this).fadeOut();
      $(this).parent('.popwrap').fadeOut();
      e.preventDefault();
      bg.fadeOut(400);
   });      
}
