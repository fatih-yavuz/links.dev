const fs = require('fs');

const iconDirectory = '../user-page/icons';

let files = fs.readdirSync(iconDirectory);

let iconNames = files.filter(file => file.endsWith('.svg'));

iconNames = iconNames.map(iconName => iconName.slice(0, iconName.length - 4));

const baseUrl = 'https://raw.githubusercontent.com/fatih-yavuz/links.dev/main/user-page/icons/';

let css = '';

iconNames.forEach(iconName => {
    css += `.icon-${iconName} {\n`;
    css += `  -webkit-mask-image: url('${baseUrl}${iconName}.svg');\n`;
    css += `  mask-image: url('${baseUrl}${iconName}.svg');\n`;
    css += `}\n`;
});

const fileContent = `icons:\n${iconNames.map(name => `  - ${name}`).join('\n')}`;

fs.writeFile('../available-icons.yaml', fileContent, (writeErr) => {
    if (writeErr) {
        console.error(writeErr);
        return;
    }

    console.log('The file was saved!');
});

fs.writeFileSync('../user-page/css/icons.css', css);
