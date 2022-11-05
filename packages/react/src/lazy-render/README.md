## LazyRender 懒渲染

如其名，LazyRender 在需要的时候才渲染。
LazyRender 在 `mounted` 之后并不会渲染 children 元素，而是在 `render` 为 `true` 时才渲染。

一旦 children 被渲染，那么 `render` 的变化便不再影响它。

### Props

| 参数           | 说明                               | 类型      | 默认值 |
| -------------- | ---------------------------------- | --------- | ------ |
| render         | 是否渲染。                         | `boolean` | false  |
| forceRender    | 忽略 `render`，强制渲染 children。 | `boolean` | false  |
| destroyable | 关闭时销毁子元素。                 | `boolean` | false  |

> LazyRender 并没有 DOM 节点，所以不会对 children 进行任何包裹。

在某些情况下，你可能需要销毁子组件，以便重建/清空内在状态。此时请使用 `destroyable`。

LazyRender 只是一种懒渲染策略，而不是用于控制元素显示/隐藏状态的切换。

