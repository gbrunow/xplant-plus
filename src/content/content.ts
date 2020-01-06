import './content.scss';

const getHTML = (url: string, callback: (response: Document) => void) => {
    // Feature detection
    if (!window.XMLHttpRequest) { return; }

    // Create new request
    const xhr = new XMLHttpRequest();

    // Setup callback
    xhr.onload = () => {
        if (callback && typeof (callback) === 'function') {
            callback(xhr.responseXML);
        }
    };

    // Get the HTML
    xhr.open('GET', url);
    xhr.responseType = 'document';
    xhr.send();
};

const htmlToElement = (html: string) => {
    const template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
};

const plane = `
<span class="fa-stack fa-lg" style="font-size: 27px;position: absolute;right: 0;color: white;opacity: 0.5;">
    <i class="fa fa-square-o fa-stack-2x"></i>
    <i class="fa fa-plane fa-stack-1x" aria-hidden="true"></i>
</span>`;


const checkProducts = () => {
    const products = Array.from(document.getElementsByClassName('itemTd') as HTMLCollectionOf<HTMLLinkElement>);

    for (const product of products) {
        const a = product.querySelector('a.textEllipsis') as HTMLLinkElement;
        const url = a.href;

        getHTML(url, (page) => {
            if (page.querySelector('.showPartnerInfo .fa-plane')) {
                product.classList.add('ships-overseas');
                const p = product.querySelector('.textEllipsis > p') || product.querySelector('div > p');
                p.appendChild(htmlToElement(plane));
            }

            product.classList.add('checked');
        });
    }
};

checkProducts();

document
    .querySelectorAll('.list_paging')
    .forEach(el => el.addEventListener('click', () => {
        console.log('click');
        setTimeout(checkProducts);
    }));
