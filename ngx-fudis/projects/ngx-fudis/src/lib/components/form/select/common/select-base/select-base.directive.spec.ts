import { SelectBaseDirective } from './select-base.directive';
import { FudisFocusService } from '../../../../../services/focus/focus.service';
import { TestBed } from '@angular/core/testing';
import { FudisTranslationService } from '../../../../../services/translation/translation.service';
import { FudisIdService } from '../../../../../services/id/id.service';

describe('SelectBaseDirective', () => {
  const doc: Document = new Document();
  const focusService = new FudisFocusService(doc);
  const idService = new FudisIdService();
  const translationService = new FudisTranslationService();

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [FudisFocusService, FudisIdService, FudisTranslationService],
    });
  });

  // TODO: create tests
  it.skip('should create an instance', () => {
    const directive = new SelectBaseDirective(focusService, translationService, idService);

    expect(directive).toBeTruthy();
  });
});
