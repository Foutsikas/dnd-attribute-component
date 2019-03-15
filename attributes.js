

(function ( $ ) {
    $( document ).ready(function() {

        // https://learn.jquery.com/plugins/basic-plugin-creation/

        $("attribute").each((i, e) => {
            let el = $(e);
            
            //Function that calculates the modifier value.
            $.fn.getModifier = function () {
                let value = parseInt(this.attr("value"));
                return Math.floor((value - 10) / 2);
            }
            
            //Jquery function that increases the attribute value with the press of a button
            $.fn.incrementValue = function () {
                let previousValue = this.attr("value");
                previousValue = parseInt(previousValue);

                // upper limit check
                if (previousValue >= 20)
                    return;

                let newValue = (previousValue + 1);
                this.attr("value",newValue);
                this.change();
            }

            //Jquery function that decreases the attribute value with the press of a button
            $.fn.decrementValue = function () {
                let previousValue = this.attr("value");
                previousValue = parseInt(previousValue);

                // lower limit check
                if (previousValue <= 1)
                    return;

                let newValue = (previousValue - 1);
                this.attr("value",newValue);
                this.change();
            }

            //Jquery Function that calculates a random D20 roll and adds it with the modifier value. Throws an alert.
            $.fn.DiceRoll = function () {
                let Dice = (Math.floor(Math.random() * 20 + 1));
                let Mod = this.getModifier();
                if (Mod < 0){
                    swal({
                        title: 'Rolling D20:',
                        text: `${Dice} + (${Mod}) = ${Dice + Mod}`,
                        type: 'info',
                        confirmButtonColor: '#000',
                        confirmButtonText: 'OK'})
                }else
                    swal({
                        title: 'Rolling D20:',
                        text: `${Dice} + ${Mod} = ${Dice + Mod}`,
                        type: 'info',
                        confirmButtonColor: '#000',
                        confirmButtonText: 'OK'})
            }


            //Change function updates the page when something changes.
            el.change(() => {
                let name = el.attr("name");
                let value = parseInt(el.attr("value"));
                let modifier = el.getModifier();

                //Sets the structure for the html.
                el.html(
                    `<div class="attribute-container">
                            <div class="attribute">
                                <div class="dec_button" onclick="$(this).parent().parent().parent().decrementValue();">-</div>
                                <div class="value">${value}</div>
                                <div class="inc_button" onclick="$(this).parent().parent().parent().incrementValue();">+</div>
                            </div>
                            <div class="modifier" onclick="$(this).parent().parent().DiceRoll();">
                                ${modifier}
                            </div>
                            <div><b>${name}</b></div>
                    </div>`);
            });

            //Updates the page after an action.
            el.change();
        });
    });

    
}( jQuery ));
