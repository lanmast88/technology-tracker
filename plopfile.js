module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'Create React component with jsx + css',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name:'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{name}}/{{name}}.jsx',
        templateFile: 'plop-templates/component.jsx.hbs'
      },
      {
        type: 'add',
        path: 'src/components/{{name}}/{{name}}.css',
        templateFile: 'plop-templates/component.css.hbs'
      }
    ]
  });
};
