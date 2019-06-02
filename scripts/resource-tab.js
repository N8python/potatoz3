export default {
    props: ["resources"],
    created() {
        console.log(this.resources);
    },
    template: `
    <div class="w3-padding">
        <p v-for="resource in resources" v-if="resource.displayLeft" :key="resource.id">
            <span v-if="resource.unlocked">{{resource.name}}: {{Number(resource.amount.toFixed(2))}} <span v-if="!(resource.max===Infinity)">/ {{resource.max}}</span></span>
        </p>
    </div>
    `
}