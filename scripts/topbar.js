import defaultData from "./default-data.js";

export default {
    template: `<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Potatoz <br> <h6 style="font-size: x-small;">You're a cat, producing potatoz!</h6></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-item" style="border-left: 1px solid #ccc; border-right: 1px solid #ccc;">
                <a class="nav-link text-center" href="mailto:?subject=Play%20This%20Game&body=Check%20out%20this%20cool%20game%20I%20found%20at%20potatoz.net">
                    <ion-icon name="mail"></ion-icon><br>Tell a friend
                </a>
            </li>
            <li class="nav-item active" style="border-right: 1px solid #ccc;">
                <a @click="reset" class="nav-link text-center text-danger" href="#">
                    <ion-icon name="refresh"></ion-icon><br>Reset</a>
            </li>
        </ul>
    </div>
</nav>`,
    methods: {
        reset() {
            app.db = defaultData;
        }
    }
};