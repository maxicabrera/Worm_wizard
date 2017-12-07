/*global jQuery*/
(function ($, window) {

    "use strict";

    // custom namespace
    var addCampaign = addCampaign || {};

    // global variables
    var windowSmall   =  $(window).width() < 768,
    	windowMed	  =  $(window).width() >= 768 && $(window).width() < 1024,
    	windowLarge	  =  $(window).width() >= 1024;


    var $keyPress = $('[keypress]');

    var $form = $('.form-brand'),
        $cd = $form.find('.section_campaign-details'),
        $cp = $form.find('.section_creators-profile'),
        $pr = $form.find('.section_post-requirements'),
        $bg = $form.find('.section_budget'),
        $section = $('.section_button'),
        $save = $section.find('.save'),
        $back = $section.find('.secondary'),
        $next = $section.find('.primary'),
        $row = $('.section_form_container').children(),
        $rowVisible = $('.section_form_container').children('.active'),
        $wizard = $('.wizard-step_list').children(),
        $inputReq = $('.input_check'),
        $inputReqVisible = $('.input_check:visible'),
        $tagCheck = $('.tag-editor');


    addCampaign.global = {

    	init: function(){
    		$(document).foundation();
            this.cropit();
            this.cloneLogo();
            this.campaignImg();
            this.platformActiveAdvice();
            this.customRange();
            this.selectGender();
            this.selectCategory();
            this.previewFile();
            this.biggerPreview();
            this.specialChar();
            this.datePicker();
            this.hourRange();
            this.dataPortada();
            this._inputRangeData();
            this._inputDaysData();
            this._inputDate();
    	},

        cropit: function() {
            
            var $editor = $('.image-editor'),
                $confirm = $('.confirm-logo');

            $editor.cropit({
                initialZoom: 'image',
                minZoom: 'fill',
                maxZoom: 1.5,
                quality: 1,
                freeMove: true,
                onImageLoaded: function() {
                    $editor.cropit('offset', { x: 0, y: 0 });
                    var a = $('.cropit-preview-image').attr('src') ;
                    // console.log(a);

                    $('[name="brandLogo"]').attr('value', a);
                }
            });   
        },

        cloneLogo: function() {
            $('.confirm-logo').on('click', function(event) {
                event.preventDefault();
                /* Act on the event */

                $('.placeholder-logo').remove();
                $('.ex-portada').find('.cropit-preview').remove();
                $('.cropit-preview').clone().prependTo('.ex-portada');
                
            });
        },

        campaignImg: function() {
            
            function readURL(input) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();

                    reader.onload = function (e) {
                        $('.background-image').attr('src', e.target.result);
                    }

                    reader.readAsDataURL(input.files[0]);
                }
            }

            $("#campaignImg").change(function(){
                readURL(this);
            });

            $cd.find('.button').on('click', function(event) {
                event.preventDefault();
                /* Act on the event */

                var a = $('.background-image').attr('src');
                // console.log(a);
                $('#campaignImgData').attr('value', a);
            });
        },

        platformActiveAdvice: function() {
            var $platforms = $('#platforms').find('.img-container');

            $platforms.on('click',  function(event) {
                event.preventDefault();
                // Act on the event 

                var $this = $(this);

                $platforms.removeClass('active');
                $platforms.find('.msg').hide();
                // $('#platforms').find('.img-container').find('input[type="hidden"]').attr('value', '');

                // var a = $this.find('img').attr('alt');
                
                // $this.find('input[type="hidden"]').attr('value', a);
                
                setTimeout(function() {
                    $this.addClass('active');
                }, 200);

                setTimeout(function() {
                    $this.removeClass('active');
                }, 900);

                setTimeout(function() {
                    $this.find('.msg').show('200');
                }, 1000);

                setTimeout(function() {
                    $platforms.first().addClass('active');
                }, 1200);

                setTimeout(function() {
                    $this.find('.msg').hide('200');
                }, 6000);
                
            });
        },

        cooki: function() {
        },

        customRange: function() {

            $('.range-slider').jRange({
                from: 0,
                to: 100,
                step: 1,
                format: '%s',
                width: 250,
                // showLabels: true,
                isRange : true
            });
        },

        selectGender: function() {
            $('.gender').children().on('click', function(event) {
                event.preventDefault();
                /* Act on the event */

                $('.gender').children().removeClass('active');
                $(this).addClass('active');

                var a = $(this).children('img').attr('alt');
                // console.log(a);

                $('#ch-gender').attr('value', a);
            });
        },

        selectCategory: function() {
            $('.category-item').on('click',  function(event) {
                event.preventDefault();
                /* Act on the event */
                $(this).toggleClass('active').next().click();

            });
        },

        previewFile: function() {

            var fileReader = new FileReader(),
                $control = document.getElementById('input_image1'),
                $control2 = document.getElementById('input_image2'),
                $control3 = document.getElementById('input_image3'),
                $control4 = document.getElementById('input_image4');


            $control.addEventListener('change', function( ev ) {
              fileReader.readAsDataURL( this.files[0] );
              
              fileReader.onload = loadHandler;
            }, false);

            $control2.addEventListener('change', function( ev ) {
              fileReader.readAsDataURL( this.files[0] );
              
              fileReader.onload = loadHandler2;
            }, false);

            $control3.addEventListener('change', function( ev ) {
              fileReader.readAsDataURL( this.files[0] );
              
              fileReader.onload = loadHandler3;
            }, false);

            $control4.addEventListener('change', function( ev ) {
              fileReader.readAsDataURL( this.files[0] );
              
              fileReader.onload = loadHandler4;
            }, false);

            function loadHandler( ev ) {
              var dataUrl = ev.target.result,
                  img = document.getElementById('campaign_image1');
              
              img.src = dataUrl;
              // document.body.appendChild(img);
            }

            function loadHandler2( ev ) {
              var dataUrl = ev.target.result,
                  img = document.getElementById('campaign_image2');
              
              img.src = dataUrl;
              // document.body.appendChild(img);
            }

            function loadHandler3( ev ) {
              var dataUrl = ev.target.result,
                  img = document.getElementById('campaign_image3');
              
              img.src = dataUrl;
              // document.body.appendChild(img);
            }

            function loadHandler4( ev ) {
              var dataUrl = ev.target.result,
                  img = document.getElementById('campaign_image4');
              
              img.src = dataUrl;
              // document.body.appendChild(img);
            }

            // set the src img to input hidden
            $pr.find('.button').on('click', function(event) {
                event.preventDefault();
                /* Act on the event */

                $('.visual-example-preview').each(function(index, el) {
                    
                    var a = $(this).attr('src');
                    // console.log(a);

                    $(this).next().attr('value', a);

                });
            });
        },

        biggerPreview: function() {

            $('.magnifiyng').on('click',  function(event) {
                event.preventDefault();
                /* Act on the event */

                // $('.visual-examples_item').removeClass('_modal');
                $('body').toggleClass('_modal');
                $(this).parent().toggleClass('_modal');
                $(this).toggleClass('_modal');

            });
        },

        specialChar: function() {

            $('.hashtag_area').tagEditor();
            $('.mentions_area').tagEditor();

            $pr.find('.button').on('click', function(event) {
                event.preventDefault();
                /* Act on the event */

                $('.tag-editor-tag').find('input[type="hidden"]').remove();

                $('.tag-editor-tag').each(function(index, el) {
                    var a = $(this).text();
                    console.log(a);

                    $(this).append('<input type="hidden" value="">');
                    $(this).children('input[type="hidden"]').attr('value', a);                    
                });

            });
        },

        datePicker: function() {
            $('[data-toggle="datepicker"]').datepicker();
        },

        hourRange: function() {

            $('.range-hours').jRange({
                from: 0,
                to: 24,
                step: 1,
                format: '%s',
                width: 250,
                // showLabels: true,
                isRange : true
            });
        },

        dataPortada: function() {
            var $portada = $('.ex-portada'),
                $dataBrand = $('#brandName'),
                $dataCampaign = $('#campaignName'), 
                $h2 = $portada.find('h2'),
                $h5 = $portada.find('h5');

            $dataBrand.on('change', function(event) {
                event.preventDefault();
                /* Act on the event */

                var t = $(this).val();
                $h2.text(t);
            });

            $dataCampaign.on('change', function(event) {
                event.preventDefault();
                /* Act on the event */
                
                var t = $(this).val();
                $h5.text(t);
            });
        },

        _inputRangeData: function() {

            $cp.find('.button.primary').on('click', function(event) {
                event.preventDefault();
                /* Act on the event */
                var a = $cp.find('.pointer-label.low').text(),
                    b = $cp.find('.pointer-label.high').text();

                $('[name="age_range"]').attr('value', a);
                $('[name="age_to"]').attr('value', b);

            });

            $pr.find('.button.primary').on('click', function(event) {
                event.preventDefault();
                /* Act on the event */
                var a = $pr.find('.pointer-label.low').text(),
                    b = $pr.find('.pointer-label.high').text();

                $('.slider-input-hours').attr('value', a + "," + b);

            });
        },

        _inputDaysData: function() {

            $pr.find('.button.primary').on('click', function(event) {
                event.preventDefault();
                /* Act on the event */

                var arr = [];

                    $('#daysData').find('[type="checkbox"]').each(function(index, el) {
                        if ($(this).is(':checked')) {
                            var y = $(this).data('pos');

                            arr.push(y);
                            var a = arr.toString();
                            // console.log(arr.toString());

                            $('[name="days_data"]').attr('value', a);

                        } else {}                        
                    });


                


            });
        },

        _inputDate: function() {
            $pr.find('.button').on('click', function(event) {
                event.preventDefault();
                /* Act on the event */

                var a = $('[data-toggle="datepicker"]').val();
                $('[name="request_submit_date"]').attr('value', a);
            });
        }
    }

    addCampaign.validation = {
        init: function() {
            this.cd();
            this.pr();
            this.bg();
            this.nextNotVal();
            this.back();
        },

        cd: function() {
            addCampaign.validation._valIc($cd);
            addCampaign.validation._valClick($cd);
        },

        pr: function() {
            addCampaign.validation._valIc($pr);
            addCampaign.validation._valTag();
            addCampaign.validation._valClick($pr);
        },

        bg: function() {
            $bg.find('.button.primary').on('click', function(event) {
                event.preventDefault();
                /* Act on the event */

                if ($('#exampleNumberInput').val().length != 0) {
                    addCampaign.validation._wizNext();
                    $bg.find('.form-error').hide();
                    addCampaign.validation.gotoTop();
                }else{
                    $bg.find('.form-error').show();
                }
                
            });    
        },

        nextNotVal: function() {

            $cp.find('.button.primary').on('click', function(event) {
                event.preventDefault();
                /* Act on the event */

                addCampaign.validation._gotoNext();
                addCampaign.validation.gotoTop();
            });
        },

        back: function() {
            $back.on('click', function(event) {
                event.preventDefault();
                /* Act on the event */

                $row.each(function(index, el) {

                    if ($(this).hasClass('active') && !$(this).hasClass('section_campaign-details')) {

                        var $prev = $(this).prev();

                        $(this).removeClass('active');
                        $prev.addClass('active');

                        addCampaign.validation._wizPrev();

                        var elem = new Foundation.Equalizer($(".creators__category"));

                        return false;
                    }          
                });
            });
        },

        _reqVal: function() {

            var a = $(this).parents('.active').find('.input_check');

            a.each(function(index, el) {
                
                if ( $(this).val().length != 0 ) {

                    $(this).addClass('pass');

                }else{

                    $(this).removeClass('pass');

                }
            });

            if ( a.is('.pass').length == a.length ) {

                addCampaign.validation._gotoNext();
                addCampaign.validation._wizNext();

            }
        },

        _gotoNext: function() {
            $row.each(function(index, el) {

                // si la seccion actual no es la ultima
                if ($(this).hasClass('active') && !$(this).hasClass('section_budget')) {

                    var $prox = $(this).next();
                    // console.log($prox);

                    // Al clickear en next borrar la clase activa y aplicarla al siguiente div 
                    $(this).removeClass('active');
                    $prox.addClass('active');

                    // Wizard retrocede un paso
                    addCampaign.validation._wizNext();

                    // iguala los altos
                    var elem = new Foundation.Equalizer($(".creators__category"));

                    return false;
                }
            });
        },

        _wizNext: function() {
            $wizard.each(function(index, el) {
                if ( $(this).hasClass('active') ) {

                    var $this = $(this).next();
                    // console.log($(this));

                    $(this).removeClass('active');
                    $(this).addClass('completed');
                    $this.addClass('active');

                    return false;
                } 
            });
        },

        _wizPrev: function() {
            $wizard.each(function(index, el) {
                if ( $(this).hasClass('active') ) {

                    var $prev = $(this).prev();
                    // console.log($(this));

                    $(this).removeClass('active');
                    $(this).removeClass('completed');
                    $prev.removeClass('completed');
                    $prev.addClass('active');

                    return false;
                } 
            });
        },

        _valTag: function() {
            $('.tag-editor').on('change', function(event) {
                event.preventDefault();
                /* Act on the event */

                if ($(this).children().length > 1) {
                    $(this).siblings('.required').addClass('pass');
                }else{
                    $(this).siblings('.required ').removeClass('pass');
                }
            });
        },

        _valIc: function(x) {

            x.find('.input_check').on('change', function(event) {
                event.preventDefault();
                /* Act on the event */

                if ($(this).val().length != 0) {

                    $(this).addClass('pass');

                }else{
                    $(this).removeClass('pass');
                }
            });
        },

        _valClick: function(z) {
            z.find('.button.primary').on('click', function(event) {
                event.preventDefault();
                /* Act on the event */

                var a = z.find('.input_check').length,
                    b = z.find('.pass').length;

                console.log(a,b, a == b);

                if (a == b) {
                    addCampaign.validation._gotoNext();
                }

                z.find('.input_check').each(function(index, el) {

                    if ($(this).val().length != 0) {
                        $(this).next('.form-error').hide();
                    }else{
                        $(this).next('.form-error').show();
                    }

                });

                z.find('.tag-editor').each(function(index, el) {
                    if ($(this).children().length > 1) {

                        $(this).siblings('.form-error').hide();
                    }else{
                        $(this).siblings('.form-error').show();
                    }
                });

                addCampaign.validation.gotoTop();

            });
        },

        gotoTop: function() {
            // On new section go to the beggining of the form
            var b = $('.wizard-step').offset().top;
            // console.log(b);
            $('html, body').animate({scrollTop: b}, 400);
        }
    }




    //initialize
    addCampaign.global.init();
    addCampaign.validation.init();

    $(window).on('resize',  function(event) {
        event.preventDefault();
        windowSmall   =  $(window).width() < 768;
        windowMed     =  $(window).width() >= 768 && $(window).width() < 1024;
        windowLarge   =  $(window).width() >= 1024;
    });

}(jQuery, this));
//end scope.


