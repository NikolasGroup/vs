$(window).on("load", function() {
    var a = $(".loader"),
        d = a.find(".svg_anm");
    d.fadeOut(), a.delay(300).fadeOut("slow");   
});

$(document).ready(function(){
    $('select').styler();
    
    //categories
    if($("div").is(".categories")){
        $('.setCategories').on('click',function(){
            $('body').addClass('fixed');
            $('.categories').addClass('open');
        });
        $(document).click(function(event) {
            if ($(event.target).closest(".categories").length) return;
            $('body').removeClass('fixed');
            $('.categories').removeClass('open');
            event.stopPropagation();
        });
        $('.closeCategories').on('click',function(){
            $('body').removeClass('fixed');
            $('.categories').removeClass('open');
        });
    }
    //-------
    
    //card percent
    $('.card:not(.open):not(.end):not(.сollection_completed)').each(function(){
        var percent = $(this).data('percent');
        
        var width = $(this).find('.card__state').width() / 100 * percent;
        $(this).find('hr.percent').width(width);
    });
    //-------
    
    //menu
    $('.menu span').on('click',function(){
        $('nav').slideDown(300);
    });
    $(document).click(function(event) {
        if ($(event.target).closest(".menu").length) return;
        $('nav').slideUp(300);
        event.stopPropagation();
    });
    //----------
    
    //user
    if($("div").is(".usersList")){
        $('.user__photo a').on('click',function(e){
            e.preventDefault();

            $('body').addClass('fixed');

            var user = $(this).closest('.user');

            var position_x = user.offset().left,
                position_y = user.offset().top - $(window).scrollTop();

            $('body').append('<div class="user_clone user" style="position: fixed; top: '+position_y+'px; left: '+position_x+'px; z-index: 10000;">'+user.html()+'</div>');

            var top = $(window).height() / 2 - 531 /2,
                left = $(window).width() / 2 - 150;

            $('body').find('.user_clone').animate({
                top: top,
                left: left
            },300);
        });
        $(document).click(function(event) {
            if ($(event.target).closest(".user").length) return;
            $('body').removeClass('fixed');
            $('.user_clone').remove();
            event.stopPropagation();
        });
    }    
    //---------
    
    //search
    $('#search').find('input').on('input',function(){
        var $this = $(this),
            value = $this.val();
        if(value.length > 0){
            $('#search_clear').fadeIn();
        }
        else{
            $('#search_clear').fadeOut();
        }
    });
    $('#search_clear').on('click',function(){
        $('#search').find('input').val('');
        $('#search_clear').fadeOut();
        
        return false;
    });
    //--------
    
    //contribution
    $("#contributionAmount_slider").slider({
        orientation: "horizontal",
        range: "min",
	min: $("#contributionAmount_slider").data('min'),
	max: $("#contributionAmount_slider").data('max'),
	value: $("#contributionAmount_slider").data('max'),
	stop: function(event, ui) {            
            $("label#setValue").find('span').html($("#contributionAmount_slider").slider("values",1));
        },
        slide: function(event, ui){            
            $("label#setValue").find('span').html($("#contributionAmount_slider").slider("values",1));
        }
    });
    //-------
    
    //MSG and comments
    $('body').on('click','.answer',function(e){
        e.preventDefault();
        
        var $this = $(this),
            form = $('#newComment');
        
        if($this.hasClass('active'))
        {
            $('.newComment').hide();
            form.slideUp(300);
            setTimeout(function(){                
                $('.newComment').before(form);
                $('#newComment').slideDown(300);
                $this.removeClass('active').html('Ответить');
            },300);
        }
        else{  
            form.slideUp(300);
            setTimeout(function(){
                $('.newComment').fadeIn();
                $this.closest('.userMsg__content').append(form);
                $('#newComment').slideDown(300);
                
                $('.answer.active').removeClass('active').html('Ответить');
                $this.addClass('active').html('Отмена');
            },300);
        }        
    });
    $('body').on('click','.newComment',function(e){
        e.preventDefault();
        
        var form = $('#newComment');        
        form.slideUp(300);
        $('.newComment').hide();
        setTimeout(function(){                
            $('.newComment').before(form);
            $('#newComment').slideDown(300);
            $('.answer.active').removeClass('active').html('Ответить');
        },300);
    });
    $('body').on('click','.channel a',function(e){
        e.preventDefault();
        
        $('.channel a.active').removeClass('active');
        $(this).addClass('active');
        
        $('.channel_block').hide();
        $($(this).attr('href')).slideDown();
    });
    //-------------
    
    //cards
    $('.bookmarks a').on('click',function(e){
        e.preventDefault();
        if($(this).hasClass('active'))
            return false;
        
        $('.bookmarks a.active').removeClass('active');
        $(this).addClass('active');
        var url = $(this).attr('href');        
        url = url.replace("#","");
        
        getHTML('ajax.'+url+'.html');        
    });
    //-----------
    
    //filter
    $('body').on('click','.activityFilter a',function(e){
        e.preventDefault();
        
        if($(this).hasClass('active')){
            if($(this).hasClass('all'))
                return false;
            
            $(this).removeClass('active');
            
            var length = $('.activityFilter a.active').length;
            if(length === 0){
                $('.activityFilter a.all').addClass('active');
                $('.activity__item').show();
                return false;
            }
        }
        else{
            if($(this).hasClass('all')){
                $('.activityFilter').find('a.active').each(function(){
                    $(this).removeClass('active');
                });
                $('.activity__item').show();
                $(this).addClass('active');
                return false;
            }
            else{
                if($(this).hasClass('clearAll')){
                    $('.activityFilter').find('a.active').each(function(){
                        $(this).removeClass('active');
                    });
                    $('.activity__item').show();
                    $('.activityFilter').find('a.all').addClass('active');
                    return false;
                }
                $('.activityFilter a.all').removeClass('active');
            }                
                
            $(this).addClass('active');
        }
        
        var filter = [];
        $('.activityFilter').find('a.active').each(function(){
            filter.push($(this).attr('href').replace("#",""));
        });
        
        $('.activity__item').hide();
        $('.activity__item').each(function(){
            var _class = $(this).attr('class').split(' ');
            for(var i =0; i < _class.length; i++){
                if($.inArray(_class[i], filter) >= 0){
                    $(this).show();
                }
            }
            
        });
    });
    $('body').on('click','.valuationFilter a',function(e){
        e.preventDefault();
        
        if($(this).hasClass('active'))
            return false;
        
        $('.valuationFilter a.active').removeClass('active');
        $(this).addClass('active');
        
        $('.valuationBlock').slideUp(300);
        var id = $(this).attr('href');
        setTimeout(function(){
            $(id).slideDown(300);
        },300);        
    });
    //-----------
    
    //auth
    $(document).click( function(event){
        if( $(event.target).closest(".services").length) 
          return;
        $("#auth").fadeOut(200);
        event.stopPropagation();
    });
    $('.services a.profile').on('click',function(e){
        e.preventDefault();
        $('#auth').fadeIn(200);
    });
    //-------
});

function getHTML(a){
    $.ajax({
        url: a,
        cache: false
    }).done(function( html ) {
        $('.cardContent').slideUp(300);
        setTimeout(function(){
            $('.cardContent').html(html);
            $('.cardContent').slideDown(300);
        },300);
    });
}