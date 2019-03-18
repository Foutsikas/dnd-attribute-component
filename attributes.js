
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

            $.fn.AttributeMessage = function () {
                let Mod = this.getModifier();
                let Name = el.attr("name");

                if (Name === "Strength") {
                    if (Mod === -5) {
                        $(document.body).append("Morbidly weak, has significant trouble lifting own limbs.");
                    } else if (Mod === -4) {
                        $(document.body).append("Needs help to stand, can be knocked over by strong breezes.");
                    } else if (Mod === -3) {
                        $(document.body).append("Visibly weak. Might be knocked off balance by swinging something dense.");
                    } else if (Mod === -2) {
                        $(document.body).append("Difficulty pushing an object of their weight.");
                    } else if (Mod === -1) {
                        $(document.body).append("Has trouble lifting heavy objects for a longer time.");
                    } else if (Mod === 0) {
                        $(document.body).append("Lifts heavy objects for a short time. Can perform simple physical labor for a few hours without break.");
                    } else if (Mod === 1) {
                        $(document.body).append("Carries heavy objects and throws small objects for medium distances. Can perform physical labor for half a day without break.");
                    } else if (Mod === 2) {
                        $(document.body).append("Visibly toned. Carries heavy objects with one arm for longer distances. Doesn't get too exhausted by physical labor.");
                    } else if (Mod === 3) {
                        $(document.body).append("Muscular. Can break objects like wood with bare hands and raw strength. Can perform heavy physical labor for several hours without break.");
                    } else if (Mod === 4) {
                        $(document.body).append("Heavily muscular. Able to out-wrestle a work animal or catch a falling person. Performs the work of multiple people in physical labor.");
                    } else {
                        $(document.body).append("Pinnacle of brawn, able to out-lift several people in combined effort.");
                    }
                }
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
                            <div class="modifier tooltip" onclick="$(this).parent().parent().DiceRoll();">
                                <span class="tooltiptext" onmouseover="$(this).parent().parent().AttributeMessage()"></span>    
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
