import BaseCalendar from '../base-calendar';
import transformGoogleEvent from '../../transformers/google';

const SERVICE = 'google';

export default class GoogleCalendar extends BaseCalendar {
    constructor(serviceConfig, apiConfig){
        super(serviceConfig, apiConfig);

        this.serviceConfig = serviceConfig;
        this.apiConfig = apiConfig;
        this.service = SERVICE;
        this.onAddedToDOM = this.onApiAdded;
    }

    /**
     * Adds an event to the user's Google calendar
     * @param {*} params Event params to add
     * @todo Actually implement the `gapi` calendar `insert` method
     */
    async addEvent(params){
        const signedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
        const eventConfig = transformGoogleEvent(params);

        if (!signedIn){
            await gapi.auth2.getAuthInstance().signIn()
                .catch((err) => {
                    throw new Error(err);
                })
            ;
        }

        return new Promise((resolve, reject) => {
            const request = gapi.client.calendar.events.insert(eventConfig);
            request.execute((res) => {
                if (res.status === 'confirmed') {
                    resolve(res.status);
                } else {
                    reject(res.status);
                }
            });
        });
    }

    onApiAdded(){
        gapi.load(this.serviceConfig.options.authType, this.onApiInit.bind(this));
    }

    onApiInit(){
        gapi.client.init({
            apiKey: this.apiConfig.apiKey,
            clientId: this.apiConfig.clientKey,
            discoveryDocs: this.serviceConfig.options.discoveryDocs,
            scope: this.serviceConfig.options.scopes
        }).then(() => {
            if (this.onAPIReady) this.onAPIReady(this.service);
        }).catch((err) => {
            if (this.onAPIFailed) this.onAPIFailed(this.service, err);
        });
    }
}