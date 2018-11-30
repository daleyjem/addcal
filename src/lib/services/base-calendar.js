import appConfig from '../../config';

/**
 * @typedef Calendar
 */
 export default class Calendar {
    /**
     * Base calendar object to extend from for calendar service API's (i.e. google, yahoo, etc.)
     * @param {string} service Name of the service that matches key in root `config.js`
     * @param {object} config Developer configuration options for the service API 
     */
    constructor(service, config){
        // Dev API config options (API_KEY, etc.)
        this.config = config;
        // Name of service (google, yahoo, etc.)
        this.service = service;
        // App config options
        this.serviceConfig = appConfig.services[this.service];

        /**
         * Event listeners
         */

        // Called by extending class when API, when service API is invoked successfully (i.e. valid API_KEY, etc.)
        this.onAPIReady;
        // Called by extending class when API, when service API is invoked and fails (i.e. invalid API_KEY, etc.)
        this.onAPIFailed;
        // Called after <script> tag is successfully added to DOM
        this.onAddedToDOM;
    }

    /**
     * Inserts service calendar API into the DOM via <script src="..."></script>
     */
    init(){
        const head = document.querySelector('head');
        const script = document.createElement('script');
        script.onload = () => {
            if (this.onAddedToDOM) this.onAddedToDOM()
        }
        script.src = appConfig.services[this.service].src;
        head.appendChild(script);
    }
}
