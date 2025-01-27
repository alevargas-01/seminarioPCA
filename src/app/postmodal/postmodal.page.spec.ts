import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostmodalPage } from './postmodal.page';

describe('PostmodalPage', () => {
  let component: PostmodalPage;
  let fixture: ComponentFixture<PostmodalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PostmodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
