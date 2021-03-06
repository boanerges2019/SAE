import { Injectable } from '@angular/core';
import { Observable, Observer, Subscription} from 'rxjs/Rx';

/**
 * An utility class to manage RX events
 */
@Injectable()
export class EventManager {

    observable: Observable<any>;
    observer: Observer<any>;

    constructor() {
        this.observable = Observable.create((observer: Observer<any>) => {
            this.observer = observer;
        }).share();
    }

    /**
     * Method to broadcast the event to observer
     */
    broadcast(event) {
        if (this.observer != null) {
            this.observer.next(event);
        }
    }

    /**
     * Method to subscribe to an event with callback
     */
    subscribe(eventName, callback) {
        let subscriber: Subscription = this.observable.filter((event) => {
            return event.name === eventName;
        }).subscribe(callback);
        return subscriber;
    }

    /**
     * Method to unsubscribe the subscription
     */
    destroy(subscriber: Subscription) {
        subscriber.unsubscribe();
    }
}
