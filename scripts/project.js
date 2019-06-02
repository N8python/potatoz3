export default {
    props: ["title",
        "subtitle",
        "price-tag",
        "description",
        "cost",
        "effect",
        "complete",
        "meta"
    ],
    template: `
    <div class="card" style="margin-bottom: .5em; cursor: pointer;">
    <div class="card-body" @click="handleClick">
        <h5 class="card-title">{{title}}</h5>
        <h4 class="card-subtitle mb-2 text-muted" style="font-size: smaller">{{priceTag}}</h4>
            <blockquote class="blockquote text-center mb-0" style="font-size: small; background-color: lightgray;">
            <p class="mb-0">{{subtitle}}</p>
        </blockquote>
        <div class="card-text">{{description}}</div>
    </div>
    </div>
    `,
    methods: {
        handleClick() {
            let canBuy = true;
            for (const [key, value] of Object.entries(this.cost)) {
                if (app.db.resources[key].amount < value) {
                    canBuy = false;
                }
            }
            if (canBuy) {
                for (const [key, value] of Object.entries(this.cost)) {
                    app.db.resources[key].amount -= value;
                }
                this.effect();
                app.db.projects[this.meta].complete = true;
            }
        }
    }
}