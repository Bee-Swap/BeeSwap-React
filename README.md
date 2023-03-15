# BeeSwap React Module

## Installation

`npm install beeswap-react`

## Usage

There are two steps for using this plugin.

1. In your `App.tsx` or wherever you put your providers, include our `Provider`.

```jsx

import { BeeSwapProvider } from './hooks/useBeeSwap';

//...

ReactDOM.render(
  <BeeSwapProvider beeId="YOUR_BEE_ID_NUMBER">
    <App />
  </BeeSwapProvider>,
  document.getElementById('app-root'),
);

```

2. Anywhere you want to embed a BeeSwap ad, use the following snippet:

```jsx
  const { RenderBeeSwapAds } = useBeeSwap();
  
  //You may want to change the id below based on the ad type you are loading.
  //Your snippet also may also allow for you to instead pass a className.
  const MyComponent = () => ({
    <RenderBeeSwapAds id="bee-oneone-wide-inj-1" /> 
  })
```

And that's it! If you have any problems with set up. Please reach out to: hello@getbeeswap.com for assistance!
