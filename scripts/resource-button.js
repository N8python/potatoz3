export default {
    props: ["resource", "by"],
    template: `
        <button class="btn btn-labeled btn-primary btn-sm" @click="incrementResouce">
            <slot></slot>
        </button>
    `,
    computed: {
        inc() {
            return Number(this.by);
        },
        resourceData() {
            return app.db.resources[this.resource];
        }
    },
    methods: {
        incrementResouce() {
            if (this.resourceData.max >= this.resourceData.amount + this.inc) {
                return this.resourceData.amount += this.inc;
            }
            this.resourceData.amount = this.resourceData.max;
        }
    }

}