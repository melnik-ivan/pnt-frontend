import { PntFrontendPage } from './app.po';

describe('pnt-frontend App', () => {
  let page: PntFrontendPage;

  beforeEach(() => {
    page = new PntFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
