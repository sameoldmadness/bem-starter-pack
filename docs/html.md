HTML
====

In general, you would not want to edit html file — all blocks could be rendered dynamically with javascript.

Nevertheless it is possible to insert the block manually:

```html
<div class="my-block i-bem">
    Hey!
</div>
```

As you can see, we added two classes to the dom element: first class mirrors the block name, and the second one — `i-bem` — trigger's js-representation of the block.

