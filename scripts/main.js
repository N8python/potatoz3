import topbar from "./topbar.js";
import consoleTemplate from "./console.js";
import resourceTab from "./resource-tab.js";
import tabs from "./tabs.js";
import incResourceButton from "./resource-button.js";
import localProxy from "./local-proxy.js";
import defaultData from "./default-data.js";
import perSecond from "./per-second.js";
import projectList from "./projectList.js";
import tradeResource from "./tradable-resource.js";
import addProps from "./add-props.js";
import tradeAll from "./trade-all.js";
import tradeSlider from "./trade-slider.js";
import building from "./building.js";
if (!localProxy.data) {
    localProxy.data = defaultData;
}
const dataToAdd = {...localProxy.data };
addProps(dataToAdd, defaultData);
window.app = new Vue({
    el: '#app',
    components: {
        topbar,
        console: consoleTemplate,
        resourceTab,
        tabs,
        incResourceButton,
        perSecond,
        projectList,
        tradeResource,
        tradeAll,
        tradeSlider,
        building
    },
    data: {
        db: dataToAdd
    }
});

setInterval(() => {
    localProxy.data = app.db;
    app.db.projectKey = Math.random();
}, 500);

const resourceInterval = setInterval(() => {
    for (const [_, building] of Object.entries(app.db.buildings)) {
        if (building.int) {
            building.amount = Math.floor(building.amount);
        }
        if (building.unlocked) {
            if (building.boost) {
                for (const [key, value] of Object.entries(building.boost)) {
                    if (!value.max) {
                        const toAdd = (typeof value.adds === "function") ? value.adds() : value.adds * value.multiplier * building.amount;
                        const resourceToAddTo = app.db.resources[key];
                        if (resourceToAddTo) {
                            if (resourceToAddTo.amount + toAdd < resourceToAddTo.max) {
                                resourceToAddTo.amount += toAdd;
                            } else if (toAdd > 0) {
                                resourceToAddTo.amount = resourceToAddTo.max;
                            }
                        }
                    }
                }
            }
            if (building.converts) {
                const {
                    to,
                    from,
                    amount
                } = building.converts;
                const conversionRate = app.db.resources[to].from[from].amount;
                const toConvert = conversionRate * amount * building.active;
                app.db.resources[from].amount -= toConvert;
                if (app.db.resources[to].amount + toConvert / conversionRate < app.db.resources[to].max) {
                    app.db.resources[to].amount += toConvert / conversionRate;
                } else {
                    app.db.resources[to].amount = app.db.resources[to].max;
                }
            }
        }
    }
    for (const [_, resource] of Object.entries(app.db.resources)) {
        if (resource.int) {
            resource.amount = Math.floor(resource.amount);
        }
        if (resource.boost && resource.unlocked) {
            for (const [key, value] of Object.entries(resource.boost)) {
                if (!value.max) {
                    const toAdd = (typeof value.adds === "function") ? value.adds() : value.adds * value.multiplier * resource.amount;
                    const resourceToAddTo = app.db.resources[key];
                    if (resourceToAddTo) {
                        if (resourceToAddTo.amount + toAdd < resourceToAddTo.max) {
                            resourceToAddTo.amount += toAdd;
                        } else if (toAdd > 0) {
                            resourceToAddTo.amount = resourceToAddTo.max;
                        }
                    }
                }
            }
        }
    }
    const resrc = app.db.resources;
    resrc.potatoMud.max = 50 + resrc.potatainers.amount * resrc.potatainers.boost.potatoMud.addToMax;
    if (app.db.varyingThoughts) {
        resrc.creativity.from.thoughts.amount = Math.ceil(Math.random() * 6);
        resrc.ideas.from.thoughts.amount = Math.ceil(Math.random() * 10);
    }
}, 1000);

const maxInterval = setInterval(() => {
    const resrc = app.db.resources;
    resrc.potatoz.max = 100 + resrc.potatoHuts.amount * resrc.potatoHuts.boost.potatoz.addToMax;
}, 500);