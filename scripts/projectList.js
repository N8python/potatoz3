import project from "./project.js";
import localProxy from "./local-proxy.js";
export default {
    props: ["projects", "projectKey"],
    components: {
        project
    },
    created() {
        console.log(this.projects);
    },
    template: `
    <section id="projects" style="height: 500px; overflow-y: auto; padding-right: 16px;" :key="projectKey">
        <project v-for="project in projects" v-if="!project.complete && project.unlocked && allDone(project)" :title="project.title" :subtitle="project.subtitle" :description="project.description" :price-tag="project.priceTag" :cost="project.cost" :effect="project.effect" :complete="project.complete" :meta="project.name"></project>
    </section>
    `,
    methods: {
        allDone(project) {
            return project.from ? project.from.every(project => localProxy.data.projects[project].complete === true) : true;
        }
    }
}