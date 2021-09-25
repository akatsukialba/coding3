'use strict';

{
  var swiper = new Swiper('.swiper-container', {
    // Optional paarameters
    loop: true, // スライドをループさせる
    slidesPerView: 1.5, // １度に表示するスライド数
    centeredSlides: true, // 現在のスライドを中央に表示
    spaceBetween: 20, // スライド同士の余白

    // 自動再生
    autoplay: {
      delay: 3000, // ミリ秒:1000=1秒
      disableOnInteraction: true,
    },

    // 1001px以上
    breakpoints: {
      1001: {
        slidesPerView: 3.75, // １度に表示するスライド数
        spaceBetween: 56, // スライド同士の余白
      }
    },
});
}

$(function() {

  // ハンバーガーメニュー
  $('.white-mask').hide();

  $('.menu-trigger, .menu-item a').click(function() {
    $('.white-mask').fadeToggle(300);
    $('.menu-list, .menu-trigger').toggleClass('open');
    $('body').toggleClass('noscroll');
  });

  // アコーディオン
  $('.faq-item:not(:first-child) dd').hide();
  $('.faq-list dl').on('click', function(e) {
    $(this).children('dd').slideToggle('fast');
    // $('dd', this).slideToggle('fast'); 上と同じ
  });

  // スムーススクロール
  var headerHeight = 94;
  $('a[href^="#"]').click(function() {
    var speed = 500;
    var href = $(this).attr('href');
    var target = $(href == '#' || href == '' ? 'html' : href);
    var position = target.offset().top - headerHeight;
    $('body, html').animate({'scrollTop': position}, speed, 'swing');
    return false;
  });

  // フォームバリデーション
  const $submitBtn = $('#js-submit');
  $('.alert').hide();

  $('#form input, #form textarea').on('change', function() {
    if (
      $('#form input[type="text"]').val() !== "" &&
      $('#form input[type="email"]').val() !== "" &&
      $('#form textarea').val() !== "" &&
      $('#form #confirmation').prop('checked') === true
    ) {
      $submitBtn.prop('disabled', false);
      $('.alert').hide();
      $('.form').css('paddingBottom', 35);
    } else {
      $submitBtn.prop('disabled', true);
      $('.alert').fadeIn();
      $('.form').css('paddingBottom', 0);
    }
  });

  // お問い合わせ完了メッセージ
  $('#form').submit(function (event) {
    var formData = $('#form').serialize();
    $.ajax({
      url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdy0rGHtATh9qyzssImkL8CXkvP6BV31gsfUryi8Y6fEodGnA/formResponse",
      data: formData,
      type: "POST",
      dataType: "xml",
      statusCode: {
        0: function () {
          // $(".end-message").slideDown();
          $("#js-submit").fadeOut();
          //window.location.href = "thanks.html";
        },
        200: function () {
          $(".false-message").slideDown();
        }
      }
    });
    event.preventDefault();
  });

  // aosプラグイン
  AOS.init()
});