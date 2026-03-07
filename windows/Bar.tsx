import app from "ags/gtk4/app"
import { Astal } from "ags/gtk4"
import Gdk from "gi://Gdk?version=4.0"
import Gtk from "gi://Gtk?version=4.0"
import AstalHyprland from "gi://AstalHyprland?version=0.1"
import { createBinding, createState } from "gnim"
import { createPoll } from "ags/time"

const WindowTitle = () => {
    const hyprland = AstalHyprland.get_default()
    return (
        <label
            name="Title"
            label= {hyprland ? (createBinding(hyprland, "focusedClient").as((v) =>
                v.title.length > 50 ? v.title.slice(0, 47) + "..." : v.title,
            )) : "Placeholder"} // Bar doesn't start otherwise.
        />
    )
}

const Time = () => {
    const datetime = createPoll("", 1000, () => Temporal.Now.plainTimeISO())
    return <label label={datetime((c) => c.toString({smallestUnit:"second"}))}/>
}

const StartWidgets = () => {
    return <label label={"Start"} />
}
const CenterWidgets = () => {
    return <WindowTitle />
}
const EndWidgets = () => {
    return <Time />
}

export default (monitor: Gdk.Monitor) => {
    return (
        <window
            visible
            gdkmonitor={monitor}
            title={"Bar"}
            name="Bar"
            anchor={
                Astal.WindowAnchor.TOP |
                Astal.WindowAnchor.LEFT |
                Astal.WindowAnchor.RIGHT
            }
            exclusivity={Astal.Exclusivity.EXCLUSIVE}
            application={app}
        >
            <centerbox orientation={Gtk.Orientation.HORIZONTAL}>
                <StartWidgets $type="start" />
                <CenterWidgets $type="center" />
                <EndWidgets $type="end" />
            </centerbox>
        </window>
    )
}
