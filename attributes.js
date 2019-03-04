


(function ( $ ) {
    $( document ).ready(function() {

        // https://learn.jquery.com/plugins/basic-plugin-creation/

        $("attribute").each((i, e) => {
            let el = $(e);

            $.fn.getModifier = function () {
                let value = parseInt(this.attr("value"));
                return Math.floor((value - 10) / 2);
            }

            $.fn.incrementValue = function () {
                let previousValue = this.attr("value");
                previousValue = parseInt(previousValue);

                // upper limit check
                if (previousValue >= 20)
                    return;

                let newValue = (previousValue + 1);
                this.attr("value", newValue);
                this.change();
            }

            $.fn.decrementValue = function () {
                let previousValue = this.attr("value");
                previousValue = parseInt(previousValue);

                // lower limit check
                if (previousValue <= 1)
                    return;

                let newValue = (previousValue - 1);
                this.attr("value", newValue);
                this.change();
            }

            $.fn.DiceRoll = function () {
                let Dice = (Math.floor(Math.random() * 20 + 1));
                let Mod = this.getModifier();
                alert(`${Dice} + ${Mod} = ${Dice + Mod}`);
            }



            el.change(() => {
                let name = el.attr("name");
                let value = parseInt(el.attr("value"));
                let modifier = el.getModifier();

                el.html(
                    `<div>\
                            <span class="attribute">\
                                ${value}
                            </span>\
                            <span class="modifier" onclick="$(this).parent().parent().DiceRoll();">\
                                ${modifier}
                            </span>\
                            ${name}
                            <button type="button" onclick="$(this).parent().parent().incrementValue();">Increase</button>
                            <button type="button" onclick="$(this).parent().parent().decrementValue();">Decrease</button>
                    </div>`);
            });

            el.change();
        });
    });

    
}( jQuery ));
