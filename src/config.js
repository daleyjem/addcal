import GoogleCalendar from "./lib/services/google";

export default {
    services: {
        google: {
            class: GoogleCalendar,
            src: 'https://apis.google.com/js/api.js',
            options: {
                authType: 'client:auth2',
                discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
                scopes: 'https://www.googleapis.com/auth/calendar.events'
            }
        }
    }
}