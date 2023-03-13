import { Icon } from "@dataesr/react-dsfr";
import Papa from "papaparse";

export default function export2file({ data, type }) {
  let download, href;
  switch (type) {
    case 'csv':
      download = 'data.csv';
      href = URL.createObjectURL(new Blob([Papa.unparse(data)], { type: 'text/csv' }));
      break;
    default:
      type = 'json';
      download = 'data.json';
      href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
      break;
  }

  return (
    <div>
      <a
        download={download}
        href={href}
      >
        Export data to {type.toUpperCase()} file
      </a>
      &nbsp;
      <Icon name="ri-file-download-line" />
    </div>
  )
}
