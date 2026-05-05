# UnderGRAND Radio

A simple web radio application with a dark underground style UI.

![UnderGRAND Radio](https://img.shields.io/badge/Status-Complete-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## Features

- **Play/Stop Controls**: Toggle the radio stream on and off
- **Live Stream Audio Player**: Connects to a configurable audio stream URL
- **Dark Underground UI**: Sleek, modern dark theme with orange accents
- **Current Track Display**: Shows mock track data that rotates every 30 seconds
- **Volume Control**: Adjustable volume slider
- **Animated Visualizer**: CSS-based audio visualizer animation
- **Spinning Vinyl**: Animated record disc when playing
- **Responsive Design**: Works on mobile and desktop devices

## Project Structure

```
undergrand-radio/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Stylesheet with dark theme
├── js/
│   └── app.js          # Application logic
├── assets/             # For future images/icons
└── README.md           # This file
```

## Quick Start

### Option 1: Open Directly

Simply open `index.html` in your web browser:

```bash
# On macOS
open undergrand-radio/index.html

# On Windows (PowerShell)
Start-Process undergrand-radio/index.html

# On Linux
xdg-open undergrand-radio/index.html
```

### Option 2: Use a Local Server

For best compatibility with audio streams, serve the files locally:

```bash
# Using Python 3
cd undergrand-radio
python3 -m http.server 8000

# Then open http://localhost:8000 in your browser
```

Or with Node.js:

```bash
npx serve undergrand-radio
```

## Configuration

### Setting Up Your Radio Stream

Edit `js/app.js` and update the `STREAM_URL` in the CONFIG object:

```javascript
const CONFIG = {
    STREAM_URL: 'https://your-radio-stream-url.com/stream.mp3',
    // ... other config
};
```

**Supported stream formats:**
- MP3 streams (.mp3)
- AAC streams (.aac)
- HLS streams (.m3u8) - requires browser support
- Icecast/Shoutcast streams

### Customizing Mock Tracks

To change the displayed track information, edit the `MOCK_TRACKS` array in `js/app.js`:

```javascript
MOCK_TRACKS: [
    { artist: 'Artist Name', title: 'Track Title' },
    // Add more tracks...
],
```

### Adjusting Settings

In `js/app.js`, you can modify:

- `TRACK_CHANGE_INTERVAL`: How often mock tracks change (default: 30000ms)
- `VOLUME_DEFAULT`: Default volume level (default: 75)

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## Customization Tips

### Changing Colors

Edit the CSS variables in `css/styles.css`:

```css
:root {
    --accent-color: #ff6b35;      /* Main accent color */
    --bg-primary: #0a0a0a;        /* Primary background */
    --text-primary: #e0e0e0;      /* Primary text color */
}
```

### Modifying the Visualizer

The visualizer animation is controlled by CSS keyframes in `styles.css`. Adjust the `@keyframes visualize` rule to change the animation behavior.

## Troubleshooting

### Audio Doesn't Play

1. Check if the stream URL is valid and accessible
2. Ensure your browser allows autoplay (some browsers block autoplay)
3. Try increasing the volume
4. Check browser console for error messages

### Stream Buffering

- Slow internet connection may cause buffering
- Some radio streams have limited capacity
- Try a different stream URL

## License

MIT License - Feel free to use and modify for your own projects!

## Credits

Built with vanilla HTML, CSS, and JavaScript. No frameworks required.
