import app from "ags/gtk4/app"
import style from "./style.scss"
import Bar from "./windows/Bar"
import VolumeOsd from "./windows/osd/VolumeOsd"

app.start({
    css: style,
    main() {
        app.get_monitors().map(Bar)
        VolumeOsd()
    },
})
