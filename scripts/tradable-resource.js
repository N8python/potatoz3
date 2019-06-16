import getProp from "./get-prop.js";
export default {
    props: ["resource"],
    template: `
        <div>
            <p>{{resource.name}}: {{Number(resource.amount.toFixed(2))}} <span v-if="!(resource.max===Infinity)">/ {{resource.max}}</span></p>
            <button class="btn btn-labeled btn-primary btn-sm" @click="convert">{{getMessage()}}</button>
            <p>{{getBoostMessage()}}</p>
        </div>
    `,
    methods: {
        convert() {
            let canBuy = true;
            for (const [key, value] of Object.entries(this.resource.from)) {
                if (app.db.resources[key].amount < value.amount) {
                    canBuy = false;
                }
            }
            if (canBuy) {
                if (this.resource.amount < this.resource.max) {
                    for (const key of Object.keys(this.resource.from)) {
                        const config = this.resource.from[key];
                        app.db.resources[key].amount -= config.amount;
                        if (typeof config.scale === "function") {
                            config.amount = config.scale(config.amount);
                        } else {
                            config.amount *= config.scale;
                        }
                        if (config.int) {
                            config.amount = Math.ceil(config.amount);
                        }
                    }
                    this.resource.amount += 1;
                }
            }
        },
        getMessage() {
            return this.resource.messageStr.replace(/\{\{([A-Za-z$_.]+)\}\}/g, (_, p1) => {
                console.log(p1);
                return getProp(this.resource.from, p1);
            });
        },
        getBoostMessage() {
            if (this.resource.boostStr) {
                return this.resource.boostStr.replace(/\{\{([A-Za-z$_.*]+)\}\}/g, (_, p1) => {
                    if (p1 === "**p") {
                        return this.resource.boost.potatoz.adds * this.resource.boost.potatoz.multiplier;
                    }
                    return getProp(this.resource.boost, p1);
                });
            }
            return "";
        }
    }
}