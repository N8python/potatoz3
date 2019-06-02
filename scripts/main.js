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
        tradeResource
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
    for (const [_, resource] of Object.entries(app.db.resources)) {
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