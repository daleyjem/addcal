export default class EventParams {
    constructor(params = {}){
        this.summary = params.summary || '';
        this.description = params.description || '';
        this.start = params.start || new Date();
        this.duration = params.end || {hours: 1, minutes: 0};
    }
}