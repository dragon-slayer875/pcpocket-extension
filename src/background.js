function addBookmarkWithTags(link, title = "", tags = "", icon_link = "") {
  return new Promise((resolve, reject) => {
    const bookmarkData = {
      title,
      link,
      tags,
      icon_link,
    };

    const params = new URLSearchParams();
    params.append("link", bookmarkData.link);

    if (title) {
      params.append("title", bookmarkData.title);
    }

    if (tags) {
      params.append("tags", bookmarkData.tags);
    }

    if (icon_link) {
      params.append("icon_link", bookmarkData.icon_link);
    }

    const deeplink = `pcpocket://bookmark?${params.toString()}`;

    chrome.tabs
      .query({ active: true, currentWindow: true })
      .then((tabs) => {
        if (tabs.length > 0) {
          chrome.tabs
            .update(tabs[0].id, { url: deeplink })
            .then(() => {
              resolve({
                bookmark: bookmarkData,
                deeplink: deeplink,
              });
            })
            .catch((error) => {
              console.error("Error updating tab:", error);
              reject(error);
            });
        } else {
          reject(new Error("No active tab found"));
        }
      })
      .catch(reject);
  });
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.action === "addBookmark") {
    addBookmarkWithTags(
      message.link,
      message.title,
      message.tags,
      message.icon_link,
    )
      .then((result) => sendResponse(result))
      .catch((error) => sendResponse({ error: error.message }));
    return true; // Required for async sendResponse
  }

  if (message.action === "getCurrentPageInfo") {
    chrome.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      if (tabs.length > 0) {
        sendResponse({
          url: tabs[0].url,
          title: tabs[0].title,
          icon: tabs[0].favIconUrl,
        });
      } else {
        sendResponse({ error: "No active tab found" });
      }
    });
    return true;
  }
});
