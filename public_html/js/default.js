$(window).on("load", function() {
    var a = $(".loader"),
        d = a.find(".svg_anm");
    d.fadeOut(), a.delay(300).fadeOut("slow");   
});

$(document).ready(function(){
    $('select').styler();
    
    //categories
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
});