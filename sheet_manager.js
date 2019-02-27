
(function ( $ ) {
    $( document ).ready(function() {

        // https://learn.jquery.com/plugins/basic-plugin-creation/

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
        });

        $("attribute[name=Strength]").value(20);

    });
}( jQuery ));
