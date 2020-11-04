# mnet-ui-lib-project-template

template with generator to create reusable component library with storybook and compoent generator.

## How to use

- clone the repo

```
git clone https://github.com/sabarnix/mnet-ui-lib-project-template.git your-lib-name
```

- update package.json with your lib details

- on webpack.config.babel.js

```diff
output: {
  path: path.resolve('./dist'),
- filename: 'lib-name.min.js',
+ filename: 'your-lib-name.js',
  libraryTarget: 'var',
- library: 'LibName',
+ library: 'YourLibName',
},

```

- generate component

```
npm run generate
```

- open storybook

```
npm run storybook
```

## Documentation

https://github.com/grommet/react-desc is used to generate component documentation

Generated componenent has a `doc.js` file. Documentation for the component should be added there.

On build all the component README are concatenated to generate the root README.md by default. This can be disabled by removing the concat param at the end of generate-readme script in package.json

## Typescript

update the index.d.ts file inside the generated component directory witht the prop definitions.

## Testing

basic snapshot tests are generated at ```__tests__/component-test.js```
