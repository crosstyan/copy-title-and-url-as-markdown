import { escapeBrackets, copyToClipboardFromUrl } from "../util";
import { OptionsType } from "../options/Options";
import { formats, Format } from "../constant";

chrome.commands.onCommand.addListener((command) => {
  console.log("Command:", command);

  const queryInfo = {
    active: true,
    currentWindow: true,
  };

  chrome.tabs.query(queryInfo, function (tabs) {
    // All commands are like `copy_as_format_*` (*: 1 or 2 or 3)
    const formatIndex = command.slice(-1);
    console.log("format: ", formatIndex);

    const key = `optionalFormat${formatIndex}`;
    chrome.storage.local.get(
      {
        selected_format: formats[0],
        formats: formats,
        isDecoded: false,
      } as OptionsType,
      (options: OptionsType) => {
        const tab = tabs[0];
        copyToClipboardFromUrl(
          options[key],
          tab.title,
          tab.url,
          options.isDecoded
        );

        chrome.browserAction.setBadgeText({ text: formatIndex });
        setTimeout(() => {
          chrome.browserAction.setBadgeText({ text: "" });
        }, 1000);

        console.log("done!");
      }
    );
  });
});
