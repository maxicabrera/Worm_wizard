/*global jQuery*/
(function ($, window) {

    "use strict";

    // custom namespace

    var addCampaign = addCampaign || {};

    // global variables
    var windowSmall = $(window).width() < 768,
        windowMed = $(window).width() >= 768 && $(window).width() < 1024,
        windowLarge = $(window).width() >= 1024;

    var $keyPress = $('[keypress]'),
        $wizard = $('.wizard-step_list').children();

    addCampaign.global = {

        init: function init() {
            $(document).foundation();
            this.nextSection();
            this.readingImgDefault();
        },

        readURL: function(input,img) {

            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    img.attr('src', e.target.result);
                };

                reader.readAsDataURL(input.files[0]);
            }
        },

        readImgChange: function(img) {
            var fileReader = new FileReader();

            img.addEventListener('change', function (ev) {
                fileReader.readAsDataURL(this.files[0]);

                fileReader.onload = loadHandler;
            }, false);
        },

        readingImgDefault: function() {
            var b = document.getElementById('portadaImage');

            addCampaign.global.readImgChange(b);
        },

        inputHidden: function(hidden,valor) {
            hidden.attr('value', valor);
        },

        _nextSection: function(section) {
            section.on('submit', function(event) {
                event.preventDefault();
            });

            section.on("formvalid.zf.abide", function(ev,frm) {
                ev.preventDefault();

                if (section.attr('id') == 'container-budget') {
                    
                } else {
                    section.hide().next().show();
                    addCampaign.campaignDetail.collectInputs();

                    var elem = new Foundation.Equalizer($(".creators__category"));

                    return false;
                }
            });
        },

        nextSection: function() {
            var a = $('#container-campaign-details'),
                b = $('#container-campaign-creatorProf'),
                c = $('#container-postReq'),
                d = $('#container-budget');

            addCampaign.global._nextSection(a);
            addCampaign.global._nextSection(b);
            addCampaign.global.wizNext();
        },

        wizNext: function() {
            $wizard.each(function (index, el) {
                if ($(this).hasClass('active')) {

                    var $this = $(this).next();
                    // console.log($(this));

                    $(this).removeClass('active');
                    $(this).addClass('completed');
                    $this.addClass('active');

                    return false;
                }
            });
        },

        wizPrev: function() {
            $wizard.each(function (index, el) {
                if ($(this).hasClass('active')) {

                    var $prev = $(this).prev();
                    // console.log($(this));

                    $(this).removeClass('active');
                    $(this).removeClass('completed');
                    $prev.removeClass('completed');
                    $prev.addClass('active');

                    return false;
                }
            });
        }
    }

    addCampaign.campaignDetail = {
        init: function() {
            this.cropit();
            this.portadaImg();
            this.portadaCopyNames();
            this.platformAdvice();
            // this.collectInputs();
        },

        cropit: function() {
          var $editor = $('.image-editor');

          $editor.cropit({
            initialZoom: 'min',
            minZoom: 'fit',
            freeMove: true,
            smallImage: 'allow',
            onImageLoaded: function() {
              $editor.cropit('offset', { x: 0, y: 0 });
            },
            onFileChange: function() {
              $('[name="campaign_icon_Updated"]').attr('value', 'yes');
            }
          });

          $('.export').click(function() {
            // Get cropping information
              var imgSrc = $editor.cropit('imageSrc');
              var offset = $editor.cropit('offset');
              var zoom = $editor.cropit('zoom');
              var previewSize = $editor.cropit('previewSize');
              var exportZoom = $editor.cropit('exportZoom');

              var imageData = $editor.cropit('export', {
                  quality: 1.0,
                  originalSize: true
              });

              $('.ver-img').attr('src', imageData);
              $('.placeholder-logo').remove();
              $('.ver-img').clone().appendTo('.ex-portada_logo');
              $('.ex-portada_logo').show();
              $('#data-logo').attr('value', imageData);
              $(this).parents('.reveal-overlay').hide();
              $('body').removeClass('is-reveal-open');
          });
        },

        portadaImg: function() {
            $("#campaignImg").change(function () {
                var a = $('.portada-image');

                addCampaign.global.readURL(this,a);
            });
        },

        portadaCopyNames: function(inputLogo) {
             $('#brand_name').on('input', function(event) {
                var a = $(this).val();
                $('.portada').find('h2').text(a);
             });

             $('#campaign_name').on('input', function(event) {
                var a = $(this).val();
                $('.portada').find('h5').text(a);
             });
        },

        platformAdvice: function() {
            var $platforms = $('#platforms').find('.img-container');

            $platforms.on('click', function (event) {
                event.preventDefault();
                // Act on the event 

                var $this = $(this);

                $platforms.removeClass('active');
                $platforms.find('.msg').hide();

                setTimeout(function () {
                    $this.addClass('active');
                }, 200);

                setTimeout(function () {
                    $this.removeClass('active');
                }, 900);

                setTimeout(function () {
                    $this.find('.msg').show('200');
                }, 1000);

                setTimeout(function () {
                    $platforms.first().addClass('active');
                }, 1200);

                setTimeout(function () {
                    $this.find('.msg').hide('200');
                }, 6000);
            });
        },

        collectInputs: function() {
            var a = $('#verImg').attr('src');
            $('#data-logo').attr('value', a);
            $('#campaign_icon_Updated').attr('value', 'yes');
            
            var b = $('.portada-image').attr('src');
            $('#campaign_cover').attr('value', b);
            $('#campaign_cover_Updated').attr('value', 'yes');
        }
    }

    addCampaign.creatorProfile = {
        init: function() {
            this.selectRange();
            this.selectGender();
            this.selectCategory();
        },

        selectRange: function() {

            $('.range-slider').jRange({
                from: 0,
                to: 100,
                step: 1,
                format: '%s',
                width: 250,
                // showLabels: true,
                isRange: true
            });

            // Set default values for range
            var min = $('.slider-input').eq(0).attr('value'),
                max = $('.slider-input').eq(1).attr('value');
                // console.log(min, max);

            $('.range-slider').jRange('setValue', min + ',' + max);
        },

        selectGender: function() {
            $('.gender').children().on('click', function (event) {
                event.preventDefault();
                /* Act on the event */

                $('.gender').children().removeClass('active');
                $(this).addClass('active');

                var a = $(this).children('.ic').attr('alt');
                // console.log(a);

                $('#ch-gender').attr('value', a);
            });
        },

        selectCategory: function() {

            $('.category-item').on('click', function (event) {
                event.preventDefault();
                /* Act on the event */
                var a = $('.category-item.active').length;
                // console.log(a);

                if (a < 3) {
                    $(this).toggleClass('active');
                } else if( $(this).is('.active') ) {
                    $(this).removeClass('active');
                }
                
            });

            // $cp.find('.button').on('click', function (event) {
            //     event.preventDefault();
            //     /* Act on the event */

            //     var arr = [];

            //     $('.category-item').each(function (index, el) {
            //         if ($(this).is('.active')) {
            //             var y = $(this).attr('id');

            //             arr.push(y);
            //             var a = arr.toString();
            //             // console.log(arr.toString());

            //             $('[name="category_id"]').attr('value', a);
            //         }

            //         if ($('.category-item.active').length == 0) {
            //             $('[name="category_id"]').attr('value', '0');
            //         }
            //     });
            // });
        },

        validationGender: function() {

        }
    }

    //initialize
    addCampaign.global.init();
    addCampaign.campaignDetail.init();
    addCampaign.creatorProfile.init();

    $(window).on('resize', function (event) {
        event.preventDefault();
        windowSmall = $(window).width() < 768;
        windowMed = $(window).width() >= 768 && $(window).width() < 1024;
        windowLarge = $(window).width() >= 1024;
    });
    
})(jQuery, undefined);
//end scope.