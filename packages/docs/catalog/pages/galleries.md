# Gallery

## Standard

```react
---
<ThemeProvider>
  <Gallery
    images={[
      {
        name: "/static/sample.jpg",
        alt: "Alt Text",
        caption: "caption",
        order: 0,
        fluid: {
          aspectRatio: 0.6666666666666666,
          base64: "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAeABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAIBBAUG/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAED/9oADAMBAAIQAxAAAAHchBWFDm2zhnfKIf/EABoQAAIDAQEAAAAAAAAAAAAAAAABAgQREAP/2gAIAQEAAQUC7pporEkl7yQ7DZvf/8QAFBEBAAAAAAAAAAAAAAAAAAAAIP/aAAgBAwEBPwEf/8QAFBEBAAAAAAAAAAAAAAAAAAAAIP/aAAgBAgEBPwEf/8QAFRABAQAAAAAAAAAAAAAAAAAAIDH/2gAIAQEABj8CdP8A/8QAGhAAAwADAQAAAAAAAAAAAAAAAAERIDFxgf/aAAgBAQABPyHISlrEztejK1mw3GdP/9oADAMBAAIAAwAAABBrJoL/xAAXEQADAQAAAAAAAAAAAAAAAAAAEBEh/9oACAEDAQE/EKU1f//EABYRAAMAAAAAAAAAAAAAAAAAAAAQIf/aAAgBAgEBPxBw/8QAHRABAAICAgMAAAAAAAAAAAAAAQARIVEQMUFhcf/aAAgBAQABPxDEa4puV2SuyXu7mlyxAT17EwhfGCEUairWGdhbNeCf/9k=",
          sizes: "(max-width: 2000px) 100vw, 2000px",
          src: "/static/sample.jpg",
          srcSet: "/static/sample.jpg 500w, /static/sample.jpg 1000w, /static/sample.jpg 2000w, /static/sample.jpg 3000w, /static/sample.jpg 3840w"
        },
        fixed: {}, resize: {} }
    ]}
  />
</ThemeProvider>
```