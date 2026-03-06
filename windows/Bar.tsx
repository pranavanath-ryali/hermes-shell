import app from "ags/gtk4/app"
import { Astal } from "ags/gtk4"
import Gdk from "gi://Gdk?version=4.0"
import Gtk from "gi://Gtk?version=4.0"
import AstalHyprland from "gi://AstalHyprland?version=0.1"
import { createBinding, createState } from "gnim"

const WindowTitle = () => {
    const hyprland = AstalHyprland.get_default()
    return (
        <label
            label={createBinding(hyprland, "focusedClient").as((v) =>
                v.title.length > 50 ? v.title.slice(0, 47) + "..." : v.title,
            )}
        />
    )
}

const StartWidgets = () => {
    return <label label={"Start"} />
}
const CenterWidgets = () => {
    return <WindowTitle />
}
const EndWidgets = () => {
    return <label label={"End"} />
}

export default (monitor: Gdk.Monitor) => {
    return (
        <window
            visible
            gdkmonitor={monitor}
            title={"Bar"}
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
