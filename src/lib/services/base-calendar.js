/**
 * @typedef Calendar
 */
 export default class Calendar {
    /**
     * Base calendar object to extend from for calendar service API's (i.e. google, yahoo, etc.)
     * @param {object} serviceConfig App configuration options for service
     * @param {object} apiConfig Developer configuration options for the service API 
     */
    constructor(serviceConfig, apiConfig){
        // App config options for service
        this.serviceConfig = serviceConfig;
        // Dev API config options (API_KEY, etc.)
        this.apiConfig = apiConfig;

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
        script.src = this.serviceConfig.src;
        head.appendChild(script);
    }
}
