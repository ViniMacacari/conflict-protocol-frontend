import { TestBed } from '@angular/core/testing';

import { ActiveRoomService } from './active-room.service';

describe('ActiveRoomService', () => {
  let service: ActiveRoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveRoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
