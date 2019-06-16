import getProp from "./get-prop.js";
export default {
    props: ["building"],
    data() {
        return {
            toActivate: 0,
            toDeactivate: 0
        }
    },
    template: `<div>
        <p>{{building.display}}: {{building.amount}} / {{building.max}}</p>
        <p>{{building.display}} active: {{building.active}}</p>
        <button class="btn btn-labeled btn-primary btn-sm" @click="purchase">{{buyStr}}</button>
        <button class="btn btn-labeled btn-primary btn-sm" @click="activate">Activate <input type="text" value="1"  style="width:40px" v-model="toActivate"> {{building.display}}</button>
        <button class="btn btn-labeled btn-primary btn-sm" @click="deactivate">Deactivate <input type="text" value="1" style="width:40px" v-model="toDeactivate"> {{building.display}}</button>
    </div>`,
    computed: {
        buyStr() {
            return this.building.buyStr.replace(/\{\{([A-Za-z$_.*]+)\}\}/g, (_, p1) => {
                return getProp(this.building.from, p1);
            });
        }
    },
    methods: {
        purchase() {
            const canBuy = Object.entries(this.building.from).every(([key, value]) => app.db.resources[key].amount >= value.amount);
            if (canBuy && this.building.amount < this.building.max) {
                Object.keys(this.building.from).forEach(key => {
                    const config = this.building.from[key];
                    app.db.resources[key].amount -= config.amount;
                    if (typeof config.scale === "function") {
                        config.amount = config.scale(config.amount);
                    } else {
                        config.amount *= config.scale;
                    }
                    if (config.int) {
                        config.amount = Math.ceil(config.amount);
                    }
                    this.building.amount += 1;
                });
            }
        },
        activate() {
            const toActivate = Number(this.toActivate);
            if (this.building.active + toActivate < this.building.amount) {
                this.building.active += toActivate;
            } else {
                this.building.active = this.building.amount;
            }
        },
        deactivate() {
            const toDeactivate = Number(this.toDeactivate);
            if (this.building.active - toDeactivate > 0) {
                this.building.active -= toDeactivate;
            } else {
                this.building.active = 0;
            }
        }
    }
}