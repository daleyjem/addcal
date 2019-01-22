import appConfig from './config';
import download from './lib/utils/downloader';

export default class AddCal {
    /**
     * Instantiate an AddCal object
     * @param {*} config Developer configuration options for each service utilized (i.e. google, yahoo, etc.)
     */
    constructor(apiConfig) {
        this.apiConfig = apiConfig;
        this.activeServices = {};
        this.servicesReady = [];
        this.onServicesReadyUpdate;
        this.init();
    }

    /**
     * Initializes all calendar service API's specified by the developer's config options
     */
    init() {
        for (const [service, apiConfig] of Object.entries(this.apiConfig)){
            const serviceConfig = appConfig.services[service];
            const _class = new serviceConfig.class(serviceConfig, apiConfig);
            _class.onAPIReady = this.onServiceAPIReady.bind(this);
            _class.onAPIFailed = this.onServiceAPIFailed.bind(this);
            _class.init(this.onServiceAPIReady.bind(this));
            this.activeServices[service] = _class;
        }
    }

    /**
     * Add an event to the specified API service
     * @param {string} service The service to add the event to ('google', 'yahoo', etc.)
     * @param {EventParms} eventParams The data to add to the user's calendar service
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

    /**
     * Forces the browser to download a calendar event of type specified by `generator` param
     * @param {string} generator The generator to use for creating the file to download
     * @param {EventParams} eventParams The data to add to the event file
     * @param {*} options Options for download
     * @param {string} options.filename Filename of file being downloaded
     */
    static download(generator, eventParams, options = {}) {
        const _generator = appConfig.generators[generator];
        const transformer = _generator.transformer;
        const fileData = transformer(eventParams);
        
        download(fileData, {
            filename: `${options.filename || 'event'}.${_generator.extension}`,
            charset: _generator.charset,
            mimetype: _generator.mimetype
        });
    }

    /**
     * @private
     * @param {string} service The service who's API is ready to interact with (i.e. 'google', 'yahoo', etc.)
     */
    onServiceAPIReady(service){
        this.servicesReady.push(service);
        if (this.onServicesReadyUpdate){
            this.onServicesReadyUpdate();
        }
    }

    /**
     * @private
     * @param {string} service The service who's API failed readiness to interact with (i.e. 'google', 'yahoo', etc.)
     */
    onServiceAPIFailed(service, err){
        console.warn(`Couldn't initialize calendar API for '${service}'`, err);
    }
}

export {default as EventParams} from './lib/models/event-params';
export const generators = {
    ICALENDAR: 'ical'
};
