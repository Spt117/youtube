import { YtFormat } from "youtube-dl-exec";
import { useMyContext } from "../context/Context";
import { TIds } from "../library/type";

export default function FormatItem({ format, id }: { format: YtFormat; id: keyof TIds }) {
    const { setIds, ids } = useMyContext();
    const { format_id, filesize } = format;

    const sizeInMB = (filesize / (1024 * 1024)).toFixed(2);

    return (
        <div>
            <input id={id} type="radio" name={id} value={format_id} checked={ids[id] === format_id} onChange={() => setIds({ ...ids, [id]: format_id })} />
            <label htmlFor={id}>
                {format.format_id} - {format.format_note} - {sizeInMB} Mo - {id === "idAudio" ? format.acodec : format.vcodec}
            </label>
        </div>
    );
}
