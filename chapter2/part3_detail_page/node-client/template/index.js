const fs = require('fs');
const vm = require('vm');

const templateCache = {};

const sandBox = {
    include: function(name, data) {
        const template = templateCache[name] || createTemplate(name);
        return template(data);
    },
};

const templateContext = vm.createContext(sandBox);

function createTemplate(templatePath) {

    templateCache[templatePath] = vm.runInContext(
        `(function(data) {
            with(data) {
                return \`${fs.readFileSync(templatePath, 'utf-8')}\`
            }
        })`, templateContext
    );

    return templateCache[templatePath];
};

module.exports = createTemplate;