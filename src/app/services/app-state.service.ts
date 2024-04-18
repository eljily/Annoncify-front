import { Injectable } from '@angular/core';
import { TranslationService } from './translation.service';

@Injectable({
    providedIn: 'root'
})
export class AppStateService {
    userCurrentLanguage: string= '';
    userId! : number ;

    constructor(private translationService: TranslationService) {
        this.translationService.currentLanguage.subscribe(language => {
            this.userCurrentLanguage = language;
        });
    }

    // Other methods and properties of your AppStateService
}
