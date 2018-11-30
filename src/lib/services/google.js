import BaseCalendar from './base-calendar';
import appConfig from '../../config';

const SERVICE = 'google';

export default class GoogleCalendar extends BaseCalendar {
    constructor(config){
        super(SERVICE);

        this.onAddedToDOM = this.onApiAdded;
        this.config = config;
        this.serviceConfig = appConfig.services[SERVICE];
    }

    async addEvent(params){
        const signedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
        if (!signedIn){
            await gapi.auth2.getAuthInstance().signIn()
                .catch((err) => {
                    throw new Error(err);
                })
            ;
        }
        return true;
    }

    onApiAdded(){
        gapi.load(this.serviceConfig.options.authType, this.onApiInit.bind(this));
    }

    onApiInit(){
        gapi.client.init({
            apiKey: this.config.apiKey,
            clientId: this.config.clientKey,
            discoveryDocs: this.serviceConfig.options.discoveryDocs,
            scope: this.serviceConfig.options.scopes
        }).then(() => {
            if (this.onAPIReady) this.onAPIReady(this.service);
        }).catch((err) => {
            if (this.onAPIFailed) this.onAPIFailed(this.service, err);
        });
    }
}