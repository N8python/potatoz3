import addMessage from "./add-message.js";
import localProxy from "./local-proxy.js";
export default {
    resources: {
        potatoz: {
            name: "Potatoz",
            amount: 0,
            max: 100,
            displayLeft: true,
            unlocked: true,
            int: true,
            id: 0
        },
        potatoMud: {
            name: "Potato Mud",
            amount: 0,
            max: 50,
            displayLeft: true,
            unlocked: false,
            int: true,
            from: {
                potatoz: {
                    amount: 20,
                    scale: 1,
                    int: true
                }
            },
            messageStr: "Mix {{potatoz.amount}} potatoz into potato mud",
            id: 1
        },
        patches: {
            name: "Patches",
            amount: 0,
            max: 10,
            displayLeft: false,
            unlocked: false,
            boost: {
                potatoz: {
                    adds: 1,
                    multiplier: 1
                }
            },
            from: {
                potatoz: {
                    amount: 20,
                    scale: 1.2,
                    int: true
                }
            },
            messageStr: "Buy a patch for {{potatoz.amount}} potatoz",
            boostStr: "Each patch produces {{**p}} potatoz per second.",
            id: 2
        },
        potatoHuts: {
            name: "Potato Huts",
            amount: 0,
            max: 10,
            displayLeft: false,
            unlocked: false,
            boost: {
                potatoz: {
                    addToMax: 100
                }
            },
            from: {
                potatoMud: {
                    amount: 10,
                    scale: 1.1,
                    int: true
                }
            },
            messageStr: "Buy a potato hut from {{potatoMud.amount}} potato mud",
            boostStr: "Each potato hut stores {{potatoz.addToMax}} potatoz.",
            id: 3
        },
        potatainers: {
            name: "Potatainers",
            amount: 0,
            max: 10,
            displayLeft: false,
            unlocked: false,
            boost: {
                potatoMud: {
                    addToMax: 30
                }
            },
            from: {
                potatoz: {
                    amount: 50,
                    scale: 1.3,
                    int: true
                },
                potatoMud: {
                    amount: 5,
                    scale: 1.05,
                    int: true
                }
            },
            messageStr: "Mold a potatainer for {{potatoz.amount}} potatoz, and {{potatoMud.amount}} potato mud.",
            boostStr: "Each potatainer stores {{potatoMud.addToMax}} potato mud.",
            id: 4
        },
        iq: {
            name: "IQ",
            amount: 20,
            max: 100,
            displayLeft: true,
            unlocked: false,
            boost: {
                thoughts: {
                    adds() {
                        const percentToConvert = document.querySelector(`[name="sliderthoughts"]`) ? Number(document.querySelector(`[name="sliderthoughts"]`).value) : 0;
                        const whatToKeep = (localProxy.data.resources.iq.amount ** 2 / 200) * (1 - percentToConvert / 100);
                        const whatToConvert = (localProxy.data.resources.iq.amount ** 2 / 200) - whatToKeep;
                        ["creativity", "ideas"].forEach(toConvertTo => {
                            const conversionRate = app.db.resources[toConvertTo].from["thoughts"].amount;
                            const toConvertAmount = whatToConvert / 2;
                            app.db.resources[toConvertTo].amount += Math.ceil(toConvertAmount / conversionRate);
                        });
                        return whatToKeep;
                    }
                }
            },
            from: {
                potatoz: {
                    amount: 10,
                    scale(amount) {
                        return amount ** 1.05;
                    },
                    int: true
                }
            },
            messageStr: "Increase IQ for {{potatoz.amount}} potatoz",
            id: 5
        },
        thoughts: {
            name: "Thoughts",
            amount: 0,
            max: Infinity,
            displayLeft: true,
            unlocked: false,
            id: 6
        },
        creativity: {
            name: "Creativity",
            amount: 0,
            max: Infinity,
            displayLeft: true,
            unlocked: false,
            from: {
                thoughts: {
                    amount: 5,
                    scale: 1,
                    int: true
                }
            },
            messageStr: `Convert {{thoughts.amount}} thoughts to creativity`,
            id: 7
        },
        ideas: {
            name: "Ideas",
            amount: 0,
            max: Infinity,
            displayLeft: true,
            unlocked: false,
            from: {
                thoughts: {
                    amount: 10,
                    scale: 1,
                    int: true
                }
            },
            messageStr: `Convert {{thoughts.amount}} thoughts to ideas`,
            id: 8
        },
        clay: {
            name: "Clay",
            amount: 0,
            max: 35,
            displayLeft: true,
            unlocked: false,
            from: {
                potatoMud: {
                    amount: 5,
                    scale: 1,
                    int: true
                }
            },
            messageStr: `Dry {{potatoMud.amount}} potato mud into clay`,
            id: 9
        },
        farms: {
            name: "Farms",
            amount: 1,
            max: 10,
            displayLeft: false,
            unlocked: false,
            from: {
                potatoz: {
                    amount: 5000,
                    scale: 1.5,
                    int: true
                }
            },
            boost: {
                potatoz: {
                    adds: 10e3,
                    multiplier: 1
                }
            },
            messageStr: `Grow {{potatoz.amount}} potatoz into a farm.`,
            boostStr: "Each farm produces {{**p}} potatoz per second.",
            id: 10
        }
    },
    convertAlls: {
        thoughts: {
            unlocked: false,
            to: [
                "creativity",
                "ideas"
            ],
            message: "Convert all thoughts to ideas and creativity.",
            name: "thoughts"
        }
    },
    tradeSliders: {
        thoughts: {
            unlocked: false,
            to: [
                "creativity",
                "ideas"
            ],
            message: "Percentage of thoughts auto-converted: ",
            name: "thoughts"
        }
    },
    tabs: [{
        href: "potatoz-production",
        display: "Potatoz Production"
    }],
    buildings: {
        compostBins: {
            unlocked: false,
            converts: {
                from: "potatoz",
                to: "potatoMud",
                amount: 1
            },
            amount: 0,
            active: 0,
            max: 25,
            name: "compostBins",
            display: "Compost Bins",
            from: {
                clay: {
                    amount: 15,
                    scale: 1.2,
                    int: true
                }
            },
            buyStr: "Buy a compost bin for {{clay.amount}} clay"
        }
    },
    projects: {
        patches: {
            title: "Patches",
            subtitle: "If you plant a potato in the ground, maybe another one will grow.",
            priceTag: "(30 potatoz)",
            description: "Patches become available, allowing you to automate potato production.",
            unlocked: true,
            complete: false,
            name: "patches",
            cost: {
                potatoz: 30
            },
            effect() {
                addMessage(`"This is a incremental game: harvest season is every second!" - Bonnie`, "quote", "info");
                app.db.resources.patches.unlocked = true;
                app.db.projects.potatainers.unlocked = true;
            }
        },
        potatoMud: {
            title: "Potato Mud",
            subtitle: "When cats try to make mashed potatoz, but everything goes wrong.",
            description: "So you can build things. Potatoz have low structural integrity.",
            priceTag: "(20 potatoz)",
            unlocked: true,
            complete: false,
            name: "potatoMud",
            cost: {
                potatoz: 20
            },
            effect() {
                addMessage(`"COMPOST!" - Bonnie`, "quote", "info");
                app.db.resources.potatoMud.unlocked = true;
                app.db.projects.potatoHut.unlocked = true;
            }
        },
        potatoHut: {
            title: "Potato Hut",
            subtitle: "Build a hut out of mud, for potatoz to live in.",
            description: "Each potato hut stores 100 potatoz.",
            priceTag: "(3 potato mud)",
            unlocked: false,
            complete: false,
            name: "potatoHut",
            cost: {
                potatoMud: 3
            },
            effect() {
                addMessage(`"It's better than living in the basement!" - Bonnie`, "quote", "info");
                app.db.resources.potatoHuts.unlocked = true;
            }
        },
        potatainers: {
            title: "Potatainers",
            subtitle: "Pack mud into potato husks.",
            description: "Potatainers store 30 potato mud in a single potato!",
            priceTag: "(150 potatoz, 5 potato mud)",
            unlocked: false,
            complete: false,
            name: "potatainers",
            cost: {
                potatoz: 100,
                potatoMud: 5
            },
            effect() {
                addMessage(`"Life is husk." - Potatrest`, "quote", "info");
                app.db.resources.potatainers.unlocked = true;
            }
        },
        selfAwareness: {
            title: "Self Awareness",
            subtitle: `Hey - I'm a cat!`,
            description: "Self-awareness allows you to contemplate more advanced ideas.",
            priceTag: "(500 potatoz, 7 potato mud)",
            unlocked: true,
            complete: false,
            name: "selfAwareness",
            from: [
                "potatoHut",
                "potatainers"
            ],
            cost: {
                potatoz: 500,
                potatoMud: 7
            },
            effect() {
                addMessage(`"Just me, myself, and potatoz." - Bonnie`, "quote", "info");
                addMessage(`Brain unlocked. You can know utilize thoughts.`);
                addMessage(`Thoughts are generated by IQ. Increase your IQ to generate more thoughts.`)
                app.db.tabs.push({
                    href: "brain",
                    display: "Brain"
                });
                app.db.resources.iq.unlocked = true;
                app.db.resources.thoughts.unlocked = true;
                app.db.projects.expandYourYard.unlocked = true;
                app.db.projects.ceramics.unlocked = true;
                app.db.projects.fertileGround.unlocked = true;
            }
        },
        expandYourYard: {
            title: "Expand your Yard",
            subtitle: "Walk two feet further, get scared, and run away.",
            description: "An expanded yard allows you to increase your patch max by 20.",
            priceTag: "(100 potatoz, 30 thoughts)",
            unlocked: false,
            complete: false,
            name: "expandYourYard",
            cost: {
                potatoz: 100,
                thoughts: 30
            },
            effect() {
                addMessage(`"I came, I saw, I potentially ran away from an angry chipmunk, and I conquered." - Bonnie`, "quote", "info");
                app.db.resources.patches.max += 20;
            }
        },
        ceramics: {
            title: "Ceramics",
            subtitle: "Throw some mud in the oven... and pray something happens!",
            description: "Potato mud costs 1/2 of what it used to, and your potato hut maximum increases by 25.",
            priceTag: "(150 potatoz, 5 potato mud, 50 thoughts)",
            unlocked: false,
            complete: false,
            name: "ceramics",
            cost: {
                potatoz: 150,
                potatoMud: 5,
                thoughts: 50
            },
            effect() {
                addMessage(`"Wingardium potatosa! I turn you into a potato!" - Potato Potter`, "quote", "info");
                app.db.resources.potatoMud.from.potatoz.amount /= 2;
                app.db.resources.potatoHuts.max += 25;
            }
        },
        fertileGround: {
            title: "Fertile Ground",
            subtitle: "Don't grow potatoes on the driveway.",
            description: "Patches produce 50% more potatoz now that you know to plant potatoz in dirt.",
            priceTag: "(300 potatoz, 5 potato mud, 25 thoughts)",
            unlocked: false,
            complete: false,
            name: "fertileGround",
            cost: {
                potatoz: 300,
                potatoMud: 5,
                thoughts: 25
            },
            effect() {
                addMessage(`"Do what you can, with what you have, where you are." - Theodore Potatovelt`, "quote", "info");
                app.db.resources.patches.boost.potatoz.multiplier *= 1.5;
            }
        },
        creativity: {
            title: "Creativity",
            subtitle: "Better ways to solve harder problems.",
            description: "Thoughts can now be turned into creativity, which can solve more advanced problems.",
            priceTag: "(750 potatoz, 10 potato mud, 150 thoughts)",
            unlocked: true,
            complete: false,
            name: "creativity",
            from: [
                "expandYourYard",
                "ceramics",
                "fertileGround"
            ],
            cost: {
                potatoz: 750,
                potatoMud: 10,
                thoughts: 150
            },
            effect() {
                addMessage(`"The creative adult is the child that ate potatoz." - Ursula Potatoguin`, "quote", "info");
                app.db.resources.creativity.unlocked = true;
            }
        },
        ideas: {
            title: "Ideas",
            subtitle: "Formulate thoughts into innovations.",
            description: "Thoughts can now be turned into ideas, which, along with creativity, will allow you to solve great challenges.",
            priceTag: "(1000 potatoz, 7 potato mud, 175 thoughts)",
            name: "ideas",
            unlocked: true,
            complete: false,
            from: [
                "expandYourYard",
                "ceramics",
                "fertileGround"
            ],
            cost: {
                potatoz: 1000,
                potatoMud: 7,
                thoughts: 175
            },
            effect() {
                addMessage(`"Every potato begins with an idea. Except those that grow from the ground." - Earl Potatogale`, "quote", "info");
                app.db.resources.ideas.unlocked = true;
            }
        },
        wateringCans: {
            title: "Watering Cans",
            subtitle: "The start of agriculture!",
            description: "With water, patches are 75% more effective. In addition, they cost less.",
            priceTag: "(400 potatoz, 8 potato mud, 2 creativity, 1 idea)",
            name: "wateringCans",
            unlocked: true,
            complete: false,
            from: [
                "creativity",
                "ideas"
            ],
            cost: {
                potatoz: 400,
                potatoMud: 8,
                creativity: 2,
                ideas: 1
            },
            effect() {
                addMessage(`"Now I can have a garden of healthy potato patches." - Beeba`, "quote", "info");
                app.db.resources.patches.boost.potatoz.multiplier *= 1.75;
                app.db.resources.patches.from.potatoz.amount /= 5;
            }
        },
        twoRoomHuts: {
            title: "Two Room Huts",
            subtitle: "We're really living it up now.",
            description: "Potato huts cost 50% more, but store three times the potatoz.",
            priceTag: "(15 potato mud, 5 creativity, 3 ideas)",
            name: "twoRoomHuts",
            unlocked: true,
            complete: false,
            from: [
                "creativity",
                "ideas"
            ],
            cost: {
                potatoMud: 15,
                creativity: 5,
                ideas: 3
            },
            effect() {
                addMessage(`"The second room isn't actually to store potatoz. It's for my collection of cat sweaters." - Bonnie`, "quote", "info");
                app.db.resources.potatoHuts.from.potatoMud.amount *= 1.5;
                app.db.resources.potatoHuts.boost.potatoz.addToMax *= 3;
            }
        },
        varyingThoughts: {
            title: "Varying Thoughts",
            subtitle: "Not all thoughts are created equal.",
            description: "The rates of conversion between thoughts and creativity and ideas now vary.",
            priceTag: "(20 creativity, 5 ideas)",
            unlocked: true,
            complete: false,
            name: "varyingThoughts",
            from: [
                "creativity",
                "ideas"
            ],
            cost: {
                creativity: 20,
                ideas: 5
            },
            effect() {
                addMessage(`"Some variation is good in life. Now I can wonder, should I lick my head or my foot?" - Beeba`, "quote", "info");
                app.db.varyingThoughts = true;
            }
        },
        worms: {
            title: "Worms",
            subtitle: "Worms don't just eat apples. They actually help to produce fertile, useful, mud.",
            description: "Enhanced potato mud allows patches to flourish. All patches produce 250% more potatoz.",
            priceTag: "(30 creativity, 25 ideas, 20 potato mud)",
            unlocked: true,
            complete: false,
            name: "worms",
            from: [
                "wateringCans",
                "varyingThoughts"
            ],
            cost: {
                creativity: 30,
                ideas: 25,
                potatoMud: 20
            },
            effect() {
                addMessage(`"Now we just put duct tape on the worms... Ha." - Bonnie`, "quote", "info");
                app.db.resources.patches.boost.potatoz.multiplier *= 3.5;
            }
        },
        primitiveMath: {
            title: "Primitive Math",
            subtitle: "2 + 2 = potato",
            description: "An advanced understanding of numbers gives great power to your mind. Your IQ increases by 5.",
            priceTag: "(35 creativity, 10 ideas, 100 thoughts)",
            unlocked: true,
            complete: false,
            name: "primitiveMath",
            from: [
                "varyingThoughts"
            ],
            cost: {
                creativity: 35,
                ideas: 10,
                thoughts: 100
            },
            effect() {
                addMessage(`"When will I ever need this?" - Bonnie`, "quote", "info");
                app.db.resources.iq.amount += 5;
                app.db.resources.iq.max += 5;
            }
        },
        conquerBackyard: {
            title: "Conquer The Backyard",
            subtitle: "You're smart enough. Ready enough. And you're hoping that you don't run in to angry chimpmunks.",
            description: "You expand into the backyard. Your owner calls animal control as you set up a new potato colony, All maximums that are land related increase by 20.",
            priceTag: "(1000 potatoz, 35 potato mud, 10 creativity, 5 ideas)",
            unlocked: true,
            complete: false,
            name: "conquerBackyard",
            from: [
                "twoRoomHuts",
                "varyingThoughts"
            ],
            cost: {
                potatoz: 1000,
                potatoMud: 35,
                creativity: 10,
                ideas: 5
            },
            effect() {
                addMessage(`"Back, back, ye fowl chimpmunks!" - Bonnie`, "quote", "info");
                app.db.resources.patches.max += 20;
                app.db.resources.potatoHuts.max += 20;
            }
        },
        clay: {
            title: "Clay",
            subtitle: "I have a little potato. I made it out of clay. And when it is dry and ready, with the multiverse I'll play.",
            description: "Potato Mud can now be dried into clay.",
            priceTag: "(500 potatoz, 60 potato mud, 10 ideas)",
            from: [
                "worms",
                "twoRoomHuts"
            ],
            complete: false,
            unlocked: true,
            name: "clay",
            cost: {
                potatoz: 500,
                potatoMud: 60,
                ideas: 10
            },
            effect() {
                addMessage(`"With the multiverse we'll play." - ???`, "quote", "info");
                app.db.tabs.push({
                    href: "advanced-resources",
                    display: "Advanced Resources"
                });
                app.db.resources.clay.unlocked = true;
            }
        },
        selfReflection: {
            title: "Self Reflection",
            subtitle: "What have I done wrong. What can I do better?",
            description: "With the press of a button, all your thoughts can now be converted to ideas and creativity.",
            priceTag: "(30 ideas, 15 creativity)",
            from: [
                "primitiveMath"
            ],
            complete: false,
            unlocked: true,
            name: "selfReflection",
            cost: {
                ideas: 30,
                creativity: 15
            },
            effect() {
                addMessage(`"I should have made more potatoz." - Beeba`, "quote", "info");
                app.db.convertAlls.thoughts.unlocked = true;
            }
        },
        industryPatches: {
            title: "Industry Patches",
            subtitle: "Patches are now production-level quality.",
            description: "Patch production increases 500%.",
            priceTag: "(100 ideas, 75 creativity, 5K potatoz)",
            from: [
                "wateringCans",
                "clay"
            ],
            complete: false,
            unlocked: true,
            name: "industryPatches",
            cost: {
                ideas: 100,
                creativity: 75,
                potatoz: 5000
            },
            effect() {
                addMessage(`"I... cough... cough... am very... cough... about all the new ... cough ... smokestacks that we installed." - Bonnie`, "quote", "info");
                app.db.resources.patches.boost.potatoz.multiplier *= 5;
            }
        },
        recruitBeeba: {
            title: "Recruit Beeba",
            subtitle: "Your next door neighbor's cat, Beeba, joins the potato cause.",
            description: "Thought production doubles.",
            priceTag: "(250 ideas, 100 creativity)",
            from: [
                "selfReflection"
            ],
            complete: false,
            unlocked: true,
            name: "recruitBeeba",
            cost: {
                ideas: 250,
                creativity: 100
            },
            effect() {
                addMessage(`"Two brains are better than one." - Beeba`, "quote", "info");
                app.db.resources.iq.amount *= 2;
                app.db.resources.iq.max *= 2;
            }
        },
        productiveThinking: {
            title: "Productive Thinking",
            subtitle: "Think about important things, like this video game.",
            description: "You can now, via a slider, control how many thoughts generated per second are auto-converted to ideas and creativity.",
            priceTag: "(1000 creativity, 500 ideas)",
            from: [
                "recruitBeeba"
            ],
            complete: false,
            unlocked: true,
            name: "productiveThinking",
            cost: {
                creativity: 1000,
                ideas: 500
            },
            effect() {
                addMessage("The slider in the brain section causes the thoughts that IQ produces to be instantly turned into creativity and ideas.");
                addMessage("You can select a percentage of the thoughts generated each second to be converted.");
                app.db.tradeSliders.thoughts.unlocked = true;
            }
        },
        compostBins: {
            title: "Compost Bins",
            subtitle: "We put unspeakaple things in, fertilizer comes out.",
            description: "You can now construct compost bins from clay, which auto-transfom potatoz to potato mud.",
            priceTag: "(1K creativity, 500 ideas, 15 potato mud)",
            complete: false,
            unlocked: true,
            from: [
                "worms",
                "clay"
            ],
            name: "compostBins",
            cost: {
                creativity: 1000,
                ideas: 500,
                potatoMud: 15
            },
            effect() {
                addMessage(`The buildings tab is now available. You can construct compost bins there.`);
                app.db.tabs.push({
                    href: "buildings",
                    display: "Buildings"
                });
                app.db.buildings.compostBins.unlocked = true;
            }
        },
        potatoBoxes: {
            title: "Potato Boxes",
            subtitle: "Potatoz, in boxes, in huts, in the backyard. How cute!",
            description: "Potato huts are 1000% more effective.",
            priceTag: "(2K creativity, 1K ideas, 300 potato mud)",
            complete: false,
            unlocked: true,
            name: "potatoBoxes",
            from: [
                "compostBins",
                "productiveThinking"
            ],
            cost: {
                creativity: 2000,
                ideas: 1000,
                potatoMud: 300
            },
            effect() {
                addMessage(`"We store potatoz, thousands upon millions of potatoz! And we still don't have a formal permit from the government..." - Beeba`, "quote", "info");
                app.db.resources.potatoHuts.boost.potatoz.addToMax *= 10;
            }
        },
        conquerTheHouse: {
            title: "Conquer The House",
            subtitle: "Hiss your owner out of their dwelling.",
            description: "Your potatainer max increases by 40.",
            priceTag: "(3K creativity, 1.5K ideas, 100 potato mud, 10K potatoz)",
            complete: false,
            unlocked: true,
            name: "conquerTheHouse",
            from: [
                "compostBins"
            ],
            cost: {
                creativity: 4000,
                ideas: 1500,
                potatoMud: 100,
                potatoz: 10e3
            },
            effect() {
                addMessage(`"I always thought I'd lose the house by mortgage. Not by... insane cats throwing potatoz at me." - Your Owner`, "quote", "info");
                app.db.resources.potatainers.max += 40;
            }
        },
        farms: {
            title: "Farms",
            subtitle: "We're better together.",
            description: "All patches become a single farm, producing 10K potatoz per second.",
            priceTag: "(5K creativity, 3K ideas, 250 potato mud, 25K potatoz)",
            complete: false,
            unlocked: true,
            name: "farms",
            from: [
                "conquerTheHouse",
                "compostBins"
            ],
            cost: {
                creativity: 5000,
                ideas: 3000,
                potatoMud: 250,
                potatoz: 25e3
            },
            effect() {
                addMessage(`"I finally got the permit from the government! We cats are now 'producing potatoz until further notice'!" - Beeba`, "quote", "info");
                app.db.resources.farms.unlocked = true;
                app.db.resources.patches.unlocked = false;
            }
        },
        potatoCabins: {
            title: "Potato Cabins",
            subtitle: "A log cabin in the woods. And there, Potatoham Lincoln was born.",
            description: "All potato huts are upgraded to potato cabins, with each potato cabin storing 10K potatoz.",
            priceTag: "(4K creativity, 2K ideas, 500 potato mud, 50K potatoz)",
            name: "potatoCabins",
            from: [
                "productiveThinking",
                "compostBins"
            ],
            complete: false,
            unlocked: true,
            cost: {
                creativity: 4000,
                ideas: 2000,
                potatoMud: 500,
                potatoz: 50e3
            },
            effect() {
                addMessage(`"The cabin looks SHINY...." - Beeba`, "quote", "info");
                app.db.resources.potatoHuts.name = "Potato Cabins";
                app.db.resources.potatoHuts.boost.potatoz.addToMax = 10e3;
            }
        }
    },
    projectKey: Math.random(),
    varyingThoughts: false
}