describe("URL parsing", function() {
  it("defaults to San Francisco and Melbourne", function() {
    expect(Url.get()).toBe('melbourne/sanfrancisco/');
  });
});
