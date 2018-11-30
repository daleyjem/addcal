import appConfig from '../../config';

export default class Calendar {
    constructor(service){
        this.service = service;
        this.onAPIReady;
        this.onAPIFailed;
        this.onAddedToDOM;
    }

    init(callback){
        const head = document.querySelector('head');
        const script = document.createElement('script');
        script.onload = () => {
            if (this.onAddedToDOM) this.onAddedToDOM()
        }
        script.src = appConfig.services[this.service].src;
        head.appendChild(script);
    }

    noop(){}

    handleAuthFailure(code){
        console.log('Auth failure:', code);
    }
}