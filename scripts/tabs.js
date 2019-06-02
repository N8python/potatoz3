export default {
    props: ["tabs"],
    template: `
        <ul class="nav nav-tabs">
            <li v-for="tab in tabs" class="nav-item">
                <a class="nav-link" data-toggle="tab" :href="'#' + tab.href">{{tab.display}}</a>
            </li>
        </ul>
    `
}