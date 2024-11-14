import { TestBed } from '@angular/core/testing';
import { FudisTranslationService } from './translation.service';
import { en, fi, sv } from './translationKeys';

describe('TranslationService', () => {
  let service: FudisTranslationService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [FudisTranslationService] });
    service = TestBed.inject(FudisTranslationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('default values', () => {
    it('should return English', () => {
      expect(service.getLanguage()).toEqual('en');
    });

    it('should return English translations', () => {
      expect(service.getTranslations()()).toEqual(en);
    });

    it('should return fi, sv, en array', () => {
      expect(service.getSelectableLanguages()()).toEqual(['fi', 'sv', 'en']);
    });
  });

  describe('setter', () => {
    it('setLanguage should update language and translations properly', () => {
      service.setLanguage('fi');

      expect(service.getLanguage()).toEqual('fi');
      expect(service.getTranslations()()).toEqual(fi);

      service.setLanguage('sv');

      expect(service.getLanguage()).toEqual('sv');
      expect(service.getTranslations()()).toEqual(sv);

      service.setLanguage('en');

      expect(service.getLanguage()).toEqual('en');
      expect(service.getTranslations()()).toEqual(en);
    });
  });

  it('setSelectableLanguages should update badge languages properly ', () => {
    service.setSelectableLanguages(['fi', 'sv']);
    expect(service.getSelectableLanguages()()).toEqual(['fi', 'sv']);

    service.setSelectableLanguages(['en', 'fi']);
    expect(service.getSelectableLanguages()()).toEqual(['en', 'fi']);
  });
});
