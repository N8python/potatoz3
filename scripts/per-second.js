export default {
    props: ["resource", "display"],
    template: `<p>{{display}} per second: {{Number(perSecond.toFixed(2))}}</p>`,
    data() {
        return {
            perSecond: 0
        }
    },
    created() {
        let interval = 0;
        let oldAmount;
        let newAmount;
        this.countInterval = setInterval(() => {
            if (interval === 0) {
                oldAmount = this.resourceData().amount;
            } else if (interval % 2 === 0 && interval > 0) {
                if (!oldAmount) {
                    oldAmount = this.resourceData().amount;
                }
                newAmount = this.resourceData().amount;
                this.perSecond = newAmount - oldAmount;
            } else if (interval % 2 === 1 && interval > 0) {
                oldAmount = newAmount;
            }
            interval += 1;
        }, 500);

    },
    methods: {
        resourceData() {
            if (app.db !== undefined) {
                return app.db.resources[this.resource];
            }
            return {
                amount: 0
            }
        }
    }
}