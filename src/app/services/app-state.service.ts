import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslationService } from './translation.service';

@Injectable({
    providedIn: 'root'
})
export class AppStateService {
    userCurrentLanguage: string = '';
    userId!: number;
    isAuthenticated! : boolean ;
    isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); // Add isLoading property

    constructor(private translationService: TranslationService) {
        this.translationService.currentLanguage.subscribe(language => {
            this.userCurrentLanguage = language;
        });
    }

    setLoading(value: boolean) {
        this.isLoading.next(value);
    }

    get isLoading$() {
        return this.isLoading.asObservable();
    }
}
