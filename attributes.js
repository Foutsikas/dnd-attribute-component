
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
                swal.fire({
                    title: 'Rolling D20:',
                    text: (Mod < 0) ? `${Dice} + (${Mod}) = ${Dice + Mod}` : `${Dice} + ${Mod} = ${Dice + Mod}`,
                    imageUrl: `alertimage.png`,
                    imageWidth: 100,
                    imageHeight: 100,
                    confirmButtonColor: '#000',
                    confirmButtonText: 'OK'
                })
            }

            // $.fn.AttributeMessage = function () {
            //     let Mod = this.parent().getModifier();
            //     let Name = el.attr("name");

            //     el.change();
            // }


            //Change function updates the page when something changes.
            el.change(() => {
                let name = el.attr("name");
                let value = parseInt(el.attr("value"));
                let modifier = el.getModifier();

                // Resolve tooltip message
                let tooltipMessage = "";
                if (name === "Strength") {
                    if (modifier === -5) {
                        tooltipMessage = "Morbidly weak, has significant trouble lifting own limbs.";
                    } else if (modifier === -4) {
                        tooltipMessage = "Needs help to stand, can be knocked over by strong breezes.";
                    } else if (modifier === -3) {
                        tooltipMessage = "Visibly weak. Might be knocked off balance by swinging something dense.";
                    } else if (modifier === -2) {
                        tooltipMessage = "Difficulty pushing an object of their weight.";
                    } else if (modifier === -1) {
                        tooltipMessage = "Has trouble lifting heavy objects for a longer time.";
                    } else if (modifier === 0) {
                        tooltipMessage = "Lifts heavy objects for a short time. Can perform simple physical labor for a few hours without break.";
                    } else if (modifier === 1) {
                        tooltipMessage = "Carries heavy objects and throws small objects for medium distances. Can perform physical labor for half a day without break.";
                    } else if (modifier === 2) {
                        tooltipMessage = "Visibly toned. Carries heavy objects with one arm for longer distances. Doesn't get too exhausted by physical labor.";
                    } else if (modifier === 3) {
                        tooltipMessage = "Muscular. Can break objects like wood with bare hands and raw strength. Can perform heavy physical labor for several hours without break.";
                    } else if (modifier === 4) {
                        tooltipMessage = "Heavily muscular. Able to out-wrestle a work animal or catch a falling person. Performs the work of multiple people in physical labor.";
                    } else {
                        tooltipMessage = "Pinnacle of brawn, able to out-lift several people in combined effort.";
                    }
                }

                //Sets the structure for the html.
                el.html(
                    `<div class="attribute-container">
                            <div class="attribute">
                                <div class="dec_button" onclick="$(this).parent().parent().parent().decrementValue();">-</div>
                                <div class="value">${value}</div>
                                <div class="inc_button" onclick="$(this).parent().parent().parent().incrementValue();">+</div>
                            </div>
                            <div class="modifier tooltip tooltiptext" onclick="$(this).parent().parent().DiceRoll();">
                                <p class="tooltiptext">${tooltipMessage}</p>
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
