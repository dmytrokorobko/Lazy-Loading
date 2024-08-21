# Picture Gallery with Lazy Loading

This project is a simple React-based picture gallery that fetches photos from the JSONPlaceholder API. The application features pagination with lazy loading, allowing more pictures to load as the user scrolls down the page. Users can also filter pictures by album ID using a set of buttons.

## Live Version

You can view the live version of the project here: [Lazy Loading Project](https://dmytrokorobko.github.io/Lazy-Loading/)

## Features

- **Fetch Albums**: Fetches and displays album IDs from the JSONPlaceholder API.
- **Lazy Loading**: Loads more pictures as the user scrolls to the bottom of the page.
- **Filter by Album**: Allows users to select and view pictures from a specific album.
- **Responsive Design**: The layout is responsive and adapts to various screen sizes.

## Project Structure

```plaintext
├── public
│   ├── index.html
│   └── ...
├── src
│   ├── components
│   │   └── PictureItem.js
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

## Running the App

- Once the app is running, you'll see a header with the title "Pagination".
- Below the title, you will find buttons representing different album IDs. Click on any button to filter the pictures by that album.
- Scroll down the page to load more pictures.

## Code Explanation
**App.js**
- State Management: Manages various states like albums, pictures, currentAlbumId, pictureIndex, and loading.
- Fetching Albums: On initial load, the app fetches all albums and stores them in the albums state.
- Fetching Pictures: When a user selects an album or scrolls to the bottom, the app fetches more pictures for the selected album.
- Lazy Loading: The useEffect hook adds an event listener to the scroll event, triggering more pictures to load when the user reaches the bottom.

**PictureItem.js**
- A stateless component that receives picture as a prop and renders the picture's details and image.