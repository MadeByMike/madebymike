import lozad from 'lozad';
import ensureCutsMustard from './cuts-mustard';

function startObserving() {
    const nodeList = document.querySelectorAll('img[data-src]');
    const observer = lozad(nodeList);
    observer.observe();
}

ensureCutsMustard(_ => {
    startObserving();
});
