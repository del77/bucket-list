const headerTeamplate = document.getElementById('header-template');
const headerBody = document.importNode(headerTeamplate.content, true);

const bodyElement = document.querySelector('body');
bodyElement.prepend(headerBody);



const footerTemplate = document.getElementById('footer-template');
const footerBody = document.importNode(footerTemplate.content, true);

bodyElement.append(footerBody);