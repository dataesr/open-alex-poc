import { Icon } from "@dataesr/react-dsfr";
import Papa from "papaparse";

export default function export2file({ data, filename, type }) {
  let href;
  switch (type) {
    case 'csv':
      href = URL.createObjectURL(new Blob([Papa.unparse(data)], { type: 'text/csv' }));
      break;
    default:
      type = 'json';
      href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
      break;
  }

  return (
    <div>
      <a
        download={filename}
        href={href}
      >
        Export data to {type.toUpperCase()} file
      </a>
      &nbsp;
      <Icon name="ri-file-download-line" />
    </div>
  )
}
