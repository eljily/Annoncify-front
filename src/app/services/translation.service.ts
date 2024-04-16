import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TranslationService {
    private translations: any = {};
    private currentLanguageSubject: BehaviorSubject<string>;
    public currentLanguage: Observable<string>;

    constructor(private http: HttpClient) {
        this.currentLanguageSubject = new BehaviorSubject<string>('en'); // Default language
        this.currentLanguage = this.currentLanguageSubject.asObservable();
    }

    public loadTranslations(): void {
        // Load translations for all supported languages
        const languages = ['en', 'fr', 'ar'];
        languages.forEach(lang => {
            this.http.get(`assets/i18n/${lang}.json`).subscribe(translation => {
                this.translations[lang] = translation;
            });
        });
    }

    public setLanguage(language: string): void {
        // Set the current language
        this.currentLanguageSubject.next(language);
    }

    public translate(key: string): string {
        console.log('Fetching translation for key:', key);
        console.log('Current language:', this.currentLanguage);
        console.log('Translations:', this.translations); 
        // Translate the given key to the current language
        const translation = this.translations[this.currentLanguageSubject.value];
        return translation ? translation[key] : key;
    }
}
