chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

const steamcommunity = "https://steamcommunity.com/";

chrome.action.onClicked.addListener(async (tab) => {
  if (
    tab.url.startsWith(steamcommunity)
  
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
          files: [
            "./src/config.js",
            "./src/webCollect/APIs.js",
            "./src/webCollect/coletaIdNamePriceQuant.js",
            "./src/webCollect/coletaCotacoes.js",
            "./src/webCollect/book.js",
            "./src/dependencias.js",
            "./src/db.js",
            "./src/UI/telas.js",
            "./src/UI/UIFiltrados.js",
            "./src/trade/trading.js",
            "./src/trade/volume.js",
            "./src/trade/taxa.js",
            "./src/index.js"
          ]
        })
        .then(() => console.log("script injected"));
    } else if (nextState === "OFF") {
      // await chrome.scripting.removeCSS({
      //   files: ["focus-mode.css"],
      //   target: { tabId: tab.id },
      // });
      await chrome.scripting
      .executeScript({
        target: { tabId: tab.id },
        files: ["./off/off.js"],
      })
      .then(() => console.log("script injected"));
    }
  }
});
