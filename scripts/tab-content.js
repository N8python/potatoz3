export default {
    props: ["content"],
    template: `
    <div class="tab-content">
        <div v-for="con in content" class="tab-pane fade" :id="con.name">
            {{con.content}}
        </div>
    </div>
    `
}