import { Astal } from "ags/gtk4"
import app from "ags/gtk4/app"
import { timeout } from "ags/time"
import AstalWp from "gi://AstalWp?version=0.1"
import { createState } from "gnim"

export default () => {
    const wp = AstalWp.get_default().get_default_speaker()

    const [visible, setVisible] = createState(false)
    const [volume, setVolume] = createState(wp.get_volume())

    let timer = timeout(2000, () => setVisible(false));
    timer.cancel();

    wp.connect("notify::volume", (v) => {
        setVolume(wp.get_volume())
        setVisible(true);
        timer.cancel()
        timer = timeout(2000, () => setVisible(false));
    })

    return (
        <window
            visible={visible}
            title={"VolumeOSD"}
            name="VolumeOSD"
            anchor={
                Astal.WindowAnchor.BOTTOM |
                Astal.WindowAnchor.LEFT |
                Astal.WindowAnchor.RIGHT
            }
            exclusivity={Astal.Exclusivity.IGNORE}
            application={app}
        >
            <label label={volume.as((v) => String(Math.ceil(v * 100)) + "%")} />
        </window>
    )
}
