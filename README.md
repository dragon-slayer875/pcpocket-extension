# PcPocket Browser Extension

Companion extension for the PcPocket app that allows bookmarks to be to the PcPocket database by sending tab information to the app using deeplinks.

## Features

- **Add bookmarks to PcPocket**  
  Quickly edit and/or send the current tab information to the PcPocket app using a deeplink-powered integration to add it as a bookmark.

- **Keyboard Shortcut**  
  Open or close the extension using a customizable keyboard shortcut.
  - **Default Shortcut**: `Ctrl + Alt + B` (Configurable in addon settings)

## How It Works

1. Install the extension in your browser.
2. Use the keyboard shortcut (or click the extension icon) to open it.
3. Click "Save bookmark" to transmit the current tab’s information to the app via a deeplink.

## Deeplink Format

The extension uses a custom PcPocket deeplink to send data:

```
pcpocket://bookmark?link={tabUrl}&title={tabTitle}&tags={tabTags}&icon_link={tabFavicon}
```

> [!IMPORTANT]
> The PcPocket app must be installed and configured to handle this custom URL scheme.

## Installation

1. Download the extension from the [releases](https://github.com/dragon-slayer875/pcpocket-extension/releases) page.
2. Pin the extension for easy access (optional).

## Requirements

- PcPocket app installed and set up to accept deeplinks.
- A modern web browser (Chrome, Firefox, Edge, etc.)

## Contribution

Contributions, issues, and feature requests are welcome!  
Feel free to check out the [issues page](https://github.com/dragon-slayer875/pcpocket-extension/issues) if you'd like to contribute.

## License

This project is licensed under the **GNU General Public License v3.0**.  
See the [LICENSE](./LICENSE) file for details.
