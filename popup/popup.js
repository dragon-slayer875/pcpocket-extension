document.addEventListener("DOMContentLoaded", function() {
  const titleInput = document.getElementById("title");
  const urlInput = document.getElementById("url");
  const tagsInput = document.getElementById("tags");
  const saveButton = document.getElementById("save-button");
  const faviconImg = document.getElementById("favicon");
  const faviconUrlSpan = document.getElementById("favicon-url");

  browser.runtime
    .sendMessage({ action: "getCurrentPageInfo" })
    .then((response) => {
      if (response.error) {
        console.error(response.error);
        return;
      }

      titleInput.value = response.title;
      urlInput.value = response.url;

      const faviconUrl = response.icon;
      faviconImg.src = faviconUrl;
      faviconUrlSpan.textContent = faviconUrl;
    });

  // set focus on the URL input field
  urlInput.focus();

  saveButton.addEventListener("click", function() {
    const url = urlInput.value.trim();
    const title = titleInput.value.trim();
    const tagsText = tagsInput.value.trim();

    if (!url) {
      alert("URL is required!");
      return;
    }

    const tags = tagsText
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)
      .join(",");

    // Add bookmark with tags
    browser.runtime
      .sendMessage({
        action: "addBookmark",
        link: url,
        title: title,
        tags: tags,
        icon_link: faviconImg.src,
      })
      .then((response) => {
        if (response.error) {
          alert("Error: " + response.error);
          return;
        }
      });
  });
});
