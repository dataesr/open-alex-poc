import Papa from "papaparse";

export default function export2Csv({ data, filename }) {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([Papa.unparse(data)], { type: 'text/csv' }));   
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
