chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

const extensions = "https://steamcommunity.com/market/";
const webstore = "https://twitter.com/";

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    const nextState = prevState === "ON" ? "OFF" : "ON";

    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });
    const files = ["index.js", "module1.js"];
    if (nextState === "ON") {
      await chrome.scripting
        .executeScript({
          target: { tabId: tab.id },
          files: [files],
        })
        .then(() => console.log("script injected"));
    } else if (nextState === "OFF") {
    }
  }
});
