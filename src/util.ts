export function escapeTabsAndNewLines(str: string) {
  return str.replace(/\n/g, "\\n").replace(/\t/g, "\\t");
}

export function unescapeTabsAndNewLines(str: string) {
  return str.replace(/\\n/g, "\n").replace(/\\t/g, "\t");
}

export function escapeBrackets(str: string) {
  return str
    .replace(/\(/g, escape)
    .replace(/\)/g, escape)
    .replace(/\[/g, escape)
    .replace(/\]/g, escape);
}

export function copyToClipboardFromUrl(
  template: string,
  title: string,
  url: string,
  isDecode = false
) {
  console.log("copyToClipboard", template, title, url);
  let escapedUrl = escapeBrackets(url);
  if (isDecode) {
    escapedUrl = decodeURI(escapedUrl);
  }
  const el = document.getElementById("dummy") as HTMLTextAreaElement;
  const textToCopy = template
    .replace("${title}", title)
    .replace("${url}", escapedUrl);

  el.value = textToCopy;
  el.select();
  document.execCommand("copy");

  console.log("Successfully copied to clipboard: " + textToCopy);
}

export function copyToClipboardAsHtml(title: string, url: string) {
  const isDecode = false;
  const template = '<a href="${url}">${title}</a>';
  console.log("copyToClipboard", template, title, url);
  let escapedUrl = escapeBrackets(url);

  if (isDecode) {
    escapedUrl = decodeURI(escapedUrl);
  }
  const textToCopy = template
    .replace("${title}", title)
    .replace("${url}", escapedUrl);

  // https://stackoverflow.com/questions/23934656/javascript-copy-rich-text-contents-to-clipboard
  function listener(e: ClipboardEvent) {
    e.clipboardData.setData("text/html", textToCopy);
    e.clipboardData.setData("text/plain", textToCopy);
    e.preventDefault();
  }
  document.addEventListener("copy", listener);
  document.execCommand("copy");
  document.removeEventListener("copy", listener);

  console.log("Successfully copied to clipboard: " + textToCopy);
}
