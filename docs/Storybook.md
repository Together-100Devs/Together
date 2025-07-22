Storybook is a tool for viewing and developing UI components in isolation. It's useful for previewing component states, styling, and behavior without running the full application.

[Storybook Docs](https://storybook.js.org/docs/writing-stories)

## Running Storybook Locally

1. Open your terminal and navigate to the `client` directory:
   `cd client`
2. Install dependencies (if not already installed):
   `npm install`
3. Start Storybook:
   `npm run storybook`
4. Open [ http://localhost:6006](http://localhost:6006)/ in your browser.

Storybook will launch and show a list of available components and their stories (examples of different states and uses).

#### Tips

New components should have a `.stories.jsx` file in the same folder

Stories should represent real use cases (different props, states, styles)

Storybook will automatically reload when files are updated

### How to Write a Story

1. Keep your story next to the component or in a shared stories/ folder:

```md
client/
└── src/components/
└── Button/
├── Button.jsx
├── Button.stories.jsx ← this is your story file
```

2. Example Button Component

```jsx
// Button.jsx

import "./button.css"; // Optional styling

export default function Button({ children, variant = "primary" }) {
  const className = variant === "secondary" ? "btn-secondary" : "btn-primary";
  return <button className={`btn ${className}`}>{children}</button>;
}
```

3. Basic Story File

```jsx
// Button.stories.jsx

import Button from "./Button";

export default {
  title: "Components/Button", // How it appears in Storybook sidebar
  component: Button,
};

export const Primary = () => <Button>Click me</Button>;

export const Secondary = () => <Button variant="secondary">Cancel</Button>;

export const WithLongText = () => <Button>Submit your application here</Button>;
```
