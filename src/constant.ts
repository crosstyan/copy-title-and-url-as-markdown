export type Format = {
  template: string;
  name: string;
};

// markdown style
const MARKDOWN_FORMAT = "[${title}](${url})";
const ADOC_FORMAT = "${url}[${title}]";
const ORG_MODE_FORMAT = "[[${title}][${url}]]";

export const formats: Format[] = [
  {
    template: MARKDOWN_FORMAT,
    name: "Markdown",
  },
  {
    template: ADOC_FORMAT,
    name: "AsciiDoc",
  },
  {
    template: ORG_MODE_FORMAT,
    name: "Org Mode",
  },
  {
    template: "`${title} <${url}>`_",
    name: "reStructuredText",
  },
  {
    template: "\\href{${url}}{${title}}",
    name: "LaTeX",
  },
];
