
(function ( $ ) {
    $( document ).ready(function() {

        // https://learn.jquery.com/plugins/basic-plugin-creation/

        const InitializeAttribute = ((i, e) => {
            let el = $(e);
            
            //Function that calculates the modifier value.
            $.fn.getModifier = function () {
                let value = parseInt(this.attr("value"));
                return Math.floor((value - 10) / 2);
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

            //Jquery Function that calculates a random D20 roll and adds it with the modifier value. Throws an alert.
            $.fn.DiceRoll = function () {
                let Dice = (Math.floor(Math.random() * 20 + 1));
                let Mod = this.children().getModifier();//This points to the ul #character-attribute so we need the child of that which is the HTML that will get generated in el.html
                swal.fire({
                    title: 'Rolling D20:',
                    text: (Mod < 0) ? `${Dice} + (${Mod}) = ${Dice + Mod}` : `${Dice} + ${Mod} = ${Dice + Mod}`,
                    imageUrl: `alertimage.png`,
                    imageWidth: 100,
                    imageHeight: 100,
                    confirmButtonColor: '#000',
                    confirmButtonText: 'OK'
                })
                this.change();
            }

            
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
                }else if (name === "Dexterity") {
                    if (modifier === -5) {
                        tooltipMessage = "Barely mobile, probably significantly paralyzed.";
                    } else if (modifier === -4) {
                        tooltipMessage = "Incapable of moving without noticeable effort or pain.";
                    } else if (modifier === -3) {
                        tooltipMessage = "Visible paralysis or physical difficulty.";
                    } else if (modifier === -2) {
                        tooltipMessage = "Significant klutz or very slow to react.";
                    } else if (modifier === -1) {
                        tooltipMessage = "Somewhat slow, occasionally trips over own feet.";
                    } else if (modifier === 0) {
                        tooltipMessage = "Capable of usually catching a small tossed object.";
                    } else if (modifier === 1) {
                        tooltipMessage = "Able to often hit large targets.";
                    } else if (modifier === 2) {
                        tooltipMessage = "Able to often hit small targets. Can catch or dodge a medium-speed surprise projectile.";
                    } else if (modifier === 3) {
                        tooltipMessage = "Light on feet, able to often hit small moving targets.";
                    } else if (modifier === 4) {
                        tooltipMessage = "Graceful, able to flow from one action into another easily. Capable of dodging a small number of thrown objects.";
                    } else {
                        tooltipMessage = "Moves like water, reacting to all situations with almost no effort. Capable of dodging a large number of thrown objects.";
                    }
                }else if (name === "Constitution") {
                    if (modifier === -5) {
                        tooltipMessage = "Minimal immune system, body reacts violently to anything foreign.";
                    } else if (modifier === -4) {
                        tooltipMessage = "Frail, suffers frequent broken bones.";
                    } else if (modifier === -3) {
                        tooltipMessage = "Bruises very easily, knocked out by a light punch.";
                    } else if (modifier === -2) {
                        tooltipMessage = "Unusually prone to disease and infection.";
                    } else if (modifier === -1) {
                        tooltipMessage = "Easily winded, incapable of a full day’s hard labor.";
                    } else if (modifier === 0) {
                        tooltipMessage = "Occasionally contracts mild sicknesses.";
                    } else if (modifier === 1) {
                        tooltipMessage = "Can take a few hits before being knocked unconscious.";
                    } else if (modifier === 2) {
                        tooltipMessage = "Easily shrugs off most illnesses. Able to labor for twelve hours most days.";
                    } else if (modifier === 3) {
                        tooltipMessage = "Able to stay awake for days on end.";
                    } else if (modifier === 4) {
                        tooltipMessage = "Very difficult to wear down, almost never feels fatigue.";
                    } else {
                        tooltipMessage = "Tireless paragon of physical endurance. Almost never gets sick, even to the most virulent diseases.";
                    }
                }else if (name === "Intelligence") {
                    if (modifier === -5) {
                        tooltipMessage = "Animalistic, no longer capable of logic or reason. Behavior is reduced to simple reactions to immediate stimuli.";
                    } else if (modifier === -4) {
                        tooltipMessage = "Rather animalistic. Acts on instinct but can still resort to simple planning and tactics.";
                    } else if (modifier === -3) {
                        tooltipMessage = "Very limited speech and knowledge. Often resorts to charades to express thoughts.";
                    } else if (modifier === -2) {
                        tooltipMessage = "Has trouble following trains of thought, forgets most unimportant things.";
                    } else if (modifier === -1) {
                        tooltipMessage = "Misuses and mispronounces words. May be forgetful.";
                    } else if (modifier === 0) {
                        tooltipMessage = "Knows what they need to know to get by.";
                    } else if (modifier === 1) {
                        tooltipMessage = "Knows a bit more than is necessary, fairly logical.";
                    } else if (modifier === 2) {
                        tooltipMessage = "Fairly intelligent, able to understand new tasks quickly. Able to do math or solve logic puzzles mentally with reasonable accuracy.";
                    } else if (modifier === 3) {
                        tooltipMessage = "Very intelligent, may invent new processes or uses for knowledge.";
                    } else if (modifier === 4) {
                        tooltipMessage = "Highly knowledgeable, probably the smartest person many people know.";
                    } else {
                        tooltipMessage = "Famous as a sage and genius. Able to make Holmesian leaps of logic.";
                    }
                }else if (name === "Wisdom") {
                    if (modifier === -5) {
                        tooltipMessage = "Seemingly incapable of thought, barely aware.";
                    } else if (modifier === -4) {
                        tooltipMessage = "Rarely notices important or prominent items, people, or occurrences.";
                    } else if (modifier === -3) {
                        tooltipMessage = "Seemingly incapable of forethought.";
                    } else if (modifier === -2) {
                        tooltipMessage = "Often fails to exert common sense.";
                    } else if (modifier === -1) {
                        tooltipMessage = "Forgets or opts not to consider options before taking action.";
                    } else if (modifier === 0) {
                        tooltipMessage = "Makes reasoned decisions most of the time.";
                    } else if (modifier === 1) {
                        tooltipMessage = "Able to tell when a person is upset.";
                    } else if (modifier === 2) {
                        tooltipMessage = "Reads people and situations fairly well. Can get hunches about a situation that doesn’t feel right.";
                    } else if (modifier === 3) {
                        tooltipMessage = "Often used as a source of wisdom or decider of actions.";
                    } else if (modifier === 4) {
                        tooltipMessage = "Reads people and situations very well, almost unconsciously.";
                    } else {
                        tooltipMessage = "Nearly prescient, able to reason far beyond logic.";
                    }
                }else {
                    if (modifier === -5) {
                        tooltipMessage = "Barely conscious, probably acts very alien. May have a presence which repels other people.";
                    } else if (modifier === -4) {
                        tooltipMessage = "Minimal independent thought, relies heavily on others to think instead.";
                    } else if (modifier === -3) {
                        tooltipMessage = "Has trouble thinking of others as people and how to interact with them.";
                    } else if (modifier === -2) {
                        tooltipMessage = "Terribly reticent, uninteresting, or rude.";
                    } else if (modifier === -1) {
                        tooltipMessage = "Something of a bore, makes people mildly uncomfortable or simply clumsy in conversation.";
                    } else if (modifier === 0) {
                        tooltipMessage = "Capable of polite conversation.";
                    } else if (modifier === 1) {
                        tooltipMessage = "Able to tell when a person is upset.";
                    } else if (modifier === 2) {
                        tooltipMessage = "Mildly interesting. Knows what to say to the right people.";
                    } else if (modifier === 3) {
                        tooltipMessage = "Often popular or infamous. Knows what to say to most people and is very confident in debate.";
                    } else if (modifier === 4) {
                        tooltipMessage = "Quickly likeable, respected or feared by many people. May be very eloquent. Good at getting their will when talking to people.";
                    } else {
                        tooltipMessage = "Renowned for wit, personality, and/or looks. May be a natural born leader.";
                    }
                }

                //Sets the structure for the html.
                el.html(//We need the .parent() x3 in order to get into the correct scope.
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


        window.AddElement = function (title) {
            let el = $(`
                <attribute name="${title}" value="10">${title}</attribute>
            `);
            el.appendTo("#character-attributes");
            el.attr("disabled", "true");
            InitializeAttribute(0, el);
        }

        // Function that removes the option from the list.
        $("li").click(function () {
            $(this).hide();
        })

        $("attribute").each(InitializeAttribute);
    });

    
}( jQuery ));
