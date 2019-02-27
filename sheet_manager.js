
(function ( $ ) {
    $( document ).ready(function() {

        $("attribute").each((i, e) => {
            let el = $(e);

            let name = el.attr("name");
            let value = parseInt(el.attr("value"));
            let modifier = (value - 10) / 2;

            el.html(
                `<div>\
                        <span class="attribute">\
                            ${value}
                        </span>\
                        <span class="modifier">\
                            ${modifier}
                        </span>\
                        ${name}
                </div>`);
        })

    });
}( jQuery ));
