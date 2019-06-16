export default {
    props: ["resource"],
    template: `<button class="btn btn-labeled btn-primary btn-sm" @click="convertAll" v-if="resource.unlocked">{{resource.message}}</button>`,
    methods: {
        convertAll() {
            this.resource.to.forEach(toConvertTo => {
                const conversionRate = app.db.resources[toConvertTo].from[this.resource.name].amount;
                const toConvertAmount = app.db.resources[this.resource.name].amount / this.resource.to.length;
                app.db.resources[toConvertTo].amount += Math.ceil(toConvertAmount / conversionRate);
                app.db.resources[this.resource.name].amount -= toConvertAmount;
            });
            app.db.resources[this.resource.name].amount = 0;
        }
    }
}