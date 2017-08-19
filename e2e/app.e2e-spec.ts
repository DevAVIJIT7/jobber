import { JobberPage } from './app.po';

describe('jobber App', function() {
  let page: JobberPage;

  beforeEach(() => {
    page = new JobberPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
