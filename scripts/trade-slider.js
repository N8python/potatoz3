export default {
    props: ["resource"],
    data() {
        return {
            percent: 0
        }
    },
    template: `
        <div v-if="resource.unlocked">
            <p>{{resource.message}} {{percent}}%</p>
            <input :name="'slider' + resource.name" type="range" min="0" max="100" value="0" @change="changePercent">
        </div>
    `,
    methods: {
        changePercent() {
            this.percent = document.querySelector(`[name="slider${this.resource.name}"]`).value;
        }
    }
}