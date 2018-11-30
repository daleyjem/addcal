import appConfig from './config';

export default class AddCal {
    /**
     * Instantiate an AddCal object
     * @param {*} config 
     */
    constructor(config) {
        this.config = config;
        this.activeServices = {};
        this.servicesReady = [];
        this.onServicesReadyUpdate;
        this.init();
    }

    /**
     * Inserts <script> tags into DOM
     */
    init() {
        for (const [service, serviceConfig] of Object.entries(this.config)){
            const _class = new appConfig.services[service].class(serviceConfig);
            this.activeServices[service] = _class;
            _class.onAPIReady = this.onServiceReady;
            _class.init(this.onServiceReady.bind(this));
        }
    }

    /**
     * Add an event to the specified API service
     * @param {string} service The service to add the event to ('google', 'yahoo', etc.)
     * @param {*} eventParams 
     */
    async addEvent(service, eventParams) {
        const instance = this.activeServices[service];
        await instance.addEvent(eventParams)
            .catch((err) => {
                throw new Error(err);
            })
        ;
        return true;
    }

    onServiceReady(service){
        this.servicesReady.push(service);
        if (this.onServicesReadyUpdate){
            this.onServicesReadyUpdate();
        }
    }
}
