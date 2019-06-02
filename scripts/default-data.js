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
            id: 0
        },
        potatoMud: {
            name: "Potato Mud",
            amount: 0,
            max: 50,
            displayLeft: true,
            unlocked: false,
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
                    multiplier: 1,
                    get perSec() {
                        if (app.db) {
                            const self = app.db.resources.patches.boost.potatoz;
                            return self.adds * self.multiplier;
                        }
                        return 0;
                    }
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
                        return localProxy.data.resources.iq.amount ** 2 / 200;
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
        }
    },
    tabs: [{
        href: "potatoz-production",
        display: "Potatoz Production"
    }, {
        href: "projects",
        display: "Projects"
    }],
    projects: {
        patches: {
            title: "Patches",
            subtitle: "If you plant a potato in the ground, maybe another one will grow.",
            priceTag: "(100 potatoz)",
            description: "Patches become available, allowing you to automate potato production.",
            unlocked: true,
            complete: false,
            name: "patches",
            cost: {
                potatoz: 100
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
            priceTag: "(80 potatoz)",
            unlocked: true,
            complete: false,
            name: "potatoMud",
            cost: {
                potatoz: 80
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
            priceTag: "(15 potato mud)",
            unlocked: false,
            complete: false,
            name: "potatoHut",
            cost: {
                potatoMud: 15
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
            priceTag: "(300 potatoz, 20 potato mud)",
            unlocked: false,
            complete: false,
            name: "potatainers",
            cost: {
                potatoz: 300,
                potatoMud: 20
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
            priceTag: "(500 potatoz, 30 potato mud)",
            unlocked: true,
            complete: false,
            name: "selfAwareness",
            from: [
                "potatoHut",
                "potatainers"
            ],
            cost: {
                potatoz: 500,
                potatoMud: 30
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
            priceTag: "(150 potatoz, 15 potato mud, 50 thoughts)",
            unlocked: false,
            complete: false,
            name: "ceramics",
            cost: {
                potatoz: 150,
                potatoMud: 15,
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
            priceTag: "(750 potatoz, 30 potato mud, 150 thoughts)",
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
                potatoMud: 30,
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
            priceTag: "(1000 potatoz, 20 potato mud, 175 thoughts)",
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
                potatoMud: 20,
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
            priceTag: "(400 potatoz, 15 potato mud, 2 creativity, 1 idea)",
            name: "wateringCans",
            unlocked: true,
            complete: false,
            from: [
                "creativity",
                "ideas"
            ],
            cost: {
                potatoz: 400,
                potatoMud: 15,
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
            priceTag: "(60 potato mud, 5 creativity, 3 ideas)",
            name: "twoRoomHuts",
            unlocked: true,
            complete: false,
            from: [
                "creativity",
                "ideas"
            ],
            cost: {
                potatoMud: 60,
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
        }
    },
    projectKey: Math.random(),
    varyingThoughts: false
}