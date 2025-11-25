# Zustand

A small, fast and scalable bearbones state-management solution using simplified flux principles. Has a comfy API based on hooks, isn't boilerplatey or opinionated.

Don't disregard it because it's cute. It has quite the claws, lots of time was spent dealing with common pitfalls, like the dreaded [zombie child problem](https://react-redux.js.org/api/hooks#stale-props-and-zombie-children), [react concurrency](https://github.com/bvaughn/rfcs/blob/useMutableSource/text/0000-use-mutable-source.md), and [context loss](https://github.com/facebook/react/issues/13332) between mixed renderers. It may be the one state-manager in the React space that gets all of these right.

You can try a live [demo](https://zustand-demo.pmnd.rs/) and read the [docs](https://zustand.docs.pmnd.rs/).

npm install zustand

⚠️ This readme is written for JavaScript users. If you are a TypeScript user, be sure to check out our [TypeScript Usage section](https://www.npmjs.com/package/zustand#typescript-usage).

## First create a store

[](https://www.npmjs.com/package/zustand#first-create-a-store)

Your store is a hook! You can put anything in it: primitives, objects, functions. State has to be updated immutably and the `set` function [merges state](https://github.com/pmndrs/zustand/blob/HEAD/docs/guides/immutable-state-and-merging.md) to help it.

```jsx
import { create } from 'zustand'

const useBearStore \= create((set) \=> ({
bears: 0,
increasePopulation: () \=> set((state) \=> ({ bears: state.bears + 1 })),
removeAllBears: () \=> set({ bears: 0 }),
}))
```

## Then bind your components, and that's it!

[](https://www.npmjs.com/package/zustand#then-bind-your-components-and-thats-it)

Use the hook anywhere, no providers are needed. Select your state and the component will re-render on changes.

```jsx
function BearCounter() {
const bears \= useBearStore((state) \=> state.bears)
return <h1\>{bears} around here ...</h1\>
}

function Controls() {
const increasePopulation \= useBearStore((state) \=> state.increasePopulation)
return <button onClick\={increasePopulation}\>one up</button\>
}
```
