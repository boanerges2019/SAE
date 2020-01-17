import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable()
export class CacheService {

    constructor(private localStorageService: LocalStorageService) {

    }

    public isStorageSupported(): boolean {
       // return this.localStorageService.isSupported;
        return true;
    }

    public getObject(key: string):any {
        if (this.isStorageSupported()) {
            return this.localStorageService.retrieve(key);
        }
    }

    public setObject(key: string, object: any):void {
    if (this.isStorageSupported()) {
        return this.localStorageService.store(key, object);
    }
}

    public removeObject(key: string):void {
        if (this.isStorageSupported()) {
            return this.localStorageService.clear(key);
        }
    }

    public clearAll():void {
        if (this.isStorageSupported()) {
            return this.localStorageService.clear();
        }
    }
}
