import { ProjectRivendellPage } from './app.po';

describe('project-rivendell App', () => {
  let page: ProjectRivendellPage;

  beforeEach(() => {
    page = new ProjectRivendellPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
