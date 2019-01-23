export default class EventParams {
    /**
     * EventParams data for adding an event
     * @param {object} params The EventParams data object
     * @param {string} params.summary The event summary
     * @param {string} params.description The event description
     * @param {Date} params.start The event start date/time
     * @param {number} params.duration The event time duration in minutes
     * @param {string} params.url A URL of the event
     */
    constructor(params = {}){
        this.summary = params.summary || 'New Event';
        this.description = params.description || '';
        this.start = params.start || new Date();
        this.duration = params.duration || 60;
        this.url = params.url || '';
        this.location = params.location || '';
    }
}