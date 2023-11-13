chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

const mozilla = "https://developer.mozilla.org/";
const steamcommunity = "https://steamcommunity.com/";
const steampowered = "https://store.steampowered.com/";
const twitter = "https://twitter.com/";
const github = "https://github.com/";

chrome.action.onClicked.addListener(async (tab) => {
  if (
    tab.url.startsWith(steamcommunity) ||
    tab.url.startsWith(twitter) ||
    tab.url.startsWith(github) ||
    tab.url.startsWith(steampowered) ||
    tab.url.startsWith(mozilla)
  ) {
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    const nextState = prevState === "ON" ? "OFF" : "ON";

    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });

    if (nextState === "ON") {
      await chrome.scripting
        .executeScript({
          target: { tabId: tab.id },
          files: ["./src/APIs.js","./src/db.js", "./src/module1.js","./src/dependencias.js", "./src/index.js"],
        })
        .then(() => console.log("script injected"));
    } else if (nextState === "OFF") {
      // await chrome.scripting.removeCSS({
      //   files: ["focus-mode.css"],
      //   target: { tabId: tab.id },
      // });
    }
  }
});
