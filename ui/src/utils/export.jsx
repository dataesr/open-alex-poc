import { Icon } from "@dataesr/react-dsfr";

export default function export2txt(dataToDL) {
    return (
        <div>
            <a
                download="data.txt"
                href={URL.createObjectURL(new Blob([JSON.stringify(dataToDL, null, 2)], {
                    type: "text/plain"
                }))}
            >
                Export data to json file
            </a>
            &nbsp;
            <Icon name="ri-file-download-line" />
        </div>
    )
}
